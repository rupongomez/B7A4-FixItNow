import bcrypt from "bcryptjs";
import { IGoogleUser, RegisterUserPayload } from "./user.interface";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";
import jwt from "jsonwebtoken";

const registerUserIntoDb = async (payload: RegisterUserPayload) => {
  const { name, location, email, password, phone, role, profileImage } =
    payload;
  if (!name && !location && !email && !password && !phone && !role) {
    throw new Error("Required field can not be empty");
  }
  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExist) {
    throw new Error("User with this email location already exist!");
  }

  const roleToUpperCase = role.toUpperCase();

  if (roleToUpperCase === "ADMIN") {
    throw new Error("You are not allowed to set this role");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  let user;

  if (roleToUpperCase === "CUSTOMER") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role: roleToUpperCase,
        profileImage,
      },
      omit: { password: true },
    });
  }

  if (roleToUpperCase === "TECHNICIAN") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role: roleToUpperCase,
        profileImage,
      },
      omit: { password: true },
    });
  }
  return user;
};

const getProfileFromDb = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true },
  });

  return user;
};

const googleLoginIntoDb = async (idToken: string) => {
  try {
    // Decode the Google token
    const decoded: any = jwt.decode(idToken);

    if (!decoded || !decoded.email) {
      throw new Error("Invalid Google token");
    }

    const { email, name, picture } = decoded;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          password: "",
          role: "CUSTOMER",
          status: "ACTIVE",
          profileImage: picture || null,
          location: "",
          phone: "",
        },
      });
    }

    if (user.status === "BANNED") {
      throw new Error("You are banned on this site");
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
  } catch (error) {
    throw new Error("Google login failed");
  }
};

const updateUserProfileIntoDb = async (
  payload: RegisterUserPayload,
  id: string,
) => {
  const { name, location, phone, profileImage } = payload;

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("User doesn't exist!");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      location,

      phone,
      profileImage,
    },
  });

  return updatedUser;
};

export const userService = {
  registerUserIntoDb,
  getProfileFromDb,
  googleLoginIntoDb,
  updateUserProfileIntoDb,
};
