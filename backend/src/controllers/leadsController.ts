import { Request, Response } from "express";
import Profile from "../models/profileModel";

export const searchLeads = async (req: Request, res: Response) => {
  try {
    // Get search query from request query parameters (e.g., /api/leads/search?q=searchTerm)
    const searchQuery = req.query.q as string;

    if (!searchQuery) {
      res.status(400).json({
        success: false,
        message: "Search query parameter 'q' is required",
      });
    }

    // Basic search: find profiles where name, jobTitle, company, or location contains the search query (case-insensitive)
    const query = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { jobTitle: { $regex: searchQuery, $options: "i" } },
        { company: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
        { summary: { $regex: searchQuery, $options: "i" } }, // Added summary search
      ],
    };

    const leads = await Profile.find(query).limit(50); // Limit results for performance

    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Error searching leads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search leads",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Profile.find({}).sort({ createdAt: -1 }); // Fetch all, sort by newest first

    res.status(200).json({
      success: true,
      message: "All leads fetched successfully",
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching all leads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all leads",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
