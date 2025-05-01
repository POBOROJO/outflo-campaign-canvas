import { Router } from "express";
import {
  campaignValidator,
  idValidation,
} from "../middleware/validationMiddleware";
import {
  createCampaign,
  deleteCampaign,
  updateCampaign,
  getCampaignById,
  getCampaigns,
} from "../controllers/campaignController";

const route = Router();

route.get("/get-campaign", getCampaigns);
route.get("/get-campaign/:id", idValidation, getCampaignById);
route.post("/add-campaign", campaignValidator, createCampaign);
route.put(
  "/update-campaign/:id",
  [...idValidation, ...campaignValidator],
  updateCampaign
);
route.delete("/delete-campaign/:id", idValidation, deleteCampaign);

export default route;
