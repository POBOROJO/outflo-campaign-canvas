import { Router } from "express";
import { generateMessage } from "../controllers/messageController";
import { messageValidator } from "../middleware/validationMiddleware";
const route = Router();

route.post("/generate-message", messageValidator, generateMessage);

export default route;
