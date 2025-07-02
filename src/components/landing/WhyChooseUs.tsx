import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Clock, Target } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: "Launch Faster",
      description: "Stop wasting weeks on copywriting. Generate and launch complete funnels in minutes, not months.",
    },
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      title: "Save Time & Money",
      description: "Eliminate the need for expensive copywriters and marketing agencies. Our AI does the heavy lifting for you.",
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Expert-Level Results",
      description: "Our AI is trained on thousands of successful marketing campaigns to deliver copy that converts.",
    },
  ];

  return (
    <section id="why-choose-us" className="w-full py-20 md:py-24">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose FunnelFlow?</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We're building the smartest, fastest way to turn your ideas into revenue.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: 'hsla(var(--accent), 0.1)' }}>
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
