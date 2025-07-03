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
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, appUser, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
       <div className="flex min-h-screen">
        <div className="hidden md:flex flex-col w-64 border-r p-2">
          {/* Header */}
          <div className="p-2">
            <div className="flex items-center gap-2 h-10 px-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          {/* Menu */}
          <div className="flex-1 px-2 py-2">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
          {/* Footer */}
          <div className="mt-auto p-2">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <div className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm mt-2">
                  <Skeleton className="h-7 w-7 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
              </div>
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
              <Skeleton className="h-6 w-6 md:hidden" />
              <div className='flex-1'>
                  <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-7 w-28 hidden sm:inline-flex rounded-full" />
          </header>
          <main className="flex-1 p-4 md:p-6">
              <Skeleton className="w-full h-[calc(100vh-12rem)]" />
          </main>
        </div>
      </div>
    );
  }

  const pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/dashboard/funnels': 'My Funnels',
    '/dashboard/leads': 'Leads CRM',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/agency': 'Agency Mode',
    '/dashboard/help': 'Help & Support',
    '/dashboard/settings': 'Settings',
  };
  
  const pageTitle = pageTitles[pathname] || 'Dashboard';

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
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard">
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/funnels')} tooltip="Funnels">
                <Link href="/dashboard/funnels">
                  <FileText />
                  My Funnels
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/leads')} tooltip="Leads">
                <Link href="/dashboard/leads">
                  <Users />
                  Leads CRM
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/analytics')} tooltip="Analytics">
                <Link href="/dashboard/analytics">
                  <BarChart />
                  Analytics
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/agency')} tooltip="Agency">
                 <Link href="/dashboard/agency">
                  <VenetianMask />
                  Agency Mode
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/help')} tooltip="Help">
                  <Link href="/dashboard/help">
                    <LifeBuoy />
                    Help & Support
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/settings')} tooltip="Settings">
                  <Link href="/dashboard/settings">
                    <Settings />
                    Settings
                  </Link>
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
                <h1 className="text-lg font-semibold md:text-xl font-headline">{pageTitle}</h1>
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
