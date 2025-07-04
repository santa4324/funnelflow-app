'use client';

import Link from 'next/link';
import { Bot, LogOut, Settings, Users, LayoutDashboard, FileText, Mail, BarChart, VenetianMask, LifeBuoy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

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
      <div className="flex flex-col min-h-screen">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </header>
        <main className="flex-1 p-6">
          <Skeleton className="w-full h-[calc(100vh-12rem)]" />
        </main>
      </div>
    );
  }

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/funnels', label: 'My Funnels' },
    { href: '/dashboard/campaigns', label: 'Campaigns' },
    { href: '/dashboard/leads', label: 'Leads CRM' },
    { href: '/dashboard/analytics', label: 'Analytics' },
  ];

  const pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/dashboard/funnels': 'My Funnels',
    '/dashboard/leads': 'Leads CRM',
    '/dashboard/campaigns': 'Email Campaigns',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/agency': 'Agency Mode',
    '/dashboard/help': 'Help & Support',
    '/dashboard/settings': 'Settings',
  };
  
  const pageTitle = pageTitles[pathname] || 'Dashboard';


  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">FunnelFlow</span>
            </Link>
            <h1 className="text-lg font-semibold hidden md:block">{pageTitle}</h1>
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-4">
             <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navLinks.map((link) => (
                <Button key={link.href} variant="ghost" asChild className={`text-sm font-medium transition-colors ${pathname === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary/80'}`}>
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
              </Button>
               <Avatar className="size-9">
                  {user.photoURL ? <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} /> : <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" /> }
                  <AvatarFallback>{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
