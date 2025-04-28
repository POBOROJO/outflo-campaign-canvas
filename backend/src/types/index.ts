export interface ICampaign {
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'deleted';
    leads: string[];
    accountIDs: string[];
}

export interface IMessageInput {
    name: string;
    job_title:string,
    company_name:string,
    location:string,
    summary:string,
}

export interface IMessageResponse{
    message:string,
}