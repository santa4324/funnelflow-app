import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '/ 7 days',
    description: 'Explore the core features and see the magic for yourself.',
    features: [
      '1 Funnel Generation',
      'Basic AI Content Tools',
      'Up to 10 Leads',
    ],
    cta: 'Start for Free',
    isPopular: false,
  },
  {
    name: 'Starter',
    price: '$49',
    period: '/ month',
    description: 'Perfect for small businesses and solo entrepreneurs.',
    features: [
      '10 Funnel Generations per Month',
      'Full AI Content Suite',
      'Up to 1,000 Leads',
      'Funnel Analytics',
      'Email Support',
    ],
    cta: 'Choose Starter',
    isPopular: true,
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/ month',
    description: 'For growing businesses and agencies that need more power.',
    features: [
      'Unlimited Funnel Generations',
      'Advanced AI Content Suite',
      'Unlimited Leads',
      'Agency Mode (3 Clients)',
      'Priority Support',
    ],
    cta: 'Go Premium',
    isPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-24">
          <div className="container mx-auto max-w-screen-xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Our Pricing Plans</h1>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Choose the plan that's right for you. No hidden fees, cancel anytime.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ${plan.isPopular ? 'border-primary ring-2 ring-primary' : ''}`}>
                  <CardHeader className="p-6">
                    {plan.isPopular && <div className="text-sm font-semibold text-primary">MOST POPULAR</div>}
                    <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-accent" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button asChild className="w-full" size="lg" variant={plan.isPopular ? 'default' : 'outline'}>
                      <Link href="/signup">{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
