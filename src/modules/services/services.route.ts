import { Router } from "express";
import { serviceController } from "./services.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.TECHNICIAN), serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getAllServicesForSingleTechnician);
router.get(
  "/details/:id",

  serviceController.getServiceById,
);

export const serviceRouter = router;
