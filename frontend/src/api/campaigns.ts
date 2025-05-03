import { ICampaign } from "@/types/campaign";
import axios from "axios";

const API_URL_CAMPAIGNS =
  import.meta.env.VITE_API_URL_CAMPAIGNS ||
  "http://localhost:8000/api/v1/campaigns";

export const getCampaigns = async (): Promise<ICampaign[]> => {
  try {
    const response = await axios.get(`${API_URL_CAMPAIGNS}/get-campaign`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching campaigns", error);
    throw error;
  }
};
export const getCampaignById = async (id: string): Promise<ICampaign> => {
  try {
    const response = await axios.get(`${API_URL_CAMPAIGNS}/get-campaign/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign ${id}:`, error);
    throw error;
  }
};

export const addCampaign = async (campaign: ICampaign): Promise<ICampaign> => {
  try {
    const response = await axios.post(
      `${API_URL_CAMPAIGNS}/add-campaign`,
      campaign
    );
    return response.data;
  } catch (error) {
    console.error("Error adding campaign", error);
    throw error;
  }
};

export const updateCampaign = async (
  id: string,
  campaign: ICampaign
): Promise<ICampaign> => {
  try {
    const response = await axios.put(
      `${API_URL_CAMPAIGNS}/update-campaign/${id}`,
      campaign
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating campaign ${id}:`, error);
    throw error;
  }
};

export const deleteCampaign = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL_CAMPAIGNS}/delete-campaign/${id}`);
  } catch (error) {
    console.error(`Error deleting campaign ${id}`, error);
    throw error;
  }
};
