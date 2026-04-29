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
  connoisseur:    ['savor and appreciate', 'lives to taste the world'],
  crusader:       ['fight for the cause', 'lives for what should change'],
  capitalist:     ['build leverage', 'lives to scale and decide'],
  contemplative:  ['sit with questions', 'lives to understand'],
  custodian:      ['protect what matters', 'lives to keep what\'s worth keeping'],
};

function verbFor(id: PostureId, future: boolean) {
  return VERBS[id][future ? 1 : 0];
}

// Title words per posture: [adjective, noun]
// Adjective used in want/sometimes slots, noun used in usually slot
// Each posture has a unique first letter per column:
// Adjectives (want/sometimes): F C N S D R A T V
// Nouns (usually):             C M N S E R A P G
const TITLE_WORDS: Record<PostureId, [string, string]> = {
  champion:      ['Fierce',      'Champion'],
  creator:       ['Creative',    'Maker'],
  cultivator:    ['Nurturing',   'Nurturer'],
  contributor:   ['Steadfast',   'Steward'],
  connoisseur:   ['Discerning',  'Epicure'],
  crusader:      ['Reforming',   'Reformer'],
  capitalist:    ['Ambitious',   'Architect'],
  contemplative: ['Thoughtful',  'Philosopher'],
  custodian:     ['Vigilant',    'Guardian'],
};

export function generateTitle(slots: [PostureId, PostureId, PostureId]): string {
  const [usually, sometimes, want] = slots;
  const wantAdj = TITLE_WORDS[want][0];
  const sometimesAdj = TITLE_WORDS[sometimes][0];
  const usuallyNoun = TITLE_WORDS[usually][1];
  return `${wantAdj} ${sometimesAdj} ${usuallyNoun}`;
}

export function generateAcronym(slots: [PostureId, PostureId, PostureId]): string {
  const [usually, sometimes, want] = slots;
  return `${TITLE_WORDS[want][0][0]}${TITLE_WORDS[sometimes][0][0]}${TITLE_WORDS[usually][1][0]}`;
}

export function generateEmojiCode(slots: [PostureId, PostureId, PostureId]): string {
  return slots.map(id => getPostureById(id).emoji).join('');
}

const GROWTH: Record<PostureId, {
  bestSelf: string;
  avoid: string;
  balance: string;
  practice: string;
}> = {
  champion: {
    bestSelf: 'Compete with who you were yesterday, not with everyone around you. The healthiest Champions raise the bar for themselves and pull others up in the process. Share what you learn on the way up.',
    avoid: 'Turning everything into a scoreboard. When winning is the only thing that feels good, you stop enjoying the craft itself. Watch for dismissing people who aren\'t "serious" enough, or treating rest as weakness.',
    balance: 'Your competitive edge keeps you honest about standards and pushes you past comfortable plateaus. When your primary drive gets soft or complacent, let this side sharpen you without cutting others.',
    practice: 'Pick one thing and commit to getting measurably better at it. Track your progress. Find people who are ahead of you and study what they do. Stop treating ambition like it needs an apology.',
  },
  creator: {
    bestSelf: 'Finish things and put them into the world. The best Creators ship. A finished project at 80% of your vision teaches more than a perfect one that never leaves the workshop.',
    avoid: 'Hiding in the process. Starting is easy and exciting. Finishing is where growth lives. Watch for "it\'s not ready yet" becoming a shield against judgment, and for using new projects to avoid completing old ones.',
    balance: 'Your creative instinct keeps things alive and fresh. When your primary drive gets stale or rigid, your maker\'s eye finds a new angle. Trust that impulse when it shows up.',
    practice: 'Make something small and finish it this week. Then make another. Build the muscle of completing, not just starting. Give yourself permission to make bad work on the way to good work.',
  },
  cultivator: {
    bestSelf: 'Invest in people without needing to see the return. The healthiest Cultivators plant seeds and walk away. They trust that growth will happen even when they\'re not watching or getting credit.',
    avoid: 'Making other people\'s growth about you. If you feel hurt when someone you mentored outgrows you or takes a different path, that\'s a signal. Also watch for neglecting yourself while tending everyone else.',
    balance: 'Your instinct to develop others is a corrective. It reminds you that impact isn\'t always about what you build or achieve. Sometimes the best thing you can do is help someone else get where they\'re going.',
    practice: 'Find someone who\'s struggling with something you understand and offer to help, no strings attached. Listen more than you advise. Ask questions before giving answers. Patience is the skill here.',
  },
  contributor: {
    bestSelf: 'Show up consistently and let your reliability speak for itself. But also speak up. The best Contributors don\'t just serve. They tell the truth about what they see, even when it\'s uncomfortable.',
    avoid: 'Disappearing into service. If you never advocate for your own needs, resentment builds quietly. Loyalty is a virtue until it becomes self-erasure. Watch for saying yes when you mean no.',
    balance: 'Your steadiness is grounding. When things get chaotic or ego-driven, your willingness to just do what needs doing keeps everything together. Don\'t underestimate how much that matters.',
    practice: 'Volunteer for something you believe in, not just something that needs doing. Practice saying "I need this" as often as you say "I can help." Your needs are not a burden on others.',
  },
  connoisseur: {
    bestSelf: 'Slow down enough to actually taste your life. The best Connoisseurs don\'t just consume experiences. They notice, appreciate, and share what they find with genuine enthusiasm that\'s contagious.',
    avoid: 'Using refinement as a wall. If your high standards keep you from engaging with imperfect things and imperfect people, they\'ve stopped serving you. Pickiness is not the same as discernment.',
    balance: 'Your appreciation for quality is a corrective. When your primary drive pushes you to go faster or produce more, your Connoisseur side says "slow down and do this right." Listen to it.',
    practice: 'Block time to do nothing productive. Cook a meal slowly. Listen to an album all the way through. Practice noticing what\'s already good in your life instead of always optimizing for what\'s next.',
  },
  crusader: {
    bestSelf: 'Fight for what matters, but fight smart. The healthiest Crusaders pick battles they can actually win and build coalitions instead of burning bridges. Righteous anger is fuel, not a personality.',
    avoid: 'Moral exhaustion and alienating allies. If you\'re always the angriest person in the room, people stop listening no matter how right you are. Watch for treating disagreement as betrayal.',
    balance: 'Your sense of justice keeps things honest. When comfort or ambition tempts you to look away from what\'s wrong, your Crusader instinct won\'t let you. That moral compass is valuable. Calibrate it, don\'t silence it.',
    practice: 'Identify one cause that genuinely matters to you and take a concrete step toward it. Not a post, not an opinion. An action. Then sustain it. Consistency beats intensity every time.',
  },
  capitalist: {
    bestSelf: 'Build systems that create freedom, not just wealth. The best Capitalists use leverage to open doors for others, not just themselves. Think about what your resources make possible beyond your own comfort.',
    avoid: 'Reducing everything to transactions. Some things aren\'t investments. Some relationships aren\'t networking. If you can\'t give without expecting a return, your strategic mind has become a cage.',
    balance: 'Your strategic thinking is an asset. When idealism or emotion clouds judgment, your ability to see leverage, opportunity, and second-order effects keeps you grounded in what\'s actually possible.',
    practice: 'Look at your resources, skills, and connections. Ask what you could build that outlasts you. Think in systems, not just goals. Start treating your time like the finite resource it actually is.',
  },
  contemplative: {
    bestSelf: 'Think deeply and then act on what you find. The best Contemplatives don\'t just understand the world. They use that understanding to make better decisions and help others see more clearly.',
    avoid: 'Using understanding as a substitute for doing. If you always need more information before you can move, you\'re not being thorough. You\'re being afraid. At some point, you know enough to start.',
    balance: 'Your depth prevents costly mistakes. When action-bias leads to carelessness, your instinct to pause and understand is exactly what\'s needed. The question "but why?" is almost always worth asking.',
    practice: 'Pick a question that fascinates you and go deep. Read, think, discuss. But set a deadline to share what you\'ve learned, even if it feels incomplete. Understanding that stays in your head helps no one.',
  },
  custodian: {
    bestSelf: 'Protect what matters and know when to let go. The best Custodians preserve what\'s truly valuable and make peace with what\'s run its course. Stewardship means knowing the difference.',
    avoid: 'Confusing preservation with resistance to change. Not everything old is sacred. If you\'re holding on because letting go feels like loss, ask whether you\'re protecting the thing or protecting yourself from grief.',
    balance: 'Your protective instinct is necessary. When everyone else is chasing the new, you remember what\'s been built and what it cost. That institutional memory prevents repeating old mistakes.',
    practice: 'Find something in your life or community that\'s being neglected and take responsibility for it. Maintain it. Restore it. Show others why it matters through your care, not your words.',
  },
};

export function generateGrowthAdvice(slots: [PostureId, PostureId, PostureId]): string {
  const [usually, sometimes, want] = slots;
  const usuallyName = singular(getPostureById(usually).name);
  const sometimesName = singular(getPostureById(sometimes).name);
  const wantName = singular(getPostureById(want).name);

  const para1 = `<p><strong>Become your best ${usuallyName}.</strong> ${GROWTH[usually].bestSelf}</p>`;
  const para2 = `<p><strong>What to watch for.</strong> ${GROWTH[usually].avoid}</p>`;
  const para3 = `<p><strong>Use your ${sometimesName} side.</strong> ${GROWTH[sometimes].balance}</p>`;
  const para4 = `<p><strong>Grow toward the ${wantName}.</strong> ${GROWTH[want].practice}</p>`;

  return [para1, para2, para3, para4].join('');
}

// Compatibility matrix: how two "usually" postures interact (-2 to +2)
const COMPAT: Record<PostureId, Record<PostureId, number>> = {
  champion:      { champion: -1, creator:  0, cultivator:  2, contributor:  2, connoisseur:  1, crusader: -1, capitalist:  1, contemplative:  1, custodian:  0 },
  creator:       { champion:  0, creator: -1, cultivator:  1, contributor:  1, connoisseur:  2, crusader:  0, capitalist:  2, contemplative:  1, custodian: -1 },
  cultivator:    { champion:  2, creator:  1, cultivator: -1, contributor:  0, connoisseur: -1, crusader:  1, capitalist: -1, contemplative:  1, custodian:  1 },
  contributor:   { champion:  2, creator:  1, cultivator:  0, contributor: -1, connoisseur: -1, crusader: -1, capitalist:  1, contemplative:  0, custodian:  2 },
  connoisseur:   { champion:  1, creator:  2, cultivator: -1, contributor: -1, connoisseur: -1, crusader: -2, capitalist:  0, contemplative:  1, custodian:  1 },
  crusader:      { champion: -1, creator:  0, cultivator:  1, contributor: -1, connoisseur: -2, crusader: -1, capitalist: -2, contemplative:  2, custodian:  0 },
  capitalist:    { champion:  1, creator:  2, cultivator: -1, contributor:  1, connoisseur:  0, crusader: -2, capitalist: -1, contemplative:  1, custodian: -1 },
  contemplative: { champion:  1, creator:  1, cultivator:  1, contributor:  0, connoisseur:  1, crusader:  2, capitalist:  1, contemplative: -1, custodian:  0 },
  custodian:     { champion:  0, creator: -1, cultivator:  1, contributor:  2, connoisseur:  1, crusader:  0, capitalist: -1, contemplative:  0, custodian: -1 },
};

// Why specific posture pairs work well or struggle
const PAIR_REASONS: Record<string, string> = {
  // Strong complements (+2)
  'champion+cultivator':    'Champion pushes for excellence while Cultivator makes sure people aren\'t crushed in the process. Each has exactly what the other lacks.',
  'champion+contributor':   'Contributor\'s selfless reliability grounds Champion\'s ego. Champion inspires the standard, Contributor sustains the work.',
  'creator+connoisseur':    'Connoisseur\'s taste refines Creator\'s output. Creator makes, Connoisseur appreciates. They bring out each other\'s best.',
  'creator+capitalist':     'Creator builds things, Capitalist scales them. The classic maker-operator pairing. One invents, the other multiplies.',
  'crusader+contemplative': 'Contemplative gives intellectual depth to Crusader\'s passion. Crusader gives urgency to Contemplative\'s ideas. Wisdom meets action.',
  'contributor+custodian':  'Both value stability, maintenance, and showing up. They trust each other\'s consistency and share an ethic of care.',
  // Strong friction (-2)
  'crusader+capitalist':    'Crusader sees Capitalist as exploitative. Capitalist sees Crusader as naive. They have fundamentally different definitions of what "good" means.',
  'crusader+connoisseur':   'Crusader sees Connoisseur as frivolous. Connoisseur sees Crusader as joyless. One demands urgency, the other demands presence.',
};

function pairKey(a: PostureId, b: PostureId): string {
  return [a, b].sort().join('+');
}

function getCompatScore(trioA: [PostureId, PostureId, PostureId], trioB: [PostureId, PostureId, PostureId]): number {
  const [usuallyA, sometimesA, wantA] = trioA;
  const [usuallyB, sometimesB, wantB] = trioB;

  // Primary: how the two "usually" postures interact (weight 3)
  let score = COMPAT[usuallyA][usuallyB] * 3;

  // Secondary: does one's "sometimes" complement the other's "usually"? (weight 1 each)
  score += COMPAT[sometimesA][usuallyB];
  score += COMPAT[sometimesB][usuallyA];

  // Tertiary: do their aspirations create synergy or friction? (weight 0.5 each)
  score += COMPAT[wantA][usuallyB] * 0.5;
  score += COMPAT[wantB][usuallyA] * 0.5;

  return score;
}

type PairingMatch = {
  id: PostureId;
  label: string;
  iconSvg: string;
  colorVar: string;
  reason: string;
};

export function generatePairings(slots: [PostureId, PostureId, PostureId]): { strong: PairingMatch[]; tough: PairingMatch[] } {
  const ALL_POSTURES: PostureId[] = [
    'champion', 'creator', 'cultivator', 'contributor', 'connoisseur',
    'crusader', 'capitalist', 'contemplative', 'custodian',
  ];

  // Generate all possible other trios (different from the user's)
  const candidates: { trio: [PostureId, PostureId, PostureId]; score: number }[] = [];

  for (const u of ALL_POSTURES) {
    for (const s of ALL_POSTURES) {
      if (s === u) continue;
      for (const w of ALL_POSTURES) {
        if (w === u || w === s) continue;
        const other: [PostureId, PostureId, PostureId] = [u, s, w];
        // Skip if it's the same trio
        if (u === slots[0] && s === slots[1] && w === slots[2]) continue;
        const score = getCompatScore(slots, other);
        candidates.push({ trio: other, score });
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  // For display, we focus on the "usually" posture matchup since that's the primary driver
  // Get unique "usually" postures for best/worst to avoid repetition
  const seenStrong = new Set<PostureId>();
  const seenTough = new Set<PostureId>();

  const strong: PairingMatch[] = [];
  const tough: PairingMatch[] = [];

  // Best matches: take top candidates with unique "usually" postures
  for (const c of candidates) {
    const otherId = c.trio[0];
    if (seenStrong.has(otherId)) continue;
    if (otherId === slots[0]) continue; // skip same usually
    seenStrong.add(otherId);

    const otherPosture = getPostureById(otherId);
    const key = pairKey(slots[0], otherId);
    const reason = PAIR_REASONS[key] || `Your ${singular(getPostureById(slots[0]).name)} drive and their ${singular(otherPosture.name)} drive cover each other's blind spots.`;

    strong.push({
      id: otherId,
      label: otherPosture.name,
      iconSvg: otherPosture.iconSvg,
      colorVar: otherPosture.colorVar,
      reason,
    });

    if (strong.length >= 3) break;
  }

  // Toughest matches: take bottom candidates with unique "usually" postures
  const reversed = [...candidates].reverse();
  for (const c of reversed) {
    const otherId = c.trio[0];
    if (seenTough.has(otherId)) continue;
    if (otherId === slots[0]) continue;
    seenTough.add(otherId);

    const otherPosture = getPostureById(otherId);
    const key = pairKey(slots[0], otherId);
    const reason = PAIR_REASONS[key] || `Your ${singular(getPostureById(slots[0]).name)} drive and their ${singular(otherPosture.name)} drive can pull in opposite directions.`;

    tough.push({
      id: otherId,
      label: otherPosture.name,
      iconSvg: otherPosture.iconSvg,
      colorVar: otherPosture.colorVar,
      reason,
    });

    if (tough.length >= 3) break;
  }

  return { strong, tough };
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
