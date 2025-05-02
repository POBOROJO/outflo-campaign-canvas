export interface IMessage {
  _id?: string;
  name: string;
  jobTitle: string;
  company: string;
  location?: string;
  summary?: string;
}