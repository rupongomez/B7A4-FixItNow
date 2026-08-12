import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router();

router.post("/categories", auth(Role.ADMIN), adminController.createCategory);
router.get("/categories", adminController.getAllCategory);
router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);
router.get("/bookings", auth(Role.ADMIN), adminController.getAllBookings);
router.delete("/delete/:id", auth(Role.ADMIN), adminController.deleteService);

export const adminRouter = router;
