'use client';

export default function CopyToast({ visible }: { visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 z-50"
      style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
    >
      {visible && (
        <div
          className="px-6 py-3 rounded-full bg-ink text-paper text-sm font-medium shadow-lg"
          style={{ animation: 'slideUpToast 0.25s ease-out' }}
        >
          Link copied!
        </div>
      )}
    </div>
  );
}
