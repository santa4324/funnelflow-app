'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { getFunnels } from '@/lib/firestore';
import type { Funnel } from '@/lib/types';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { FilePlus, Eye, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FunnelsPage() {
  const { user } = useAuth();
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      getFunnels(user.uid)
        .then(setFunnels)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleShare = (funnelId: string) => {
    const url = `${window.location.origin}/v/${funnelId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied!',
      description: 'The public URL for your funnel has been copied to your clipboard.',
    });
  };

  if (loading) {
    return (
      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
            <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64 mt-2" />
            </div>
            <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                 <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                 <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold">My Funnels</h1>
          <p className="text-muted-foreground">Manage and view your saved marketing funnels.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard" className='gap-2'><FilePlus /> Create New Funnel</Link>
        </Button>
      </div>

      {funnels.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {funnels.map(funnel => (
            <Card key={funnel.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{funnel.name}</CardTitle>
                <CardDescription>Created on {funnel.createdAt.toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  For a <span className="font-semibold text-foreground">{funnel.businessInfo.industry}</span> business targeting <span className="font-semibold text-foreground">{funnel.businessInfo.targetAudience}</span>.
                </p>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link href={`/dashboard/funnels/${funnel.id}`} className='gap-2'><Eye/> View Details</Link>
                </Button>
                 <Button onClick={() => handleShare(funnel.id)} className='gap-2'>
                  <Share2 /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
            <FilePlus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No Funnels Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">You haven't saved any funnels. Let's create one!</p>
            <Button asChild className="mt-6">
                <Link href="/dashboard">Create Your First Funnel</Link>
            </Button>
        </div>
      )}
    </main>
  );
}
