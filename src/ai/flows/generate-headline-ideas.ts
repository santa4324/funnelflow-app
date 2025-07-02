'use server';

/**
 * @fileOverview Headline generation AI agent.
 *
 * - generateHeadlineIdeas - A function that handles the headline generation process.
 * - GenerateHeadlineIdeasInput - The input type for the generateHeadlineIdeas function.
 * - GenerateHeadlineIdeasOutput - The return type for the generateHeadlineIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return generateHeadlineIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeadlineIdeasPrompt',
  input: {schema: GenerateHeadlineIdeasInputSchema},
  output: {schema: GenerateHeadlineIdeasOutputSchema},
  prompt: `You are a marketing expert specializing in generating compelling headlines.

  Generate 5 headline ideas based on the following business details:

  Business Name: {{{businessName}}}
  Industry: {{{industry}}}
  Target Audience: {{{targetAudience}}}
  Offer: {{{offer}}}

  Return the headline ideas as an array of strings.
  `,
});

const generateHeadlineIdeasFlow = ai.defineFlow(
  {
    name: 'generateHeadlineIdeasFlow',
    inputSchema: GenerateHeadlineIdeasInputSchema,
    outputSchema: GenerateHeadlineIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
