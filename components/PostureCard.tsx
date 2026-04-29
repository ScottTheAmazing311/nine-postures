'use client';

import { Posture, PostureId } from '@/lib/postures';
import { useCallback } from 'react';

type Props = {
  posture: Posture;
  isUsed: boolean;
  isTappedSource: boolean;
  onTap: (id: PostureId) => void;
  onLongPress: (id: PostureId) => void;
};

export default function PostureCard({ posture, isUsed, isTappedSource, onTap, onLongPress }: Props) {
  const handleClick = useCallback(() => {
    onLongPress(posture.id);
  }, [posture.id, onLongPress]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onLongPress(posture.id);
  }, [posture.id, onLongPress]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', posture.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [posture.id]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onLongPress(posture.id);
    }
  }, [posture.id, onLongPress]);

  return (
    <button
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      aria-label={`${posture.name}: ${posture.tag}`}
      className="group relative w-full text-left rounded-[20px] overflow-hidden bg-paper border border-ink/6 transition-all duration-250 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none select-none"
      style={{
        boxShadow: 'var(--shadow-card)',
        opacity: isUsed ? 0.3 : 1,
        pointerEvents: isUsed ? 'none' : 'auto',
        transform: isTappedSource ? 'scale(0.95)' : undefined,
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        touchAction: 'manipulation',
        WebkitUserSelect: 'none',
      } as React.CSSProperties}
    >
      <div className="h-1 w-full" style={{ backgroundColor: posture.colorVar }} />

      <div className="relative h-20 sm:h-28 w-full overflow-hidden bg-bg-2/50">
        <img
          src={posture.art}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/80 to-transparent" />
      </div>

      <div className="p-3 sm:p-5 sm:pt-3">
        <div className="flex items-start gap-2 sm:gap-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
            style={{ color: posture.colorVar }}
            dangerouslySetInnerHTML={{ __html: posture.iconSvg }}
          />
          <div className="min-w-0">
            <h3 className="font-display font-medium text-base sm:text-lg leading-tight text-ink">
              {posture.name}
            </h3>
            <p className="text-xs sm:text-sm text-ink-soft mt-0.5 italic font-display font-light hidden sm:block">
              {posture.tag}
            </p>
          </div>
        </div>
      </div>

      {isTappedSource && (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ boxShadow: `0 0 0 3px ${posture.colorVar}` }}
        />
      )}
    </button>
  );
}
