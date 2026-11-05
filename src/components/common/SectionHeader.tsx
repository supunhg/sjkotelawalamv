import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  centered = true,
  light = false,
  className = '',
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#FAF2DF] text-[#8A5217] border border-[#C8872B]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8872B]"></span>
          {badge}
        </div>
      )}

      <h2
        className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
          light ? 'text-[#FAF2DF]' : 'text-[#3D0707]'
        }`}
      >
        {title}
      </h2>

      {/* Decorative subtle underline */}
      <div className={`flex items-center gap-2 mt-3 ${centered ? 'justify-center' : 'justify-start'}`}>
        <div className={`h-[2px] w-8 ${light ? 'bg-[#C8872B]/60' : 'bg-[#560D0D]'}`}></div>
        <div className="w-2 h-2 rotate-45 bg-[#C8872B]"></div>
        <div className={`h-[2px] w-16 ${light ? 'bg-[#C8872B]' : 'bg-[#C8872B]'}`}></div>
        <div className="w-2 h-2 rotate-45 bg-[#C8872B]"></div>
        <div className={`h-[2px] w-8 ${light ? 'bg-[#C8872B]/60' : 'bg-[#560D0D]'}`}></div>
      </div>

      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base max-w-2xl leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-amber-100/80' : 'text-stone-600'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
