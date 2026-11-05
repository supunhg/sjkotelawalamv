import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';
import { schoolInfo } from '../../data/schoolData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1D21] text-stone-300 border-t-4 border-[#C8872B] mt-auto">
      {/* Top Banner Accent */}
      <div className="bg-[#2B0808] border-b border-[#C8872B]/30 py-3 px-4 text-center text-xs text-amber-200/90 font-medium">
        <span className="font-semibold text-amber-400">{schoolInfo.sinhalaName}</span>
        <span className="mx-2">•</span>
        <span>{schoolInfo.mottoSinhala}</span>
        <span className="mx-2">•</span>
        <span className="italic font-serif">"{schoolInfo.mottoEnglish}"</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo-bw.png" 
                alt="SJKMV Crest" 
                className="w-14 h-14 object-contain filter brightness-110 drop-shadow" 
              />
              <div>
                <h3 className="font-serif font-bold text-white text-base leading-tight">
                  Sir John Kotelawala
                </h3>
                <p className="text-[#C8872B] text-xs font-medium">Maha Vidyalaya</p>
                <p className="text-stone-400 text-[11px]">Est. Feb 6, 1980 • Piliyandala</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Committed to bequeathing to Sri Lanka disciplined, morally grounded, and intellectually empowered citizens through holistic academic, spiritual, and physical education.
            </p>

            <div className="pt-2 text-xs text-amber-200/80 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8872B]" />
                <span>Kesbewa Education Division</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#C8872B]" />
                <span>Piliyandala Zonal Education Office</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-white text-sm tracking-wider uppercase border-b border-stone-800 pb-2">
              School Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[#C8872B]">›</span> Home & Announcements
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[#C8872B]">›</span> College History & Media Unit
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[#C8872B]">›</span> Academics & Curriculum (Grades 1-13)
                </Link>
              </li>
              <li>
                <Link to="/sports" className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[#C8872B]">›</span> Sports Timetable & Clubs
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[#C8872B]">›</span> News, Events & Gallery
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium text-amber-300">
                  <span className="text-[#C8872B]">›</span> Admissions & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Official Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-white text-sm tracking-wider uppercase border-b border-stone-800 pb-2">
              National Portals
            </h4>
            <ul className="space-y-2 text-xs">
              {schoolInfo.officialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#C8872B] group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <h5 className="text-xs font-semibold text-amber-300 mb-1">Administrative Hours</h5>
              <p className="text-[11px] text-stone-400 leading-normal">
                {schoolInfo.contact.hours}
              </p>
              <p className="text-[11px] text-stone-400 mt-1">
                Parent inquiries during school term mornings by appointment.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-white text-sm tracking-wider uppercase border-b border-stone-800 pb-2">
              School Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8872B] shrink-0 mt-0.5" />
                <span className="text-stone-300 leading-snug">{schoolInfo.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8872B] shrink-0" />
                <a href={`tel:${schoolInfo.contact.phone.replace(/\s+/g, '')}`} className="text-stone-300 hover:text-white transition-colors">
                  {schoolInfo.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8872B] shrink-0" />
                <a href={`mailto:${schoolInfo.contact.email}`} className="text-stone-300 hover:text-white transition-colors break-all">
                  {schoolInfo.contact.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-block text-xs font-semibold text-[#3D0707] bg-[#C8872B] hover:bg-amber-400 px-3.5 py-1.5 rounded transition-all"
              >
                Send Message / Directions →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-stone-800 bg-[#141416] py-4 px-4 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Sir John Kotelawala Maha Vidyalaya. All rights reserved.</p>
          <p className="text-stone-400 text-[11px]">
            Rebuilt with modern, ultra-fast frameworks & smooth scrolling for institutional excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};
