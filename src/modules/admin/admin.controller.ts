import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    console.log(query, "qury");
    const result = await adminService.getAllUsersFromDb(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All users retrieved",
      data: result,
    });
  },
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.params.id as string;
    const result = await adminService.updateUserStatusIntoDb(payload, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User status updated successfully",
      data: result,
    });
  },
);

const getAllBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllBookings();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All bookings retrieved successfully",
      data: result,
    });
  },
);

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await adminService.createCategoryIntoDb(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category created successfully",
      data: result,
    });
  },
);

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllCategoriesFromDb();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All category retrieved successfully",
      data: result,
    });
  },
);

export const adminController = {
  createCategory,
  getAllCategory,
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};
