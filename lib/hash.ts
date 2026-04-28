import { PostureId, POSTURE_ORDER } from './postures';

export function encodeTrio(slots: [PostureId, PostureId, PostureId]): string {
  return slots.map(id => POSTURE_ORDER.indexOf(id)).join('');
}

export function decodeTrio(hash: string): [PostureId, PostureId, PostureId] | null {
  if (!/^[0-8]{3}$/.test(hash)) return null;
  const ids = hash.split('').map(n => POSTURE_ORDER[parseInt(n, 10)]);
  if (new Set(ids).size !== 3) return null;
  return ids as [PostureId, PostureId, PostureId];
}
