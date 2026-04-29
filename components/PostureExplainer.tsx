'use client';

import { useState, useRef, useEffect } from 'react';
import { POSTURES, Posture } from '@/lib/postures';

function TabContent({ posture }: { posture: Posture }) {
  return (
    <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
      {/* Hero image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-t-[18px] sm:rounded-t-[22px] overflow-hidden -mt-[1px] -mx-[1px]" style={{ width: 'calc(100% + 2px)' }}>
        <img
          src={posture.art}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-transparent" />
        {/* Name + tag overlay */}
        <div className="absolute bottom-4 left-4 sm:left-6 flex items-center gap-3">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0"
            style={{ color: posture.colorVar }}
            dangerouslySetInnerHTML={{ __html: posture.iconSvg }}
          />
          <div>
            <h3 className="font-display font-medium text-xl sm:text-2xl text-ink leading-tight">
              {posture.name}
            </h3>
            <p className="text-sm italic font-display text-ink-soft">
              {posture.tag}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 pt-4 sm:pt-6">
        <p className="text-ink leading-relaxed">{posture.longDesc}</p>

        {/* Telltale */}
        <div className="rounded-[14px] border border-ink/8 p-4 bg-bg/30">
          <p className="text-xs uppercase tracking-wider text-ink-soft/60 mb-1.5 font-medium">
            How you spot them
          </p>
          <p className="text-ink-soft text-sm leading-relaxed italic">{posture.telltale}</p>
        </div>

        {/* Examples */}
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-soft/60 mb-1.5 font-medium">
            Common roles
          </p>
          <p className="text-ink-soft text-sm leading-relaxed">{posture.examples}</p>
        </div>

        {/* Healthy / Unhealthy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[14px] bg-bg-2/70 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: posture.colorVar }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M3 6.5 L5 8.5 L9 4" /></svg>
              </div>
              <p className="text-xs uppercase tracking-wider text-ink-soft/60 font-medium">
                At their best
              </p>
            </div>
            <p className="font-display font-medium text-ink mb-1.5">
              {posture.healthy.name}
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">{posture.healthy.text}</p>
          </div>

          <div className="rounded-[14px] bg-bg-2/70 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-ink/10">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ink-soft"><path d="M3 3 L9 9 M9 3 L3 9" /></svg>
              </div>
              <p className="text-xs uppercase tracking-wider text-ink-soft/60 font-medium">
                At their worst
              </p>
            </div>
            <p className="font-display font-medium text-ink mb-1.5">
              {posture.unhealthy.name}
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">{posture.unhealthy.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostureExplainer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = POSTURES[activeIndex];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    tabRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  return (
    <div className="w-full max-w-[900px]">
      {/* Section header */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-widest text-ink-soft/60 mb-2">
          Learn the framework
        </p>
        <h2 className="font-display font-normal italic text-2xl md:text-3xl text-ink">
          Explore the nine
        </h2>
      </div>

      {/* Tab bar */}
      <div className="relative mb-0">
        <div className="flex overflow-x-auto gap-1 pb-0 scrollbar-hide -mx-1 px-1" role="tablist">
          {POSTURES.map((p, i) => (
            <button
              key={p.id}
              ref={el => { tabRefs.current[i] = el; }}
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls={`panel-${p.id}`}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') { e.preventDefault(); setActiveIndex((i + 1) % POSTURES.length); }
                if (e.key === 'ArrowLeft') { e.preventDefault(); setActiveIndex((i - 1 + POSTURES.length) % POSTURES.length); }
              }}
              tabIndex={i === activeIndex ? 0 : -1}
              className="relative shrink-0 min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
              style={{
                backgroundColor: i === activeIndex ? p.colorVar : 'transparent',
                color: i === activeIndex ? '#fffbf2' : 'var(--color-ink-soft)',
                borderRadius: '12px 12px 0 0',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
        {/* Fade edges for scroll hint */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg to-transparent pointer-events-none md:hidden" />
      </div>

      {/* Tab content */}
      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        className="rounded-[20px] sm:rounded-[24px] bg-paper border border-ink/6 p-4 sm:p-6 md:p-8 pt-0 sm:pt-0 md:pt-0"
        style={{
          boxShadow: 'var(--shadow-card)',
          borderTopLeftRadius: 0,
        }}
      >
        <TabContent key={active.id} posture={active} />
      </div>
    </div>
  );
}
