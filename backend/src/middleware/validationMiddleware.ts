import { body, param } from "express-validator";

export const campaignValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("status")
    .optional()
    .isIn(["active", "inactive", "deleted"])
    .withMessage("Invalid status : must be one of active, inactive"),
  body("leads").isArray().withMessage("Leads must be an array of URL"),
  body("accountIDs")
    .isArray()
    .withMessage("Account IDs must be an array of account IDs"),
];

export const messageValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("job_title").notEmpty().withMessage("Job title is required"),
  body("company").notEmpty().withMessage("Company name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("summary").notEmpty().withMessage("Summary is required"),
];

export const idValidation = [
  param("id").isMongoId().withMessage("Invalid campaign ID"),
];
