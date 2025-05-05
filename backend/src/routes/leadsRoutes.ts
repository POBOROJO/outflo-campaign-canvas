import { Router } from "express";
import { searchLeads, getAllLeads } from "../controllers/leadsController";

const route = Router();

// Define the search route: GET /api/v1/leads/search?q=<search_term>
route.get("/search", searchLeads);

// Define the route to get all leads: GET /api/v1/leads
route.get("/get-leads", getAllLeads);

export default route;
