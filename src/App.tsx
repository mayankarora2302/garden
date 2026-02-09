import { useState } from 'react';
import { BloomingHero } from './components/BloomingHero';
import { CustomCursor } from './components/CustomCursor';
import { GrowingLetter } from './components/GrowingLetter';
import { GrowthClock } from './components/GrowthClock';
import { LoginPage } from './components/LoginPage.tsx';
import { ParallaxGarden } from './components/ParallaxGarden';
import { PetalCursorTrail } from './components/PetalCursorTrail';
import { PetalGallery } from './components/PetalGallery';
import { ProposalSection } from './components/ProposalSection';
import { VinylPlayer } from './components/VinylPlayer';
import './index.css';

function App() {
  // Always start with login page (no persistence)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show main content after authentication
  return (
    <ParallaxGarden>
      <div className="relative min-h-screen bg-transparent overflow-x-hidden">
        {/* Custom cursor effects */}
        <CustomCursor />
        <PetalCursorTrail />

        {/* Vinyl player - fixed position */}
        <VinylPlayer />

        {/* Main content sections */}
        <main className="relative">
          {/* 1. Blooming entrance */}
          <BloomingHero />

          {/* 2. Ethereal growth clock */}
          <GrowthClock startDate="2025-11-24T00:00:00" />

          {/* 3. Petal fall gallery */}
          <PetalGallery />

          {/* 4. Growing vine letter */}
          <GrowingLetter />

          {/* 5. Final bloom proposal */}
          <ProposalSection />
        </main>

        {/* Footer */}
        <footer className="relative py-12 text-center grain-filter bg-emerald-dark">
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-serif text-cream-light text-lg mb-2">
              The Midnight Garden
            </p>
            <p className="font-sans text-cream text-sm opacity-75">
              Where every moment blooms eternal
            </p>

            {/* Decorative flourish */}
            <div className="mt-6 flex justify-center">
              <svg width="100" height="20" viewBox="0 0 100 20">
                <path
                  d="M0 10 Q25 5 50 10 T100 10"
                  stroke="#d4af37"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="50" cy="10" r="3" fill="#d4af37" />
              </svg>
            </div>
          </div>
        </footer>
      </div>
    </ParallaxGarden>
  );
}

export default App;
