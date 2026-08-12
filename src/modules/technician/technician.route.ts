import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-profile",
  auth(Role.TECHNICIAN),
  technicianController.createTechnicianProfile,
);

router.get("/", technicianController.getAllTechnician);

router.get("/profile/:id", technicianController.getTechnicianById);

router.get(
  "/me",
  auth(Role.TECHNICIAN),
  technicianController.getMyTechnicianProfile,
);
router.get(
  "/services",
  auth(Role.TECHNICIAN),
  technicianController.getServicesForLoggedInTechnician,
);

router.put(
  "/update-profile",
  auth(Role.TECHNICIAN),
  technicianController.updateTechnicianProfile,
);

router.get(
  "/bookings",
  auth(Role.TECHNICIAN),
  technicianController.getTechniciansBookings,
);

router.patch(
  "/booking/:id",
  auth(Role.TECHNICIAN),
  technicianController.updateBookingStatus,
);

export const technicianRouter = router;
