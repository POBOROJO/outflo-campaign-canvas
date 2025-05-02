import { IMessage } from "@/types/message";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL_MESSAGES = process.env.VITE_API_URL_MESSAGES;


export const generateMessage = async (message: IMessage): Promise<IMessage> => {
  try {
    const response = await axios.post(
      `${API_URL_MESSAGES}/generate-message`,
      message
    );
    return response.data;
  } catch (error) {
    console.error("Error generating message", error);
    throw error;
  }
};
