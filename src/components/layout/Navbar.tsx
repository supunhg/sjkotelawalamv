import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, ChevronRight, GraduationCap } from 'lucide-react';
import { schoolInfo } from '../../data/schoolData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Academics', path: '/academics' },
    { label: 'Sports & Clubs', path: '/sports' },
    { label: 'News & Events', path: '/news' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Institutional Micro-Bar */}
      <div className="bg-[#2B0505] text-[#FAF2DF] text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#C8872B]/20 tracking-wide select-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Left: School Motto */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8872B]"></span>
              {schoolInfo.mottoSinhala}
            </span>
            <span className="hidden md:inline text-amber-100/30">|</span>
            <span className="hidden md:inline text-amber-100/75 italic font-serif">
              "{schoolInfo.mottoEnglish}"
            </span>
          </div>

          {/* Right: Quick Contacts */}
          <div className="flex items-center gap-4 text-[11px] font-medium text-amber-100/80">
            <a 
              href={`tel:${schoolInfo.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C8872B]" />
              <span>{schoolInfo.contact.phone}</span>
            </a>
            <span className="hidden sm:inline text-amber-200/30">•</span>
            <a 
              href={`mailto:${schoolInfo.contact.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-[#C8872B]" />
              <span className="truncate max-w-[200px]">{schoolInfo.contact.email}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#4A0A0A]/95 backdrop-blur-md shadow-lg py-2 border-b border-[#C8872B]/30' 
            : 'bg-[#560D0D] py-3 border-b border-[#C8872B]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* School Brand / Crest */}
            <Link to="/" className="flex items-center gap-3 group text-left shrink-0">
              <img 
                src="/images/logo-color.png" 
                alt="Sir John Kotelawala Maha Vidyalaya Crest" 
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-105"
              />
              <div className="whitespace-nowrap">
                <div className="text-[#FAF2DF] font-serif font-bold text-sm sm:text-base md:text-lg tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                  Sir John Kotelawala
                </div>
                <div className="text-[#E1B463] text-[11px] sm:text-xs font-medium tracking-wide">
                  Maha Vidyalaya <span className="text-amber-200/40">•</span> <span className="text-amber-100/70">Piliyandala</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`whitespace-nowrap px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide rounded-md transition-all duration-200 relative ${
                      active
                        ? 'text-amber-300 bg-black/25 font-semibold shadow-inner'
                        : 'text-amber-100/85 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#C8872B] rounded-full"></span>
                    )}
                  </Link>
                );
              })}

              {/* Admissions Dedicated CTA Button */}
              <Link
                to="/admissions"
                className="ml-3 xl:ml-5 inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#C8872B] hover:bg-[#D4902A] text-[#2B0505] font-semibold text-xs xl:text-sm rounded-md shadow-sm transition-all duration-200 hover:shadow active:scale-95 whitespace-nowrap"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Admissions</span>
              </Link>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/admissions"
                className="px-3 py-1.5 bg-[#C8872B] text-[#2B0505] font-bold text-xs rounded transition-all"
              >
                Admissions
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-amber-100 hover:text-white hover:bg-black/20 rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="relative ml-auto w-4/5 max-w-sm bg-[#380606] border-l border-[#C8872B]/30 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#C8872B]/30">
                <div className="flex items-center gap-2.5">
                  <img src="/images/logo-color.png" alt="Crest" className="w-9 h-9 object-contain" />
                  <div>
                    <h3 className="text-amber-100 font-serif font-bold text-sm leading-tight">Sir John Kotelawala</h3>
                    <p className="text-[#C8872B] text-[11px]">Maha Vidyalaya</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-amber-200 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-2.5 text-[11px] text-amber-200/60 font-serif italic border-b border-[#C8872B]/20 mb-3">
                "{schoolInfo.mottoEnglish}"
              </div>

              <nav className="flex flex-col gap-1 mt-2">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium tracking-wide transition-all ${
                        active
                          ? 'bg-[#C8872B] text-[#2B0505] font-bold shadow'
                          : 'text-amber-100/90 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${active ? 'text-[#2B0505]' : 'text-amber-400/40'}`} />
                    </Link>
                  );
                })}

                <Link
                  to="/admissions"
                  className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C8872B] text-[#2B0505] font-bold text-xs uppercase tracking-wider rounded-md shadow"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Admissions & Enrollment</span>
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#C8872B]/30 space-y-2 text-xs text-amber-200/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8872B]" />
                <a href={`tel:${schoolInfo.contact.phone}`}>{schoolInfo.contact.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8872B]" />
                <a href={`mailto:${schoolInfo.contact.email}`} className="truncate">{schoolInfo.contact.email}</a>
              </div>
              <p className="text-[11px] text-amber-300/40 pt-2">
                Kolamunna, Piliyandala, Western Province
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
