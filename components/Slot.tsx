'use client';

import { PostureId, getPostureById } from '@/lib/postures';
import { useCallback, useState } from 'react';

type Props = {
  index: number;
  label: string;
  postureId: PostureId | null;
  onDrop: (id: PostureId, index: number) => void;
  onTapSlot: (index: number) => void;
  onClear: (index: number) => void;
};

export default function Slot({ index, label, postureId, onDrop, onTapSlot, onClear }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const posture = postureId ? getPostureById(postureId) : null;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData('text/plain') as PostureId;
    if (id) onDrop(id, index);
  }, [onDrop, index]);

  const handleClick = useCallback(() => {
    onTapSlot(index);
  }, [onTapSlot, index]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={posture ? `${label}: ${posture.name}. Click to change.` : `${label}: empty. Click to place a posture.`}
      className="relative rounded-2xl transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
      style={{
        minHeight: '140px',
        border: posture
          ? `2px solid ${posture.colorVar}`
          : dragOver
            ? '2px solid var(--color-ink)'
            : '2px dashed rgba(28, 24, 22, 0.2)',
        backgroundColor: dragOver ? 'var(--color-bg-2)' : posture ? 'var(--color-paper)' : 'transparent',
        transform: dragOver ? 'scale(1.03)' : undefined,
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      {posture ? (
        <div className="p-5 flex items-center gap-4">
          <div
            className="w-12 h-12 shrink-0"
            style={{ color: posture.colorVar }}
            dangerouslySetInnerHTML={{ __html: posture.iconSvg }}
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wider text-ink-soft font-medium mb-1">
              {label}
            </p>
            <h4 className="font-display font-medium text-lg text-ink">
              {posture.name}
            </h4>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClear(index); }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:bg-bg-2 transition-colors focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
            aria-label={`Clear ${label}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4 L12 12 M12 4 L4 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="p-5 flex flex-col items-center justify-center h-full min-h-[140px] text-center">
          <p className="text-sm font-medium text-ink-soft/60 italic font-display">
            {label}
          </p>
          <p className="text-xs text-ink-soft/40 mt-1">
            drag or tap to place
          </p>
        </div>
      )}
    </div>
  );
}
