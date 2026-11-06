import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ImageIcon, Sparkles, Filter, Eye, Camera, Clock } from 'lucide-react';
import { api, GalleryItem } from '../api/client';
import { galleryData as fallbackGallery } from '../data/schoolData';
import { Modal } from '../components/common/Modal';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getGallery()
      .then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        } else {
          // Fallback to initial static gallery
          setItems(fallbackGallery.map(g => ({
            id: g.id,
            title: g.title,
            category: g.category,
            image_url: g.imageUrl,
            description: 'Archived photographic record by the College Media Unit.',
            created_at: '2026-01-01'
          })));
        }
      })
      .catch(() => {
        setItems(fallbackGallery.map(g => ({
          id: g.id,
          title: g.title,
          category: g.category,
          image_url: g.imageUrl,
          description: 'Archived photographic record by the College Media Unit.',
          created_at: '2026-01-01'
        })));
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Campus', 'Sports', 'Tradition', 'Culture', 'Academics'];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* PAGE HEADER */}
      <PageHeader
        title="College Visual Gallery & Archives"
        sinhalaTitle="ඡායාරූප සහ ඓතිහාසික ලේඛනාගාරය • College Media Unit"
        subtitle="Visual chronicles of Sir John Kotelawala Maha Vidyalaya documenting sporting triumphs, Buddhist traditions, academic distinction, and campus life."
        breadcrumbs={[{ label: 'Gallery' }]}
        badges={[
          { icon: Sparkles, text: 'Digital Archive Portal: In Progress' },
          { icon: Camera, text: 'Curated by College Media Unit' },
        ]}
      />

      {/* COMING SOON EXPANDED ARCHIVE BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#FAF2DF] via-[#F4E2BE] to-[#FAF2DF] border-2 border-[#C8872B]/60 rounded-2xl p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#560D0D] text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Full Digital Archive — Launching Soon</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#3D0707]">
              Historic 1980–2026 Archive Digitization in Progress
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed">
              The College Media Unit and Alumni Association are digitizing over 45 years of vintage photographs, annual prize-giving albums, and athletic chronicles. Explore current highlights below while the full interactive photo vault is being completed.
            </p>
          </div>

          <div className="shrink-0 text-center">
            <div className="px-5 py-3 rounded-xl bg-white border border-[#C8872B]/40 shadow-sm text-xs font-bold text-[#8A5217]">
              <span>Active Photographic Records</span>
              <div className="text-2xl font-extrabold text-[#560D0D] mt-0.5">{items.length}+ Photos</div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#C8872B]" />
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">Filter Category:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#560D0D] text-amber-200 shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-xs text-stone-500">
            Loading photographic archives...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center text-xs text-stone-500">
            No photographs found under this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="bg-white rounded-xl overflow-hidden shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B]/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-xs font-bold backdrop-blur-sm">
                      <Eye className="w-3.5 h-3.5 text-amber-300" />
                      <span>Enlarge Photo</span>
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 text-amber-200 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-[#8A5217] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-normal">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="3xl"
        title={selectedImage?.title || 'Photographic Record'}
      >
        {selectedImage && (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A5217]">
                  Category: {selectedImage.category}
                </span>
                <p className="text-xs text-stone-700 mt-0.5">{selectedImage.description}</p>
              </div>
              <span className="text-[10px] text-stone-400">
                Sir John Kotelawala Maha Vidyalaya Media Archives
              </span>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
