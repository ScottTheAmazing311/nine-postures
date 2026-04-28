'use client';

import { PostureId, getPostureById } from '@/lib/postures';
import { useEffect, useRef, useCallback } from 'react';

type Props = {
  postureId: PostureId;
  onClose: () => void;
  onUse: (id: PostureId) => void;
};

export default function PostureModal({ postureId, onClose, onUse }: Props) {
  const posture = getPostureById(postureId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    // Trap focus
    const modal = modalRef.current;
    if (modal) {
      const focusable = modal.querySelectorAll<HTMLElement>('button, [tabindex]');
      if (focusable.length) focusable[0].focus();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(28, 24, 22, 0.4)',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${posture.name} details`}
        className="relative w-full max-w-[520px] max-h-[85vh] overflow-y-auto rounded-[28px] bg-paper p-7 md:p-8"
        style={{
          boxShadow: 'var(--shadow-elev)',
          animation: 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg-2 flex items-center justify-center text-ink-soft hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4 L12 12 M12 4 L4 12" />
          </svg>
        </button>

        {/* Art image */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-6 -mt-2">
          <img
            src={posture.art}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/90 to-transparent" />
        </div>

        {/* Icon + name */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-16 h-16 shrink-0"
            style={{ color: posture.colorVar }}
            dangerouslySetInnerHTML={{ __html: posture.iconSvg }}
          />
          <div>
            <h2 className="font-display font-medium text-2xl text-ink">
              {posture.name}
            </h2>
            <p className="text-sm text-ink-soft italic font-display mt-0.5">
              {posture.tag}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-ink-soft leading-relaxed mb-2">{posture.desc}</p>
        <p className="text-ink-soft/70 text-sm mb-6">{posture.examples}</p>

        {/* Healthy box */}
        <div className="rounded-[14px] bg-bg-2 p-4 mb-3">
          <p className="text-xs uppercase tracking-wider text-ink-soft/60 mb-1">Healthy</p>
          <p className="font-display font-medium text-ink mb-1">
            {posture.healthy.name}
          </p>
          <p className="text-sm text-ink-soft">{posture.healthy.text}</p>
        </div>

        {/* Unhealthy box */}
        <div className="rounded-[14px] bg-bg-2 p-4 mb-6">
          <p className="text-xs uppercase tracking-wider text-ink-soft/60 mb-1">Unhealthy</p>
          <p className="font-display font-medium text-ink mb-1">
            {posture.unhealthy.name}
          </p>
          <p className="text-sm text-ink-soft">{posture.unhealthy.text}</p>
        </div>

        {/* Use button */}
        <button
          onClick={() => onUse(postureId)}
          className="w-full py-3 px-6 rounded-full font-medium text-paper transition-all duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
          style={{ backgroundColor: posture.colorVar }}
        >
          Use this posture &rarr;
        </button>
      </div>
    </div>
  );
}
