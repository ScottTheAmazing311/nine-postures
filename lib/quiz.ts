import { PostureId } from './postures';

export type StatementQuestion = {
  type: 'statement';
  text: string;
  posture: PostureId;
  bucket: 'identity' | 'aspiration';
};

export type PreferenceQuestion = {
  type: 'preference';
  text: string;
  bucket: 'identity' | 'aspiration';
  options: { label: string; posture: PostureId }[];
};

export type QuizQuestion = StatementQuestion | PreferenceQuestion;

export const STATEMENT_OPTIONS = [
  { label: 'Very much like me', score: 3 },
  { label: 'Somewhat like me', score: 2 },
  { label: 'A little like me', score: 1 },
  { label: 'Not like me', score: 0 },
] as const;

export const QUESTIONS: QuizQuestion[] = [
  // 1 – identity
  { type: 'statement', text: "I'd take a harder path if it meant doing something really well.", posture: 'champion', bucket: 'identity' },
  // 2 – identity
  { type: 'statement', text: "A meal, a song, or a sunset can genuinely make my whole day.", posture: 'connoisseur', bucket: 'identity' },
  // 3 – identity preference
  { type: 'preference', text: "Which of these sounds like the most satisfying workday?", bucket: 'identity', options: [
    { label: "Hitting a personal best at something you've practiced for months", posture: 'champion' },
    { label: "Coaching someone through a problem and watching the moment it clicks", posture: 'cultivator' },
    { label: "Closing a deal that sets up three more opportunities down the line", posture: 'capitalist' },
    { label: "Spending the whole day deep in research with no interruptions", posture: 'contemplative' },
  ]},
  // 4 – identity
  { type: 'statement', text: "I'm happiest in the middle of building something, even if no one ever sees it.", posture: 'creator', bucket: 'identity' },
  // 5 – identity
  { type: 'statement', text: "When I see something that's clearly unfair, I can't just let it go.", posture: 'crusader', bucket: 'identity' },
  // 6 – identity
  { type: 'statement', text: "I get satisfaction from being the person others can count on, even for the unglamorous stuff.", posture: 'contributor', bucket: 'identity' },
  // 7 – identity preference
  { type: 'preference', text: "Which project would you be most excited to take on?", bucket: 'identity', options: [
    { label: "Designing and building something that didn't exist before", posture: 'creator' },
    { label: "Organizing people around a cause you believe in", posture: 'crusader' },
    { label: "Restoring something old and valuable back to what it once was", posture: 'custodian' },
    { label: "Planning an unforgettable experience for people you love", posture: 'connoisseur' },
  ]},
  // 8 – identity
  { type: 'statement', text: "I think a lot about how to turn what I have into more options and more freedom.", posture: 'capitalist', bucket: 'identity' },
  // 9 – identity
  { type: 'statement', text: "I'd rather understand why something works than know how to use it.", posture: 'contemplative', bucket: 'identity' },
  // 10 – identity
  { type: 'statement', text: "I notice when something valuable is being neglected, and it bothers me more than it bothers most people.", posture: 'custodian', bucket: 'identity' },
  // 11 – identity
  { type: 'statement', text: "I remember where people started, and I feel proud when I see how far they've come.", posture: 'cultivator', bucket: 'identity' },
  // 12 – identity preference
  { type: 'preference', text: "Which of these compliments would mean the most to you?", bucket: 'identity', options: [
    { label: "\"Nobody does it better than you.\"", posture: 'champion' },
    { label: "\"You changed my life.\"", posture: 'cultivator' },
    { label: "\"You made something beautiful.\"", posture: 'creator' },
    { label: "\"You were there when it mattered.\"", posture: 'contributor' },
  ]},
  // 13 – aspiration
  { type: 'statement', text: "I wish I stopped rushing long enough to actually enjoy what I already have.", posture: 'connoisseur', bucket: 'aspiration' },
  // 14 – identity preference
  { type: 'preference', text: "What would you do with a free year and no financial pressure?", bucket: 'identity', options: [
    { label: "Start a business or invest in something with real potential", posture: 'capitalist' },
    { label: "Travel slowly and experience as much of the world as possible", posture: 'connoisseur' },
    { label: "Study something that fascinates you just because you want to understand it", posture: 'contemplative' },
    { label: "Join an organization you admire and do whatever they need", posture: 'contributor' },
  ]},
  // 15 – aspiration
  { type: 'statement', text: "I wish I committed more fully to getting great at something instead of staying comfortable.", posture: 'champion', bucket: 'aspiration' },
  // 16 – aspiration
  { type: 'statement', text: "I wish I carved out more time to make things with my hands or my mind.", posture: 'creator', bucket: 'aspiration' },
  // 17 – aspiration
  { type: 'statement', text: "I wish I put more of my energy toward the things I think are broken in the world.", posture: 'crusader', bucket: 'aspiration' },
  // 18 – aspiration preference
  { type: 'preference', text: "Which of these lives sounds most appealing, even if it's not yours right now?", bucket: 'aspiration', options: [
    { label: "A master of your craft, known for being the best at one thing", posture: 'champion' },
    { label: "Someone who built something that grew beyond them and kept going", posture: 'capitalist' },
    { label: "A mentor whose former students still call to say thank you", posture: 'cultivator' },
    { label: "A quiet protector of something important that most people overlook", posture: 'custodian' },
  ]},
  // 19 – aspiration
  { type: 'statement', text: "I wish I gave more of myself to something I believe in, even if it meant less recognition.", posture: 'contributor', bucket: 'aspiration' },
  // 20 – aspiration
  { type: 'statement', text: "I wish I had the resources and independence to make bigger bets on what I believe in.", posture: 'capitalist', bucket: 'aspiration' },
  // 21 – aspiration
  { type: 'statement', text: "I wish I had more space in my life to think deeply without needing a practical reason.", posture: 'contemplative', bucket: 'aspiration' },
  // 22 – aspiration preference
  { type: 'preference', text: "If you could have more of one quality starting tomorrow, which would it be?", bucket: 'aspiration', options: [
    { label: "The ability to make beautiful, original things from nothing", posture: 'creator' },
    { label: "The courage to fight for what's right no matter the personal cost", posture: 'crusader' },
    { label: "The wisdom to sit with hard questions and not rush to answers", posture: 'contemplative' },
    { label: "The presence to truly savor and appreciate every experience", posture: 'connoisseur' },
  ]},
  // 23 – aspiration
  { type: 'statement', text: "I wish I did more to take care of the things, people, and traditions that matter most.", posture: 'custodian', bucket: 'aspiration' },
  // 24 – aspiration
  { type: 'statement', text: "I wish I were more patient and intentional about helping the people around me grow.", posture: 'cultivator', bucket: 'aspiration' },
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
    const answer = answers[i];
    if (answer == null) return;

    if (q.type === 'statement') {
      const score = STATEMENT_OPTIONS[answer]?.score ?? 0;
      if (q.bucket === 'identity') {
        identity[q.posture] += score;
      } else {
        aspiration[q.posture] += score;
      }
    } else {
      // Preference: selected option's posture gets 3 points
      const selected = q.options[answer];
      if (selected) {
        if (q.bucket === 'identity') {
          identity[selected.posture] += 3;
        } else {
          aspiration[selected.posture] += 3;
        }
      }
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
