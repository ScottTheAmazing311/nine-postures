import { PostureId, getPostureById } from './postures';

function singular(name: string) {
  return name.endsWith('s') ? name.slice(0, -1) : name;
}

function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

const VERBS: Record<PostureId, [string, string]> = {
  champion:       ['compete and win', 'lives by mastery'],
  creator:        ['make things', 'lives to bring new things into being'],
  cultivator:     ['grow people', 'lives to refine and tend'],
  contributor:    ['show up reliably', 'lives in service of the whole'],
  consumer:       ['enjoy and rest', 'lives to taste the world'],
  crusader:       ['fight for the cause', 'lives for what should change'],
  capitalist:     ['build leverage', 'lives to scale and decide'],
  contemplative:  ['sit with questions', 'lives to understand'],
  custodian:      ['protect what matters', 'lives to keep what\'s worth keeping'],
};

function verbFor(id: PostureId, future: boolean) {
  return VERBS[id][future ? 1 : 0];
}

export function generateWriteUp(slots: [PostureId, PostureId, PostureId]): string {
  const [usually, sometimes, want] = slots.map(getPostureById);

  const sameUsuallyWant = usually.id === want.id;
  const sameUsuallySometimes = usually.id === sometimes.id;

  const para1 = `You usually move through the world as a <em>${singular(usually.name)}</em>, someone who ${verbFor(usually.id, false)}. ${usually.desc} That's your center of gravity. When things are good, you look like ${usually.healthy.name}: ${lowerFirst(usually.healthy.text)} When things go sideways, the shadow is ${usually.unhealthy.name}: ${lowerFirst(usually.unhealthy.text)}`;

  let para2: string;
  if (sameUsuallySometimes) {
    para2 = `When you slide into a different mode, you don't slide far. You double down on what you already are. More ${verbFor(usually.id, false)}, more intensity in the same direction. That focus is a strength until it becomes a blind spot.`;
  } else {
    para2 = `Sometimes you slide into being a <em>${singular(sometimes.name)}</em>, someone who ${verbFor(sometimes.id, false)}. ${sometimes.desc} This isn't a contradiction. It's a counterweight. The ${singular(usually.name)} in you ${verbFor(usually.id, false)}, but part of you also needs to ${verbFor(sometimes.id, false)}.`;
  }

  let para3: string;
  if (sameUsuallyWant) {
    para3 = `What you want to be is more of what you already are. ${lowerFirst(usually.healthy.text)} The aspiration isn't to become someone new. It's to become the healthiest version of who you already are. That's not a small thing.`;
  } else {
    para3 = `What you want is the <em>${singular(want.name)}</em>'s posture. That's the person who ${verbFor(want.id, true)}. ${want.desc} The gap between where you stand and where you want to stand is worth paying attention to. It doesn't mean you're broken. It means you're growing.`;
  }

  return [para1, para2, para3].map(p => `<p>${p}</p>`).join('');
}
