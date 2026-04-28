'use client';

import { useState, useEffect, useCallback } from 'react';
import { PostureId, POSTURES } from '@/lib/postures';
import { decodeTrio, encodeTrio } from '@/lib/hash';
import PostureCard from '@/components/PostureCard';
import Slot from '@/components/Slot';
import PostureModal from '@/components/PostureModal';
import ResultsPanel from '@/components/ResultsPanel';
import TapHint from '@/components/TapHint';
import PostureExplainer from '@/components/PostureExplainer';

type SlotIndex = 0 | 1 | 2;
type Slots = [PostureId | null, PostureId | null, PostureId | null];

const SLOT_LABELS = [
  'what i usually am',
  'what i sometimes am',
  'what i want to be',
] as const;

export default function Home() {
  const [slots, setSlots] = useState<Slots>([null, null, null]);
  const [tappedSource, setTappedSource] = useState<PostureId | null>(null);
  const [modalPosture, setModalPosture] = useState<PostureId | null>(null);

  // Rehydrate from hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const trio = decodeTrio(hash);
      if (trio) {
        setSlots(trio);
      }
    }
  }, []);

  // Push hash when all slots filled
  const allFilled = slots.every(s => s !== null);
  useEffect(() => {
    if (allFilled) {
      const hash = encodeTrio(slots as [PostureId, PostureId, PostureId]);
      window.location.hash = hash;
    }
  }, [allFilled, slots]);

  const placeIntoSlot = useCallback((id: PostureId, index: SlotIndex) => {
    setSlots(prev => {
      const next = prev.map(s => (s === id ? null : s)) as Slots;
      next[index] = id;
      return next;
    });
    setTappedSource(null);
  }, []);

  const handleCardTap = useCallback((id: PostureId) => {
    if (tappedSource === id) {
      setTappedSource(null);
      return;
    }
    setTappedSource(id);
  }, [tappedSource]);

  const handleSlotTap = useCallback((index: number) => {
    if (tappedSource) {
      placeIntoSlot(tappedSource, index as SlotIndex);
    }
  }, [tappedSource, placeIntoSlot]);

  const handleSlotDrop = useCallback((id: PostureId, index: number) => {
    placeIntoSlot(id, index as SlotIndex);
  }, [placeIntoSlot]);

  const handleClearSlot = useCallback((index: number) => {
    setSlots(prev => {
      const next = [...prev] as Slots;
      next[index] = null;
      return next;
    });
  }, []);

  const handleLongPress = useCallback((id: PostureId) => {
    setModalPosture(id);
  }, []);

  const handleUseFromModal = useCallback((id: PostureId) => {
    setTappedSource(id);
    setModalPosture(null);
  }, []);

  const handleReset = useCallback(() => {
    setSlots([null, null, null]);
    setTappedSource(null);
  }, []);

  // Clear tapped source when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-posture-card]') && !target.closest('[data-slot]')) {
        setTappedSource(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const usedPostureIds = new Set(slots.filter(Boolean) as PostureId[]);

  return (
    <main id="main-content" className="relative z-10 flex flex-col items-center px-4 py-12 md:py-20 pb-32">
      {/* Header */}
      <header className="text-center mb-10 max-w-xl">
        <p className="text-sm uppercase tracking-widest text-ink-soft/60 mb-3">
          A Self-Reflection Tool
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-ink mb-4">
          The Nine <em className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100" }}>Postures</em>
        </h1>
        <p className="text-ink-soft leading-relaxed">
          We all carry a mix of drives. Pick the three that shape you most:
          the one you lead with, the one that sometimes takes over, and the one you&apos;re reaching for.
        </p>
      </header>

      {/* Instructions card */}
      <div
        className="w-full max-w-[720px] rounded-2xl bg-paper border border-ink/6 p-6 mb-12 text-center"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <p className="text-ink-soft text-sm leading-relaxed">
          Everyone is a blend of all nine, but three tend to dominate. Drag a posture into each slot below,
          or tap a card then tap a slot. Long-press or right-click any card for the full description.
        </p>
      </div>

      {/* Posture explainer */}
      <PostureExplainer />

      {/* Divider before selection */}
      <div className="flex items-center gap-4 my-12">
        <span className="text-ink-soft/30">&#x2022; &#x2022; &#x2022;</span>
        <p className="font-display italic text-ink-soft text-lg">choose your three</p>
        <span className="text-ink-soft/30">&#x2022; &#x2022; &#x2022;</span>
      </div>

      {/* Slots grid */}
      <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {SLOT_LABELS.map((label, i) => (
          <div key={label} data-slot>
            <Slot
              index={i}
              label={label}
              postureId={slots[i]}
              onDrop={handleSlotDrop}
              onTapSlot={handleSlotTap}
              onClear={handleClearSlot}
            />
          </div>
        ))}
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-4 mb-12">
        <span className="text-ink-soft/30">&#x2022; &#x2022; &#x2022;</span>
        <p className="font-display italic text-ink-soft text-lg">the nine</p>
        <span className="text-ink-soft/30">&#x2022; &#x2022; &#x2022;</span>
      </div>

      {/* Postures grid */}
      <div className="w-full max-w-[900px] grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {POSTURES.map((posture, i) => (
          <div key={posture.id} data-posture-card style={{ '--i': i } as React.CSSProperties}>
            <PostureCard
              posture={posture}
              isUsed={usedPostureIds.has(posture.id)}
              isTappedSource={tappedSource === posture.id}
              onTap={handleCardTap}
              onLongPress={handleLongPress}
            />
          </div>
        ))}
      </div>

      {/* Results panel */}
      {allFilled && (
        <ResultsPanel
          slots={slots as [PostureId, PostureId, PostureId]}
          onReset={handleReset}
        />
      )}

      {/* Tap hint */}
      <TapHint visible={tappedSource !== null} />

      {/* Modal */}
      {modalPosture && (
        <PostureModal
          postureId={modalPosture}
          onClose={() => setModalPosture(null)}
          onUse={handleUseFromModal}
        />
      )}
    </main>
  );
}
