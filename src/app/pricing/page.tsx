'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PayPalButtonsWrapper from '@/components/pricing/PayPalButtonsWrapper';
import { Separator } from '@/components/ui/separator';

const plans = [
  {
    name: 'Starter',
    price: '49',
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
    price: '99',
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
    const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);


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
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:max-w-4xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ${plan.isPopular ? 'border-primary ring-2 ring-primary' : ''}`}>
                  <CardHeader className="p-6">
                    {plan.isPopular && <div className="text-sm font-semibold text-primary">MOST POPULAR</div>}
                    <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div>
                      <span className="text-4xl font-bold">${plan.price}</span>
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
                     <Button onClick={() => setSelectedPlan(plan)} className="w-full" size="lg" variant={plan.isPopular ? 'default' : 'outline'}>
                        {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {selectedPlan && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setSelectedPlan(null)}>
                    <Card className="w-full max-w-md shadow-2xl m-4" onClick={(e) => e.stopPropagation()}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="font-headline text-2xl">Complete Your Purchase</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedPlan(null)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <CardDescription>You're purchasing the <span className='font-bold text-primary'>{selectedPlan.name}</span> plan.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className='flex justify-between items-baseline'>
                                <p className='text-lg'>Total:</p>
                                <p><span className="text-3xl font-bold">${selectedPlan.price}</span><span className="text-muted-foreground">{selectedPlan.period}</span></p>
                            </div>
                            <Separator />
                            <p className="text-sm text-center text-muted-foreground">Choose your payment method</p>
                            <PayPalButtonsWrapper plan={selectedPlan} />
                        </CardContent>
                    </Card>
                </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
