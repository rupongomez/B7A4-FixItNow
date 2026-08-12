import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";

const router = Router();

router.post("/", auth(Role.CUSTOMER), reviewController.createReview);
router.get("/booking/:bookingId", reviewController.getReviewGivenByCustomer);
router.get("/all", reviewController.getAllReviews);
router.get(
  "/user",
  auth(Role.CUSTOMER),
  reviewController.getAllReviewsByLoggedInUser,
);

router.get(
  "/technician/:technicianId",
  reviewController.getAllReviewsForTechnician,
);

export const reviewRouter = router;
