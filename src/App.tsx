/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Talent } from './pages/Talent';
import { Shop } from './pages/Shop';
import { LanguageProvider } from './context/LanguageContext';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-obsidian text-white font-sans selection:bg-magenta selection:text-white">
          <Preloader onComplete={() => setHasEntered(true)} />
          <CustomCursor />
          {hasEntered && (
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/talent" element={<Talent />} />
                  <Route path="/shop" element={<Shop />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </LanguageProvider>
  );
}
