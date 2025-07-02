'use server';

/**
 * @fileOverview An AI agent that suggests Call To Actions (CTAs) based on business details.
 *
 * - generateCTASuggestions - A function that handles the generation of CTA suggestions.
 * - GenerateCTASuggestionsInput - The input type for the generateCTASuggestions function.
 * - GenerateCTASuggestionsOutput - The return type for the generateCTASuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return generateCTASuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCTASuggestionsPrompt',
  input: {schema: GenerateCTASuggestionsInputSchema},
  output: {schema: GenerateCTASuggestionsOutputSchema},
  prompt: `You are a marketing expert specializing in creating effective Call To Actions (CTAs).

  Based on the following business details, generate 5 relevant and engaging CTA suggestions to increase conversions:

  Business Name: {{{businessName}}}
  Industry: {{{industry}}}
  Target Audience: {{{targetAudience}}}
  Offer: {{{offer}}}

  Ensure the CTAs are concise, action-oriented, and tailored to the business's specific context.
  `,
});

const generateCTASuggestionsFlow = ai.defineFlow(
  {
    name: 'generateCTASuggestionsFlow',
    inputSchema: GenerateCTASuggestionsInputSchema,
    outputSchema: GenerateCTASuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
