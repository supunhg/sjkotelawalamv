import { Announcement, NewsItem, SportSchedule, MICTeacher, ClubSociety, AchievementItem, GalleryItem, FAQItem } from '../types';

export const schoolInfo = {
  name: 'Sir John Kotelawala Maha Vidyalaya',
  sinhalaName: 'සර් ජෝන් කොතලාවල මහා විද්‍යාලය',
  shortName: 'SJKMV',
  mottoEnglish: 'There is no luster of doctrine without discipline',
  mottoSinhala: 'න හි සීලවතං සෙය්‍යො',
  vision: 'A civilized society and an excellent active citizen through optimal education.',
  mission: 'To bequeath to the country a citizen with a balanced personality who can properly manage human and physical resources while preserving the culture and identity of the motherland.',
  established: 'February 6, 1980',
  type: '1AB National/Provincial Mixed Maha Vidyalaya',
  grades: 'Grade 1 to Grade 13 (Advanced Level)',
  division: 'Kesbewa Education Division',
  zone: 'Piliyandala Zonal Education Office',
  province: 'Western Province Department of Education',
  governingBody: 'Ministry of Education, Sri Lanka',
  stats: {
    students: '2,300+',
    primaryStudents: '680+',
    teachers: '98',
    alumni: '10,000+',
    clubsSports: '18+',
    yearsExcellence: '44+',
  },
  principal: {
    name: 'Vajira V. Thanthrige',
    qualifications: 'Bsc, PgDEM, PgDEMgt, PgDE(Econ)',
    image: '/images/principal.png',
    designation: 'Principal',
  },
  vicePrincipal: {
    name: 'Mrs. Poornima Kandage',
    designation: 'Vice Principal',
  },
  contact: {
    address: 'Kolamunna, Piliyandala, Western Province, Sri Lanka',
    phone: '0112 604 239',
    formattedPhone: '+94 11 260 4239',
    email: 'sirjohnkothalawalav@gmail.com',
    hours: 'Monday – Friday: 7:30 AM – 3:30 PM',
    mapCoordinates: '6.8016, 79.9227', // Kolamunna Piliyandala
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.737158759587!2d79.91924687588107!3d6.801783819853969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a58e0861111%3A0xd68d90be7174e40e!2sSir%20John%20Kotalawala%20Maha%20Vidyalaya!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
  },
  officialLinks: [
    { label: 'Ministry of Education Sri Lanka', url: 'https://moe.gov.lk/en/welcome/' },
    { label: 'Department of Examinations', url: 'https://www.doenets.lk/' },
    { label: 'Western Province Education Department', url: 'https://wpedu.lk/' },
  ]
};

export const announcementsData: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Grade 12 Advanced Level (2026/2027) Intake Applications Now Open',
    date: 'Nov 02, 2026',
    category: 'Admissions',
    summary: 'Applications are called for G.C.E. Advanced Level streams: Bio Science, Physical Science, Commerce, Arts, and Biosystems Technology. Please submit before deadline.',
    isUrgent: true,
  },
  {
    id: 'ann-2',
    title: 'Third Term Examination Timetable Released for Grades 6 - 11',
    date: 'Oct 28, 2026',
    category: 'Examination',
    summary: 'The comprehensive timetable for the 3rd Term Evaluation has been distributed to students and is available for download at the administrative office.',
    isUrgent: false,
  },
  {
    id: 'ann-3',
    title: 'Annual Inter-House Sports Meet 2027 House Practices Schedule',
    date: 'Oct 20, 2026',
    category: 'Sports',
    summary: 'Track and field practices for the four collegiate houses commence this Tuesday under the direction of sports coaches and MIC teachers.',
    isUrgent: false,
  },
  {
    id: 'ann-4',
    title: 'Annual Pirith Pinkama and Gilanpasa Buddha Pooja Ceremony',
    date: 'Oct 15, 2026',
    category: 'Event',
    summary: 'The traditional overnight Pirith Chanting ceremony in commemoration of the school founders will take place in the college main hall.',
    isUrgent: false,
  },
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    title: 'SJKMV Wins First Place at All-Ceylon Inter-School Drama & Performing Arts Festival',
    date: 'October 18, 2026',
    category: 'Achievements',
    summary: 'Our college senior drama troupe has once again brought nationwide prestige by securing 1st place in the All-Ceylon Drama Festival.',
    content: 'Sir John Kotelawala Maha Vidyalaya has upheld its glorious tradition in performing arts. Following first-place honors in 2017, our drama students delivered a mesmerizing production at the National Theatre, receiving standing ovations and highest marks from the national adjudicators. Special congratulations to the teacher-in-charge and student actors.',
    image: '/images/news-1.png',
    author: 'College Media Unit',
    featured: true,
  },
  {
    id: 'news-2',
    title: 'New Computer Laboratory & Modernized Digital Library Inaugurated',
    date: 'September 24, 2026',
    category: 'Academics',
    summary: 'A 40-seat modern computer laboratory equipped with high-speed fiber internet has been officially opened for junior and senior ICT students.',
    content: 'To foster 21st-century digital competencies, the school has completed the expansion of its ICT wing. Under the guidance of Principal Vajira V. Thanthrige and the School Development Society (SDS), the new lab provides state-of-the-art workstations for coding, graphic design, and media production.',
    image: '/images/news-2.png',
    author: 'IT Club & Administration',
    featured: true,
  },
  {
    id: 'news-3',
    title: 'Outstanding G.C.E. O/L Examination Results Celebrated by Staff and Parents',
    date: 'August 30, 2026',
    category: 'Academics',
    summary: 'Over 88% qualified for Advanced Level studies with remarkable distinctions in Science, Mathematics, English, and Sinhala.',
    content: 'Through rigorous formal supervision, structured revision camps, and dedicated mentoring by our 98-member faculty, our students achieved top rankings across the Kesbewa Education Division.',
    image: '/images/achievements-1.png',
    author: 'Academic Affairs Board',
  },
  {
    id: 'news-4',
    title: 'Volleyball and Athletics Teams Clinch Divisional Championship Trophies',
    date: 'August 12, 2026',
    category: 'Sports',
    summary: 'Both Under-17 and Under-19 boys and girls demonstrated remarkable grit in the Piliyandala Zonal Athletics and Volleyball championships.',
    content: 'Under the guidance of MIC Teachers and coach instructors, our student athletes won multiple gold and silver medals, qualifying for the upcoming Western Province Provincial Games.',
    image: '/images/sports-banner.png',
    author: 'Sports Council',
  },
];

export const sportsScheduleData: SportSchedule[] = [
  {
    id: 'sp-1',
    sport: 'Athletics (Track & Field)',
    category: 'Athletics',
    days: 'Monday – Friday',
    morningTime: '6:00 AM – 7:30 AM',
    eveningTime: '2:00 PM – 5:30 PM',
    venue: 'College Main Grounds',
  },
  {
    id: 'sp-2',
    sport: 'Cricket',
    category: 'Team Sports',
    days: 'Thursday & Friday',
    eveningTime: '2:00 PM – 4:00 PM',
    venue: 'Cricket Nets & Ground',
  },
  {
    id: 'sp-3',
    sport: 'Netball',
    category: 'Team Sports',
    days: 'Wednesday & Friday',
    eveningTime: '2:00 PM – 5:00 PM',
    venue: 'College Courts',
  },
  {
    id: 'sp-4',
    sport: 'Football',
    category: 'Team Sports',
    days: 'Tuesday & Thursday',
    eveningTime: '2:00 PM – 5:00 PM',
    venue: 'Main Football Pitch',
  },
  {
    id: 'sp-5',
    sport: 'Volleyball',
    category: 'Team Sports',
    days: 'Tuesday',
    eveningTime: '2:00 PM – 5:00 PM',
    venue: 'Volleyball Court',
  },
  {
    id: 'sp-6',
    sport: 'Chess',
    category: 'Mind & Combat',
    days: 'Monday',
    eveningTime: '2:00 PM – 4:30 PM',
    venue: 'College Activity Hall',
  },
  {
    id: 'sp-7',
    sport: 'Karate & Martial Arts',
    category: 'Mind & Combat',
    days: 'Monday',
    eveningTime: '2:00 PM – 4:30 PM',
    venue: 'Auditorium Pavilion',
  },
  {
    id: 'sp-8',
    sport: 'Badminton',
    category: 'Racquet Sports',
    days: 'Saturday',
    eveningTime: '4:00 PM – 6:00 PM',
    venue: 'Indoor Badminton Arena',
  },
];

export const micTeachersData: MICTeacher[] = [
  { id: 'mic-1', sport: 'Cricket', teacherName: 'Mrs. D. I. Wijethunga', designation: 'Master in Charge' },
  { id: 'mic-2', sport: 'Football', teacherName: 'Mr. Lakshitha Prabatha', designation: 'Master in Charge' },
  { id: 'mic-3', sport: 'Netball', teacherName: 'Mrs. Amali Perera', designation: 'Mistress in Charge' },
  { id: 'mic-4', sport: 'Volleyball', teacherName: 'Miss. Samudi Lokuge', designation: 'Mistress in Charge' },
  { id: 'mic-5', sport: 'Chess', teacherName: 'Mrs. A. T. C. K. Kumari', designation: 'Mistress in Charge' },
  { id: 'mic-6', sport: 'Badminton', teacherName: 'Mr. Sandaruwan Jayanath', designation: 'Master in Charge' },
  { id: 'mic-7', sport: 'Karate', teacherName: 'Mr. Bandula Perera', designation: 'Master in Charge' },
];

export const clubsData: ClubSociety[] = [
  {
    id: 'club-1',
    name: 'College Media Unit',
    description: 'Pioneered by Mrs. Ramyalatha Weerakkody and formalized into bilingual wings. Directs school broadcasts, photography, audio-visual documentation, and annual media days.',
    category: 'Media',
    leadTeacher: 'Sinhala: Mr. Lakshitha Prabhatha & Mrs. Amali Mangeshka | English: Mrs. Gayana Colombage',
    meetingDay: 'Wednesdays',
    iconName: 'Radio',
  },
  {
    id: 'club-2',
    name: 'Science Club',
    description: 'Promotes practical laboratory research, science day exhibitions, and participation in zonal science olympiads.',
    category: 'Academic',
    leadTeacher: 'Senior Science Faculty',
    meetingDay: 'Tuesdays',
    iconName: 'Atom',
  },
  {
    id: 'club-3',
    name: 'Young Inventors Club',
    description: 'Fosters technological innovation, robotics experiments, creative mechanics, and eco-friendly engineering solutions.',
    category: 'Technology',
    leadTeacher: 'Technology Department',
    meetingDay: 'Thursdays',
    iconName: 'Lightbulb',
  },
  {
    id: 'club-4',
    name: 'Commerce Society',
    description: 'Conducts annual commerce days, entrepreneurship workshops, student banking training, and business quizzes.',
    category: 'Academic',
    leadTeacher: 'Commerce Section Head',
    meetingDay: 'Fridays',
    iconName: 'TrendingUp',
  },
  {
    id: 'club-5',
    name: 'IT Club & Computer Society',
    description: 'Specializes in computer programming, web development, multimedia design, and school network support.',
    category: 'Technology',
    leadTeacher: 'ICT Unit',
    meetingDay: 'Mondays',
    iconName: 'Monitor',
  },
  {
    id: 'club-6',
    name: 'Buddhist Association & Cultural Society',
    description: 'Coordinates daily morning Gilanpasa Buddha Pooja at the Samadhi Buddha statue, Dhamma school programs, and annual Pirith Pinkama.',
    category: 'Cultural',
    leadTeacher: 'Religious Education Staff',
    meetingDay: 'Full Moon Poya Days & Mornings',
    iconName: 'HeartHandshake',
  },
];

export const achievementsData: AchievementItem[] = [
  {
    id: 'ach-1',
    year: '2022',
    title: 'All-Ceylon Music Festival Champions',
    competition: 'National Inter-School Music Festival',
    placement: '1st Place All-Island',
    description: 'Celebrated nationwide for orchestral excellence, traditional Sri Lankan folk melodies, and vocal harmonies.',
    category: 'Music',
    bannerImage: '/images/achievements-1.png',
  },
  {
    id: 'ach-2',
    year: '2018',
    title: 'All-Ceylon Music Competition Winners',
    competition: 'Ministry of Education National Arts Festival',
    placement: '1st Place All-Island',
    description: 'Awarded first place across all competing national schools for exceptional musical performance.',
    category: 'Music',
    bannerImage: '/images/achievements-2.png',
  },
  {
    id: 'ach-3',
    year: '2017',
    title: 'All-Ceylon Drama Festival Champions',
    competition: 'National Schools Drama Festival',
    placement: '1st Place All-Island',
    description: 'Cinched the coveted championship title in theatrical stagecraft and dramatic excellence.',
    category: 'Drama',
    bannerImage: '/images/achievements-1.png',
  },
  {
    id: 'ach-4',
    year: 'Recent',
    title: 'Zonal & Provincial Athletics Laurels',
    competition: 'Kesbewa & Piliyandala Athletic Meets',
    placement: 'Multiple Divisional Golds',
    description: 'Consistently producing regional record holders in sprinting, long-distance running, and high jump.',
    category: 'Sports',
    bannerImage: '/images/sports-banner.png',
  },
];

export const galleryData: GalleryItem[] = [
  { id: 'g-1', title: 'Samadhi Buddha Statue & Daily Gilanpasa Pooja', category: 'Campus', imageUrl: '/images/gallery/gallery-1.png', caption: 'The sacred Samadhi Buddha statue welcoming students each morning.' },
  { id: 'g-2', title: 'Annual Pirith Pinkama & Religious Observance', category: 'Ceremony', imageUrl: '/images/gallery/gallery-2.png', caption: 'Students and alumni gathering for the annual all-night Pirith ceremony.' },
  { id: 'g-3', title: 'Athletic Meet & Track Events', category: 'Sports', imageUrl: '/images/gallery/gallery-3.png', caption: 'Collegiate runners competing during the annual sports meet.' },
  { id: 'g-4', title: 'College Assembly & Cultural Gathering', category: 'Events', imageUrl: '/images/gallery/gallery-4.png', caption: 'Morning gathering and school song recital.' },
  { id: 'g-5', title: 'Academic Honors & Prize Giving Ceremony', category: 'Ceremony', imageUrl: '/images/gallery/gallery-5.png', caption: 'Recognizing academic excellence and zonal prize winners.' },
  { id: 'g-6', title: 'College Media Unit Broadcasting Studio', category: 'Events', imageUrl: '/images/media-unit.jpg', caption: 'The dedicated student announcers and production crew.' },
];

export const faqData: FAQItem[] = [
  {
    question: 'How do parents apply for Grade 1 admissions?',
    answer: 'Grade 1 admissions strictly comply with the Ministry of Education circular guidelines based on proximity, alumni status, or sibling enrollment. Notices are posted annually around May/June.',
    category: 'Admissions'
  },
  {
    question: 'Which streams are offered for G.C.E. Advanced Level (Grades 12-13)?',
    answer: 'We provide comprehensive courses in Biological Science, Physical Science (Maths), Commerce (Accounting, Business Studies, Economics), Arts, and Biosystems / Engineering Technology.',
    category: 'Academics'
  },
  {
    question: 'What are the school operating hours?',
    answer: 'Regular school sessions run Monday to Friday from 7:30 AM to 1:30 PM. Sports training, clubs, and co-curricular sessions extend from 2:00 PM to 5:30 PM.',
    category: 'General'
  },
  {
    question: 'How can students join sports training or athletic squads?',
    answer: 'Students can speak directly with the respective Master/Mistress in Charge (MIC) listed on our Sports page or attend trials during the beginning of the academic term.',
    category: 'Sports'
  },
];
