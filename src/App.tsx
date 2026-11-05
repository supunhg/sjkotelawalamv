import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { SportsPage } from './pages/SportsPage';
import { NewsPage } from './pages/NewsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <div className="flex flex-col min-h-screen bg-[#FAF9F5] text-stone-900 selection:bg-[#C8872B] selection:text-[#3D0707]">
          {/* Global Header */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/aboutus" element={<Navigate to="/about" replace />} />
              
              {/* Academics (Fixes the 404 from previous site!) */}
              <Route path="/academics" element={<AcademicsPage />} />
              
              {/* Sports & Societies */}
              <Route path="/sports" element={<SportsPage />} />
              
              {/* News & Gallery */}
              <Route path="/news" element={<NewsPage />} />
              
              {/* Admissions (Fixes the dead # link from previous site!) */}
              <Route path="/admissions" element={<AdmissionsPage />} />
              
              {/* Contact Us */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contactus" element={<Navigate to="/contact" replace />} />
              
              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Institutional Footer */}
          <Footer />

          {/* Back to Top Smooth Button */}
          <BackToTop />
        </div>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
};

export default App;
