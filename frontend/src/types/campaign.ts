export type CampaignStatus = "active" | "inactive" | "deleted";

export interface ICampaign {
  _id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  leads: string[];
  accountIDs: string[];
}
