// schemas/userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      fullName: z.string().min(5),
      password: z
        .string()
        .min(6)
        .regex(/[A-Z]/, "Password is required at least one uppercase letter")
        .regex(/[a-z]/, "Password is required at least one lowercase letter")
        .regex(
          /[^A-Za-z0-9]/,
          "Password is required at least one special character"
        ),
      passwordRep: z.string(),
    })
    .refine((data) => data.password === data.passwordRep, {
      message: "Passwords do not match",
      path: ["passwordRep"],
    }),
});
