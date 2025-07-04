'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analytics</CardTitle>
          <CardDescription>
            This feature is currently being updated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/30">
            <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Coming Soon!</h3>
            <p className="mt-1 text-sm text-muted-foreground">We're working on a new and improved analytics dashboard.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
