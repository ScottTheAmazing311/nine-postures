'use client';

import { useState, useCallback, useEffect } from 'react';
import { PostureId, getPostureById } from '@/lib/postures';
import { QUESTIONS, STATEMENT_OPTIONS, computeResults } from '@/lib/quiz';
import { generateTitle } from '@/lib/writeup';

type Phase = 'intro' | 'questions' | 'results';

type Props = {
  onComplete: (results: [PostureId, PostureId, PostureId]) => void;
  onClose: () => void;
};

const SLOT_LABELS = ['what you usually are', 'what you sometimes are', 'what you want to be'];

export default function Quiz({ onComplete, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [results, setResults] = useState<[PostureId, PostureId, PostureId] | null>(null);
  const [picking, setPicking] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (picking) return;
    setPicking(true);

    const nextAnswers = [...answers];
    nextAnswers[currentQ] = answerIndex;
    setAnswers(nextAnswers);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        const computed = computeResults(nextAnswers as number[]);
        setResults(computed);
        setPhase('results');
      }
      setPicking(false);
    }, 350);
  }, [currentQ, answers, picking]);

  const handleBack = useCallback(() => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
    }
  }, [currentQ]);

  const handleRetake = useCallback(() => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQ(0);
    setResults(null);
    setPhase('intro');
  }, []);

  const handleAccept = useCallback(() => {
    if (results) onComplete(results);
  }, [results, onComplete]);

  const progress = phase === 'questions' ? ((currentQ + 1) / QUESTIONS.length) * 100 : 0;
  const question = QUESTIONS[currentQ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
      style={{ animation: 'fadeIn 0.25s ease-out' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg-2 flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
        aria-label="Close quiz"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4 L12 12 M12 4 L4 12" />
        </svg>
      </button>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="text-center px-6 max-w-md" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <p className="text-xs uppercase tracking-widest text-ink-soft/60 mb-3">
            Find your three
          </p>
          <h2 className="font-display font-medium text-3xl text-ink mb-4">
            Take the quiz
          </h2>
          <p className="text-ink-soft leading-relaxed mb-8">
            24 quick questions about what drives you. Some are about how you already live.
            Others are about what you wish you did more of.
          </p>
          <button
            onClick={() => setPhase('questions')}
            className="px-10 py-3.5 rounded-full bg-ink text-paper font-medium transition-all hover:bg-ink/80"
          >
            Start
          </button>
        </div>
      )}

      {/* Questions */}
      {phase === 'questions' && (
        <div className="w-full max-w-lg px-6 flex flex-col items-center">
          {/* Progress bar */}
          <div className="w-full max-w-xs h-1 rounded-full bg-ink/10 mb-2">
            <div
              className="h-full rounded-full bg-ink/40 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-ink-soft/50 mb-10">
            {currentQ + 1} of {QUESTIONS.length}
          </p>

          {/* Back button */}
          {currentQ > 0 && (
            <button
              onClick={handleBack}
              className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-bg-2 flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
              aria-label="Previous question"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 4 L6 8 L10 12" />
              </svg>
            </button>
          )}

          {/* Question */}
          <div
            key={currentQ}
            className="text-center w-full"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          >
            {question.type === 'statement' ? (
              <>
                <p className="font-display text-xl md:text-2xl text-ink leading-relaxed mb-10 max-w-md mx-auto">
                  &ldquo;{question.text}&rdquo;
                </p>
                <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
                  {STATEMENT_OPTIONS.map((opt, i) => {
                    const justPicked = picking && answers[currentQ] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={picking}
                        className="w-full py-3.5 px-5 rounded-2xl text-sm font-medium transition-all duration-200 border-2 text-left flex items-center gap-3"
                        style={{
                          borderColor: justPicked ? 'var(--color-ink)' : 'rgba(28, 24, 22, 0.1)',
                          backgroundColor: justPicked ? 'var(--color-ink)' : 'var(--color-paper)',
                          color: justPicked ? 'var(--color-paper)' : 'var(--color-ink)',
                          transform: justPicked ? 'scale(0.97)' : undefined,
                        }}
                      >
                        <span
                          className="w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors"
                          style={{
                            borderColor: justPicked ? 'var(--color-paper)' : 'rgba(28, 24, 22, 0.25)',
                          }}
                        >
                          {justPicked && (
                            <span className="w-2.5 h-2.5 rounded-full bg-paper" />
                          )}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <p className="font-display text-xl md:text-2xl text-ink leading-relaxed mb-10 max-w-md mx-auto">
                  {question.text}
                </p>
                <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
                  {question.options.map((opt, i) => {
                    const justPicked = picking && answers[currentQ] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={picking}
                        className="w-full py-3.5 px-5 rounded-2xl text-sm font-medium transition-all duration-200 border-2 text-left flex items-center gap-3"
                        style={{
                          borderColor: justPicked ? 'var(--color-ink)' : 'rgba(28, 24, 22, 0.1)',
                          backgroundColor: justPicked ? 'var(--color-ink)' : 'var(--color-paper)',
                          color: justPicked ? 'var(--color-paper)' : 'var(--color-ink)',
                          transform: justPicked ? 'scale(0.97)' : undefined,
                        }}
                      >
                        <span
                          className="w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors"
                          style={{
                            borderColor: justPicked ? 'var(--color-paper)' : 'rgba(28, 24, 22, 0.25)',
                          }}
                        >
                          {justPicked && (
                            <span className="w-2.5 h-2.5 rounded-full bg-paper" />
                          )}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {phase === 'results' && results && (
        <div
          className="text-center px-6 max-w-lg"
          style={{ animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <p className="text-xs uppercase tracking-widest text-ink-soft/60 mb-2">
            You are the
          </p>
          <h2 className="font-display font-medium text-3xl md:text-4xl text-ink mb-8">
            {generateTitle(results)}
          </h2>

          <div className="flex flex-col gap-3 mb-8">
            {results.map((id, i) => {
              const p = getPostureById(id);
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl bg-paper border border-ink/6 p-4"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="text-left flex-1">
                    <p className="text-xs uppercase tracking-wider text-ink-soft/60">
                      {SLOT_LABELS[i]}
                    </p>
                    <p className="font-display font-medium text-ink">
                      {p.name}
                    </p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: p.colorVar }}
                  />
                </div>
              );
            })}
          </div>

          <p className="text-sm text-ink-soft/60 mb-6">
            Not quite right? You can adjust your picks after.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleAccept}
              className="px-8 py-3 rounded-full bg-ink text-paper font-medium transition-all hover:bg-ink/80"
            >
              See your reading
            </button>
            <button
              onClick={handleRetake}
              className="px-8 py-3 rounded-full border-2 border-ink/15 text-ink font-medium transition-all hover:border-ink/30"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
