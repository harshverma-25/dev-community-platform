import { Request, Response } from "express";
import { signupSchema } from "../validators/auth.validator";
import { signupUser } from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    // validate request body using Zod
    const validatedData = signupSchema.parse(req.body);

    // call service layer
    const result = await signupUser(validatedData);

    res.status(201).json({
      message: "User created successfully",
      data: result
    });

  } catch (error: any) {
    res.status(400).json({
      error: error.message
    });
  }
};