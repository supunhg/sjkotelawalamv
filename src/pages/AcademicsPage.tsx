import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  FileText, 
  Cpu, 
  FlaskConical, 
  Palette, 
  Library, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PageHeader } from '../components/layout/PageHeader';
import { Badge } from '../components/common/Badge';
import { Link } from 'react-router-dom';

export const AcademicsPage: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<'bio' | 'math' | 'commerce' | 'arts' | 'tech'>('bio');

  const alStreams = [
    {
      id: 'bio',
      name: 'Biological Science',
      badge: 'Science Stream',
      description: 'Prepares students for medicine, dental surgery, veterinary sciences, biological research, and agricultural biotechnology.',
      subjects: ['Biology', 'Chemistry', 'Physics or Agricultural Science', 'General English', 'Common General Test'],
      careerPaths: 'Medicine, Dentistry, Nursing, Genetics, Pharmacy, Microbiology, Environmental Conservation',
    },
    {
      id: 'math',
      name: 'Physical Science (Mathematics)',
      badge: 'Maths Stream',
      description: 'Rigorous analytical foundation designed for engineering, computer science, architectural, and physical science degrees.',
      subjects: ['Combined Mathematics', 'Physics', 'Chemistry or Information Technology (ICT)', 'General English', 'Common General Test'],
      careerPaths: 'Civil / Mechanical / Software Engineering, Data Science, Artificial Intelligence, Architecture, Actuarial Science',
    },
    {
      id: 'commerce',
      name: 'Commerce & Management',
      badge: 'Business Stream',
      description: 'Focuses on financial accounting, corporate management, macroeconomics, and modern business technology.',
      subjects: ['Accounting', 'Business Studies', 'Economics or Information Technology (ICT)', 'General English', 'Common General Test'],
      careerPaths: 'Chartered Accountancy, Corporate Law, Financial Analysis, Banking, Business Administration, Marketing',
    },
    {
      id: 'arts',
      name: 'Humanities & Social Sciences',
      badge: 'Arts Stream',
      description: 'Celebrates cultural heritage, political dynamics, linguistics, and media studies with a history of all-island drama and music awards.',
      subjects: ['Sinhala Literature', 'Media Studies', 'Political Science', 'Buddhist Civilization', 'Geography or Logic'],
      careerPaths: 'Legal Profession, Journalism, Public Policy, Mass Communication, Teaching, Foreign Service, Creative Arts',
    },
    {
      id: 'tech',
      name: 'Technology (Biosystems & Engineering)',
      badge: 'Technology Stream',
      description: 'A modern practical stream combining hands-on technical competencies with scientific and computational methodologies.',
      subjects: ['Science for Technology (SFT)', 'Engineering Technology (ET) or Biosystems Tech (BST)', 'Information Technology (ICT)', 'General English'],
      careerPaths: 'Engineering Technologist, Network Engineering, Industrial Automation, Agro-Tech, Quality Assurance',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* INSTITUTIONAL PAGE HEADER */}
      <PageHeader
        title="Academics & Curricular Programs"
        sinhalaTitle="පාසල් අධ්‍යාපන විෂයමාලාව • Kesbewa Division"
        subtitle="National curriculum pathways from foundational Primary education (Grades 1–5) to G.C.E. Advanced Level collegiate specializations across five streams."
        breadcrumbs={[{ label: 'Academics' }]}
        badges={[
          { icon: GraduationCap, text: 'Grades 1 through 13' },
          { icon: BookOpen, text: '5 A/L Collegiate Streams' },
          { icon: Award, text: '88%+ O/L Qualification Rate' },
        ]}
      />

      {/* ACADEMIC LEVELS BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curriculum Stages"
          title="Educational Divisions at Kotelawala"
          subtitle="A continuous learning path nurturing students from Grade 1 through the Advanced Level examination."
        />

        <div className="space-y-8">
          
          {/* Level 1: Primary Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A5217]">Foundational Learning</span>
                <h3 className="font-serif text-2xl font-bold text-[#3D0707] mt-1">
                  Primary Section (Grades 1 – 5)
                </h3>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#FAF2DF] text-[#8A5217] rounded-lg text-xs font-bold">
                  <span>683 Active Students</span>
                  <span>•</span>
                  <span>Batakaththara Community</span>
                </div>
                <p className="text-xs text-stone-600 mt-4 leading-relaxed">
                  Celebrated throughout the Batakaththara area for its nurturing environment, strong foundational Sinhala language fluency, arithmetic, and character development.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#FAF9F5] p-5 sm:p-6 rounded-xl border border-stone-200">
                <h4 className="font-serif font-bold text-sm text-[#3D0707] uppercase tracking-wider mb-3">
                  Key Focus Areas & Grade 5 Scholarship
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C8872B] shrink-0 mt-0.5" />
                    <span><strong>Mother Tongue & Literacy:</strong> Sinhala reading, creative writing, and basic spoken English.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C8872B] shrink-0 mt-0.5" />
                    <span><strong>Mathematics & Logic:</strong> Fundamental numeracy, shapes, pattern recognition, and problem solving.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C8872B] shrink-0 mt-0.5" />
                    <span><strong>Environmental Studies (ERA):</strong> Sri Lankan history, nature awareness, and civic cleanliness.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C8872B] shrink-0 mt-0.5" />
                    <span><strong>Grade 5 Scholarship Program:</strong> Specialized weekend coaching and past-paper mock examinations.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 2: Junior Secondary */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A5217]">Middle School Years</span>
                <h3 className="font-serif text-2xl font-bold text-[#3D0707] mt-1">
                  Junior Secondary (Grades 6 – 9)
                </h3>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#FAF2DF] text-[#8A5217] rounded-lg text-xs font-bold">
                  <span>General Secondary Core</span>
                  <span>•</span>
                  <span>11 Subjects</span>
                </div>
                <p className="text-xs text-stone-600 mt-4 leading-relaxed">
                  Broadening intellectual horizon with laboratory experiments, technical practical subjects, geography, civic education, and aesthetic talents.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#FAF9F5] p-5 sm:p-6 rounded-xl border border-stone-200">
                <h4 className="font-serif font-bold text-sm text-[#3D0707] uppercase tracking-wider mb-3">
                  Curriculum Subjects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Sinhala Language & Lit.',
                    'Buddhism',
                    'Mathematics',
                    'Science & Technology',
                    'English Language',
                    'History',
                    'Geography',
                    'Civic Education',
                    'Aesthetic (Art/Music/Dancing)',
                    'Practical Technical Skills (PTS)',
                    'ICT Fundamentals'
                  ].map((sub, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-stone-300 rounded text-xs text-stone-800 font-medium">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Level 3: G.C.E. Ordinary Level */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A5217]">National Milestone</span>
                <h3 className="font-serif text-2xl font-bold text-[#3D0707] mt-1">
                  G.C.E. Ordinary Level (Grades 10 – 11)
                </h3>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>88%+ A/L Qualification Rate</span>
                </div>
                <p className="text-xs text-stone-600 mt-4 leading-relaxed">
                  Rigorous supervision process, weekly model papers, and after-school revision camps ensure exceptional national pass rates.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#FAF9F5] p-5 sm:p-6 rounded-xl border border-stone-200">
                <h4 className="font-serif font-bold text-sm text-[#3D0707] uppercase tracking-wider mb-3">
                  9 Subject Groupings for G.C.E. O/L
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                  <div>
                    <span className="font-bold text-[#3D0707] block mb-1">6 Core Subjects:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                      <li>Buddhism</li>
                      <li>Sinhala Language & Literature</li>
                      <li>Mathematics</li>
                      <li>Science</li>
                      <li>English Language</li>
                      <li>History</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-[#3D0707] block mb-1">3 Elective Subject Baskets:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                      <li><strong>Basket I:</strong> Commerce / Geography / Civics</li>
                      <li><strong>Basket II:</strong> Music / Drama / Art / Dancing</li>
                      <li><strong>Basket III:</strong> ICT / Agriculture / Health / Home Science</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* COLLEGIATE G.C.E. ADVANCED LEVEL (GRADES 12 - 13) STREAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Higher Secondary"
          title="G.C.E. Advanced Level Academic Streams"
          subtitle="Explore the five distinct academic streams offered at Sir John Kotelawala Maha Vidyalaya for university entrance preparation."
        />

        {/* Stream Selector Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {alStreams.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStream(s.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedStream === s.id
                  ? 'bg-[#560D0D] text-amber-300 shadow-md font-bold'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Active Stream Details Card */}
        {(() => {
          const stream = alStreams.find((s) => s.id === selectedStream)!;
          return (
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-elevated border-2 border-[#C8872B]/50 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-5 space-y-4">
                  <Badge variant="gold">{stream.badge}</Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D0707]">
                    {stream.name} Stream
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {stream.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217] block mb-1">
                      Prominent Career Horizons
                    </span>
                    <p className="text-xs text-stone-700 font-medium leading-relaxed bg-[#FAF9F5] p-3 rounded-lg border border-stone-200">
                      {stream.careerPaths}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#FAF2DF]/40 p-6 rounded-xl border border-[#C8872B]/30 space-y-4">
                  <h4 className="font-serif font-bold text-base text-[#3D0707] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C8872B]" />
                    <span>Curricular Subject Combinations</span>
                  </h4>

                  <ul className="space-y-2.5">
                    {stream.subjects.map((sub, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-800 bg-white p-3 rounded-md border border-stone-200 shadow-sm">
                        <span className="w-5 h-5 rounded-full bg-[#560D0D] text-amber-200 flex items-center justify-center text-[10px] font-bold">
                          {i + 1}
                        </span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-[#C8872B]/30 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-xs text-stone-600">
                      Minimum G.C.E. O/L requirements apply.
                    </span>
                    <Link
                      to="/admissions"
                      className="px-4 py-2 bg-[#560D0D] hover:bg-[#3D0707] text-amber-200 text-xs font-bold rounded shadow transition-all"
                    >
                      Apply for {stream.name} →
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}
      </section>

      {/* ACADEMIC FACILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Campus Infrastructure"
          title="State-of-the-Art Learning Facilities"
          subtitle="Modernized infrastructure designed to cultivate scientific inquiry, technological skill, and artistic expression."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-subtle border border-stone-200 hover:shadow-elevated transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-[#C8872B]" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#3D0707] mb-2">Modern ICT Laboratory</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Equipped with 40 high-performance workstations, fiber internet connection, and development tools for programming and media design.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-subtle border border-stone-200 hover:shadow-elevated transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center mb-4">
              <FlaskConical className="w-6 h-6 text-[#C8872B]" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#3D0707] mb-2">Science Laboratories</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Fully stocked labs for Chemistry, Biology, and Physics experiments, supporting both O/L and A/L practical research.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-subtle border border-stone-200 hover:shadow-elevated transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center mb-4">
              <Library className="w-6 h-6 text-[#C8872B]" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#3D0707] mb-2">College Library & Reading Room</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              An extensive repository of reference texts, past papers, national periodicals, and peaceful study cubicles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-subtle border border-stone-200 hover:shadow-elevated transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-[#C8872B]" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#3D0707] mb-2">Aesthetic & Drama Studios</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dedicated rehearsal pavilions where our All-Ceylon championship drama troupes and music ensembles train.
            </p>
          </div>
        </div>
      </section>

      {/* FORMAL SUPERVISION & ACADEMIC CALENDAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] border border-stone-300 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217]">Quality Assurance</span>
              <h3 className="font-serif text-2xl font-bold text-[#3D0707]">
                Teacher Supervision & Progress Analytics
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                The commitment of our 98-member teaching staff is reinforced through formal supervision processes instituted by former and current principals. Every term, detailed syllabus coverage and diagnostic assessment results are analyzed with the Zonal Education Office to tailor remedial coaching for every student.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#8A5217]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#C8872B]" />
                  <span>Termly Progress Reports</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#C8872B]" />
                  <span>Teacher-Parent Conferences</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
              <h4 className="font-serif font-bold text-base text-[#3D0707] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C8872B]" />
                <span>Standard Three-Term School Calendar</span>
              </h4>
              <div className="space-y-2 text-xs text-stone-700">
                <div className="p-2.5 rounded bg-stone-50 flex justify-between items-center">
                  <span className="font-semibold text-stone-900">Term 1 (January – April)</span>
                  <span className="text-stone-500">Athletics & First Evaluation</span>
                </div>
                <div className="p-2.5 rounded bg-stone-50 flex justify-between items-center">
                  <span className="font-semibold text-stone-900">Term 2 (May – August)</span>
                  <span className="text-stone-500">Mid-Year Exams & Cultural Days</span>
                </div>
                <div className="p-2.5 rounded bg-stone-50 flex justify-between items-center">
                  <span className="font-semibold text-stone-900">Term 3 (September – December)</span>
                  <span className="text-stone-500">Final Evaluations & National O/L</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
