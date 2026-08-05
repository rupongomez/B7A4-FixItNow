import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { servicesService } from "./services.service";
import httpStatus from "http-status";

const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await servicesService.createServiceInToDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service created successfully",
      data: result,
    });
  },
);
const getAllServices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;

    const result = await servicesService.getAllServicesFromDb(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All services retrieved successfully",
      data: result,
    });
  },
);

const getAllServicesForSingleTechnician = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result =
      await servicesService.getAllServicesForSingleTechnicianFromDB(
        id as string,
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service offered by this Technician retrieved successfully",
      data: result,
    });
  },
);

const getServiceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await servicesService.getServiceByIdFromDB(id as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service retrieved successfully",
      data: result,
    });
  },
);

export const serviceController = {
  getAllServices,
  createService,
  getAllServicesForSingleTechnician,
  getServiceById,
};
