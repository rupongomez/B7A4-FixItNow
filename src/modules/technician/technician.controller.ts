import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";

const createTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { id } = req.user as JwtPayload;
    const createProfile = await technicianService.createTechnicianProfileIntoDb(
      payload,
      id,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician Profile Created Successfully",
      data: createProfile,
    });
  },
);

const getAllTechnician = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await technicianService.getAllTechnicianFromDb(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Technician Retrieved ",
      data: result,
    });
  },
);

const getTechnicianById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await technicianService.getTechnicianByIdFromDb(
      id as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician Profile retrieved",
      data: result,
    });
  },
);

const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.user?.id;
    const result = await technicianService.updateTechnicianProfileIntoDb(
      payload,
      id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician Profile updated Successfully",
      data: result,
    });
  },
);

const getMyTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const result = await technicianService.getMyTechnicianProfileFromDb(
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician Profile retrieved Successfully",
      data: result,
    });
  },
);

const getTechniciansBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const result = await technicianService.getTechniciansBookings(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All bookings for logged in technician retrieved",
      data: result,
    });
  },
);

const updateBookingStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id as string;
    const payload = req.body;

    const result = await technicianService.updateBookingStatusInDb(
      bookingId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking status updated successfully",
      data: result,
    });
  },
);

const getServicesForLoggedInTechnician = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const result =
      await technicianService.getAllServicesForLoggedInTechnicianFromDb(
        userId as string,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking status updated successfully",
      data: result,
    });
  },
);

export const technicianController = {
  createTechnicianProfile,
  getAllTechnician,
  getTechnicianById,
  updateTechnicianProfile,
  getMyTechnicianProfile,
  getTechniciansBookings,
  updateBookingStatus,
  getServicesForLoggedInTechnician,
};
