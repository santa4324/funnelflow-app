'use server';

/**
 * @fileOverview Headline generation AI agent.
 *
 * - generateHeadlineIdeas - A function that handles the headline generation process.
 * - GenerateHeadlineIdeasInput - The input type for the generateHeadlineIdeas function.
 * - GenerateHeadlineIdeasOutput - The return type for the generateHeadlineIdeas function.
 */

// NOTE: AI generation is temporarily disabled to resolve build issues. This file returns mock data.

import {z} from 'zod';

const GenerateHeadlineIdeasInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  industry: z.string().describe('The industry of the business.'),
  targetAudience: z.string().describe('The target audience of the business.'),
  offer: z.string().describe('The offer or lead magnet of the business.'),
});
export type GenerateHeadlineIdeasInput = z.infer<typeof GenerateHeadlineIdeasInputSchema>;

const GenerateHeadlineIdeasOutputSchema = z.object({
  headlineIdeas: z.array(z.string()).describe('An array of headline ideas.'),
});
export type GenerateHeadlineIdeasOutput = z.infer<typeof GenerateHeadlineIdeasOutputSchema>;

export async function generateHeadlineIdeas(input: GenerateHeadlineIdeasInput): Promise<GenerateHeadlineIdeasOutput> {
  console.log("AI generation is mocked for headline ideas. Returning static content.");
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    headlineIdeas: [
      `The Ultimate Mock Guide to ${input.industry}`,
      `How ${input.targetAudience} Can Benefit from Mock Data`,
      `A Static Headline for ${input.businessName}`,
      `[DEMO] Your New Favorite Headline`,
      `Unlock Mock Potential Today`,
    ],
  };
}
