import { Rocket, Clock, Target } from 'lucide-react';

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: 'Launch Faster',
    description: 'Stop wasting weeks on copywriting. Generate and launch complete funnels in minutes, not months.',
  },
  {
    icon: <Clock className="h-8 w-8 text-accent" />,
    title: 'Save Time & Money',
    description: 'Eliminate the need for expensive copywriters and marketing agencies. Our AI does the heavy lifting for you.',
  },
  {
    icon: <Target className="h-8 w-8 text-accent" />,
    title: 'Expert-Level Results',
    description: 'Our AI is trained on thousands of successful marketing campaigns to deliver copy that converts.',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="w-full py-20 md:py-24 bg-card">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose FunnelFlow?</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We're building the smartest, fastest way to turn your ideas into revenue.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'hsla(var(--accent), 0.1)' }}>
                {feature.icon}
              </div>
              <div>
                <h3 className="font-headline text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
