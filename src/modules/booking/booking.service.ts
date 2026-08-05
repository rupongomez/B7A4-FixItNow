import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IBooking } from "./booking.interface";

const createBookingIntoDb = async (payload: IBooking, customerId: string) => {
  const {
    technicianIdToBook,
    serviceId,
    availabilitySlotId,
    bookingTime,
    customerAddress,
    note,
  } = payload;

  const isBookingExist = await prisma.booking.findFirst({
    where: {
      availabilitySlotId: availabilitySlotId,
      technicianId: technicianIdToBook,
    },
  });

  if (isBookingExist) {
    throw new Error("This technician is not available at this given time");
  }

  const getBookingPrice = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId,
    },
  });

  const createBooking = await prisma.booking.create({
    data: {
      customerId,
      availabilitySlotId: availabilitySlotId,
      technicianId: technicianIdToBook,
      bookingTime,
      customerAddress,
      note,
      totalPrice: getBookingPrice.price,
      serviceId,
    },
  });

  return createBooking;
};

const getUsersBookingFromDb = async (customerId: string) => {
  const getUsersBooking = await prisma.booking.findMany({
    where: {
      customerId,
    },
  });

  if (!getUsersBooking) {
    throw new Error("User has not booked any service yet");
  }

  return getUsersBooking;
};

const getBookingByIdFromDb = async (bookingId: string) => {
  const bookingData = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
    },
    include: {
      technician: true,
    },
  });

  return bookingData;
};

const updateBookingStatusInDb = async (
  bookingId: string,
  status: string,
  customerId: string,
) => {
  const updateBookingStatus = await prisma.booking.update({
    where: {
      id: bookingId,
      customerId,
    },
    data: {
      status: status as BookingStatus,
    },
  });

  return updateBookingStatus;
};

export const bookingService = {
  createBookingIntoDb,
  getUsersBookingFromDb,
  getBookingByIdFromDb,
  updateBookingStatusInDb,
};
