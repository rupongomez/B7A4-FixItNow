import { Router } from "express";
import { availabilityController } from "./availability.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth(Role.TECHNICIAN),
  availabilityController.createAvailability,
);

router.put(
  "/",
  auth(Role.TECHNICIAN),
  availabilityController.updateAvailability,
);

router.get("/:id", availabilityController.getAvailabilityById);

export const availabilityRouter = router;
