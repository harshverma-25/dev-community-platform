import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../validators/auth.validator";
import { loginUser, signupUser } from "../services/auth.service";

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

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    res.status(200).json({
      message: "Login successful",
      data: result
    });

  } catch (error: any) {
    res.status(400).json({
      error: error.message
    });
  }
};