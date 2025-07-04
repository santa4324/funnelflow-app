'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getFunnel } from '@/lib/firestore';
import type { Funnel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowLeft, FileText, Mail, PartyPopper, MessageSquareQuote } from 'lucide-react';

export default function FunnelDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const funnelId = typeof params.funnelId === 'string' ? params.funnelId : '';

  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && funnelId) {
      getFunnel(user.uid, funnelId)
        .then(data => {
          if (data) {
            setFunnel(data);
          } else {
            setError('Funnel not found or you do not have permission to view it.');
          }
        })
        .catch(() => setError('Failed to load funnel data.'))
        .finally(() => setLoading(false));
    }
  }, [user, funnelId]);

  if (loading) {
    return (
      <main className="flex-1 p-4 md:p-6 space-y-6">
          <Skeleton className="h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return <main className="flex-1 p-4 md:p-6 text-center"><p className="text-destructive">{error}</p></main>;
  }

  if (!funnel) {
    return null;
  }

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeft/> Back to Funnels
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{funnel.name}</CardTitle>
          <CardDescription>
            Generated on {funnel.createdAt.toLocaleString()} for the business "{funnel.businessInfo.businessName}"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-headline font-semibold text-center mb-4">Generated Funnel Content</h3>
          <Accordion type="single" collapsible className="w-full" defaultValue="landing-page">
            <AccordionItem value="landing-page">
              <AccordionTrigger className="text-lg font-semibold"><FileText className="h-5 w-5 mr-2 text-primary" /> Landing Page Copy</AccordionTrigger>
              <AccordionContent className="prose max-w-none p-4 bg-muted/50 rounded-md whitespace-pre-wrap font-body">
                {funnel.generatedContent.landingPageCopy}
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="lead-capture-form">
              <AccordionTrigger className="text-lg font-semibold"><MessageSquareQuote className="h-5 w-5 mr-2 text-primary" /> Lead Capture Form Content</AccordionTrigger>
              <AccordionContent className="prose max-w-none p-4 bg-muted/50 rounded-md font-body space-y-2">
                  <p><strong>Headline:</strong> {funnel.generatedContent.leadCaptureForm.headline}</p>
                  <p><strong>Call to Action:</strong> {funnel.generatedContent.leadCaptureForm.callToAction}</p>
                  <p><strong>Button Text:</strong> {funnel.generatedContent.leadCaptureForm.buttonText}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="email-sequence">
              <AccordionTrigger className="text-lg font-semibold"><Mail className="h-5 w-5 mr-2 text-primary" /> Email Sequence</AccordionTrigger>
              <AccordionContent>
                  <Accordion type="multiple" className="w-full space-y-2">
                      {funnel.generatedContent.emailSequence.map((email, index) => (
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
                {funnel.generatedContent.thankYouPage}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
