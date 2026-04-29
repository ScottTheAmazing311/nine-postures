'use client';

import { PostureId, getPostureById } from '@/lib/postures';
import { generateWriteUp, generateTitle, generateAcronym, generateEmojiCode, generateGrowthAdvice, generatePairings } from '@/lib/writeup';
import { encodeTrio } from '@/lib/hash';
import CopyToast from './CopyToast';
import { useState, useEffect, useRef } from 'react';

const SLOT_LABELS = ['what i usually am', 'what i sometimes am', 'what i want to be'] as const;

type Props = {
  slots: [PostureId, PostureId, PostureId];
  onReset: () => void;
};

export default function ResultsPanel({ slots, onReset }: Props) {
  const [toastVisible, setToastVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (!hasScrolled.current && panelRef.current) {
      hasScrolled.current = true;
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const postures = slots.map(getPostureById);
  const title = generateTitle(slots);
  const acronym = generateAcronym(slots);
  const emojiCode = generateEmojiCode(slots);
  const writeUp = generateWriteUp(slots);
  const growthAdvice = generateGrowthAdvice(slots);
  const pairings = generatePairings(slots);

  const handleCopy = async () => {
    const hash = encodeTrio(slots);
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    window.location.hash = hash;

    const lines = [
      `My Nine Postures: ${title}`,
      `${acronym} ${emojiCode}`,
      '',
      `${postures[0].emoji} ${postures[0].name} (usually)`,
      `${postures[1].emoji} ${postures[1].name} (sometimes)`,
      `${postures[2].emoji} ${postures[2].name} (aspiring)`,
      '',
      url,
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2200);
    } catch {
      // fallback - do nothing
    }
  };

  const handleReset = () => {
    window.location.hash = '';
    onReset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        ref={panelRef}
        className="w-full max-w-[900px] mx-auto mt-16 scroll-mt-8"
        style={{ animation: 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <div className="rounded-[20px] sm:rounded-[28px] bg-paper border border-ink/6 p-5 sm:p-8 md:p-10" style={{ boxShadow: 'var(--shadow-elev)' }}>
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-widest text-ink-soft/60 mb-2 text-center">You are the</p>
          <h2 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-ink text-center mb-2">
            {title}
          </h2>
          <p className="text-center text-ink-soft/60 text-sm mb-6 sm:mb-8 tracking-widest">
            {acronym} {emojiCode}
          </p>

          {/* Trio summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {postures.map((p, i) => (
              <div
                key={p.id}
                className="rounded-2xl bg-bg/50 border border-ink/6 p-5 text-center"
              >
                <div className="h-1 w-full rounded-full mb-4" style={{ backgroundColor: p.colorVar }} />
                <p className="text-xs uppercase tracking-wider text-ink-soft/60 mb-2">
                  {SLOT_LABELS[i]}
                </p>
                <div
                  className="w-10 h-10 mx-auto mb-2"
                  style={{ color: p.colorVar }}
                  dangerouslySetInnerHTML={{ __html: p.iconSvg }}
                />
                <h3 className="font-display font-medium text-lg text-ink">
                  {p.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Share CTA */}
          <div className="text-center mb-8 sm:mb-10">
            <button
              onClick={handleCopy}
              className="px-8 py-3 rounded-full bg-ink text-paper font-medium transition-all duration-200 hover:bg-ink/80 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
            >
              Share your Posture!
            </button>
          </div>

          {/* Write-up */}
          <div
            className="font-display text-base sm:text-lg leading-relaxed text-ink space-y-3 sm:space-y-4 mb-8 sm:mb-10 max-w-prose mx-auto [&_em]:font-medium [&_em]:not-italic [&_em]:underline [&_em]:decoration-ink/20 [&_em]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: writeUp }}
          />

          {/* Better Posture */}
          <div className="rounded-[16px] sm:rounded-[20px] bg-bg/50 border border-ink/6 p-5 sm:p-8 mb-8 sm:mb-10">
            <h3 className="font-display font-medium text-xl sm:text-2xl text-ink text-center mb-6">
              Better Posture
            </h3>
            <div
              className="text-sm sm:text-base leading-relaxed text-ink-soft space-y-4 max-w-prose mx-auto [&_strong]:text-ink [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: growthAdvice }}
            />
          </div>

          {/* Pairings */}
          <div className="mb-8 sm:mb-10">
            <h3 className="font-display font-medium text-xl sm:text-2xl text-ink text-center mb-6">
              Who You Pair With
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strong matches */}
              <div className="rounded-[16px] sm:rounded-[20px] bg-bg/50 border border-ink/6 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wider text-ink-soft/60 font-medium mb-4">
                  Strong matches
                </p>
                <div className="space-y-4">
                  {pairings.strong.map((match) => (
                    <div key={match.label}>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-5 h-5 shrink-0"
                          style={{ color: match.colorVar }}
                          dangerouslySetInnerHTML={{ __html: match.iconSvg }}
                        />
                        <p className="font-display font-medium text-ink">
                          {match.label}
                        </p>
                      </div>
                      <p className="text-sm text-ink-soft leading-relaxed">
                        {match.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tough matches */}
              <div className="rounded-[16px] sm:rounded-[20px] bg-bg/50 border border-ink/6 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wider text-ink-soft/60 font-medium mb-4">
                  Tough matches
                </p>
                <div className="space-y-4">
                  {pairings.tough.map((match) => (
                    <div key={match.label}>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-5 h-5 shrink-0"
                          style={{ color: match.colorVar }}
                          dangerouslySetInnerHTML={{ __html: match.iconSvg }}
                        />
                        <p className="font-display font-medium text-ink">
                          {match.label}
                        </p>
                      </div>
                      <p className="text-sm text-ink-soft leading-relaxed">
                        {match.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-ink-soft/50 text-center mt-4">
              Based on your primary posture. Tough matches aren&apos;t bad. They just take more work.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleCopy}
              className="px-8 py-3 rounded-full bg-ink text-paper font-medium transition-all duration-200 hover:bg-ink/80 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
            >
              Copy Share Link
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full border-2 border-ink/15 text-ink font-medium transition-all duration-200 hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>

      <CopyToast visible={toastVisible} />
    </>
  );
}
