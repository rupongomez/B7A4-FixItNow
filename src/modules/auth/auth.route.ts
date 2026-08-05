import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/browser";

const router = Router();

router.post("/login", authController.loginUser);
router.get(
  "/refresh-token",

  authController.getNewAccessToken,
);

export const authRouter = router;
