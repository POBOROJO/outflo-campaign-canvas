import { IMessage } from "@/types/message";
import axios from "axios";

const API_URL_MESSAGES =
  import.meta.env.VITE_API_URL_MESSAGES ||
  "http://localhost:8000/api/v1/messages";

export const generateMessage = async (message: IMessage): Promise<string> => {
  try {
    console.log("Sending request to:", `${API_URL_MESSAGES}/generate-message`);
    const response = await axios.post(
      `${API_URL_MESSAGES}/generate-message`,
      message
    );
    // Assuming the API returns an object with a message property
    // If it returns the message directly as a string, use: return response.data;
    return response.data.message || response.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      console.error(
        "Network error: Backend server may not be running or accessible at",
        API_URL_MESSAGES
      );
      throw new Error(
        "Cannot connect to the server. Please make sure the backend is running."
      );
    }
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `Server error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else {
      console.error("Error generating message", error);
      throw error;
    }
  }
};
