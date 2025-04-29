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

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);
    if (!campaign || campaign.status === "deleted") {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Campaign fetched successfully",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch campaign",
      error: error,
    });
  }
};
