import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import Testimonials from '@/components/landing/Testimonials';
import PricingPreview from '@/components/landing/PricingPreview';
import AnimatedSection from '@/components/landing/AnimatedSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <HeroSection />
        <AnimatedSection>
            <HowItWorks />
        </AnimatedSection>
        <AnimatedSection>
            <WhyChooseUs />
        </AnimatedSection>
        <AnimatedSection>
            <Testimonials />
        </AnimatedSection>
        <AnimatedSection>
            <PricingPreview />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
