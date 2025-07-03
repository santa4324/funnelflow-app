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
import { format } from 'date-fns';

interface ChartData {
  performance: { name: string; value: number }[];
  leadGen: { date: string; leads: number }[];
}

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [generatingChartData, setGeneratingChartData] = useState(false);

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
  
  useEffect(() => {
    if (selectedFunnelId) {
      setGeneratingChartData(true);
      // In a real app, you'd fetch this data. Here, we simulate it.
      const timer = setTimeout(() => {
        // Generate funnel performance data
        const visitors = Math.floor(Math.random() * 2000) + 500;
        const leads = Math.floor(visitors * (Math.random() * 0.2 + 0.1));
        const customers = Math.floor(leads * (Math.random() * 0.15 + 0.05));
        const performanceData = [
          { name: 'Visitors', value: visitors },
          { name: 'Leads', value: leads },
          { name: 'Customers', value: customers },
        ];

        // Generate lead generation data for the last 7 days
        const leadGenData = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          leadGenData.push({
            date: format(date, 'MMM d'),
            leads: Math.floor(Math.random() * (leads/7 * (Math.random() * 0.5 + 0.75))) + 5,
          });
        }
        
        setChartData({
          performance: performanceData,
          leadGen: leadGenData,
        });
        setGeneratingChartData(false);
      }, 500); // Simulate network delay

      return () => clearTimeout(timer);
    }
  }, [selectedFunnelId]);

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
                {generatingChartData || !chartData ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData.performance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                      </BarChart>
                  </ResponsiveContainer>
                )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Lead Generation (Last 7 Days)</CardTitle>
                <CardDescription>Simulated number of new leads acquired over time.</CardDescription>
                </CardHeader>
                <CardContent>
                 {generatingChartData || !chartData ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData.leadGen}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="leads" stroke="hsl(var(--accent))" activeDot={{ r: 8 }} />
                      </LineChart>
                  </ResponsiveContainer>
                )}
                </CardContent>
            </Card>
        </div>
      )}
    </main>
  );
}
