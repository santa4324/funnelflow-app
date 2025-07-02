'use server';
/**
 * @fileOverview An AI agent for generating email subject lines based on business details.
 *
 * - generateEmailSubjectLines - A function that generates email subject lines.
 * - GenerateEmailSubjectLinesInput - The input type for the generateEmailSubjectLines function.
 * - GenerateEmailSubjectLinesOutput - The return type for the generateEmailSubjectLines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
    .describe('An array of generated email subject lines.'),
});
export type GenerateEmailSubjectLinesOutput = z.infer<typeof GenerateEmailSubjectLinesOutputSchema>;

export async function generateEmailSubjectLines(
  input: GenerateEmailSubjectLinesInput
): Promise<GenerateEmailSubjectLinesOutput> {
  return generateEmailSubjectLinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmailSubjectLinesPrompt',
  input: {schema: GenerateEmailSubjectLinesInputSchema},
  output: {schema: GenerateEmailSubjectLinesOutputSchema},
  prompt: `You are an expert email marketer. Generate 5 highly engaging email subject lines based on the following business details:

Business Name: {{{businessName}}}
Industry: {{{industry}}}
Target Audience: {{{targetAudience}}}
Offer: {{{offer}}}

Subject Lines (separated by newlines):`,
});

const generateEmailSubjectLinesFlow = ai.defineFlow(
  {
    name: 'generateEmailSubjectLinesFlow',
    inputSchema: GenerateEmailSubjectLinesInputSchema,
    outputSchema: GenerateEmailSubjectLinesOutputSchema,
  },
  async input => {
    const {text} = await ai.generate({
      prompt: `Generate 5 highly engaging email subject lines based on the following business details:

Business Name: ${input.businessName}
Industry: ${input.industry}
Target Audience: ${input.targetAudience}
Offer: ${input.offer}

Subject Lines (separated by newlines):`,
      model: 'models/text-bison-001',
      config: {temperature: 0.7},
    });

    const subjectLines = text!.split('\n').map(line => line.trim());

    return {subjectLines};
  }
);
