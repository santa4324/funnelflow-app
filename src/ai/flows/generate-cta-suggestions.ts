'use server';

/**
 * @fileOverview An AI agent that suggests Call To Actions (CTAs) based on business details.
 *
 * - generateCTASuggestions - A function that handles the generation of CTA suggestions.
 * - GenerateCTASuggestionsInput - The input type for the generateCTASuggestions function.
 * - GenerateCTASuggestionsOutput - The return type for the generateCTASuggestions function.
 */

// NOTE: AI generation is temporarily disabled to resolve build issues. This file returns mock data.

import {z} from 'zod';

const GenerateCTASuggestionsInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  industry: z.string().describe('The industry or niche of the business.'),
  targetAudience: z.string().describe('The target audience of the business.'),
  offer: z.string().describe('The main offer or lead magnet of the business.'),
});
export type GenerateCTASuggestionsInput = z.infer<typeof GenerateCTASuggestionsInputSchema>;

const GenerateCTASuggestionsOutputSchema = z.object({
  ctaSuggestions: z.array(z.string()).describe('An array of suggested CTAs.'),
});
export type GenerateCTASuggestionsOutput = z.infer<typeof GenerateCTASuggestionsOutputSchema>;

export async function generateCTASuggestions(
  input: GenerateCTASuggestionsInput
): Promise<GenerateCTASuggestionsOutput> {
  console.log("AI generation is mocked for CTA suggestions. Returning static content.");
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ctaSuggestions: [
      'Get Your Mock Offer',
      'Download the Static Guide',
      'Start Your Demo Trial',
      'Claim Your Mock Discount',
      'Join the Waitlist (Mock)',
    ],
  };
}
