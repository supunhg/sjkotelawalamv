import React, { useState } from 'react';
import { 
  Building2, 
  History, 
  Flame, 
  Radio, 
  Target, 
  Eye, 
  Users, 
  Award, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { schoolInfo } from '../data/schoolData';
import { SectionHeader } from '../components/common/SectionHeader';
import { PageHeader } from '../components/layout/PageHeader';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'mission' | 'media' | 'leadership'>('history');

  const historyMilestones = [
    {
      year: '1980',
      date: 'February 6, 1980',
      title: 'Foundation at Kollamunna Bimbarama Temple',
      description: 'Established through the dedicated initiative of former Health Minister Mr. Dharmasena Atigala and Piliyandala Education Officer J. A. T. A. Abeyratne. Commenced with just 8 students and 4 teachers under the leadership of Mr. P. A. P. Gunasekara.',
    },
    {
      year: '1980s-90s',
      date: 'Land of General Sir John Kotelawala',
      title: 'Relocation to Historic Estate Grounds',
      description: 'The school shifted to expansive land originally owned and bequeathed from the private estate of General Sir John Kotelawala, 3rd Prime Minister of Ceylon (Sri Lanka). The institution was formally designated in his honor.',
    },
    {
      year: '2000s',
      date: 'Navodaya Model School Transformation',
      title: 'Elevation under Mrs. Ramyalathaa Weerakkody',
      description: 'A transformative era of infrastructure and curricular growth. Mrs. Weerakkody pioneered the Navodaya school development, established the Media Unit, and fostered all-island artistic excellence.',
    },
    {
      year: '2017-2022',
      date: 'Tri-Championship Era',
      title: 'National Tri-Championships in Drama & Music',
      description: 'Sir John Kotelawala Maha Vidyalaya achieved national glory by winning 1st Place in the All-Ceylon Drama Festival (2017), 1st Place in the All-Ceylon Music Competition (2018), and 1st Place in the All-Ceylon Music Festival (2022).',
    },
    {
      year: 'Present',
      date: '2026 and Beyond',
      title: 'Thriving 1AB National Institution',
      description: 'Now educating over 2,309 students guided by 98 specialist teachers across Grades 1-13, with modernized ICT labs, active sports clubs, and bilingual media operations.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* INSTITUTIONAL PAGE HEADER */}
      <PageHeader
        title="About Sir John Kotelawala Maha Vidyalaya"
        sinhalaTitle="විද්‍යාලයීය ඉතිහාසය සහ පරිපාලනය • Piliyandala"
        subtitle="Established February 6, 1980 on the historic estate of General Sir John Kotelawala, serving over 2,300 students from Grade 1 to Advanced Level."
        breadcrumbs={[{ label: 'About College' }]}
        badges={[
          { icon: Building2, text: 'Established Feb 6, 1980' },
          { icon: Users, text: '2,300+ Students & 98 Faculty' },
          { icon: Award, text: 'Navodaya Model School' },
        ]}
      >
        {/* Sub-Navigation Tabs */}
        <div className="flex items-center justify-start gap-2 sm:gap-3 flex-wrap">
          {[
            { id: 'history', label: 'College History', icon: History },
            { id: 'mission', label: 'Vision, Mission & Crest', icon: Target },
            { id: 'media', label: 'College Media Unit', icon: Radio },
            { id: 'leadership', label: 'Leadership & Faculty', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#C8872B] text-[#2B0505] shadow font-bold'
                    : 'bg-black/30 text-amber-100/90 hover:bg-black/50 border border-amber-200/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </PageHeader>

      {/* TAB 1: HISTORY OF THE SCHOOL */}
      {activeTab === 'history' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge="Institutional Roots"
            title="The History of Sir John Kotelawala Maha Vidyalaya"
            subtitle="From humble beginnings with eight students in 1980 to an illustrious beacon of learning in Piliyandala."
          />

          {/* Comprehensive Narrative */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-elevated border border-stone-200 prose max-w-none text-stone-700 space-y-5 text-sm sm:text-base leading-relaxed">
            <p>
              Our college boasts a distinguished history, standing as a shining institution in the Piliyandala region. Established on <strong>February 6, 1980</strong>, within the sacred grounds of the Kollamunna Bimbarama temple, the foundation of our school was laid through the collaborative efforts of <strong>Mr. Dharmasena Atigala</strong>, the former Health Minister, and <strong>J. A. T. A. Abeyratne</strong>, the Education Officer for Piliyandala staff.
            </p>
            <p>
              Inaugurated under the stewardship of <strong>Mr. P. A. P. Gunasekara</strong>, our school witnessed subsequent guidance by dedicated individuals such as <strong>Mr. S. G. Ariyadasa</strong> and <strong>Mrs. A. Malani</strong>. Following the retirement of <strong>Mrs. Ramyalathaa Weerakkody</strong>, a pivotal figure in shaping the identity of the Navodaya concept, the esteemed position of principal was assumed by <strong>Mr. A. A. Sisira Kumara</strong>, and today is led with distinction by <strong>Principal Vajira V. Thanthrige</strong>.
            </p>
            <p>
              Situated on historic land once owned by the brave <strong>General Sir John Kotelawala</strong>, former Prime Minister of Sri Lanka, our school has evolved into Sir John Kotelawala Maha Vidyalaya, advancing its mission with unwavering excellence in the Kesbewa Education Division. Beginning with a modest <strong>eight students and four teachers</strong>, the school now boasts <strong>98 teaching staff and 2,309 students</strong>, with numerous alumni contributing significantly to society across medicine, engineering, education, and civil leadership.
            </p>
            <p>
              The primary section, educating <strong>683 students from grades 1 to 5</strong>, is celebrated in the Batakaththara community for its warm educational achievements. Beyond academics, the school excels in co-curricular and extra-curricular activities, producing champions in sports, speech and debate, and cultural festivals.
            </p>
            <div className="bg-[#FAF2DF] p-5 rounded-xl border-l-4 border-[#C8872B] not-prose my-6">
              <h4 className="font-serif font-bold text-[#3D0707] text-base mb-1">
                The Samadhi Buddha Statue & Daily Gilanpasa Buddha Pooja
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                A serene focal point upon entering the school is the majestic statue of the Samadhi Buddha. Daily school activities commence with the Gilanpasa Buddha Pooja, providing a tranquil moment of moral reflection, inner mindfulness, and blessings for students and teachers alike before academics begin.
              </p>
            </div>
          </div>

          {/* Chronological Timeline */}
          <div>
            <h3 className="font-serif font-bold text-2xl text-[#3D0707] mb-8 text-center">
              Historical Evolution Timeline
            </h3>

            <div className="relative border-l-2 border-[#C8872B]/60 ml-4 md:ml-32 space-y-8 pb-4">
              {historyMilestones.map((m, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8 group">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#560D0D] group-hover:border-[#C8872B] transition-colors"></div>
                  
                  {/* Content card */}
                  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-subtle border border-stone-200 group-hover:shadow-elevated transition-all">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8A5217] uppercase tracking-wider mb-1">
                      <span>{m.year}</span>
                      <span>•</span>
                      <span className="text-stone-400 font-normal">{m.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: VISION, MISSION, CREST & MOTTO */}
      {activeTab === 'mission' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge="Ideals & Principles"
            title="Vision, Mission & School Crest"
            subtitle="The foundational ethos guiding every student, teacher, and administrator of Sir John Kotelawala Maha Vidyalaya."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision Card */}
            <div className="bg-white rounded-2xl p-8 shadow-elevated border-t-4 border-[#C8872B] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#C8872B]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A5217]">Our Guiding Light</span>
                <h3 className="font-serif text-2xl font-bold text-[#3D0707]">
                  OUR VISION
                </h3>
                <p className="font-serif italic text-lg sm:text-xl text-stone-800 leading-snug pt-2">
                  "{schoolInfo.vision}"
                </p>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-4">
                Inspiring students to become enlightened, civic-minded contributors to national progress.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-8 shadow-elevated border-t-4 border-[#560D0D] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FDF2F2] text-[#7E1313] flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#C43B3B]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7E1313]">Our Daily Purpose</span>
                <h3 className="font-serif text-2xl font-bold text-[#3D0707]">
                  OUR MISSION
                </h3>
                <p className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed pt-2">
                  "{schoolInfo.mission}"
                </p>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-4">
                Balancing human intellect, resource stewardship, and patriotic Sinhala and Sri Lankan cultural values.
              </p>
            </div>

          </div>

          {/* School Crest & Motto Meaning */}
          <div className="bg-[#FAF9F5] rounded-2xl p-8 sm:p-12 border border-stone-300 shadow-subtle">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <img 
                  src="/images/logo-color.png" 
                  alt="School Crest" 
                  className="w-48 h-48 object-contain filter drop-shadow-md"
                />
                <h4 className="font-serif font-bold text-lg text-[#3D0707] mt-4">
                  The College Insignia
                </h4>
                <p className="text-xs text-[#8A5217] font-semibold">
                  Motto: න හි සීලවතං සෙය්‍යො
                </p>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217]">Heraldry & Symbolism</span>
                  <h3 className="font-serif text-2xl font-bold text-[#3D0707]">
                    School Crest and Motto Interpretation
                  </h3>
                  <p className="font-serif italic text-base text-[#560D0D] font-semibold mt-1">
                    "There is no luster of doctrine without discipline."
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <p>
                    The college motto originates from ancient Pali Buddhist texts: <strong>"න හි සීලවතං සෙය්‍යො"</strong> — affirming that even the greatest knowledge or doctrine loses its brilliance without personal discipline, moral rectitude, and integrity.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                      <span className="font-bold text-stone-900 block text-xs">The Sacred Lotus (නෙළුම් මල)</span>
                      <span className="text-stone-600 text-xs">Represents pure wisdom rising above worldly taints and blossoming through learning.</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                      <span className="font-bold text-stone-900 block text-xs">The Torch of Knowledge (පහන / දැල්ල)</span>
                      <span className="text-stone-600 text-xs">Illuminates the path from ignorance to intellectual and spiritual enlightenment.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* TAB 3: COLLEGE MEDIA UNIT */}
      {activeTab === 'media' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge="Student Journalism & Broadcasting"
            title="The College Media Unit"
            subtitle="The voice and visual lens of Sir John Kotelawala Maha Vidyalaya, fostering bilingual broadcasting, photography, and digital communication."
          />

          <div className="bg-white rounded-2xl shadow-elevated border border-stone-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                <img 
                  src="/images/media-unit.jpg" 
                  alt="College Media Unit Team" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 text-white">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Media Crew</span>
                    <h4 className="font-serif font-bold text-lg text-white">Broadcasting Studio & Officials</h4>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 text-stone-700 text-sm sm:text-base leading-relaxed">
                <h3 className="font-serif text-2xl font-bold text-[#3D0707]">
                  History & Evolution of the Media Unit
                </h3>
                
                <p>
                  At the inception of the college, a formal Media Unit was not active; instead, school activities and announcements were conducted through the collective efforts of enthusiastic students. During that pioneering period, activities were managed by <strong>Mr. Bandaranayake</strong>, a dedicated teacher serving at the school at the time.
                </p>
                <p>
                  Later, the former-Principal, <strong>Mrs. Ramyalatha Weerakkody</strong>, pioneered the establishment of a formal Media Unit and introduced Media Studies as a curricular subject within the school. This vital initiative was spearheaded by <strong>Mrs. Nadeera Deshani</strong>. Today, the unit remains highly active, functioning under a board of student officials that is updated annually.
                </p>
                <p>
                  Following Mrs. Nadeera’s tenure, the Vice Principal, <strong>Mrs. Poornima Kandage</strong>, worked to further formalize the unit and expand its operations into multiple languages. Currently, the College Media Unit stands out as a prominent entity within the school:
                </p>

                {/* Team Roster */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200">
                    <span className="text-xs font-bold text-[#8A5217] uppercase tracking-wider block">Sinhala Medium Section</span>
                    <p className="text-sm font-semibold text-stone-900 mt-1">Mr. Lakshitha Prabhatha</p>
                    <p className="text-sm font-semibold text-stone-900">Mrs. Amali Mangeshka</p>
                    <p className="text-xs text-stone-500 mt-1">Announcing, scriptwriting, and national radio competitions.</p>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200">
                    <span className="text-xs font-bold text-[#7E1313] uppercase tracking-wider block">English Medium Section</span>
                    <p className="text-sm font-semibold text-stone-900 mt-1">Mrs. Gayana Colombage</p>
                    <p className="text-xs text-stone-500 mt-2">English commentary, international reporting, and website audio-visuals.</p>
                  </div>
                </div>

                <p className="text-xs text-stone-500 italic pt-2">
                  The Media Unit organizes the annual "Kotelawala Media Day", providing inter-school announcing competitions, video editing workshops, and live event coverage.
                </p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* TAB 4: LEADERSHIP & STAFF */}
      {activeTab === 'leadership' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge="Institutional Governance"
            title="School Leadership & Administration"
            subtitle="Led by visionary educators dedicated to academic rigour, character building, and administrative transparency."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Principal Profile */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border border-stone-200 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img 
                src={schoolInfo.principal.image} 
                alt="Principal" 
                className="w-32 h-40 object-cover rounded-xl shadow-md border-2 border-[#C8872B]"
              />
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8872B]">Head of Institution</span>
                <h3 className="font-serif text-xl font-bold text-[#3D0707]">{schoolInfo.principal.name}</h3>
                <p className="text-xs text-stone-600 font-medium">{schoolInfo.principal.qualifications}</p>
                <p className="text-xs text-stone-500 leading-relaxed pt-2">
                  Leading overall administration, educational planning, teacher supervision, and liaison with the Ministry of Education and Zonal Education Office.
                </p>
              </div>
            </div>

            {/* Vice Principal Profile */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border border-stone-200 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-32 h-40 bg-gradient-to-br from-[#560D0D] to-[#380606] text-amber-200 rounded-xl shadow-md flex flex-col items-center justify-center p-4 text-center">
                <Users className="w-10 h-10 text-[#C8872B] mb-2" />
                <span className="text-xs font-bold uppercase">Vice Principal</span>
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8872B]">Administration & Media</span>
                <h3 className="font-serif text-xl font-bold text-[#3D0707]">{schoolInfo.vicePrincipal.name}</h3>
                <p className="text-xs text-stone-600 font-medium">{schoolInfo.vicePrincipal.designation}</p>
                <p className="text-xs text-stone-500 leading-relaxed pt-2">
                  Overseeing secondary curricula, formal teacher supervision frameworks, multilingual media unit initiatives, and student discipline.
                </p>
              </div>
            </div>

          </div>

          {/* Faculty Overview Card */}
          <div className="bg-[#FAF2DF] rounded-xl p-6 sm:p-8 border border-[#C8872B]/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center">
              <div>
                <h4 className="font-serif font-bold text-xl text-[#3D0707]">98 Certified Teachers</h4>
                <p className="text-xs text-stone-700 mt-1">
                  Graduate, trained, and postgraduate teachers across Science, Mathematics, Commerce, Arts, Languages, and Physical Education.
                </p>
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl text-[#3D0707]">Formal Supervision</h4>
                <p className="text-xs text-stone-700 mt-1">
                  Recognized by the Zonal Education Office for structured student assessment, regular lesson reviews, and continuous examination performance growth.
                </p>
              </div>
              <div className="text-center md:text-right">
                <span className="inline-block px-4 py-2 bg-[#560D0D] text-amber-200 font-semibold text-xs rounded-lg shadow-sm">
                  Piliyandala Zonal Jurisdiction
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
