import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Rocket, Target, Bot } from 'lucide-react';
import Link from "next/link";
    
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container max-w-5xl mx-auto flex flex-col items-center justify-center text-center py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Build Your Funnel, Simply.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          We're starting fresh with a stable, simple foundation. From here, we will build the powerful AI-driven funnel generator you envisioned.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" variant="default">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-20 md:py-24">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">A Fresh Start</h2>
          <p className="mt-4 text-center text-muted-foreground">
            Here's the plan. We'll build on this stable base.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Rocket className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>1. Stable Foundation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  This new, simplified design is guaranteed to work and deploy correctly. No more build errors.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>2. Re-introduce AI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Next, we will carefully add the AI generation features back into the application.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>3. Build Your Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  With a working app, we can confidently build out the full dashboard and features you want.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
