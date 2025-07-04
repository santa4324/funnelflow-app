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

// NOTE: AI generation is temporarily disabled to resolve build issues. This file returns mock data.

import {z} from 'zod';

const GenerateFunnelContentInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  industry: z.string().describe('The industry of the business.'),
  targetAudience: z.string().describe('The target audience of the business.'),
  offer: z.string().describe('The offer or lead magnet of the business.'),
  websiteUrl: z.string().describe('The website URL of the business.'),
  socialUrls: z.string().describe('The social media URLs of the business.'),
});
export type GenerateFunnelContentInput = z.infer<typeof GenerateFunnelContentInputSchema>;

const EmailSchema = z.object({
  subject: z.string().describe('The subject line for the email.'),
  body: z.string().describe('The body content for the email.'),
});

const LeadCaptureFormSchema = z.object({
    headline: z.string().describe('A compelling headline for the lead capture form section.'),
    callToAction: z.string().describe('A short sentence encouraging the user to sign up.'),
    buttonText: z.string().describe('The text for the submission button (e.g., "Get Access Now").'),
});

const GenerateFunnelContentOutputSchema = z.object({
  landingPageCopy: z.string().describe('The generated landing page copy in Markdown format.'),
  leadCaptureForm: LeadCaptureFormSchema.describe('The generated content for the lead capture form.'),
  emailSequence: z
    .array(EmailSchema)
    .describe(
      'The generated email follow-up sequence (3-5 emails), each with a subject and body.'
    ),
  thankYouPage: z.string().describe('The generated thank you page content in Markdown format.'),
});
export type GenerateFunnelContentOutput = z.infer<typeof GenerateFunnelContentOutputSchema>;

export async function generateFunnelContent(input: GenerateFunnelContentInput): Promise<GenerateFunnelContentOutput> {
  console.log("AI generation is mocked. Returning static content for:", input.businessName);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    landingPageCopy: `# Welcome to ${input.businessName}!\n\nThis is **MOCK** landing page copy, created to ensure the application builds successfully. Our real AI is currently on a short break!\n\nWe see you're in the ${input.industry} industry and you're targeting ${input.targetAudience}. That's great! Our system would normally create amazing content for your offer: "${input.offer}".\n\nFor now, please enjoy this placeholder content.`,
    leadCaptureForm: {
      headline: 'Get Your Free Mock Offer!',
      callToAction: 'Sign up below to receive your pre-generated, static, but still awesome content.',
      buttonText: 'Download Now (Demo)',
    },
    emailSequence: [
      {
        subject: 'Mock Email 1: Welcome!',
        body: `Hi there,\n\nThanks for signing up! Here is your mock content related to "${input.offer}".\n\nThis is a demonstration of the email sequence feature.\n\nBest,\nThe (Mock) ${input.businessName} Team`,
      },
      {
        subject: 'Mock Email 2: Following Up',
        body: `Hi again,\n\nThis is a mock follow-up email. We hope you are enjoying the static content!\n\nIn a real scenario, this email would provide more value and guide you towards a purchase.\n\nBest,\nThe (Mock) ${input.businessName} Team`,
      }
    ],
    thankYouPage: `# Thank You!\n\nYour mock request has been received. You'll get your placeholder content in your inbox shortly.\n\nOnce our AI services are restored, you'll be able to generate real, high-converting funnels!`,
  };
}
