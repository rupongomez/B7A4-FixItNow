import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReviewIntoDB = async (userId: string, payload: IReview) => {
  const { bookingId, comment, rating, technicianProfileId } = payload;

  const transactionResult = await prisma.$transaction(async (tx) => {
    const didThisCustomerBook = await tx.booking.findFirst({
      where: {
        id: bookingId,
        technicianId: technicianProfileId,
        customerId: userId,
      },
    });

    if (!didThisCustomerBook) {
      throw new Error("Not valid reviewer");
    }

    if (didThisCustomerBook.status !== "COMPLETED") {
      throw new Error("You can review only after getting service");
    }

    if (rating > 5) {
      throw new Error("Rating can not be more than 5");
    }
    const isReviewExist = await tx.review.findFirst({
      where: {
        bookingId,
      },
    });

    if (isReviewExist) {
      throw new Error("Review for this booking already exist");
    }

    const postReview = await tx.review.create({
      data: {
        bookingId,
        comment,
        rating,
        technicianProfileId,
        customerId: userId,
      },
    });

    const agg = await tx.review.aggregate({
      where: { technicianProfileId },
      _avg: { rating: true },
    });

    await tx.technicianProfile.update({
      where: { id: technicianProfileId },
      data: { averageRating: agg._avg.rating ?? 0 },
    });

    return postReview;
  });

  return transactionResult;
};

const getReviewGivenOnBookingId = async (bookingId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      bookingId,
    },
  });

  return reviews;
};

const getAllReviewsFromDb = async () => {
  const reviews = await prisma.review.findMany({
    include: {
      customer: true,
    },
  });

  return reviews;
};

const getAllReviewsByLoggedInUserFromDb = async (id: string) => {
  const result = await prisma.review.findMany({
    where: { customerId: id },
  });

  return result;
};

const getAllReviewsForTechnicianFromDb = async (technicianId: string) => {
  const result = await prisma.review.findMany({
    where: { technicianProfileId: technicianId },
  });

  const averageRating = await prisma.technicianProfile.findFirst({
    where: {
      id: technicianId,
    },
  });

  const totalReviews = await prisma.review.count({
    where: { technicianProfileId: technicianId },
  });

  return { result, averageRating, totalReviews };
};

export const reviewService = {
  createReviewIntoDB,
  getReviewGivenOnBookingId,
  getAllReviewsFromDb,
  getAllReviewsByLoggedInUserFromDb,
  getAllReviewsForTechnicianFromDb,
};
