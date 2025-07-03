'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating marketing funnel content.
 *
 * The flow takes business details as input and generates landing page copy, lead capture form, email sequence, and a thank you page.
 * @fileOverview
 *
 * - generateFunnelContent - A function that handles the funnel generation process.
 * - GenerateFunnelContentInput - The input type for the generateFunnelContent function.
 * - GenerateFunnelContentOutput - The return type for the generateFunnelContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFunnelContentInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  industry: z.string().describe('The industry of the business.'),
  targetAudience: z.string().describe('The target audience of the business.'),
  offer: z.string().describe('The offer or lead magnet of the business.'),
  websiteUrl: z.string().describe('The website URL of the business.'),
  socialUrls: z.string().describe('The social media URLs of the business.'),
});
export type GenerateFunnelContentInput = z.infer<typeof GenerateFunnelContentInputSchema>;

const GenerateFunnelContentOutputSchema = z.object({
  landingPageCopy: z.string().describe('The generated landing page copy.'),
  leadCaptureForm: z.string().describe('The generated lead capture form.'),
  emailSequence: z.array(z.string()).describe('The generated email follow-up sequence (3-5 emails).'),
  thankYouPage: z.string().describe('The generated thank you page content.'),
});
export type GenerateFunnelContentOutput = z.infer<typeof GenerateFunnelContentOutputSchema>;

export async function generateFunnelContent(input: GenerateFunnelContentInput): Promise<GenerateFunnelContentOutput> {
  return generateFunnelContentFlow(input);
}

const generateFunnelContentPrompt = ai.definePrompt({
  name: 'generateFunnelContentPrompt',
  input: {schema: GenerateFunnelContentInputSchema},
  output: {schema: GenerateFunnelContentOutputSchema},
  prompt: `You are an expert marketing funnel generator. Given the following business details, generate compelling landing page copy, a lead capture form, a 3-email follow-up sequence, and thank you page content to capture leads and convert them into customers.

Business Name: {{{businessName}}}
Industry: {{{industry}}}
Target Audience: {{{targetAudience}}}
Offer: {{{offer}}}
Website URL: {{{websiteUrl}}}
Social URLs: {{{socialUrls}}}


Instructions:
1.  Landing Page Copy: Create persuasive and engaging copy that highlights the benefits of the offer and encourages visitors to sign up.
2.  Lead Capture Form: Design a simple form to collect name and email address. Ensure it is concise and user-friendly.
3.  Email Follow-up Sequence: Write 3-5 emails to nurture leads. The first email should deliver the promised offer. Subsequent emails should build trust, provide value, and promote the core product/service.
4.  Thank You Page: Craft a thank you page that confirms the user's subscription and provides clear next steps.

Ensure the output is well-structured and ready for immediate use.

Output:
Landing Page Copy:
{{landingPageCopy}}

Lead Capture Form:
{{leadCaptureForm}}

Email Sequence:
{{#each emailSequence}}
{{{this}}}
{{/each}}

Thank You Page:
{{thankYouPage}}`,
});

const generateFunnelContentFlow = ai.defineFlow(
  {
    name: 'generateFunnelContentFlow',
    inputSchema: GenerateFunnelContentInputSchema,
    outputSchema: GenerateFunnelContentOutputSchema,
  },
  async input => {
    const {output} = await generateFunnelContentPrompt(input);
    return output!;
  }
);
