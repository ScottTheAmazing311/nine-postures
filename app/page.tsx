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
import Quiz from '@/components/Quiz';

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
  const [showQuiz, setShowQuiz] = useState(false);

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

  const handleQuizComplete = useCallback((results: [PostureId, PostureId, PostureId]) => {
    setSlots(results);
    setShowQuiz(false);
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
    <main id="main-content" className="relative z-10 flex flex-col items-center px-4 py-8 sm:py-12 md:py-20 pb-32" style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))', paddingBottom: 'max(8rem, env(safe-area-inset-bottom))' }}>
      {/* Logo */}
      <header className="text-center mb-8 sm:mb-10 max-w-xl">
        <img
          src="/logo.png"
          alt="Nine Postures"
          className="w-28 sm:w-36 mx-auto mb-4"
          draggable={false}
        />
        <p className="text-xs sm:text-sm uppercase tracking-widest text-ink-soft/60 mb-3">
          A Self-Reflection Tool
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ink mb-4">
          The Nine <em className="italic font-normal" style={{ fontVariationSettings: "'SOFT' 100" }}>Postures</em>
        </h1>
        <p className="text-ink-soft leading-relaxed">
          We all carry a mix of drives. Pick the three that shape you most:
          the one you lead with, the one that sometimes takes over, and the one you&apos;re reaching for.
        </p>
      </header>

      {/* Header images */}
      <div className="w-full max-w-[720px] mb-8 sm:mb-10 space-y-1">
        <img
          src="/header.png"
          alt="The nine postures illustrated"
          className="w-full h-auto"
          draggable={false}
        />
        <img
          src="/header2.png"
          alt="The nine postures illustrated"
          className="w-full h-auto"
          draggable={false}
        />
      </div>

      {/* What this is */}
      <div
        className="w-full max-w-[720px] rounded-2xl bg-paper border border-ink/6 p-5 sm:p-6 md:p-8 mb-6 text-left"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <h2 className="font-display font-medium text-lg text-ink mb-3">This is not a personality test.</h2>
        <div className="space-y-3 text-ink-soft text-sm leading-relaxed">
          <p>
            You won&apos;t get sorted into a color, a number, or a four-letter code. Nobody here is going to tell you what you are and lock you into it.
          </p>
          <p>
            Postures are about motivation, not identity. What drives you. What you spend your energy on. What you wish you did more of. These things change over time, and they should. You aren&apos;t stuck.
          </p>
          <p>
            You know yourself better than any quiz does. This is just a framework for thinking about it. Pick three postures that feel true right now, read what comes back, and see if it lands. If it doesn&apos;t, pick different ones. You&apos;re in charge.
          </p>
        </div>
      </div>

      {/* Why I built this */}
      <div
        className="w-full max-w-[720px] rounded-2xl bg-bg-2/50 border border-ink/6 p-5 sm:p-6 md:p-8 mb-8 sm:mb-12"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <p className="text-ink-soft text-sm leading-relaxed italic">
          I built this for my kids. They&apos;re young and starting to figure out what they want to be.
          I want them to see that all nine of these are live options. Every one of them is a good life.
          You can make decisions and sacrifices that move you toward any of these postures. Some will
          come more naturally than others, but none of them are closed off to you. The only thing that
          matters is that you&apos;re becoming the best version of whichever ones you choose. Do that,
          and you&apos;re exactly who you need to be.
        </p>
      </div>

      {/* Instructions card */}
      <div
        className="w-full max-w-[720px] rounded-2xl bg-paper border border-ink/6 p-5 sm:p-6 mb-8 sm:mb-12 text-center"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <p className="text-ink-soft text-sm leading-relaxed mb-4">
          Everyone is a blend of all nine, but three tend to dominate. Tap any card to read about it,
          then use the button to place it in a slot. You can also drag cards directly into slots.
        </p>
        <button
          onClick={() => setShowQuiz(true)}
          className="px-6 py-2.5 rounded-full border-2 border-ink/15 text-ink text-sm font-medium transition-all hover:border-ink/30 hover:bg-ink/5"
        >
          Not sure? Take a quiz
        </button>
      </div>

      {/* Posture explainer */}
      <PostureExplainer />

      {/* Divider before selection */}
      <div className="flex items-center gap-4 my-8 sm:my-12">
        <span className="text-ink-soft/30">&#x2022; &#x2022; &#x2022;</span>
        <p className="font-display italic text-ink-soft text-lg">choose your three</p>
        <span className="text-ink-soft/30">&#x2022; &#x2022; &#x2022;</span>
      </div>

      {/* Slots grid */}
      <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14">
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

      {/* Postures grid */}
      <div className="w-full max-w-[900px] grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
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

      {/* Quiz */}
      {showQuiz && (
        <Quiz
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </main>
  );
}
