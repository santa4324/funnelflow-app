import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home" className="container mx-auto max-w-screen-xl px-4 py-20 md:py-32">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Build High-Converting Funnels in Minutes
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Let AI be your expert copywriter. FunnelFlow generates entire marketing funnels, from landing pages to email sequences, so you can focus on growing your business.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:bg-accent/90 shadow-lg">
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-lg">
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
            <Image 
                src="https://placehold.co/600x400.png"
                alt="Marketing Funnel Illustration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="marketing automation"
            />
        </div>
      </div>
    </section>
  );
}
