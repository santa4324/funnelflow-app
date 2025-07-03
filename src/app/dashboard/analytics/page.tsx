'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { getFunnels } from '@/lib/firestore';
import type { Funnel } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Mock data for charts
const funnelPerformanceData = [
  { name: 'Visitors', value: 1245 },
  { name: 'Leads', value: 235 },
  { name: 'Customers', value: 45 },
];

const leadGenerationData = [
  { date: 'Day 1', leads: 22 },
  { date: 'Day 2', leads: 35 },
  { date: 'Day 3', leads: 48 },
  { date: 'Day 4', leads: 41 },
  { date: 'Day 5', leads: 56 },
  { date: 'Day 6', leads: 62 },
  { date: 'Day 7', leads: 78 },
];

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
          <CardDescription>Track your funnel performance and conversion rates.</CardDescription>
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
                <CardDescription>A snapshot of visitors, leads, and customers for '{selectedFunnel?.name}'.</CardDescription>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={funnelPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Lead Generation (Last 7 Days)</CardTitle>
                <CardDescription>Shows the number of new leads acquired over time.</CardDescription>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={leadGenerationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leads" stroke="hsl(var(--accent))" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      )}
    </main>
  );
}
