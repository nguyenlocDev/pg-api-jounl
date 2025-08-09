import jwt from "jsonwebtoken";
import UserInterface from "../models/interface/userInterface";

const jwtSecret = process.env.JWT_SECRET!;
const jwtAccessTokenExpiration = "1d";
const jwtRefreshTokenExpiration = "7d";

export const generateAccessToken = (payload: UserInterface) =>
  jwt.sign(payload, jwtSecret, { expiresIn: jwtAccessTokenExpiration });

export const generateRefreshToken = (payload: UserInterface) =>
  jwt.sign(payload, jwtSecret, { expiresIn: jwtRefreshTokenExpiration });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, jwtSecret);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, jwtSecret);

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
