import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah L.",
      title: "Marketing Consultant",
      quote: "FunnelFlow has been a game-changer for my agency. I can now create and deploy funnels for my clients in a fraction of the time. The AI-generated copy is shockingly good!",
      avatar: "SL",
      image: "https://placehold.co/100x100.png"
    },
    {
      name: "Mike R.",
      title: "E-commerce Store Owner",
      quote: "As a small business owner, I wear many hats. FunnelFlow took the entire marketing copy process off my plate. My conversion rates have increased by 30% since I started using it.",
      avatar: "MR",
      image: "https://placehold.co/100x100.png"
    },
    {
      name: "Jessica T.",
      title: "Online Coach",
      quote: "I struggled with writing emails that didn't sound salesy. The email sequences from FunnelFlow are perfect - they build trust and provide value. My clients love them!",
      avatar: "JT",
      image: "https://placehold.co/100x100.png"
    },
  ];

  return (
    <section id="testimonials" className="w-full py-20 md:py-24 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Loved by Businesses Worldwide</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-lg bg-card">
              <CardContent className="p-0">
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint="person" />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
