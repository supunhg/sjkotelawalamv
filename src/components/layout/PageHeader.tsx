import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  sinhalaTitle?: string;
  breadcrumbs: { label: string; path?: string }[];
  badges?: { icon?: React.ComponentType<{ className?: string }>; text: string }[];
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  sinhalaTitle,
  breadcrumbs,
  badges,
  children,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#2B0505] via-[#4A0A0A] to-[#380606] text-white border-b-2 border-[#C8872B] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-amber-200/70 mb-4 flex-wrap">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-white transition-colors">
            <Home className="w-3.5 h-3.5 text-[#C8872B]" />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-amber-300/40 shrink-0" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-amber-100 font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title Area */}
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FAF2DF] leading-tight">
            {title}
          </h1>

          {sinhalaTitle && (
            <div className="text-amber-300 text-xs sm:text-sm font-medium tracking-wide">
              {sinhalaTitle}
            </div>
          )}

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed pt-1">
            {subtitle}
          </p>
        </div>

        {/* Key Info Metadata Badges */}
        {badges && badges.length > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-5">
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/35 border border-[#C8872B]/30 text-amber-100 text-xs font-medium"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#C8872B]" />}
                  <span>{b.text}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Optional Custom Slots (e.g. Sub-Navigation Tabs) */}
        {children && <div className="mt-8 pt-6 border-t border-[#C8872B]/20">{children}</div>}

      </div>
    </section>
  );
};
