import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'maroon' | 'urgent' | 'neutral' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-[#FAF2DF] text-[#8A5217] border border-[#C8872B]/30',
    maroon: 'bg-[#FDF2F2] text-[#7E1313] border border-[#C43B3B]/30',
    urgent: 'bg-red-50 text-red-700 border border-red-300 font-semibold animate-pulse',
    neutral: 'bg-stone-100 text-stone-700 border border-stone-300',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-300',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase whitespace-nowrap ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
