import { Request, Response, NextFunction } from "express";
import UserInterface from "../models/interface/userInterface";
import { generateAccessToken, generateRefreshToken } from "../configs/jwt";
import { otpEmailTemplate, sendMail } from "../configs/smtp";
import { db } from "../db";
import { users } from "../db/userSchemas";
import { eq } from "drizzle-orm";
import ApiError from "../utils/apiError";
import { checkpassword, hashPassword } from "../utils/hash";
import { StatusCodes } from "http-status-codes/build/cjs";
import { deleteOtp, getOtpValidation, saveOtp, verifyOtp } from "../utils/otp";

export const LoginControllers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const dataUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!(dataUser.length > 0)) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "User not found"));
    }
    const isMatch = await checkpassword(password, dataUser[0].passwordHash);
    if (isMatch) {
      const accessToken = generateAccessToken({
        email,
        fullName: dataUser[0].fullName as string,
      });
      const refreshToken = generateRefreshToken({
        email,
        fullName: dataUser[0].fullName as string,
      });
      return res.status(200).json({
        meta: {
          status: "success",
          message: "User logged in successfully",
        },
        data: {
          email,
          fullName: dataUser[0].fullName,
          accessToken,
          refreshToken,
        },
      });
    }
    return next(
      new ApiError(StatusCodes.UNAUTHORIZED, "Email or password wrong")
    );
  } catch (error) {
    next(error);
  }
};

export const RegisterControllers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, fullName, otp } = req.body;
  try {
    const emailExists = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email))
      .limit(1);

    if (emailExists.length > 0) {
      return next(
        new ApiError(StatusCodes.BAD_REQUEST, "Email already exists")
      );
    }
    const otpValid = verifyOtp(email, otp);
    if (!otpValid) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "OTP is not valid"));
    }
    deleteOtp(email);
    const passwordHash = await hashPassword(password);
    await db.insert(users).values({
      email,
      passwordHash,
      fullName,
    });
    const accessToken = generateAccessToken({ email, fullName });
    const refreshToken = generateRefreshToken({ email, fullName });
    res.status(200).json({
      meta: {
        status: "success",
        message: "User created successfully",
      },
      data: {
        email,
        fullName,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const emailExists = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email))
      .limit(1);
    if (emailExists.length > 0) {
      return next(new ApiError(400, "Email already exists"));
    }
    const otp = getOtpValidation();
    saveOtp(email, otp, 300);
    await sendMail(email, "Xac thuc tai khoan", otpEmailTemplate(otp));
    return res.status(200).json({
      meta: {
        status: "success",
        message: "OTP sent successfully",
      },
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
