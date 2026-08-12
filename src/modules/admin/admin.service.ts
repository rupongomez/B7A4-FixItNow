import { UserWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ICategory, IQuery, IStatus } from "./admin.interface";

const getAllUsersFromDb = async (query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 5;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const andCondition: UserWhereInput[] = [];

  if (query.searchTerm) {
    andCondition.push({
      OR: [
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          location: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const allUsers = await prisma.user.findMany({
    where: {
      AND: andCondition,
    },
    skip,
    take: limit,
    omit: { password: true },
  });

  const totalUserCount = await prisma.user.count();
  return { allUsers, totalUserCount };
};

const updateUserStatusIntoDb = async (payload: IStatus, userId: string) => {
  const { status } = payload;
  const updateStatus = status.toUpperCase();

  if (updateStatus !== "ACTIVE" && updateStatus !== "BANNED") {
    throw new Error("You can only change status to active or banned");
  }
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { status: updateStatus },
  });

  return updateUser;
};

const getAllBookings = async () => {
  const allBookings = await prisma.booking.findMany();
  return allBookings;
};

const createCategoryIntoDb = async (payload: ICategory) => {
  const { name, description } = payload;
  if (!name && !description) {
    throw new Error("Required field can not be empty");
  }

  const createCategory = await prisma.category.create({
    data: {
      name,
      description,
    },
  });

  return createCategory;
};

const getAllCategoriesFromDb = async () => {
  const allCategory = await prisma.category.findMany();

  return allCategory;
};

const deleteServiceFromDb = async (serviceId: string) => {
  const result = await prisma.service.delete({
    where: { id: serviceId },
  });

  return null;
};

export const adminService = {
  getAllUsersFromDb,
  updateUserStatusIntoDb,
  getAllBookings,
  createCategoryIntoDb,
  getAllCategoriesFromDb,
  deleteServiceFromDb,
};
