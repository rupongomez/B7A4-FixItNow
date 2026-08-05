import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export const handleCheckOutCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer as string;
  const transactionId = session.payment_intent as string;
  const bookingId = session.metadata?.bookingId;

  if (!userId || !stripeCustomerId || !transactionId || !bookingId) {
    console.log("Webhook: Missing values for creating checkout session");
    return;
  }

  const amountInCents = session.amount_total;
  if (!amountInCents) return;

  const amount = new Prisma.Decimal(amountInCents / 100);

  await prisma.payment.upsert({
    where: { bookingId },
    create: {
      customerId: userId,
      stripeCustomerId,
      transactionId,
      status: "COMPLETED",
      amount,
      bookingId,
    },
    update: {
      stripeCustomerId,
      status: "COMPLETED",
      amount,
      transactionId,
    },
  });

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "PAID",
    },
  });
};
