import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDb(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User registered Successfully",
      data: { user },
    });
  },
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.user?.id;
    const user = await userService.updateUserProfileIntoDb(
      payload,
      id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated Successfully",
      data: { user },
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getMyProfile = await userService.getProfileFromDb(
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile retrieved successfully",
      data: getMyProfile,
    });
  },
);

const googleLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idToken } = req.body;

    if (!idToken) {
      throw new Error("Google ID token is required");
    }

    const result = await userService.googleLoginIntoDb(idToken);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Google login successful",
      data: result,
    });
  },
);

export const userController = {
  registerUser,
  getMyProfile,
  googleLogin,
  updateUser,
};
