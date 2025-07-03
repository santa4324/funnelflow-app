'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { generateFunnelContent } from '@/ai/flows/generate-funnel-content';
import { saveFunnel } from '@/lib/firestore';
import type { GenerateFunnelContentOutput } from '@/ai/flows/generate-funnel-content';
import type { BusinessInfo } from '@/lib/types';
import { Bot, Loader2, FileText, Mail, PartyPopper, AlertCircle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type FunnelGeneratorProps = {
  businessInfo: BusinessInfo | null;
  onContentGenerated: (content: GenerateFunnelContentOutput) => void;
  generatedContent: GenerateFunnelContentOutput | null;
};

export function FunnelGenerator({ businessInfo, onContentGenerated, generatedContent }: FunnelGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const handleGenerateClick = async () => {
    if (!businessInfo) {
      toast({
        variant: 'destructive',
        title: 'Business Info Missing',
        description: 'Please complete the Business Setup form first.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const content = await generateFunnelContent({
        ...businessInfo,
        websiteUrl: businessInfo.websiteUrl || '',
        socialUrls: businessInfo.socialUrls || '',
      });
      onContentGenerated(content);
      toast({
        title: 'Funnel Generated!',
        description: 'Your new marketing funnel content is ready.',
      });
    } catch (error) {
      console.error('Error generating funnel content:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFunnel = async () => {
    if (!user || !businessInfo || !generatedContent) {
      toast({ variant: 'destructive', title: 'Error', description: 'Missing required information to save.' });
      return;
    }
    setIsSaving(true);
    try {
      const newFunnelId = await saveFunnel(user.uid, businessInfo, generatedContent);
      toast({
        title: 'Funnel Saved Successfully!',
        description: 'Redirecting to your new funnel...',
      });
      router.push(`/dashboard/funnels/${newFunnelId}`);
    } catch (error) {
      console.error('Error saving funnel:', error);
      toast({ variant: 'destructive', title: 'Save Failed', description: 'Could not save the funnel. Please try again.' });
      setIsSaving(false);
    }
    // No need to set isSaving to false in the success case because we are navigating away.
  };

  if (!businessInfo) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">AI Funnel Generator</CardTitle>
                <CardDescription>
                    Generate your complete marketing funnel with a single click.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Setup Required</AlertTitle>
                    <AlertDescription>
                        Please fill out the Business Setup form on the previous tab before generating a funnel.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI Funnel Generator</CardTitle>
        <CardDescription>
          Your business info is loaded. Click the button below to generate your marketing funnel.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
            <Button size="lg" onClick={handleGenerateClick} disabled={isLoading} className="gap-2">
            {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <Bot className="h-5 w-5" />
            )}
            Generate My Funnel
            </Button>
        </div>

        {isLoading && (
            <div className="text-center space-y-2">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your content... this may take a moment.</p>
            </div>
        )}

        {generatedContent && !isLoading && (
          <div className="pt-6">
            <h3 className="text-2xl font-headline font-semibold text-center mb-4">Your Generated Funnel</h3>
            
            <div className="mt-6 text-center">
                <Button onClick={handleSaveFunnel} disabled={isSaving} className="gap-2">
                  {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                  Save Funnel
                </Button>
            </div>

            <Accordion type="single" collapsible className="w-full mt-6" defaultValue="landing-page">
              <AccordionItem value="landing-page">
                <AccordionTrigger className="text-lg font-semibold"><FileText className="h-5 w-5 mr-2 text-primary" /> Landing Page Copy</AccordionTrigger>
                <AccordionContent className="prose max-w-none p-4 bg-muted/50 rounded-md whitespace-pre-wrap font-body">
                  {generatedContent.landingPageCopy}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="email-sequence">
                <AccordionTrigger className="text-lg font-semibold"><Mail className="h-5 w-5 mr-2 text-primary" /> Email Sequence</AccordionTrigger>
                <AccordionContent>
                    <Accordion type="multiple" className="w-full space-y-2">
                        {generatedContent.emailSequence.map((email, index) => (
                             <AccordionItem key={index} value={`email-${index}`} className="border rounded-md px-4">
                                <AccordionTrigger>Email #{index + 1}: {email.subject}</AccordionTrigger>
                                <AccordionContent className="prose max-w-none p-2 bg-muted/30 rounded-md whitespace-pre-wrap font-body">
                                    <p className="font-semibold">Subject: {email.subject}</p>
                                    <hr className="my-2"/>
                                    {email.body}
                                </AccordionContent>
                             </AccordionItem>
                        ))}
                    </Accordion>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="thank-you">
                <AccordionTrigger className="text-lg font-semibold"><PartyPopper className="h-5 w-5 mr-2 text-primary" /> Thank You Page</AccordionTrigger>
                <AccordionContent className="prose max-w-none p-4 bg-muted/50 rounded-md whitespace-pre-wrap font-body">
                  {generatedContent.thankYouPage}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
