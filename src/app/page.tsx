import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* <Header /> */}
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold font-headline">Debugging: Page Render OK</h1>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
