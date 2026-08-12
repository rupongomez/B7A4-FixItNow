import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { availabilityService } from "./availability.service";

const createAvailability = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await availabilityService.createAvailabilityIntoDb(
      payload,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability slot creation successful",
      data: result,
    });
  },
);

const updateAvailability = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.body.id;
    const result = await availabilityService.updateAvailabilityIntoDb(
      payload,
      id,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability updated successfully",
      data: result,
    });
  },
);

const getAvailabilityById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await availabilityService.getAvailabilityById(id as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability fetched successfully",
      data: result,
    });
  },
);

export const availabilityController = {
  createAvailability,
  updateAvailability,
  getAvailabilityById,
};
