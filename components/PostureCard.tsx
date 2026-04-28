'use client';

import { Posture, PostureId } from '@/lib/postures';
import { useRef, useCallback } from 'react';

type Props = {
  posture: Posture;
  isUsed: boolean;
  isTappedSource: boolean;
  onTap: (id: PostureId) => void;
  onLongPress: (id: PostureId) => void;
};

export default function PostureCard({ posture, isUsed, isTappedSource, onTap, onLongPress }: Props) {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const handlePointerDown = useCallback(() => {
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      onLongPress(posture.id);
    }, 500);
  }, [posture.id, onLongPress]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    if (didLongPress.current) return;
    onTap(posture.id);
  }, [posture.id, onTap]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onLongPress(posture.id);
  }, [posture.id, onLongPress]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', posture.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [posture.id]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      onLongPress(posture.id);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onTap(posture.id);
    }
  }, [posture.id, onTap, onLongPress]);

  return (
    <button
      draggable
      onDragStart={handleDragStart}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      aria-label={`View ${posture.name} details`}
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

      <div className="relative h-28 w-full overflow-hidden bg-bg-2/50" style={{ aspectRatio: '16/7' }}>
        <img
          src={posture.art}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/80 to-transparent" />
      </div>

      <div className="p-5 pt-3">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 shrink-0"
            style={{ color: posture.colorVar }}
            dangerouslySetInnerHTML={{ __html: posture.iconSvg }}
          />
          <div className="min-w-0">
            <h3 className="font-display font-medium text-lg leading-tight text-ink">
              {posture.name}
            </h3>
            <p className="text-sm text-ink-soft mt-0.5 italic font-display font-light">
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
