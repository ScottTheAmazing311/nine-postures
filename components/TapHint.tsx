'use client';

export default function TapHint({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-full bg-ink text-paper text-sm font-medium shadow-lg"
      style={{ animation: 'fadeIn 0.2s ease-out', top: 'max(1rem, env(safe-area-inset-top))' }}
    >
      Tap a slot to place
    </div>
  );
}
