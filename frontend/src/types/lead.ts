export interface ILeadProfile {
  _id: string; // MongoDB adds this automatically
  id: string; // Original LinkedIn ID
  name: string;
  handle: string;
  jobTitle: string;
  company: string;
  location: string;
  profileUrl: string;
  summary: string;
  imageUrl: string;
  createdAt?: string; // Timestamps from Mongoose
  updatedAt?: string;
}
