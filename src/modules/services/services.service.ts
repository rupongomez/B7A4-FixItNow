import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IService, IServiceQuery } from "./services.interface";

const createServiceInToDB = async (payload: IService) => {
  const {
    categoryId,
    serviceTitle,
    description,
    price,
    duration,
    technicianId,
    location,
  } = payload;

  if (!technicianId) {
    throw new Error("Technician Id required");
  }
  if (!categoryId) {
    throw new Error("category Id required");
  }
  if (!description) {
    throw new Error("description  required");
  }
  if (!price && price >= 1) {
    throw new Error("price can not be less than 1");
  }
  if (!duration) {
    throw new Error("Duration required");
  }
  if (!serviceTitle) {
    throw new Error("Service Title  required");
  }
  if (!location) {
    throw new Error("Location required");
  }

  const createService = await prisma.service.create({
    data: {
      technicianProfileId: technicianId,
      categoryId,
      title: serviceTitle,
      description,
      price,
      duration,
      location,
    },
  });
  return createService;
};

const getAllServicesFromDb = async (query: IServiceQuery) => {
  const limit = query.limit ? Number(query.limit) : 5;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: ServiceWhereInput[] = [];
  if (query.searchTerms) {
    andConditions.push({
      OR: [
        { title: { contains: query.searchTerms, mode: "insensitive" } },
        { description: { contains: query.searchTerms, mode: "insensitive" } },
        { location: { contains: query.searchTerms, mode: "insensitive" } },
      ],
    });
  }
  if (query.minPrice) {
    andConditions.push({
      price: { gte: Number(query.minPrice) },
    });
  }

  if (query.maxPrice) {
    andConditions.push({
      price: { lte: Number(query.maxPrice) },
    });
  }

  if (query.category) {
    andConditions.push({
      categoryId: query.categoryId,
    });
  }

  if (query.location) {
    andConditions.push({
      location: query.location,
    });
  }

  if (query.type) {
    andConditions.push({
      title: query.type,
    });
  }

  const result = await prisma.service.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip: skip,

    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalServiceCount = await prisma.service.count();
  return { result, totalServiceCount };
};

const getAllServicesForSingleTechnicianFromDB = async (userId: string) => {
  const getTechnician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  const technicianId = getTechnician.id;

  const result = await prisma.service.findMany({
    where: {
      technicianProfileId: technicianId,
    },
    include: { technicianProfile: true },
  });

  return result;
};

const getServiceByIdFromDB = async (serviceId: string) => {
  const result = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId,
    },
  });
  return result;
};

export const servicesService = {
  getAllServicesFromDb,
  createServiceInToDB,
  getAllServicesForSingleTechnicianFromDB,
  getServiceByIdFromDB,
};
