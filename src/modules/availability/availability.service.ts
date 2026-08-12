import { prisma } from "../../lib/prisma";
import { IAvailability } from "./availability.interface";

const createAvailabilityIntoDb = async (
  payload: IAvailability,
  userId: string,
) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const { date, endTime, isBooked, startTime } = payload;
    const getTechnicianProfile = await tx.technicianProfile.findUniqueOrThrow({
      where: {
        userId,
      },
    });

    const isAvailabilityExist = await tx.availability.findFirst({
      where: { technicianProfileId: getTechnicianProfile.id },
    });

    if (isAvailabilityExist) {
      throw new Error("You have already set your available slots");
    }

    const createAvailability = await tx.availability.create({
      data: {
        technicianProfileId: getTechnicianProfile.id,
        date,
        endTime,
        isBooked,
        startTime,
      },
    });

    return createAvailability;
  });
  return transactionResult;
};

const updateAvailabilityIntoDb = async (payload: IAvailability, id: string) => {
  const { date, endTime, isBooked, startTime } = payload;
  const updateAvailability = await prisma.availability.update({
    where: {
      id,
    },
    data: {
      date,
      endTime,
      isBooked,
      startTime,
    },
  });

  return updateAvailability;
};

const getAvailabilityById = async (id: string) => {
  if (!id) {
    throw new Error("Technician profile id is required");
  }

  const getAvailability = await prisma.availability.findMany({
    where: { technicianProfileId: id },
  });

  return getAvailability;
};

export const availabilityService = {
  createAvailabilityIntoDb,
  updateAvailabilityIntoDb,
  getAvailabilityById,
};
