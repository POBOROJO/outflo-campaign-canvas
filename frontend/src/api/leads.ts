import axios from "axios";
import { ILeadProfile } from "../types/lead";

const API_BASE_URL =
  import.meta.env.VITE_API_URL_LEADS;

interface SearchLeadsResponse {
  success: boolean;
  message: string;
  count: number;
  data: ILeadProfile[];
}

/**
 * Searches for leads based on a query string.
 * @param query - The search term.
 * @returns A promise resolving to the search results.
 */
export const searchLeads = async (
  query: string
): Promise<SearchLeadsResponse> => {
  if (!query) {
    // Return empty results if query is empty to avoid unnecessary API calls
    return {
      success: true,
      message: "Leads fetched successfully",
      count: 0,
      data: [],
    };
  }
  try {
    const response = await axios.get<SearchLeadsResponse>(
      `${API_BASE_URL}/search`,
      {
        params: { q: query },
        withCredentials: true, // Include this if your backend requires authentication/cookies
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching leads:", error);
    // You might want to throw a more specific error or return a standardized error structure
    throw new Error("Failed to search leads");
  }
};

/**
 * Fetches all saved leads.
 * @returns A promise resolving to the list of all leads.
 */
export const getAllLeads = async (): Promise<SearchLeadsResponse> => {
  try {
    const response = await axios.get<SearchLeadsResponse>(
      `${API_BASE_URL}/get-leads`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all leads:", error);
    throw new Error("Failed to fetch all leads");
  }
};
