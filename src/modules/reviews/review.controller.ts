import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { reviewService } from "./review.service";

const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;

    const result = await reviewService.createReviewIntoDB(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review posted successfully",
      data: result,
    });
  },
);

const getReviewGivenByCustomer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.bookingId;

    const result = await reviewService.getReviewGivenOnBookingId(
      bookingId as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review retrieved successfully",
      data: result,
    });
  },
);

const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await reviewService.getAllReviewsFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Reviews retrieved successfully",
      data: result,
    });
  },
);

const getAllReviewsByLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  const result = await reviewService.getAllReviewsByLoggedInUserFromDb(
    userId as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Reviews retrieved successfully",
    data: result,
  });
};

const getAllReviewsForTechnician = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const technicianId = req.params.technicianId;
  const result = await reviewService.getAllReviewsForTechnicianFromDb(
    technicianId as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Reviews retrieved successfully",
    data: result,
  });
};
export const reviewController = {
  createReview,
  getReviewGivenByCustomer,
  getAllReviews,
  getAllReviewsByLoggedInUser,
  getAllReviewsForTechnician,
};
