import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to FunnelFlow</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Your page is loading. We're resolving a temporary issue.
        </p>
      </main>
      <Footer />
    </div>
  );
}