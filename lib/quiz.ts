import { PostureId } from './postures';

export type QuizQuestion = {
  text: string;
  posture: PostureId;
  bucket: 'identity' | 'aspiration';
};

export const ANSWER_OPTIONS = [
  { label: 'Very much like me', score: 3 },
  { label: 'Somewhat like me', score: 2 },
  { label: 'A little like me', score: 1 },
  { label: 'Not like me', score: 0 },
] as const;

// 27 questions: 2 identity + 1 aspiration per posture, shuffled so no posture repeats back-to-back
export const QUESTIONS: QuizQuestion[] = [
  { text: "I keep score. Whether it's work, fitness, or hobbies, I track how I'm doing and where I rank.", posture: 'champion', bucket: 'identity' },
  { text: "Watching someone I've helped succeed gives me more satisfaction than most of my own wins.", posture: 'cultivator', bucket: 'identity' },
  { text: "I plan my weeks around experiences. A great meal, a new album, a trip, a film.", posture: 'connoisseur', bucket: 'identity' },
  { text: "I feel restless when I'm not making something. I always need a project in progress.", posture: 'creator', bucket: 'identity' },
  { text: "There's an issue I care about so deeply that it shapes how I spend my time and money.", posture: 'crusader', bucket: 'identity' },
  { text: "I find deep meaning in showing up for a team or organization, even when nobody notices.", posture: 'contributor', bucket: 'identity' },
  { text: "I think in terms of leverage. How to get more from less, how to build systems that scale.", posture: 'capitalist', bucket: 'identity' },
  { text: "I'd happily spend a whole day reading, thinking, or researching with no practical goal in mind.", posture: 'contemplative', bucket: 'identity' },
  { text: "I notice when things are falling apart before other people do. Systems, traditions, relationships.", posture: 'custodian', bucket: 'identity' },
  { text: "I wish I slowed down more to actually savor and enjoy what's right in front of me.", posture: 'connoisseur', bucket: 'aspiration' },
  { text: "I'd rather face a tough competitor than win easily. The challenge is the point.", posture: 'champion', bucket: 'identity' },
  { text: "I wish I invested more energy in developing the people around me.", posture: 'cultivator', bucket: 'aspiration' },
  { text: "I get more excited about starting things than finishing them.", posture: 'creator', bucket: 'identity' },
  { text: "I wish I fought harder for the things I believe are wrong in the world.", posture: 'crusader', bucket: 'aspiration' },
  { text: "When I describe my work, I talk about the mission before I talk about my role.", posture: 'contributor', bucket: 'identity' },
  { text: "I wish I had more financial independence and the power to fund what I care about.", posture: 'capitalist', bucket: 'aspiration' },
  { text: "I've been thinking about some of the same questions for years and I'm not done yet.", posture: 'contemplative', bucket: 'identity' },
  { text: "I wish I did more to protect and preserve the things that matter before they're lost.", posture: 'custodian', bucket: 'aspiration' },
  { text: "I wish I held myself to a higher standard and pushed harder to be the best at what I do.", posture: 'champion', bucket: 'aspiration' },
  { text: "I notice quality and have strong opinions about things like food, design, or music.", posture: 'connoisseur', bucket: 'identity' },
  { text: "I wish I spent more of my time building and creating new things.", posture: 'creator', bucket: 'aspiration' },
  { text: "People regularly come to me for guidance, and I genuinely enjoy giving it.", posture: 'cultivator', bucket: 'identity' },
  { text: "I wish I were more dedicated to serving something bigger than my own ambitions.", posture: 'contributor', bucket: 'aspiration' },
  { text: "I've strained relationships or passed up opportunities because I wouldn't compromise on a principle.", posture: 'crusader', bucket: 'identity' },
  { text: "I'm comfortable making bets with real stakes. Risk doesn't keep me up at night.", posture: 'capitalist', bucket: 'identity' },
  { text: "I wish I had more time and space to study, reflect, and understand things deeply.", posture: 'contemplative', bucket: 'aspiration' },
  { text: "I keep careful records and feel uneasy when things change too quickly.", posture: 'custodian', bucket: 'identity' },
];

const ALL_POSTURES: PostureId[] = [
  'champion', 'creator', 'cultivator', 'contributor', 'connoisseur',
  'crusader', 'capitalist', 'contemplative', 'custodian',
];

export function computeResults(answers: number[]): [PostureId, PostureId, PostureId] {
  const identity: Record<string, number> = {};
  const aspiration: Record<string, number> = {};

  for (const id of ALL_POSTURES) {
    identity[id] = 0;
    aspiration[id] = 0;
  }

  QUESTIONS.forEach((q, i) => {
    const score = ANSWER_OPTIONS[answers[i]]?.score ?? 0;
    if (q.bucket === 'identity') {
      identity[q.posture] += score;
    } else {
      aspiration[q.posture] += score;
    }
  });

  // Usually + sometimes = top 2 identity scores
  const identityRanked = ALL_POSTURES.slice().sort((a, b) => identity[b] - identity[a]);
  const usually = identityRanked[0];
  const sometimes = identityRanked[1];

  // Want = top aspiration score not already used
  const aspirationRanked = ALL_POSTURES.slice().sort((a, b) => aspiration[b] - aspiration[a]);
  const want = aspirationRanked.find(id => id !== usually && id !== sometimes) ?? aspirationRanked[0];

  return [usually, sometimes, want];
}
