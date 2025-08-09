import { validate } from "../middlewares/validate";
import {
  LoginControllers,
  RegisterControllers,
  sendOtp,
} from "../controllers/userControllers";
import express from "express";
import { userSchema } from "../schemas/userSchemas";
const router = express.Router();

router.post("/login", LoginControllers);
router.post("/register", validate(userSchema), RegisterControllers);
router.post("/send-otp", sendOtp);

export default router;
