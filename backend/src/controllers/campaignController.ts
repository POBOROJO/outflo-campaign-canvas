import { Request, Response } from "express";
import Campaign from "../models/campaignModel";

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find({ status: { $ne: "deleted" } });
    res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch campaigns",
      error: error,
    });
  }
};
