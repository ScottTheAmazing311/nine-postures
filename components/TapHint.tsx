'use client';

export default function TapHint({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-full bg-ink text-paper text-sm font-medium shadow-lg"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      Tap a slot to place
    </div>
  );
}
