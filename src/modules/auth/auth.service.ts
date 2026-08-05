import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken";

const loginUserIntoDb = async (payload: IUser) => {
  const { email, password } = payload;

  if (!email && !password) {
    throw new Error("Credentials can not be empty");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not Found! Please register to continue");
  }

  if (user.status === "BANNED") {
    throw new Error("You are banned on this site. Please contact support");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Incorrect credentials");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return { accessToken, refreshToken };
};

const regenerateAccessToken = async (refreshToken: string) => {
  const decoded = jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: decoded.data.id as string },
  });

  if (!user) {
    throw new Error("User not Found! Please register to continue");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  return { accessToken };
};

export const authService = {
  loginUserIntoDb,
  regenerateAccessToken,
};
