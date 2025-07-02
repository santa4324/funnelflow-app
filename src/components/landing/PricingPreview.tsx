import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PricingPreview() {
  return (
    <section id="pricing-preview" className="w-full py-20 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Find the Perfect Plan for Your Business
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Whether you're just starting out or scaling up, we have a plan that fits your needs. All plans start with a 7-day free trial.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:bg-accent/90 shadow-lg">
            <Link href="/pricing">View Full Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
