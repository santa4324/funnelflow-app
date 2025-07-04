'use server';
/**
 * @fileOverview An AI agent for generating email subject lines based on business details.
 *
 * - generateEmailSubjectLines - A function that generates email subject lines.
 * - GenerateEmailSubjectLinesInput - The input type for the generateEmailSubjectLines function.
 * - GenerateEmailSubjectLinesOutput - The return type for the generateEmailSubjectLines function.
 */

// NOTE: AI generation is temporarily disabled to resolve build issues. This file returns mock data.

import {z} from 'zod';

const GenerateEmailSubjectLinesInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  industry: z.string().describe('The industry of the business.'),
  targetAudience: z.string().describe('The target audience of the business.'),
  offer: z.string().describe('The offer or lead magnet of the business.'),
});
export type GenerateEmailSubjectLinesInput = z.infer<typeof GenerateEmailSubjectLinesInputSchema>;

const GenerateEmailSubjectLinesOutputSchema = z.object({
  subjectLines: z
    .array(z.string())
    .describe('An array of 5 generated email subject lines.'),
});
export type GenerateEmailSubjectLinesOutput = z.infer<typeof GenerateEmailSubjectLinesOutputSchema>;

export async function generateEmailSubjectLines(
  input: GenerateEmailSubjectLinesInput
): Promise<GenerateEmailSubjectLinesOutput> {
  console.log("AI generation is mocked for email subjects. Returning static content.");
  
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    subjectLines: [
      `[Mock] Your ${input.offer}`,
      `A (mock) gift from ${input.businessName}`,
      'Static content for you',
      `Don't miss this mock offer`,
      `[DEMO] Open for a surprise`,
    ],
  };
}
