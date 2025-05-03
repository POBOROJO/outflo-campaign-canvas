export interface IMessage {
  id?: string;
  name: string;
  jobTitle: string;
  company: string;
  location?: string;
  summary?: string;
  message?: string;
}