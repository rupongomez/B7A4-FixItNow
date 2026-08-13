import { TechnicianProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IStatus, ITechnician, ITechnicianQuery } from "./technician.interface";

const createTechnicianProfileIntoDb = async (
  payload: ITechnician,
  userId: string,
) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const isUserExist = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const isTechnicianProfileExist = await prisma.technicianProfile.findUnique({
      where: {
        userId,
      },
    });

    if (isTechnicianProfileExist) {
      throw new Error("Technician profile already exist");
    }

    const { location, name, id } = isUserExist;
    const { bio, experience, hourlyRate, service } = payload;

    if (!service) {
      throw new Error("Please insert a service to create profile");
    }

    const createProfile = await tx.technicianProfile.create({
      data: {
        userId: id,
        bio,
        experience,
        hourlyRate,
        location,
      },
    });

    return createProfile;
  });

  return transactionResult;
};

const getAllTechnicianFromDb = async (query: ITechnicianQuery) => {
  const limit = query.limit ? Number(query.limit) : 6;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: TechnicianProfileWhereInput[] = [];
  if (query.searchTerms) {
    andConditions.push({
      OR: [
        { bio: { contains: query.searchTerms, mode: "insensitive" } },
        { location: { contains: query.searchTerms, mode: "insensitive" } },
      ],
    });
  }
  if (query.minAverageRating) {
    andConditions.push({
      averageRating: { gte: Number(query.minAverageRating) },
    });
  }

  if (query.hourlyRate) {
    andConditions.push({
      hourlyRate: Number(query.hourlyRate),
    });
  }

  if (query.isAvailable !== undefined) {
    const isAvailableParse = String(query.isAvailable).toLowerCase() === "true";
    andConditions.push({
      isAvailable: isAvailableParse,
    });
  }

  if (query.location) {
    andConditions.push({
      location: query.location,
    });
  }

  if (query.minCompletedJobs) {
    andConditions.push({
      completedJobs: { gte: Number(query.minCompletedJobs) },
    });
  }

  const result = await prisma.technicianProfile.findMany({
    where: {
      AND: andConditions,
    },
    include: {
      user: {
        omit: { password: true },
      },
    },
    take: limit,
    skip: skip,

    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalTechnicians = await prisma.technicianProfile.count();

  return { result, totalTechnicians };
};

const getTechnicianByIdFromDb = async (userId: string) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
    include: {
      reviews: true,
    },
  });

  if (!result) {
    throw new Error("Technician Profile not found!");
  }

  return result;
};

const updateTechnicianProfileIntoDb = async (
  payload: ITechnician,
  id: string,
) => {
  const { bio, location, experience, hourlyRate } = payload;
  const updatedProfile = await prisma.technicianProfile.update({
    where: {
      userId: id,
    },
    data: {
      userId: id,
      bio,
      experience,
      hourlyRate,
      location,
    },
  });

  return updatedProfile;
};

const getMyTechnicianProfileFromDb = async (userId: string) => {
  const myTechnicianProfile = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
    include: {
      availability: true,
    },
  });

  return myTechnicianProfile;
};

const getTechniciansBookings = async (userId: string) => {
  const getTechnician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  const bookings = await prisma.booking.findMany({
    where: {
      technicianId: getTechnician.id,
    },
  });

  if (!bookings) {
    throw new Error("No booking found for this technician");
  }

  return bookings;
};

const updateBookingStatusInDb = async (bookingId: string, payload: IStatus) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const status = payload.status.toUpperCase();
    if (
      status !== "ACCEPTED" &&
      status !== "DECLINED" &&
      status !== "IN_PROGRESS" &&
      status !== "COMPLETED"
    ) {
      throw new Error(
        "Status type not allowed. Please select accept or decline",
      );
    }

    const updateStatus = await tx.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status,
      },
    });
    const updateAvailabilityStatus = await tx.availability.update({
      where: {
        id: updateStatus.availabilitySlotId,
      },
      data: {
        isBooked: true,
      },
    });
    return { updateStatus, updateAvailabilityStatus };
  });
  return transactionResult;
};

const getAllServicesForLoggedInTechnicianFromDb = async (userId: string) => {
  const technician = await prisma.technicianProfile.findFirst({
    where: { userId },
  });

  if (!technician) {
    throw new Error("Technician not found");
  }

  const result = await prisma.service.findMany({
    where: { technicianProfileId: technician.id },
  });

  return result;
};

export const technicianService = {
  createTechnicianProfileIntoDb,
  getAllTechnicianFromDb,
  getTechnicianByIdFromDb,
  updateTechnicianProfileIntoDb,
  getMyTechnicianProfileFromDb,
  getTechniciansBookings,
  updateBookingStatusInDb,
  getAllServicesForLoggedInTechnicianFromDb,
};
