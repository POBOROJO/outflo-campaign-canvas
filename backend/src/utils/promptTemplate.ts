import { IMessageInput } from "../types";

export const buildOutreachPrompt = (input: IMessageInput): string => {
  return `Generate a concise and professional LinkedIn outreach message for ${input.name}, who is a ${input.job_title} at ${input.company_name} in ${input.location}. Their background summary is: "${input.summary}". The message should introduce and promote OutFlo — a tool that helps automate outreach to drive more meetings and increase sales. Aim to personalize the message and make it feel conversational.

Return only the message as plain text, without any JSON or formatting.`;
};
