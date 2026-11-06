import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { GalleryPage } from './pages/GalleryPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { ChangePasswordPage } from './pages/admin/ChangePasswordPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5] text-stone-900 selection:bg-[#C8872B] selection:text-[#3D0707]">
      {/* Global Header (Only for Public Pages) */}
      {!isAdminRoute && <Navbar />}

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
          
          {/* News & Bulletins */}
          <Route path="/news" element={<NewsPage />} />
          
          {/* Dedicated Gallery (Coming Soon Archive Showcase) */}
          <Route path="/gallery" element={<GalleryPage />} />
          
          {/* Admissions & Registration Form */}
          <Route path="/admissions" element={<AdmissionsPage />} />
          
          {/* Contact Us */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contactus" element={<Navigate to="/contact" replace />} />
          
          {/* Administrative Console & Digital Media Team */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/change-password" element={<ChangePasswordPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Institutional Footer (Only for Public Pages) */}
      {!isAdminRoute && <Footer />}

      {/* Back to Top Smooth Button */}
      {!isAdminRoute && <BackToTop />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppContent />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
};


export default App;
