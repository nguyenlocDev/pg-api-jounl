// middlewares/validate.ts
import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import { StatusCodes } from "http-status-codes/build/cjs";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errorsvalidation = new ApiError(
        StatusCodes.BAD_REQUEST,
        "Validation Error"
      );
      return next(errorsvalidation);
    }
    next();
  };
