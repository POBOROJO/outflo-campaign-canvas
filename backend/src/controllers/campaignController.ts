import { Request, Response } from "express";
import Campaign from "../models/campaignModel";
import { validationResult } from "express-validator";

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
      res.status(404).json({
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

export const createCampaign = async (req: Request, res: Response) => {
  //here we are validating the request body using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    });
  }
  try {
    // Check for duplicate campaign by name
    const existingCampaign = await Campaign.findOne({
      name: req.body.name,
      status: { $ne: "deleted" },
    });
    if (existingCampaign) {
      res.status(409).json({
        success: false,
        message: "A campaign with this name already exists.",
      });
    }
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create campaign",
      error: error,
    });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    });
  }
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByIdAndUpdate(id, req.body, {
      new: true, //this is used to return the updated campaign in the response
    });

    if (!campaign || campaign.status === "deleted") {
      res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update campaign",
      error: error,
    });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { status: "deleted" },
      { new: true }
    );
    if (!campaign) {
      res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete campaign",
      error: error,
    });
  }
};
