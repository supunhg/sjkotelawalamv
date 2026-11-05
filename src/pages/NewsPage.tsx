import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  User, 
  Search, 
  ArrowRight, 
  Share2, 
  Image as ImageIcon,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { newsData, galleryData } from '../data/schoolData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { NewsItem } from '../types';

export const NewsPage: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const categories = ['All', 'Achievements', 'Academics', 'Sports', 'Culture'];

  const filteredNews = newsData.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* PAGE HEADER HERO */}
      <section className="bg-gradient-to-b from-[#4A0A0A] via-[#560D0D] to-[#380606] text-white py-16 lg:py-20 border-b-4 border-[#C8872B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8872B_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-[#C8872B]/40 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Newspaper className="w-3.5 h-3.5 text-[#C8872B]" />
            <span>Official Media Desk</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF2DF] tracking-tight">
            News, Events & College Gallery
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-100/80 max-w-2xl mx-auto font-serif italic">
            "Chronicles of excellence, artistic triumphs, and academic achievements"
          </p>

          <p className="mt-2 text-xs sm:text-sm text-amber-200/60 max-w-xl mx-auto">
            Dispatches published by the College Media Unit in collaboration with the Principal's Office.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-4 shadow-subtle border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#560D0D] text-amber-300 shadow font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
            />
          </div>

        </div>
      </section>

      {/* FEATURED / MAIN NEWS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="bg-white rounded-2xl overflow-hidden shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B]/50 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* News Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={news.category === 'Achievements' ? 'gold' : 'maroon'}>
                      {news.category}
                    </Badge>
                  </div>
                </div>

                {/* News Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Calendar className="w-3.5 h-3.5 text-[#C8872B]" />
                    <span>{news.date}</span>
                    <span>•</span>
                    <span className="text-stone-500 font-medium">{news.author}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#8A5217] transition-colors leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs font-bold text-[#8A5217]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="py-16 text-center text-stone-500 text-sm">
            No news articles found in this category.
          </div>
        )}
      </section>

      {/* FULL PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="Archival Documentation"
          title="College Photographic Gallery"
          subtitle="Capturing ceremonial gatherings, Buddhist traditions, athletic feats, and classroom moments."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item.imageUrl)}
              className="group relative rounded-xl overflow-hidden shadow-subtle border border-stone-200 aspect-square cursor-pointer hover:shadow-elevated transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white">
                <p className="text-[11px] font-medium leading-tight">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLE MODAL */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        title={selectedNews?.title || 'Article'}
        maxWidth="2xl"
      >
        {selectedNews && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden max-h-72">
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-500 pb-2 border-b border-stone-200">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C8872B]" />
                {selectedNews.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#C8872B]" />
                {selectedNews.author}
              </span>
              <span>•</span>
              <Badge variant="gold">{selectedNews.category}</Badge>
            </div>

            <div className="prose text-stone-700 text-sm leading-relaxed space-y-3">
              <p className="font-semibold text-stone-900 text-base">
                {selectedNews.summary}
              </p>
              <p>
                {selectedNews.content}
              </p>
              <p className="text-xs text-stone-500 pt-2 italic">
                Reported by the College Media Unit, Sir John Kotelawala Maha Vidyalaya, Kolamunna, Piliyandala.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded"
              >
                Close Article
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* PHOTO PREVIEW MODAL */}
      <Modal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        maxWidth="3xl"
        title="College Gallery Photo"
      >
        {selectedPhoto && (
          <div className="space-y-3">
            <img 
              src={selectedPhoto} 
              alt="Expanded Gallery" 
              className="w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        )}
      </Modal>

    </div>
  );
};
