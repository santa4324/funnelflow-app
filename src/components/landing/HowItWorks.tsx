import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Bot, Send } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <PenTool className="h-10 w-10 text-primary" />,
      title: "1. Setup Your Business",
      description: "Provide a few details about your business, target audience, and what you're offering. This gives our AI the context it needs.",
    },
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: "2. Generate with AI",
      description: "Click one button and watch as FunnelFlow creates a complete marketing funnel, including landing page copy, emails, and more.",
    },
    {
      icon: <Send className="h-10 w-10 text-primary" />,
      title: "3. Launch & Convert",
      description: "Deploy your new funnel, start capturing leads, and convert them into loyal customers with your automated email sequences.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 md:py-24 bg-card">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Go from idea to a fully functional marketing funnel in three simple steps.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
