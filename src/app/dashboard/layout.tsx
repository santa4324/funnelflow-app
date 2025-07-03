'use client';

import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Bot, LayoutDashboard, Settings, LogOut, VenetianMask, BarChart, Users, FileText, LifeBuoy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, appUser, logout, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
       <div className="flex min-h-screen">
          <div className="hidden md:flex flex-col w-64 border-r p-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <div className="mt-auto">
                <Skeleton className="h-8 w-full mt-4" />
                <Skeleton className="h-10 w-full mt-2" />
              </div>
          </div>
          <div className="flex-1 p-6">
              <Skeleton className="h-12 w-1/3 mb-6" />
              <Skeleton className="w-full h-[400px]" />
          </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Bot className="size-6 text-primary" />
            <span className="text-lg font-headline font-semibold">FunnelFlow</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" isActive tooltip="Dashboard">
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Funnels">
                <FileText />
                My Funnels
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Leads">
                <Users />
                Leads CRM
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Analytics">
                <BarChart />
                Analytics
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Agency">
                 <VenetianMask />
                Agency Mode
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Help">
                  <LifeBuoy />
                  Help & Support
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Settings">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <div className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm">
                    <Avatar className="size-7">
                      {user.photoURL ? <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} /> : <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" /> }
                      <AvatarFallback>{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col truncate">
                      <span className="font-medium truncate">{user.displayName || 'User'}</span>
                      <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    </div>
                  </div>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger className="md:hidden" />
            <div className='flex-1'>
                <h1 className="text-lg font-semibold md:text-xl font-headline">Dashboard</h1>
            </div>
             {appUser?.subscription?.planName && (
              <Badge variant="outline" className="hidden sm:inline-flex border-primary text-primary">
                  {appUser.subscription.planName} Plan
              </Badge>
            )}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
