'use client';

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useParams } from 'next/navigation';
import { getPublicFunnel } from '@/lib/firestore';
import type { PublicFunnel } from '@/lib/types';
import { captureLead } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

export default function LiveFunnelPage() {
  const params = useParams();
  const funnelId = typeof params.funnelId === 'string' ? params.funnelId : '';
  const [funnel, setFunnel] = useState<PublicFunnel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialState = { message: '', success: false };
  const [state, dispatch] = useFormState(captureLead, initialState);

  useEffect(() => {
    if (funnelId) {
      getPublicFunnel(funnelId)
        .then(data => {
          if (data) {
            setFunnel(data);
          } else {
            setError('Funnel not found. The link may be incorrect or the funnel may have been removed.');
          }
        })
        .catch(() => setError('Failed to load funnel data.'))
        .finally(() => setLoading(false));
    }
  }, [funnelId]);

  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto max-w-4xl px-4 py-12">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-8" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-5/6 mb-12" />
                 <Card className="mt-12">
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto max-w-4xl px-4 py-12">
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </main>
            <Footer />
        </div>
    );
  }

  if (!funnel) {
    return null;
  }

  const { landingPageCopy, leadCaptureForm } = funnel.generatedContent;
  
  // A simple markdown to HTML renderer
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-bold font-headline mt-6 mb-4">{line.substring(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold font-headline mt-6 mb-4">{line.substring(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold font-headline mt-6 mb-4">{line.substring(4)}</h3>;
        if (line.trim() === '') return <br key={i}/>
        return <p key={i} className="mb-4 text-lg">{line}</p>;
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-lg max-w-none">
            {renderMarkdown(landingPageCopy)}
        </article>
        
        <Card id="capture-form" className="mt-12 shadow-2xl animate-in fade-in-50 duration-500">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">{leadCaptureForm.headline}</CardTitle>
                <CardDescription className="text-base">{leadCaptureForm.callToAction}</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch} className="space-y-4">
                    <input type="hidden" name="funnelId" value={funnel.id} />
                    <input type="hidden" name="userId" value={funnel.userId} />
                    
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your Name" required />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                    </div>

                    <SubmitButton />

                    {state.message && !state.success && (
                        <p className="text-sm text-destructive">{state.message}</p>
                    )}
                </form>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
