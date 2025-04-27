
export type CampaignStatus = 'active' | 'inactive' | 'deleted';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  leads?: string[];
  accountIds?: string[];
  createdAt: string;
  updatedAt: string;
}
