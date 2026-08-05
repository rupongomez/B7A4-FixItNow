import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { IPaymentPayload } from "./payment.interface";
import { handleCheckOutCompleted } from "./payment.utils";

const createCheckOutSessionIntoDB = async (
  userId: string,
  payload: IPaymentPayload,
) => {
  const { bookingId } = payload;

  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        payments: true,
      },
    });

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
    }

    const bookingDetails = await tx.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!bookingDetails || bookingDetails.status !== "ACCEPTED") {
      throw new Error(
        "The booking you are trying to pay, was not found or accepted",
      );
    }

    const serviceDetails = await tx.service.findUnique({
      where: {
        id: bookingDetails.serviceId,
      },
    });

    if (!serviceDetails) {
      throw new Error("Service details not found");
    }

    const price = Math.round(Number(bookingDetails.totalPrice) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceDetails.title,
            },
            unit_amount: price,
          },
        },
      ],
      customer: stripeCustomerId,
      success_url: `${config.app_url}/paid?success=true`,
      cancel_url: `${config.app_url}/paid?success=false`,
      metadata: { userId: user.id, bookingId },
    });

    return session.url;
  });
  return {
    paymentUrl: transactionResult,
  };
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret,
    );

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckOutCompleted(event.data.object as any);
        break;

      case "payment_intent.succeeded":
        await handleCheckOutCompleted(event.data.object as any);
        break;

      default:
        console.log(`No events matched to ${event.type}`);
    }
  } catch (error: any) {
    console.log("Stripe webhook verify error:", error.message);
    throw error;
  }
};

const getPaymentsFromDb = async (userId: string) => {
  const getPayments = await prisma.payment.findMany({
    where: {
      customerId: userId,
    },
  });

  return getPayments;
};

const getPaymentByIdFromDB = async (paymentId: string) => {
  const getPaymentDetails = await prisma.payment.findUniqueOrThrow({
    where: {
      id: paymentId,
    },
  });

  return getPaymentDetails;
};

const getAllPaymentsByCustomerId = async (customerId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      customerId,
    },
  });

  return payments;
};
export const paymentService = {
  createCheckOutSessionIntoDB,
  handleWebhook,
  getPaymentsFromDb,
  getPaymentByIdFromDB,
  getAllPaymentsByCustomerId,
};
