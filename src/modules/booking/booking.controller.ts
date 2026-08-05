import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import httpStatus from "http-status";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const customerId = req.user?.id as string;
    const result = await bookingService.createBookingIntoDb(
      payload,
      customerId,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service booked successfully",
      data: result,
    });
  },
);

const getUsersBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id as string;
    const result = await bookingService.getUsersBookingFromDb(customerId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All bookings for logged in customer retrieved",
      data: result,
    });
  },
);

const getBookingById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id as string;

    const result = await bookingService.getBookingByIdFromDb(bookingId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking details retrieved",
      data: result,
    });
  },
);

const updateBookingStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id as string;
    const bookingId = req.params.bookingId as string;
    const status = req.body.status;
    console.log(status, "from contr");
    const result = await bookingService.updateBookingStatusInDb(
      bookingId,
      status,
      customerId,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking status updated",
      data: result,
    });
  },
);
export const bookingController = {
  createBooking,
  getUsersBooking,
  getBookingById,
  updateBookingStatus,
};
