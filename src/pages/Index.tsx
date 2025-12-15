import { useState } from 'react';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import JourneyTimeline from '@/components/JourneyTimeline';
import NavigationCards from '@/components/NavigationCards';
import Values from '@/components/Values';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import CursorGlow from '@/components/CursorGlow';
import Loader from '@/components/Loader';
import FloatingNodes from '@/components/FloatingNodes';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="relative">
          <FloatingNodes />
          <CursorGlow />
          <Navigation />
          <main>
            <Hero />
            <Philosophy />
            <JourneyTimeline />
            <NavigationCards />
            <Values />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
};

export default Index;
