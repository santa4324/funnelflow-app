'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPublicFunnel } from '@/lib/firestore';
import type { PublicFunnel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, PartyPopper } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ThankYouPage() {
  const params = useParams();
  const funnelId = typeof params.funnelId === 'string' ? params.funnelId : '';
  const [funnel, setFunnel] = useState<PublicFunnel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (funnelId) {
      getPublicFunnel(funnelId)
        .then(data => {
          if (data) {
            setFunnel(data);
          } else {
            setError('Funnel not found.');
          }
        })
        .catch(() => setError('Failed to load data.'))
        .finally(() => setLoading(false));
    }
  }, [funnelId]);
  
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
      <main className="flex-1 flex items-center justify-center container mx-auto max-w-4xl px-4 py-12">
        {loading && (
          <Card className="w-full text-center p-10">
            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
            <Skeleton className="h-8 w-3/4 mx-auto mt-6" />
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-5/6 mt-2" />
          </Card>
        )}
        {error && (
            <Alert variant="destructive" className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {funnel && (
          <Card className="w-full text-center shadow-2xl animate-in fade-in-50 duration-500">
            <CardHeader>
                <PartyPopper className="h-16 w-16 mx-auto text-accent" />
            </CardHeader>
            <CardContent>
                <article className="prose prose-lg max-w-none">
                    {renderMarkdown(funnel.generatedContent.thankYouPage)}
                </article>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
