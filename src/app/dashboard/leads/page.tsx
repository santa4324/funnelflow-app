'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { Lead } from '@/lib/types';
import { getLeads } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function LeadsPage() {
    const { user } = useAuth();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getLeads(user.uid)
                .then(setLeads)
                .finally(() => setLoading(false));
        }
    }, [user]);

    if(loading) {
        return (
             <main className="flex-1 p-4 md:p-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-md">
                           <Skeleton className="h-48 w-full" />
                        </div>
                    </CardContent>
                </Card>
             </main>
        )
    }

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Leads CRM</CardTitle>
          <CardDescription>View and manage all leads captured from your live funnels.</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <div className="border rounded-md">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source Funnel</TableHead>
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
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Leads Captured Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">When leads are captured from your live funnels, they will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
