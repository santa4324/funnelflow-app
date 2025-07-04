'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { getFunnels } from '@/lib/firestore';
import type { Funnel } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Eye, Users, DollarSign, Percent } from 'lucide-react';
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
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Visitors
                        </CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Leads Generated
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+235</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.92%</div>
                        <p className="text-xs text-muted-foreground">
                            +0.5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Simulated Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,450.00</div>
                        <p className="text-xs text-muted-foreground">
                            Based on new leads
                        </p>
                    </CardContent>
                </Card>
            </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Charting Feature Under Maintenance</AlertTitle>
                <AlertDescription>
                    Visual charts are temporarily disabled while we implement a more robust solution. The stats above are simulated.
                </AlertDescription>
            </Alert>
        </div>
      )}
    </main>
  );
}
