import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  MapPin, 
  Search, 
  Radio, 
  Atom, 
  Lightbulb, 
  TrendingUp, 
  Monitor, 
  HeartHandshake,
  CheckCircle2,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { sportsScheduleData, micTeachersData, clubsData } from '../data/schoolData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';

export const SportsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredSports = sportsScheduleData.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.days.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getMicTeacher = (sportName: string) => {
    if (sportName.includes('Athletics')) return 'Athletics Coaching Staff';
    if (sportName.includes('Karate')) return 'Mr. Bandula Perera';
    const found = micTeachersData.find(m => sportName.toLowerCase().includes(m.sport.toLowerCase()));
    return found ? found.teacherName : 'Sports Council';
  };

  const getClubIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-6 h-6 text-[#C8872B]" />;
      case 'Atom': return <Atom className="w-6 h-6 text-[#C8872B]" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-[#C8872B]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#C8872B]" />;
      case 'Monitor': return <Monitor className="w-6 h-6 text-[#C8872B]" />;
      default: return <HeartHandshake className="w-6 h-6 text-[#C8872B]" />;
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* PAGE HEADER HERO WITH SPORTS BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#4A0A0A] via-[#560D0D] to-[#380606] text-white py-16 sm:py-24 border-b-4 border-[#C8872B]">
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <img 
            src="/images/sports-banner.png" 
            alt="Sports Banner" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#C8872B]/40 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#C8872B]" />
            <span>Athletics, Fitness & Co-Curricular Excellence</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF2DF] tracking-tight">
            Sports & Student Athletics
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-100/80 max-w-2xl mx-auto font-serif italic">
            "Fostering endurance, team camaraderie, and national sportsmanship"
          </p>

          <p className="mt-2 text-xs sm:text-sm text-amber-200/60 max-w-xl mx-auto">
            Comprehensive athletics, field sports, martial arts, and mind sports under certified coaches and Master-in-Charge teachers.
          </p>
        </div>
      </section>

      {/* SPORTS TRAINING SCHEDULE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          badge="Weekly Timetable"
          title="Official Sports Training Schedule"
          subtitle="Regular training sessions held before and after school hours across the college grounds, courts, and indoor pavilions."
        />

        {/* Filter, Search & View Controls */}
        <div className="bg-white rounded-xl p-4 shadow-subtle border border-stone-200 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto">
            {['All', 'Athletics', 'Team Sports', 'Racquet Sports', 'Mind & Combat'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#560D0D] text-amber-300 shadow font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sport or day..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
              <button
                onClick={() => setViewMode('table')}
                aria-label="Table view"
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white shadow text-[#560D0D]' : 'text-stone-500'}`}
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                aria-label="Card view"
                className={`p-1.5 rounded ${viewMode === 'cards' ? 'bg-white shadow text-[#560D0D]' : 'text-stone-500'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* VIEW 1: SPACIOUS DESKTOP TABLE */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl shadow-elevated border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[840px] text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF9F5] border-b border-stone-200 text-[#3D0707] font-serif font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-4 px-6 w-1/4">Sport & Discipline</th>
                    <th className="py-4 px-6 w-1/6">Training Days</th>
                    <th className="py-4 px-6 w-1/4">Session Hours</th>
                    <th className="py-4 px-6 w-1/5">Training Venue</th>
                    <th className="py-4 px-6">Teacher-in-Charge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredSports.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF2DF]/30 transition-colors">
                      {/* Column 1: Sport + Category Badge */}
                      <td className="py-4 px-6">
                        <div className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-tight">
                          {item.sport}
                        </div>
                        <div className="mt-1.5">
                          <Badge variant={item.category === 'Athletics' ? 'gold' : 'neutral'}>
                            {item.category}
                          </Badge>
                        </div>
                      </td>

                      {/* Column 2: Training Days */}
                      <td className="py-4 px-6 whitespace-nowrap font-medium text-stone-800">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#C8872B] shrink-0" />
                          <span>{item.days}</span>
                        </span>
                      </td>

                      {/* Column 3: Session Times (With generous whitespace-nowrap) */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          {item.morningTime && (
                            <div className="inline-flex items-center gap-1.5 text-xs text-[#8A5217] font-semibold bg-[#FAF2DF] px-2.5 py-1 rounded w-fit">
                              <Clock className="w-3.5 h-3.5 text-[#C8872B] shrink-0" />
                              <span className="whitespace-nowrap">Morning: {item.morningTime}</span>
                            </div>
                          )}
                          <div className="inline-flex items-center gap-1.5 text-xs text-stone-900 font-semibold bg-stone-100 px-2.5 py-1 rounded w-fit">
                            <Clock className="w-3.5 h-3.5 text-[#C8872B] shrink-0" />
                            <span className="whitespace-nowrap">
                              {item.morningTime ? `Evening: ${item.eveningTime}` : item.eveningTime}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 4: Venue */}
                      <td className="py-4 px-6 whitespace-nowrap text-stone-600">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                          <span>{item.venue || 'College Grounds'}</span>
                        </span>
                      </td>

                      {/* Column 5: MIC Teacher */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FAF9F5] border border-stone-200 text-[#3D0707]">
                          {getMicTeacher(item.sport)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSports.length === 0 && (
              <div className="py-12 text-center text-stone-500 text-sm">
                No sports found matching your search criteria.
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: RESPONSIVE CARDS VIEW */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSports.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B]/60 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={item.category === 'Athletics' ? 'gold' : 'neutral'}>
                      {item.category}
                    </Badge>
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {item.venue}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {item.sport}
                  </h3>

                  <div className="space-y-2 pt-2 text-xs">
                    <div className="flex items-center gap-2 text-stone-700">
                      <Calendar className="w-4 h-4 text-[#C8872B] shrink-0" />
                      <span className="font-semibold">{item.days}</span>
                    </div>

                    {item.morningTime && (
                      <div className="flex items-center gap-2 text-[#8A5217]">
                        <Clock className="w-4 h-4 text-[#C8872B] shrink-0" />
                        <span className="font-medium">Morning: {item.morningTime}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-stone-900">
                      <Clock className="w-4 h-4 text-[#C8872B] shrink-0" />
                      <span className="font-semibold">
                        {item.morningTime ? `Evening: ${item.eveningTime}` : item.eveningTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">MIC:</span>
                  <span className="font-bold text-[#3D0707]">{getMicTeacher(item.sport)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MASTER-IN-CHARGE (MIC) TEACHERS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="Faculty Sports Leadership"
          title="Master-in-Charge (MIC) Teachers"
          subtitle="Dedicated teachers guiding student athletic development, registrations, and tournament discipline."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {micTeachersData.map((mic) => (
            <div 
              key={mic.id}
              className="bg-white rounded-xl p-5 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B] transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217] bg-[#FAF2DF] px-2.5 py-1 rounded whitespace-nowrap">
                  {mic.sport}
                </span>
                <Trophy className="w-4 h-4 text-[#C8872B] group-hover:scale-110 transition-transform" />
              </div>

              <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#560D0D] transition-colors">
                {mic.teacherName}
              </h4>

              <p className="text-xs text-stone-500 mt-1">
                {mic.designation}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Sports Council Member</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLUBS & SOCIETIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="Co-Curricular Life"
          title="Clubs, Guilds & Societies"
          subtitle="Empowering student innovation, leadership, spiritual development, and technical expertise outside the classroom."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubsData.map((club) => (
            <div 
              key={club.id}
              className="bg-white rounded-2xl p-6 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B]/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF2DF] flex items-center justify-center">
                    {getClubIcon(club.iconName)}
                  </div>
                  <Badge variant={club.category === 'Technology' ? 'gold' : club.category === 'Media' ? 'maroon' : 'neutral'}>
                    {club.category}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-lg text-[#3D0707]">
                    {club.name}
                  </h4>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {club.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-6 text-xs text-stone-500 space-y-1">
                <div className="font-medium text-stone-700">
                  <strong>Mentors:</strong> {club.leadTeacher}
                </div>
                <div>
                  <strong>Assembly / Meetings:</strong> {club.meetingDay}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ATHLETIC GLORY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] border-2 border-[#C8872B]/40 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217]">
              Join a Collegiate Team
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#3D0707]">
              Want to represent Sir John Kotelawala Maha Vidyalaya?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Trials for athletics squads, cricket XI, football, netball, and volleyball are announced at morning assembly. Speak with the relevant MIC teacher for entry forms.
            </p>
          </div>

          <a
            href="tel:0112604239"
            className="px-6 py-3.5 bg-[#560D0D] text-amber-200 hover:text-white hover:bg-[#3D0707] font-bold text-xs uppercase tracking-wider rounded-lg shrink-0 shadow transition-all whitespace-nowrap"
          >
            Inquire with Sports Council
          </a>
        </div>
      </section>

    </div>
  );
};
