import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Clock, 
  GraduationCap, 
  Users, 
  Trophy, 
  Bell, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Flame,
  Radio,
  ExternalLink
} from 'lucide-react';
import { schoolInfo, announcementsData, newsData, achievementsData, galleryData } from '../data/schoolData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Announcement } from '../types';

export const HomePage: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [activeAnnounceFilter, setActiveAnnounceFilter] = useState<string>('All');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  const filteredAnnouncements = activeAnnounceFilter === 'All'
    ? announcementsData
    : announcementsData.filter(a => a.category === activeAnnounceFilter);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#4A0A0A] via-[#560D0D] to-[#380606] text-white">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8872B_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Hero Background Banner overlay (dimmed for sleek contrast) */}
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <img 
            src="/images/hero-banner.png" 
            alt="School Campus Banner" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Mission */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 border border-[#C8872B]/40 text-amber-200 text-xs sm:text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#C8872B] animate-pulse"></span>
                <span>Government Approved 1AB Mixed Maha Vidyalaya</span>
              </div>

              {/* Main Title */}
              <div>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF2DF] leading-tight drop-shadow-md">
                  Sir John Kotelawala
                  <span className="block text-[#E1B463] text-2xl sm:text-4xl lg:text-5xl font-normal mt-1">
                    Maha Vidyalaya
                  </span>
                </h1>
                <p className="text-amber-200/90 text-sm sm:text-base font-medium mt-2 tracking-wider">
                  {schoolInfo.sinhalaName} • Piliyandala
                </p>
              </div>

              {/* Motto Box */}
              <div className="bg-black/25 border-l-4 border-[#C8872B] p-4 rounded-r-lg max-w-2xl backdrop-blur-sm">
                <p className="text-[#F4E2BE] font-serif italic text-base sm:text-lg">
                  "{schoolInfo.mottoEnglish}"
                </p>
                <p className="text-amber-300/80 text-xs sm:text-sm mt-1 font-sans">
                  {schoolInfo.mottoSinhala} — Established February 6, 1980
                </p>
              </div>

              <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Nurturing over 2,300 students from Grade 1 to Advanced Level in the Kesbewa Education Division with a legacy of discipline, cultural integrity, and academic distinction.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C8872B] to-[#E1B463] text-[#3D0707] font-bold text-sm tracking-wide rounded-md shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>ADMISSIONS 2026/27</span>
                </Link>

                <Link
                  to="/academics"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-black/40 hover:bg-black/60 text-amber-100 font-semibold text-sm tracking-wide rounded-md border border-[#C8872B]/50 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#C8872B]" />
                  <span>ACADEMIC CURRICULUM</span>
                </Link>

                <Link
                  to="/sports"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-amber-200/90 hover:text-white font-medium text-sm transition-colors group"
                >
                  <span>Sports Schedule</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Crest Emblem */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 sm:p-8 bg-black/30 border-2 border-[#C8872B]/40 rounded-2xl shadow-2xl backdrop-blur-sm group hover:border-[#C8872B] transition-all duration-300 flex flex-col items-center text-center">
                <div className="absolute -top-3 -right-3 bg-[#C8872B] text-[#3D0707] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
                  Since 1980
                </div>
                <div className="w-full flex justify-center items-center">
                  <img 
                    src="/images/logo-color.png" 
                    alt="Official Crest of Sir John Kotelawala Maha Vidyalaya" 
                    className="mx-auto block w-44 h-44 sm:w-52 sm:h-52 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center mt-4">
                  <div className="text-xs uppercase font-serif tracking-widest text-amber-200">
                    Sacred Lotus & Knowledge Torch
                  </div>
                  <div className="text-[11px] text-amber-100/60 mt-0.5">
                    Land Heritage of Gen. Sir John Kotelawala
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Key Statistics Strip */}
        <div className="border-t border-[#C8872B]/30 bg-[#280505]/90 py-6 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 whitespace-nowrap">{schoolInfo.stats.students}</div>
              <div className="text-xs text-amber-100/70 uppercase tracking-wider mt-0.5 whitespace-nowrap">Active Students</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 whitespace-nowrap">{schoolInfo.stats.teachers}</div>
              <div className="text-xs text-amber-100/70 uppercase tracking-wider mt-0.5 whitespace-nowrap">Qualified Staff</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 whitespace-nowrap">{schoolInfo.stats.primaryStudents}</div>
              <div className="text-xs text-amber-100/70 uppercase tracking-wider mt-0.5 whitespace-nowrap">Primary Students</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 whitespace-nowrap">1 - 13</div>
              <div className="text-xs text-amber-100/70 uppercase tracking-wider mt-0.5 whitespace-nowrap">Grades Taught</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 whitespace-nowrap">1st Place</div>
              <div className="text-xs text-amber-100/70 uppercase tracking-wider mt-0.5 whitespace-nowrap">All-Ceylon Drama</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 whitespace-nowrap">{schoolInfo.stats.yearsExcellence}</div>
              <div className="text-xs text-amber-100/70 uppercase tracking-wider mt-0.5 whitespace-nowrap">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTICE BOARD & ANNOUNCEMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-elevated border border-stone-200 overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-[#FAF9F5] p-5 sm:p-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#560D0D] text-[#FAF2DF]">
                <Bell className="w-5 h-5 text-[#C8872B]" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#3D0707]">
                  Official College Notice Board
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Latest circulars, examination schedules, and institutional notices
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'Admissions', 'Examination', 'Sports', 'Event'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveAnnounceFilter(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeAnnounceFilter === cat
                      ? 'bg-[#560D0D] text-amber-300 shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Announcements List */}
          <div className="divide-y divide-stone-100">
            {filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedAnnouncement(item)}
                className="p-5 sm:p-6 hover:bg-[#FAF9F5] transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs text-stone-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#C8872B]" />
                      {item.date}
                    </span>
                    <Badge variant={item.category === 'Admissions' ? 'gold' : item.category === 'Examination' ? 'maroon' : 'neutral'}>
                      {item.category}
                    </Badge>
                    {item.isUrgent && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 animate-pulse">
                        Urgent Notice
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#8A5217] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-semibold text-[#8A5217] group-hover:translate-x-0.5 transition-transform">
                    View Details
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#C8872B] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRINCIPAL'S WELCOME STATEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-elevated border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Principal Photo Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#3D0707] via-[#560D0D] to-[#2B0808] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-6 text-center sm:text-left">
                <div className="inline-block px-3 py-1 bg-black/40 border border-[#C8872B]/40 rounded-full text-xs text-amber-200 font-semibold tracking-wider uppercase">
                  College Leadership
                </div>

                <div className="flex justify-center sm:justify-start">
                  <div className="relative p-1.5 rounded-xl bg-gradient-to-b from-[#C8872B] to-[#3D0707] shadow-xl">
                    <img 
                      src={schoolInfo.principal.image} 
                      alt={`Principal ${schoolInfo.principal.name}`} 
                      className="w-48 h-60 sm:w-56 sm:h-72 object-cover rounded-lg filter contrast-105"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#FAF2DF]">
                    {schoolInfo.principal.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E1B463] font-medium mt-0.5">
                    {schoolInfo.principal.qualifications}
                  </p>
                  <p className="text-xs text-amber-200/70 uppercase tracking-widest mt-1">
                    Principal, Sir John Kotelawala Maha Vidyalaya
                  </p>
                </div>
              </div>

              {/* Decorative Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
                <img src="/images/logo-bw.png" alt="" className="w-64 h-64" />
              </div>
            </div>

            {/* Principal's Letter */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8A5217] uppercase tracking-wider mb-2">
                  <Flame className="w-4 h-4 text-[#C8872B]" />
                  <span>Principal's Address</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D0707] leading-tight">
                  Welcome to Sir John Kotelawala Maha Vidyalaya
                </h3>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>
                  As you explore our website, you will discover our talented students, our rich history and our diverse strengths. Our commitment as a <strong className="text-[#3D0707]">“Mother School”</strong> is to provide a safe and intellectually challenging environment that empowers students to develop the strong personalities essential for meeting the challenges of the twenty-first century.
                </p>
                <p>
                  Sir John Kotelawala Maha Vidyalaya is one of the leading mixed schools in the region, serving students from Grade 1 through to the Advanced Level within the Kesbewa Education Division. We strive to create a learning environment that inspires staff, students and parents alike. We encourage our entire school community to engage fully in all aspects of school life and to identify with our core values, such as respect, integrity, collaboration and excellence.
                </p>
                <p>
                  We are proud to provide an optimum education and a well-disciplined environment that shapes each child’s character, allowing them to step into the world with confidence. Under the guidance of the Ministry of Education and the Piliyandala Zonal Education Office, our dedicated 98-member faculty remains steadfast in bringing out the very best in every child.
                </p>
              </div>

              {/* Vision & Mission Highlight Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                <div className="bg-[#FAF9F5] p-4 rounded-lg border-l-2 border-[#C8872B]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5217] mb-1">
                    Our Vision
                  </h4>
                  <p className="text-xs text-stone-700 font-medium">
                    {schoolInfo.vision}
                  </p>
                </div>
                <div className="bg-[#FAF9F5] p-4 rounded-lg border-l-2 border-[#560D0D]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E1313] mb-1">
                    Our Mission
                  </h4>
                  <p className="text-xs text-stone-700 font-medium">
                    {schoolInfo.mission}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#560D0D] hover:text-[#C8872B] transition-colors group"
                >
                  <span>Read Full College History & Media Unit Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ACADEMIC STRUCTURE OVERVIEW (Fixes the old site's broken 404!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curriculum Framework"
          title="Comprehensive Academic Pathways"
          subtitle="From early primary foundational literacy to collegiate G.C.E. Advanced Level specializations, structured under national Ministry of Education standards."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Primary Section */}
          <div className="bg-white rounded-xl p-6 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B]/50 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center min-w-[4.25rem] h-10 px-3.5 rounded-lg bg-[#FAF2DF] text-[#8A5217] font-bold text-sm sm:text-base tracking-wide border border-[#C8872B]/30 group-hover:bg-[#C8872B] group-hover:text-white transition-colors">
                1 – 5
              </div>
              <div>
                <span className="text-xs font-semibold text-[#C8872B] uppercase tracking-wider">Primary Section</span>
                <h3 className="font-serif font-bold text-lg text-stone-900 mt-1">
                  Grades 1 to 5
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                680+ young learners in the Batakaththara community. Foundational Sinhala, Mathematics, Environmental Studies, English, and Grade 5 Scholarship preparation.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 mt-4 text-xs font-semibold text-[#8A5217] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Primary Curriculum</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Junior Secondary */}
          <div className="bg-white rounded-xl p-6 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B]/50 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center min-w-[4.25rem] h-10 px-3.5 rounded-lg bg-[#FAF2DF] text-[#8A5217] font-bold text-sm sm:text-base tracking-wide border border-[#C8872B]/30 group-hover:bg-[#C8872B] group-hover:text-white transition-colors">
                6 – 9
              </div>
              <div>
                <span className="text-xs font-semibold text-[#C8872B] uppercase tracking-wider">Junior Secondary</span>
                <h3 className="font-serif font-bold text-lg text-stone-900 mt-1">
                  Grades 6 to 9
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Holistic curriculum introducing Science, Practical Technical Skills, History, Geography, Aesthetic Subjects (Art, Music, Dancing), and ICT fundamentals.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 mt-4 text-xs font-semibold text-[#8A5217] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Junior Studies Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: G.C.E. Ordinary Level */}
          <div className="bg-white rounded-xl p-6 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B]/50 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center min-w-[4.75rem] h-10 px-3.5 rounded-lg bg-[#FAF2DF] text-[#8A5217] font-bold text-sm sm:text-base tracking-wide border border-[#C8872B]/30 group-hover:bg-[#C8872B] group-hover:text-white transition-colors">
                10 – 11
              </div>
              <div>
                <span className="text-xs font-semibold text-[#C8872B] uppercase tracking-wider">Ordinary Level</span>
                <h3 className="font-serif font-bold text-lg text-stone-900 mt-1">
                  G.C.E. O/L (Grades 10-11)
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Intensive preparation across 9 core and elective subjects. Over 88% qualification rate with structured revision camps and continuous monitoring.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 mt-4 text-xs font-semibold text-[#8A5217] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>O/L Subject Groups</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: G.C.E. Advanced Level */}
          <div className="bg-gradient-to-br from-[#560D0D] to-[#380606] text-white rounded-xl p-6 shadow-elevated border border-[#C8872B]/40 hover:border-amber-400 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center min-w-[4.75rem] h-10 px-3.5 rounded-lg bg-[#C8872B] text-[#3D0707] font-bold text-sm sm:text-base tracking-wide shadow-sm">
                12 – 13
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Collegiate Stream</span>
                <h3 className="font-serif font-bold text-lg text-amber-100 mt-1">
                  G.C.E. A/L (Grades 12-13)
                </h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Five academic streams: Biological Science, Physical Science (Maths), Commerce, Arts, and Technology. Preparing candidates for state university entrance.
              </p>
            </div>
            <div className="pt-4 border-t border-amber-300/20 mt-4 text-xs font-semibold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore A/L Streams</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
          <Link
            to="/academics"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#560D0D] text-amber-200 hover:text-white hover:bg-[#3D0707] font-semibold text-sm transition-all"
          >
            <span>View Full Academic Prospectus & Subject Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ACHIEVEMENTS & GLORY BANNER */}
      <section className="bg-gradient-to-r from-[#2B0808] via-[#4A0A0A] to-[#2B0808] text-white py-16 border-y-4 border-[#C8872B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="National Honors"
            title="School Achievements & All-Ceylon Championships"
            subtitle="Sir John Kotelawala Maha Vidyalaya consistently brings glory to the Kesbewa Division at nationwide competitions."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievementsData.slice(0, 3).map((ach) => (
              <div 
                key={ach.id}
                className="bg-black/40 border border-[#C8872B]/40 rounded-xl p-6 backdrop-blur-sm relative group hover:border-amber-400 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif font-bold text-amber-400">
                    {ach.year}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#C8872B]/20 text-amber-300 border border-[#C8872B]/40 text-xs font-bold uppercase">
                    <Trophy className="w-3.5 h-3.5 text-[#C8872B]" />
                    {ach.placement}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#FAF2DF] mb-2 group-hover:text-amber-300 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-xs text-amber-200/70 font-medium mb-3">
                  {ach.competition}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>

          {/* Achievement Visual Banners from original site */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="relative rounded-xl overflow-hidden border border-[#C8872B]/40 shadow-xl group">
              <img 
                src="/images/achievements-1.png" 
                alt="College Achievements Banner 1" 
                className="w-full h-56 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Pride of Piliyandala</span>
                  <h4 className="font-serif text-lg text-white font-bold">Performing Arts & Drama Festival Champions</h4>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-[#C8872B]/40 shadow-xl group">
              <img 
                src="/images/achievements-2.png" 
                alt="College Achievements Banner 2" 
                className="w-full h-56 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">All-Island Accolades</span>
                  <h4 className="font-serif text-lg text-white font-bold">All-Ceylon Music Competition Laureates</h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CAMPUS PHOTO GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#FAF2DF] text-[#8A5217] border border-[#C8872B]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8872B]"></span>
              Campus Life & Traditions
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D0707]">
              Moments of Kotelawala Heritage
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Gilanpasa Buddha Pooja, athletic championships, and student co-curricular activities.
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#8A5217] hover:text-[#560D0D] transition-colors"
          >
            <span>See More News & Photos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryImg(item.imageUrl)}
              className="group relative rounded-xl overflow-hidden shadow-subtle border border-stone-200 aspect-square cursor-pointer hover:shadow-elevated transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3 text-white">
                <p className="text-[11px] font-medium leading-tight">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADMISSION & INQUIRY CALL-TO-ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF2DF] border-2 border-[#C8872B]/50 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-elevated">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A5217]">
                New Academic Year Admissions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D0707] leading-tight">
                Join Sir John Kotelawala Maha Vidyalaya
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
                We welcome admissions for Grade 1, Grade 6 (Scholarship transfer), and Grade 12 (Advanced Level streams in Science, Maths, Commerce, Arts, and Technology). Explore requirements or submit an online inquiry.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/admissions"
                className="text-center px-6 py-3.5 bg-[#560D0D] text-amber-200 hover:text-white hover:bg-[#3D0707] font-bold text-sm rounded-lg shadow-md transition-all"
              >
                Admissions Guidelines & Forms
              </Link>
              <Link
                to="/contact"
                className="text-center px-6 py-3.5 bg-white text-[#3D0707] hover:bg-stone-50 border border-[#C8872B]/50 font-semibold text-sm rounded-lg transition-all"
              >
                Contact School Office
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Announcement Detail Modal */}
      <Modal
        isOpen={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        title={selectedAnnouncement?.title || 'Notice Details'}
      >
        {selectedAnnouncement && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Calendar className="w-4 h-4 text-[#C8872B]" />
              <span>Date: {selectedAnnouncement.date}</span>
              <span>•</span>
              <Badge variant={selectedAnnouncement.category === 'Admissions' ? 'gold' : 'maroon'}>
                {selectedAnnouncement.category}
              </Badge>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-lg border border-stone-200 text-stone-800 text-sm leading-relaxed">
              {selectedAnnouncement.summary}
            </div>

            <p className="text-xs text-stone-500 italic">
              Issued under the authority of the Principal's Office, Sir John Kotelawala Maha Vidyalaya, Kolamunna, Piliyandala.
            </p>

            <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-semibold"
              >
                Close
              </button>
              {selectedAnnouncement.category === 'Admissions' && (
                <Link
                  to="/admissions"
                  onClick={() => setSelectedAnnouncement(null)}
                  className="px-4 py-2 bg-[#560D0D] text-amber-300 rounded text-xs font-semibold hover:bg-[#3D0707]"
                >
                  Go to Admissions Page
                </Link>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Lightbox Image Preview Modal */}
      <Modal
        isOpen={!!selectedGalleryImg}
        onClose={() => setSelectedGalleryImg(null)}
        maxWidth="3xl"
        title="Campus Photograph Preview"
      >
        {selectedGalleryImg && (
          <div className="space-y-3">
            <img 
              src={selectedGalleryImg} 
              alt="Enlarged Campus View" 
              className="w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-center text-xs text-stone-500">
              Sir John Kotelawala Maha Vidyalaya Archive & Media Unit Documentation
            </p>
          </div>
        )}
      </Modal>

    </div>
  );
};
