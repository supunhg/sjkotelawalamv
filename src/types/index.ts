export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Examination' | 'Admissions' | 'Sports' | 'General' | 'Event';
  summary: string;
  isUrgent?: boolean;
  linkText?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Academics' | 'Sports' | 'Culture' | 'Achievements' | 'Community';
  summary: string;
  content: string;
  image: string;
  author?: string;
  featured?: boolean;
}

export interface SportSchedule {
  id: string;
  sport: string;
  category: 'Athletics' | 'Team Sports' | 'Racquet Sports' | 'Mind & Combat';
  days: string;
  morningTime?: string;
  eveningTime: string;
  venue?: string;
}

export interface MICTeacher {
  id: string;
  sport: string;
  teacherName: string;
  designation?: string;
  contactEmail?: string;
}

export interface ClubSociety {
  id: string;
  name: string;
  description: string;
  category: 'Academic' | 'Technology' | 'Cultural' | 'Media';
  leadTeacher?: string;
  meetingDay?: string;
  iconName: string;
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  competition: string;
  placement: string;
  description: string;
  category: 'Drama' | 'Music' | 'Academics' | 'Sports' | 'Debate';
  bannerImage?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Campus' | 'Sports' | 'Ceremony';
  imageUrl: string;
  caption?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'Sports' | 'General';
}
