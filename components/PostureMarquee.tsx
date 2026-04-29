'use client';

import { POSTURES } from '@/lib/postures';

export default function PostureMarquee() {
  // Double the items for seamless loop
  const items = [...POSTURES, ...POSTURES];

  return (
    <div className="w-full overflow-hidden py-6 sm:py-8 mb-2" aria-hidden="true">
      <div className="marquee-track flex gap-6 sm:gap-10 w-max">
        {items.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex items-center gap-2 sm:gap-3 shrink-0 opacity-40"
          >
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
              style={{ color: p.colorVar }}
              dangerouslySetInnerHTML={{ __html: p.iconSvg }}
            />
            <span
              className="font-display text-sm sm:text-base font-medium whitespace-nowrap"
              style={{ color: p.colorVar }}
            >
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
