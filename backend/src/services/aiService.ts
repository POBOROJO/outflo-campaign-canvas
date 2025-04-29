import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { buildOutreachPrompt } from "../utils/promptTemplate";
import { IMessageInput, IMessageResponse } from "../types";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

export const generatePersonalizedMessage = async (input: IMessageInput) => {
  const genai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  const prompt = buildOutreachPrompt(input);

  try {
    const result = await genai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const response = result.text;
    return { response };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate personalized message");
  }
};
