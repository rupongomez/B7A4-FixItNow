import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.CUSTOMER), bookingController.createBooking);
router.get("/", auth(Role.CUSTOMER), bookingController.getUsersBooking);
router.get(
  "/details/:id",
  auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER),
  bookingController.getBookingById,
);

router.patch(
  "/update-status/:bookingId",
  auth(Role.CUSTOMER),
  bookingController.updateBookingStatus,
);

export const bookingRouter = router;
