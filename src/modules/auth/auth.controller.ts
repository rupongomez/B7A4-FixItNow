import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { accessToken, refreshToken } =
      await authService.loginUserIntoDb(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in successfully",
      data: { accessToken, refreshToken },
    });
  },
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new Error("Refresh token not found. Please login again");
    }

    const { accessToken } =
      await authService.regenerateAccessToken(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New access token generated successfully",
      data: { accessToken },
    });
  },
);
export const authController = {
  loginUser,
  getNewAccessToken,
};
