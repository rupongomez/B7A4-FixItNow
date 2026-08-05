import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";

const createCheckOutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;

    const result = await paymentService.createCheckOutSessionIntoDB(
      userId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout completed successfully",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers["stripe-signature"] as string;

    await paymentService.handleWebhook(event, signature as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Webhook triggered successfully",
      data: null,
    });
  },
);

const getPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const result = await paymentService.getPaymentsFromDb(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "payments  retrieved successfully",
      data: result,
    });
  },
);

const getPaymentDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.id as string;
    const result = await paymentService.getPaymentByIdFromDB(paymentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "payments details retrieved successfully",
      data: result,
    });
  },
);

const getPaymentHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id as string;
    const result = await paymentService.getAllPaymentsByCustomerId(customerId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment history retrieved successfully",
      data: result,
    });
  },
);

export const paymentController = {
  createCheckOutSession,
  handleWebhook,
  getPayment,
  getPaymentDetails,
  getPaymentHistory,
};
