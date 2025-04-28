import { Schema, model } from "mongoose";

const campaignSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    leads: [
      {
        type: String,
      },
    ],
    accountIDs: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Campaign", campaignSchema);
