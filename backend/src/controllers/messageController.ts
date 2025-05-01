import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { generatePersonalizedMessage } from "../services/aiService";

export const generateMessage = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const message = await generatePersonalizedMessage(req.body);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate message" });
  }
};
