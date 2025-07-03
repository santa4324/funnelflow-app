'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

// Mock data - replace with real data from Firestore when lead capture is implemented
const mockLeads = [
  { id: '1', name: 'Alice Johnson', email: 'alice.j@example.com', funnelName: 'Wellness Coach - 07/01/2024', collectedAt: new Date('2024-07-02T10:30:00Z') },
  { id: '2', name: 'Bob Williams', email: 'bob.w@example.com', funnelName: 'Real Estate Pro - 06/28/2024', collectedAt: new Date('2024-07-01T14:00:00Z') },
  { id: '3', name: 'Charlie Brown', email: 'charlie.b@example.com', funnelName: 'Wellness Coach - 07/01/2024', collectedAt: new Date('2024-07-01T09:15:00Z') },
  { id: '4', name: 'Diana Prince', email: 'diana.p@example.com', funnelName: 'SaaS Startup - 06/25/2024', collectedAt: new Date('2024-06-30T18:45:00Z') },
];

export default function LeadsPage() {
  const leads = mockLeads; // Use mock data for now

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Leads CRM</CardTitle>
          <CardDescription>Manage your leads and contacts here. This is sample data until lead capture is connected.</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <div className="border rounded-md">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Funnel</TableHead>
                    <TableHead className="text-right">Date Acquired</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map(lead => (
                    <TableRow key={lead.id}>
                        <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{lead.funnelName}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{lead.collectedAt.toLocaleDateString()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Leads Captured Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">When leads are captured from your funnels, they will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
