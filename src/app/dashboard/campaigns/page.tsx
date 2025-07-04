'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { getFunnels, getLeads } from '@/lib/firestore';
import type { Funnel, Lead } from '@/lib/types';
import { Mail, Send, Loader2, Check, AlertCircle, Inbox, Ban } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendBulkEmail } from '@/lib/actions';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function CampaignsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingState, setSendingState] = useState<{ [key: string]: boolean }>({});

  const refreshLeads = () => {
     if (user) {
      getLeads(user.uid).then(setLeads);
    }
  }

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        getFunnels(user.uid),
        getLeads(user.uid),
      ]).then(([userFunnels, userLeads]) => {
        setFunnels(userFunnels);
        setLeads(userLeads);
      }).finally(() => setLoading(false));
    }
  }, [user]);

  const leadsByFunnel = useMemo(() => {
    return leads.reduce((acc, lead) => {
      (acc[lead.funnelId] = acc[lead.funnelId] || []).push(lead);
      return acc;
    }, {} as Record<string, Lead[]>);
  }, [leads]);

  const handleSendEmail = async (funnelId: string, emailIndex: number) => {
    toast({
        variant: 'destructive',
        title: 'Feature Disabled',
        description: 'Email sending is temporarily unavailable while we resolve build issues. Please try again later.',
    });
    return;

    // The original logic is kept here but is unreachable.
    /*
    if (!user) return;
    const emailIdentifier = `email-${emailIndex}`;
    const stateKey = `${funnelId}-${emailIdentifier}`;
    
    setSendingState(prev => ({ ...prev, [stateKey]: true }));

    const result = await sendBulkEmail(user.uid, funnelId, emailIdentifier);

    if (result.success) {
      toast({
        title: 'Campaign Sent!',
        description: result.message,
      });
      refreshLeads();
    } else {
      toast({
        variant: 'destructive',
        title: 'Campaign Failed',
        description: result.message,
      });
    }

    setSendingState(prev => ({ ...prev, [stateKey]: false }));
    */
  };

  if (loading) {
    return (
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Email Campaigns</CardTitle>
          <CardDescription>
            Manage and send your AI-generated email sequences to the leads you've captured.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-6">
            <Ban className="h-4 w-4" />
            <AlertTitle>Email Campaigns Temporarily Disabled</AlertTitle>
            <AlertDescription>
              The Mailgun integration is currently disabled to resolve a build issue. This feature will be restored shortly.
            </AlertDescription>
          </Alert>
          {funnels.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {funnels.map(funnel => {
                const funnelLeads = leadsByFunnel[funnel.id] || [];
                return (
                  <AccordionItem key={funnel.id} value={funnel.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left">
                        <Mail className="h-6 w-6 text-primary hidden sm:block" />
                        <div>
                          {funnel.name}
                          <p className="text-sm font-normal text-muted-foreground">{funnelLeads.length} lead(s) captured</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-2 space-y-4">
                      {funnel.generatedContent.emailSequence.map((email, index) => {
                        const emailIdentifier = `email-${index}`;
                        const stateKey = `${funnel.id}-${emailIdentifier}`;
                        const leadsWhoReceived = funnelLeads.filter(l => l.emailsSent?.includes(emailIdentifier)).length;
                        const leadsToSendTo = funnelLeads.length - leadsWhoReceived;

                        return (
                          <div key={index} className="p-4 border rounded-md bg-muted/30">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-base">Email #{index + 1}: {email.subject}</h4>
                                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap font-body">{email.body}</p>
                                </div>
                                <div className="flex flex-col items-center gap-2 pl-4">
                                  <Button 
                                    onClick={() => handleSendEmail(funnel.id, index)} 
                                    disabled={true} // Feature disabled
                                    className="w-40"
                                    variant="outline"
                                  >
                                    <Send />
                                    <span>Send to {leadsToSendTo}</span>
                                  </Button>
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Check className="h-3 w-3 text-accent"/> Sent to {leadsWhoReceived}
                                  </div>
                                </div>
                            </div>
                          </div>
                        );
                      })}
                      {funnel.generatedContent.emailSequence.length === 0 && <p className="text-center text-muted-foreground">No email sequence was generated for this funnel.</p>}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
                <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Funnels Created Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Create a funnel from the dashboard to start a campaign.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
