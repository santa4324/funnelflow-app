'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { getFunnels } from '@/lib/firestore';
import type { Funnel } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, BarChart2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getFunnels(user.uid)
        .then(userFunnels => {
          setFunnels(userFunnels);
          if (userFunnels.length > 0) {
            setSelectedFunnelId(userFunnels[0].id);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const selectedFunnel = funnels.find(f => f.id === selectedFunnelId);

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Funnel Analytics</CardTitle>
          <CardDescription>Track your funnel performance and conversion rates. Data shown is for simulation purposes.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-10 w-full max-w-sm" />
          ) : funnels.length > 0 ? (
            <div className="max-w-sm">
              <Select onValueChange={setSelectedFunnelId} defaultValue={selectedFunnelId || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a funnel to analyze" />
                </SelectTrigger>
                <SelectContent>
                  {funnels.map(funnel => (
                    <SelectItem key={funnel.id} value={funnel.id}>
                      {funnel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
             <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Funnels Found</AlertTitle>
              <AlertDescription>
                You haven't saved any funnels yet. Go to the dashboard to generate and save a funnel to see its analytics.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {selectedFunnelId && (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                <CardTitle>Funnel Performance</CardTitle>
                <CardDescription>Simulated snapshot of visitors, leads, and customers for '{selectedFunnel?.name}'.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground bg-muted/50 rounded-lg p-6">
                        <BarChart2 className="h-12 w-12 mb-4 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Analytics Temporarily Unavailable</h3>
                        <p className="text-sm">The charting library is being updated to resolve a build issue. This feature will be back online shortly.</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Lead Generation (Last 7 Days)</CardTitle>
                <CardDescription>Simulated number of new leads acquired over time.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground bg-muted/50 rounded-lg p-6">
                        <BarChart2 className="h-12 w-12 mb-4 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Analytics Temporarily Unavailable</h3>
                        <p className="text-sm">The charting library is being updated to resolve a build issue. This feature will be back online shortly.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}
    </main>
  );
}
