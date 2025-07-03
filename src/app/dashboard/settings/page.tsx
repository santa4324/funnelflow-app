'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { appUser, loading } = useAuth();
  const router = useRouter();

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Account Information</CardTitle>
           <CardDescription>View your account details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {loading ? (
             <>
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-full max-w-sm" />
                <Skeleton className="h-5 w-20 mt-2" />
                <Skeleton className="h-8 w-full max-w-sm" />
             </>
           ) : (
             <>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Display Name</p>
                <p className="text-lg">{appUser?.displayName || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                <p className="text-lg">{appUser?.email}</p>
              </div>
             </>
           )}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Subscription</CardTitle>
           <CardDescription>Manage your subscription plan and billing details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {loading ? (
              <Skeleton className="h-10 w-full max-w-md" />
            ) : appUser?.subscription ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg">
                  <div>
                      <p>You are currently on the <Badge className="mx-1 border-primary text-primary" variant="outline">{appUser.subscription.planName}</Badge> plan.</p>
                      <p className="text-sm text-muted-foreground mt-1">Subscription is {appUser.subscription.status}.</p>
                  </div>
                  <Button variant="outline" className="mt-4 sm:mt-0" disabled>Manage Subscription</Button>
              </div>
            ) : (
               <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-semibold text-muted-foreground">No Active Subscription</h3>
                <p className="text-sm text-muted-foreground">Please choose a plan to unlock all features.</p>
                <Button className="mt-4" onClick={() => router.push('/pricing')}>View Plans</Button>
              </div>
            )}
        </CardContent>
      </Card>
    </main>
  );
}
