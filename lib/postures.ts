export type PostureId =
  | 'champion' | 'creator' | 'cultivator' | 'contributor' | 'connoisseur'
  | 'crusader' | 'capitalist' | 'contemplative' | 'custodian';

export type Posture = {
  id: PostureId;
  name: string;
  colorVar: string;
  tag: string;
  iconSvg: string;
  desc: string;
  longDesc: string;
  examples: string;
  telltale: string;
  healthy: { name: string; text: string };
  unhealthy: { name: string; text: string };
  art: string;
};

export const POSTURES: Posture[] = [
  {
    id: 'champion',
    name: 'Champions',
    colorVar: 'var(--color-champion)',
    tag: 'Driven by mastery',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>`,
    desc: 'Pursue measurable excellence. Need a standard to climb toward and a scoreboard that tells the truth.',
    longDesc: 'Champions build their lives around performance and rank. They\'re happiest when there\'s a clear ladder to climb and honest feedback about where they stand. The domain doesn\'t matter. It could be surgery, chess, sales quotas, or free-throw percentage. What matters is that the game has rules, the rules are fair, and they can tell whether they\'re getting better. They thrive under pressure and seek out harder opponents rather than easier ones. The risk is that winning can become the only language they speak.',
    examples: 'Professional athletes, surgeons, trial lawyers, chess grandmasters, elite sales reps, concert pianists, Olympic coaches, competitive debaters, Michelin-starred chefs, fighter pilots.',
    telltale: 'They know their numbers. Ask a Champion how they\'re doing and they\'ll quote a metric: their time, their ranking, their close rate. They measure what they love.',
    healthy: { name: 'The Master', text: 'Competes with yesterday\'s self more than with anyone in the room. Mentors younger players without feeling threatened. Knows when mastery means walking away. Retiring at the top, stepping aside for the next generation. Their excellence pulls others upward rather than pushing them down.' },
    unhealthy: { name: 'The Gladiator', text: 'Identity is fused to the ranking. A single loss feels like an existential crisis. They can\'t separate a bad quarter from a bad self. Peers become threats. Juniors become dangers. They start sabotaging others\' progress to protect their position, and the thing they loved becomes a cage they can\'t leave.' },
    art: '/art/champion.jpg',
  },
  {
    id: 'creator',
    name: 'Creators',
    colorVar: 'var(--color-creator)',
    tag: 'Driven to make',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/></svg>`,
    desc: 'Bring new things into existence. The blank page becoming something is the whole point.',
    longDesc: 'Creators live for the moment when something that didn\'t exist before suddenly does. The medium varies wildly. Code, paint, words, buildings, recipes, businesses. But the feeling is the same: the raw material yields, and something new stands where nothing stood. They\'re often restless between projects and feel most alive in the middle of making. They see the world as raw material and are never quite satisfied with the way things are, not out of complaint, but because they can always imagine a version that doesn\'t exist yet.',
    examples: 'Novelists, game designers, architects, filmmakers, songwriters, indie developers, choreographers, startup founders in the zero-to-one phase, product designers, screenwriters, graffiti artists, woodworkers.',
    telltale: 'Their shelves and hard drives are full of half-finished things. They talk about projects in terms of what\'s possible, not what\'s practical. They light up when describing something they\'re building.',
    healthy: { name: 'The Artist', text: 'Ships work. Doesn\'t just start things but finishes them, and lets them be imperfect. Develops craft over decades rather than chasing novelty. Has a genuine point of view that deepens with time. Knows that editing is creating too, and that a body of work matters more than any single piece.' },
    unhealthy: { name: 'The Dabbler', text: 'Forty started projects, zero finished. Addicted to the dopamine hit of starting. The blank page, the new repo, the fresh canvas. Confuses inspiration with output. Abandons work the moment it gets hard or boring, which is exactly when real creative work begins. May hoard tools and materials as a substitute for actually making things.' },
    art: '/art/creator.jpg',
  },
  {
    id: 'cultivator',
    name: 'Cultivators',
    colorVar: 'var(--color-cultivator)',
    tag: 'Driven to grow others',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg>`,
    desc: 'Grow what already exists. People, teams, gardens, relationships. Refine rather than originate.',
    longDesc: 'Cultivators don\'t need to invent. They need to tend. Give them a person with potential, a team with rough edges, or a garden that needs patience, and they\'ll pour themselves into it. Their satisfaction comes not from the initial spark but from the slow, compounding work of development. They notice what\'s almost there and help it arrive. They\'re drawn to the long game: the student who takes three years to click, the relationship that deepens across decades, the organization that gets better one conversation at a time.',
    examples: 'Teachers, therapists, executive coaches, pastors, literary editors, family doctors, mentors, physical therapists, parenting counselors, talent scouts, music teachers, organizational development leads, agricultural extension agents.',
    telltale: 'They remember where people started, not just where they are. They take pride in others\' accomplishments as if they were their own. Their phone is full of messages from people thanking them years later.',
    healthy: { name: 'The Gardener', text: 'Patient. Creates the conditions for growth and then gets out of the way. Produces alumni who outgrow them, and feels genuine pride rather than loss when that happens. Knows that the best mentoring makes itself unnecessary. Doesn\'t take credit. Lets the fruit speak for the tree.' },
    unhealthy: { name: 'The Meddler', text: 'Needs to be needed so badly that they create dependency instead of growth. Can\'t let things develop without intervening. Gives advice when none was asked for. Subtly undermines independence because an independent protege is a protege who no longer needs them. The relationship becomes about the Cultivator\'s identity, not the other person\'s development.' },
    art: '/art/cultivator.jpg',
  },
  {
    id: 'contributor',
    name: 'Contributors',
    colorVar: 'var(--color-contributor)',
    tag: 'Driven by duty',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    desc: 'Find meaning in being a reliable part of something larger. The drive is outward, toward the whole.',
    longDesc: 'Contributors don\'t need to lead and don\'t need the spotlight. They need to know that their work matters, that the system they serve is real, and that showing up every day actually holds something together. They\'re the people who make institutions work. Not the ones who give speeches about the institution, but the ones who lock up at night, cover the extra shift, and notice when the supply closet is running low. Their loyalty is to the mission, not to their career. They often feel most alive when they\'re part of something bigger than themselves.',
    examples: 'Nurses, firefighters, military NCOs, tradespeople, public school teachers, foster parents, paramedics, postal workers, union stewards, nonprofit program managers, church volunteers, IT infrastructure engineers, small-town librarians.',
    telltale: 'They\'ll say "we" instead of "I." They show up early and leave late without mentioning it. Ask them what they do and they\'ll describe the mission before they describe their role.',
    healthy: { name: 'The Steward', text: 'Quiet competence that holds everything together. The thing works because they\'re in it. They maintain high standards without needing recognition. They set boundaries. They serve because they choose to, not because they can\'t say no. They take care of themselves well enough to take care of others for decades.' },
    unhealthy: { name: 'The Martyr', text: 'Uses duty as a shield against examining their own desires. "I have to" becomes a way of never asking "I want to." They serve until they burn out, then resent the people they serve. Self-sacrifice becomes a subtle form of control. Guilt as leverage. They may not know who they are outside of their role, and that terrifies them.' },
    art: '/art/contributor.jpg',
  },
  {
    id: 'connoisseur',
    name: 'Connoisseurs',
    colorVar: 'var(--color-connoisseur)',
    tag: 'Driven to enjoy',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>`,
    desc: 'Experience and enjoy. Life measured in good meals, good afternoons, good stories.',
    longDesc: 'Connoisseurs get misread as shallow, but the real drive is presence. They\'re tuned toward savoring. Tasting, watching, traveling, reading, listening. They believe experience is its own reward, and they\'re often the ones who remind the rest of us that the point of building something is, eventually, to enjoy it. They shape their lives around quality of experience. They\'re the friend who always knows the right restaurant, the right album, the right trail. At their best, they teach others to slow down and be where they are.',
    examples: 'Retirees enjoying what they built, hobbyists, world travelers, food and wine enthusiasts, audiophiles, art collectors, readers who finish 60 books a year, sport-fishing devotees, amateur astronomers, people who build their lives around their weekends.',
    telltale: 'They describe experiences the way Creators describe projects: with specificity and love. They remember the name of the waiter and what they ordered. They have strong opinions about olive oil.',
    healthy: { name: 'The Epicurean', text: 'Present. Grateful. Doesn\'t need more. Just needs to actually taste what\'s already here. Makes ordinary life feel like a life well-lived. Shares their joy generously. Knows that pleasure and meaning aren\'t opposites. Brings warmth into rooms and gives other people permission to enjoy things too.' },
    unhealthy: { name: 'The Glutton', text: 'Chases stimulation because stillness is unbearable. The dose keeps going up: more exotic trips, more expensive wine, more content consumed, more novelty. Numbs rather than savors. Uses pleasure as an escape from the harder parts of life. Eventually, nothing tastes like enough. The pursuit of enjoyment becomes its own kind of compulsion.' },
    art: '/art/connoisseur.jpg',
  },
  {
    id: 'crusader',
    name: 'Crusaders',
    colorVar: 'var(--color-crusader)',
    tag: 'Driven by a cause',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>`,
    desc: 'Organize their life around a cause. See something that should change and can\'t unsee it.',
    longDesc: 'Crusaders have seen the gap between the way things are and the way things should be, and they can\'t look away. The cause varies. Justice, truth, reform, faith, environment, education. But the structure is the same: something is wrong, and their life becomes organized around making it right. They\'re willing to sacrifice comfort, money, and relationships for the work. They draw energy from the fight itself and can sustain effort for years in the face of indifference. They tend to polarize rooms. You\'re either with them or in the way.',
    examples: 'Activists, civil rights lawyers, investigative journalists, missionaries, niche researchers, environmental organizers, public defenders, whistleblowers, war correspondents, union organizers, campaign managers, documentary filmmakers, open-source advocates.',
    telltale: 'They steer every conversation back to the thing. They forward articles at 11pm. They\'ve lost friends over the cause and would do it again. Their bookshelves have a theme.',
    healthy: { name: 'The Reformer', text: 'Takes the long view. Holds conviction and humility at the same time. Believes deeply, but changes their mind when the evidence demands it. Builds coalitions rather than purity circles. Knows that lasting change requires persuasion, not just protest. Can disagree without dehumanizing. Stays in the fight for decades because they\'ve learned to pace themselves.' },
    unhealthy: { name: 'The Zealot', text: 'The cause becomes identity, then cudgel. Nuance feels like betrayal. Allies who disagree on tactics become enemies. Purity spirals tighten until no one is faithful enough. The Zealot starts fighting the people closest to them more than the actual problem. Self-righteousness replaces self-awareness. They burn out their friends, then blame the friends for being uncommitted.' },
    art: '/art/crusader.jpg',
  },
  {
    id: 'capitalist',
    name: 'Capitalists',
    colorVar: 'var(--color-capitalist)',
    tag: 'Driven by leverage',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>`,
    desc: 'Build leverage. Wealth, scale, control, the ability to decide. Comfortable with risk and being disliked.',
    longDesc: 'Capitalists think in systems and leverage. They want to build things that compound. Businesses, investments, networks, platforms. They\'re less interested in doing the work themselves than in building machines that do the work. Money is part of it, but the deeper drive is agency: the ability to decide, to fund, to say yes or no, to shape outcomes at scale. They\'re comfortable with risk in a way that others find unsettling. They\'re also comfortable being disliked. They see the world in terms of inputs and outputs, and they\'re always looking for the lever.',
    examples: 'Founders, real estate developers, agency owners, venture capitalists, serial entrepreneurs, franchise operators, investment bankers, private equity partners, angel investors, CEOs scaling from 50 to 500 people, deal brokers, people who own multiple businesses.',
    telltale: 'They ask "does it scale?" They calculate the ROI on everything, including relationships. They\'re always building the next thing before the current thing is finished. Their calendar is a weapon.',
    healthy: { name: 'The Builder', text: 'Creates real value that outlasts them. Employs people well and shares the upside. Uses power to build more, fund what matters, and lift others into positions of agency. Knows that the point of leverage is what you do with it. Builds institutions, not just bank accounts. Treats people as partners, not resources.' },
    unhealthy: { name: 'The Operator', text: 'Purely extractive. Treats people as inputs to be optimized and discarded. Confuses wealth with worth. Never has enough. The goalpost moves with every milestone. Relationships are transactional. Cuts corners that hurt others. May accumulate power without any clear purpose for it, hoarding optionality as a substitute for meaning.' },
    art: '/art/capitalist.jpg',
  },
  {
    id: 'contemplative',
    name: 'Contemplatives',
    colorVar: 'var(--color-contemplative)',
    tag: 'Driven to understand',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/><path d="m13.56 11.747 4.332-.924"/><path d="m16 21-3.105-6.21"/><path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"/><path d="m6.158 8.633 1.114 4.456"/><path d="m8 21 3.105-6.21"/><circle cx="12" cy="13" r="2"/></svg>`,
    desc: 'Need to understand. Not to deploy knowledge. Just to know. Produce frameworks others use a generation later.',
    longDesc: 'Contemplatives are driven by questions, not answers. They need to understand how things work, why people behave the way they do, what\'s really going on beneath the surface. They\'re not interested in knowledge as a career tool. They\'d study the thing even if no one paid them. They tend to read more than they write, think more than they speak, and observe more than they participate. The world often catches up to their ideas years after they had them. They produce the frameworks, models, and deep insights that more action-oriented people eventually pick up.',
    examples: 'Theologians, theoretical physicists, philosophers, monks, mathematicians, essayists, psychoanalysts, historians, literary critics, systems theorists, research scientists, librarians who actually read the books, long-form journalists, people with three half-finished dissertations.',
    telltale: 'They answer questions with better questions. They\'ve been thinking about the same problem for years. Their bookshelves are annotated. They\'re happiest in a quiet room with a difficult text.',
    healthy: { name: 'The Sage', text: 'Holds questions without resolving them prematurely. Comfortable with ambiguity and paradox. Translates depth into something usable. Writes the book, teaches the class, gives the talk. Makes complexity accessible without dumbing it down. Stays connected to the world they\'re trying to understand rather than retreating from it entirely.' },
    unhealthy: { name: 'The Recluse', text: 'Uses thought as avoidance. Reading about life substitutes for living it. Never publishes, never commits, never risks being wrong in public. The pursuit of understanding becomes a hiding place from action, intimacy, and consequence. May feel superior to people who "just do things" without realizing that their own inaction is its own kind of cowardice.' },
    art: '/art/contemplative.jpg',
  },
  {
    id: 'custodian',
    name: 'Custodians',
    colorVar: 'var(--color-custodian)',
    tag: 'Driven to protect',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>`,
    desc: 'Protect what exists from loss. Safety, continuity, preservation of something fragile and worth keeping.',
    longDesc: 'Custodians see what\'s worth keeping and organize their lives around protecting it. While others are building the new, Custodians are maintaining the old. Not out of fear of change, but because they understand that most valuable things are fragile and irreplaceable once lost. They\'re the ones who keep the traditions alive, maintain the archives, enforce the standards, and hold the line when everyone else wants to move fast and break things. They tend to be undervalued in cultures that worship novelty, but every civilization that survives does so because someone was paying attention to what could be lost.',
    examples: 'Archivists, museum curators, conservationists, auditors, estate attorneys, family historians, park rangers, building inspectors, data backup engineers, art restorers, constitutional scholars, editors of style guides, people who maintain cemetery records, lighthouse keepers.',
    telltale: 'They notice what\'s deteriorating before anyone else does. They keep meticulous records. They get anxious when things are changing too fast. They\'re the person who says "wait, are we sure about this?" and is right more often than people admit.',
    healthy: { name: 'The Guardian', text: 'Sees what\'s worth protecting and quietly protects it without needing credit. Knows the difference between preservation and resistance to change. Adapts their methods while keeping the core intact. Civilizations need them and rarely thank them. They do it anyway, because the work matters more than the recognition.' },
    unhealthy: { name: 'The Hoarder', text: 'Fear calcifies into control. Mistakes stasis for safety. Resists all change, including necessary change, because any movement feels like loss. Accumulates and clings. Objects, rules, the way things were. May use "tradition" as a weapon against progress. Eventually, the thing they\'re protecting becomes a museum piece rather than a living institution, preserved in form but dead in spirit.' },
    art: '/art/custodian.jpg',
  },
];

export const POSTURE_ORDER: PostureId[] = [
  'champion', 'creator', 'cultivator', 'contributor', 'connoisseur',
  'crusader', 'capitalist', 'contemplative', 'custodian',
];

export function getPostureById(id: PostureId): Posture {
  return POSTURES.find(p => p.id === id)!;
}
