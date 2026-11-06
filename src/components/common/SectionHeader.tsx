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
        <span
          className={`inline-block text-xs font-bold uppercase tracking-wider mb-2 ${
            light ? 'text-[#E1B463]' : 'text-[#8A5217]'
          }`}
        >
          {badge}
        </span>
      )}

      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
          light ? 'text-[#FAF2DF]' : 'text-[#3D0707]'
        }`}
      >
        {title}
      </h2>

      {/* Clean, sleek modern accent bar */}
      <div
        className={`mt-3.5 h-[3px] w-12 rounded-full ${
          light ? 'bg-[#C8872B]' : 'bg-[#C8872B]'
        } ${centered ? 'mx-auto' : ''}`}
      />

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
