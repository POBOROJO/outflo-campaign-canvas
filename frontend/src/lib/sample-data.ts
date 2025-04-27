
import { Campaign } from "@/types/campaign";

// Sample campaigns data
export const sampleCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q2 Outreach Campaign",
    description: "Target high-level executives in the tech industry for our Q2 product launch",
    status: "active",
    leads: ["john.doe@example.com", "jane.smith@example.com", "https://linkedin.com/in/mike-wilson"],
    accountIds: ["twitter:12345", "linkedin:67890"],
    createdAt: "2025-02-01T08:00:00Z",
    updatedAt: "2025-04-15T10:30:00Z"
  },
  {
    id: "2",
    name: "SaaS Decision Makers",
    description: "Connect with decision makers in the SaaS industry to promote our enterprise solution",
    status: "active",
    leads: ["sarah.johnson@example.com", "https://linkedin.com/in/david-brown", "michael.lee@example.com"],
    accountIds: ["linkedin:12345", "twitter:54321"],
    createdAt: "2025-03-10T09:15:00Z",
    updatedAt: "2025-04-20T14:45:00Z"
  },
  {
    id: "3",
    name: "Marketing Leaders",
    description: "Reach out to marketing leaders to showcase our analytics platform",
    status: "inactive",
    leads: ["emma.davis@example.com", "https://linkedin.com/in/robert-miller"],
    accountIds: ["linkedin:98765", "twitter:45678"],
    createdAt: "2025-01-20T11:30:00Z",
    updatedAt: "2025-03-05T16:00:00Z"
  },
  {
    id: "4",
    name: "Previous Conference Attendees",
    description: "Follow up with attendees from the 2024 Tech Conference",
    status: "deleted",
    leads: ["william.wilson@example.com", "https://linkedin.com/in/olivia-jones"],
    accountIds: ["linkedin:24680", "twitter:13579"],
    createdAt: "2024-11-05T10:00:00Z",
    updatedAt: "2025-01-15T09:20:00Z"
  }
];

// Function to generate a unique ID for new campaigns
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Function to get the current date in ISO format
export function getCurrentDate(): string {
  return new Date().toISOString();
}
