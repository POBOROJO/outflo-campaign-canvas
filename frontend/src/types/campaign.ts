export type CampaignStatus = 'active' | 'inactive' | 'deleted';

export interface ICampaign {
  id?: string;
  name: string;
  description: string;
  status: CampaignStatus;
  leads: string[];
  accountIDs: string[];
}
