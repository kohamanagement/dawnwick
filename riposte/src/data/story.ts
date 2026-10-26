import type { CharId } from '../engine/types';

/**
 * v0.11 "The Last Word": the storyline. Everything here is text; src/ui/story.ts decides when a beat plays.
 * The lore bible that explains it all is docs/13-STORY.md.
 *
 * Premise: under the city of Vesper every quarrel is settled at cards, on one rule: every move has an answer.
 * A hundred years ago the champion Cassius Vane won the Last Table and asked for the last word, a move no one
 * could answer. The rule broke, the sun stopped rising, and Cassius became the Last Dealer. You carry Wick, the
 * last ember of the sun, down the Circuit. The answer to the last word turns out to be the game's own name.
 *
 * Beats are short on purpose (one phone line or two). `{class}` is the class name, `{boss}` the boss name,
 * `{name}` a Nemesis or Echo name, `{n}` a number.
 */

export interface Speaker { name: string; icon: string; cls?: string }
export interface Beat { who: string; text: string }

export const SPEAKERS: Record<string, Speaker> = {
  narrator: { name: '', icon: '', cls: 'narr' },
  dealer: { name: 'The Last Dealer', icon: '🃏', cls: 'dealer' },
  wick: { name: 'Wick', icon: '🕯️', cls: 'wick' },
  ferryman: { name: 'The Ferryman', icon: '⛴️', cls: 'npc' },
  sexton: { name: 'The Sexton', icon: '⚰️', cls: 'npc' },
};

const b = (who: string, text: string): Beat => ({ who, text });

// ═════════════════════════ PROLOGUE ═════════════════════════

/** The first run ever (and "Replay the prologue" in the Story book). */
export const PROLOGUE: Beat[] = [
  b('narrator', 'The city of Vesper settled everything at cards. Wars. Crowns. Who got the last slice of cake.'),
  b('narrator', 'One rule held it all together, carved over the door of the duel hall beneath the city: EVERY MOVE HAS AN ANSWER.'),
  b('narrator', 'A hundred years ago, the champion Cassius Vane won the Last Table and made his wish. He asked for the last word: a move nobody could answer.'),
  b('narrator', 'He got it. The rule broke. The sun set over Vesper and never came back up.'),
  b('ferryman', 'Another duelist. Good. Hold out your hand. No, the other one.'),
  b('ferryman', 'This is the last ember of the sun. I have carried it for a hundred years. Your turn.'),
  b('wick', 'Hi! I’m Wick. I’m all the daylight left in the world, and you’re holding me upside down.'),
  b('wick', 'Here’s the plan: win every fight, reach the Last Table, ask for the sunrise. I’ll handle the glowing.'),
];

/** Later runs: a short re-entry, picked by how many times the Ferryman has rowed you back. */
export const REENTRY: { min: number; beats: Beat[] }[] = [
  { min: 0, beats: [b('ferryman', 'Back at the top of the stair. Nobody dies in the Circuit, duelist. That’s the cruel part.'), b('wick', 'Still lit! Still gorgeous! Let’s go.')] },
  { min: 2, beats: [b('ferryman', 'Your usual seat. I keep a tally. The river keeps a bigger one.'), b('wick', 'Third time’s the charm. Or fourth. I lost count. I’m a candle.')] },
  { min: 5, beats: [b('ferryman', 'I’ve rowed kings back up this river. You complain less than kings.'), b('wick', 'He likes you. He’s never said anything that nice about me.')] },
  { min: 10, beats: [b('ferryman', 'The river knows your weight now. It carries you faster.'), b('wick', 'Every loss, we learn something. Mostly about spikes.')] },
  { min: 20, beats: [b('ferryman', 'Do you know why I keep rowing you back? Because you keep getting further.'), b('wick', 'One day we won’t need the boat. Imagine that.')] },
];

// ═════════════════════════ ACTS ═════════════════════════

export const ACT_KICKER = ['', 'Act I · The Upper Circuit', 'Act II · The Middle Circuit', 'Act III · The Deep', 'Act IV · The Mirror'];

/** The Dealer opens every act, one line per version of the act (standard, alternate, wild). */
export const ACT_DEALER: Record<number, Beat[][]> = {
  1: [
    [b('dealer', 'Welcome to the Undercroft Circuit. Mind the Lantern Warden. He’s been on the door a hundred years and takes it personally.')],
    [b('dealer', 'The Drowned Market. Everything’s for sale, and the Tide Broker holds the paper on all of it. Soon that includes you.')],
    [b('dealer', 'Trees, underground? When the sun went out, the forest came down looking for it. The Antlered King found us instead.')],
  ],
  2: [
    [b('dealer', 'The Middle Circuit. A hundred years of audience, and they’ve gone a bit sharp. The Chorus doesn’t clap. It cuts.')],
    [b('dealer', 'The Gilded Masquerade. The Impresario sells tickets to every loss. Front row’s reserved for yours.')],
    [b('dealer', 'There’s a sea under Vesper. The old docks sank into it the night the sun went out. Something big moved in.')],
  ],
  3: [
    [b('dealer', 'The Deep. My table. Sit down, duelist. I’ll deal.')],
    [b('dealer', 'The Clockmaker stopped every clock at the moment the sun went out. He thinks if no time passes, nothing was lost.')],
    [b('dealer', 'The Forgemother made every card ever played down here. She’d like to melt them all and start over. Including yours.')],
  ],
};

/** When a wandering boss has taken the act. */
export const WANDERER_DEALER: Record<string, Beat> = {
  briar_queen: b('dealer', 'Programme change! The Briar Queen has taken the door tonight. Bring gloves.'),
  bell_tyrant: b('dealer', 'Programme change. The Bell Tyrant is ringing for chains tonight. Every one you make, he hears.'),
  magpie_king: b('dealer', 'Programme change. The Magpie King is in. Count your Reactions. Then count them again.'),
  blotted_saint: b('dealer', 'Programme change. The Blotted Saint is preaching tonight. He’ll edit your deck if you let him.'),
  orrery: b('dealer', 'Programme change. The Orrery is turning the sky by hand tonight. Call your coin carefully.'),
  gravelord: b('dealer', 'Programme change. The Gravelord holds the Deep tonight. Everyone who ever lost here works for him.'),
};

export const ACT_WICK: Record<number, Beat[]> = {
  1: [b('wick', 'It’s fine. It’s all fine. I’m only scared of water, wind, and being stepped on.'), b('wick', 'Rule one: they set traps, you set answers. Rule two: don’t drop me.')],
  2: [b('wick', 'We’re halfway down. It’s colder. I am bravely not flickering.'), b('wick', 'Patrons, Venues, things with too many knives. This floor has everything.')],
  3: [b('wick', 'The Last Table is just past this. I can feel it. It feels like a held breath.'), b('wick', 'Whatever happens, I’m glad it was you holding me.')],
};

export const NEMESIS_DEALER = b('dealer', 'Oh, and an old friend is waiting for you on this floor: {name}. It remembers your face.');

// ═════════════════════════ THE LONG NIGHT ═════════════════════════

export const NIGHT_INTRO: Beat[][] = [
  [b('narrator', 'Under the Last Table, a stair keeps going down. At the bottom is the night itself, the one that never ended.'), b('wick', 'This is where the sun went. I can smell it. It smells like a blown-out birthday.')],
  [b('narrator', 'Another night. The dark is thicker here, and it knows your name.'), b('wick', 'Is it me, or is the sky up there a tiny bit less black?')],
  [b('narrator', 'Night {n}. Somewhere far above, a rooster wakes up confused.'), b('wick', 'Keep going. Every night we clear, I get a little brighter.')],
  [b('narrator', 'Night {n}. You are further down than anyone has ever been.'), b('wick', 'Not even the Ferryman comes this far. Just us. And whatever that noise is.')],
];
export const NIGHT_BOSS = b('narrator', 'Night {n}. {boss} walks in the dark now, and it walks faster.');

// ═════════════════════════ BOSSES ═════════════════════════

export interface BossStory {
  /** Opening scene. */
  intro: Beat[];
  /** Shouted below half HP (a toast). */
  half: string;
  /** When you beat it. */
  down: Beat[];
  /** When it beats you (end screen). */
  win: string;
}

export const BOSSES: Record<string, BossStory> = {
  // ── Act 1 ──
  lantern_warden: {
    intro: [b('boss', 'Halt. Nobody passes the Lantern without a light.'), b('boss', '…You’ve got one. Hm. Then nobody passes without a fight.')],
    half: 'A hundred years on this door. Do you know how dull that is? Thank you. Truly.',
    down: [b('boss', 'Go on, then. The door’s open. Tell the Dealer I’d like a chair.'), b('wick', 'He was nice! For a man made of lamp.')],
    win: 'Back of the queue, duelist. The queue is a hundred years long.',
  },
  tide_broker: {
    intro: [b('boss', 'Welcome to the Market! Everything’s on credit, and your wish makes excellent collateral.'), b('boss', 'Sign here. And here. And here. And here. I have a lot of hands.')],
    half: 'Margin call! You’re overdrawn, duelist!',
    down: [b('boss', 'Fine! Debt forgiven! Do NOT tell the other creditors.'), b('wick', 'Did we just get a hundred years of interest cancelled? Nice.')],
    win: 'Your account is closed. Your candle is repossessed. Kidding! Mostly.',
  },
  antlered_king: {
    intro: [b('boss', 'The forest came down to find the sun. It found you instead.'), b('boss', 'Kneel, little light, or be root.')],
    half: 'Wolves! Ride! THE WILD HUNT!',
    down: [b('boss', 'Go. If you find the sun, tell it the trees are still waiting.'), b('wick', 'I’ll tell it. I’ll tell it twice.')],
    win: 'Rest here. The moss will be gentle with you.',
  },
  briar_queen: {
    intro: [b('boss', 'A trespasser in my court. How rude. How delicious.'), b('boss', 'My Briarlings will show you out. In pieces.')],
    half: 'Wrath of roses! Every petal a blade!',
    down: [b('boss', 'Plant me somewhere sunny. If you ever find somewhere sunny.'), b('wick', 'That’s the saddest thing a rose ever said.')],
    win: 'Barbs, darling. They’re how a flower says no.',
  },
  bell_tyrant: {
    intro: [b('boss', 'Every chain you make rings my bell. Every bell makes me stronger.'), b('boss', 'So please. Chain away.')],
    half: 'DEATH KNELL. Count the rings, duelist.',
    down: [b('boss', '…The bell’s cracked. Oh. I can finally hear myself think.'), b('wick', 'And now I can hear ME think. I think: yay.')],
    win: 'Ding. Dong. That was for you.',
  },
  // ── Act 2 ──
  chorus_of_knives: {
    intro: [b('boss', 'WE ARE THE AUDIENCE.'), b('boss', 'A HUNDRED YEARS WE WATCHED. NOW WE PERFORM.')],
    half: 'CRESCENDO! ENCORE! ENCORE!',
    down: [b('boss', '…Bravo. Genuinely. Bravo.'), b('wick', 'Standing ovation. Mostly because they’re made of knives and can’t sit.')],
    win: 'THE CRITICS HAVE SPOKEN.',
  },
  impresario: {
    intro: [b('boss', 'Ladies, gentlemen, Echoes of all ages! Tonight: a duelist, LOSING!'), b('boss', 'Tickets are non-refundable.')],
    half: 'The Grand Finale! Lights! Somebody find me LIGHTS!',
    down: [b('boss', 'Brilliant show. Terrible ending. Sold out, though.'), b('wick', 'He asked for lights. I was RIGHT HERE.')],
    win: 'And SCENE. Same time tomorrow? You’ll be back. They always come back.',
  },
  leviathan: {
    intro: [b('narrator', 'The water goes very still. Something underneath it is the size of a street.'), b('boss', '…SMALL. LOUD. EDIBLE.')],
    half: 'MAELSTROM.',
    down: [b('narrator', 'It sinks without a sound. The drowned docks of Vesper rise a hand’s width out of the sea.'), b('wick', 'I did not enjoy that. Water is my whole list of fears.')],
    win: 'BURP.',
  },
  magpie_king: {
    intro: [b('boss', 'Ooh. OOH. What’s that you’re holding? Is it a sun? I collect suns.'), b('boss', 'I’ll take that Reaction. And that one. And that one.')],
    half: 'Treasure storm! Every shiny thing, ATTACK!',
    down: [b('boss', 'Keep the candle. I’ve got a crown. A whole city’s crown. Nobody’s using it.'), b('wick', 'He called me shiny. I’m choosing to take that as a compliment.')],
    win: 'Mine. Mine. Also mine.',
  },
  blotted_saint: {
    intro: [b('boss', 'I copied out the Accord, fair and true. Then I improved it.'), b('boss', 'Hold still. Let me correct your deck.')],
    half: 'Illumination! Let the margins burn!',
    down: [b('boss', 'The ink is running. Oh. I can read the original again. It was… better.'), b('wick', 'Every move has an answer. Even a sermon.')],
    win: 'There. Now your story ends the way I wrote it.',
  },
  // ── Act 3 ──
  last_dealer: {
    intro: [b('boss', 'Cassius Vane, at your service. Or the Last Dealer, if you’re superstitious.'), b('boss', 'House rules: I deal, you lose, nobody goes home. Cut the deck?')],
    half: 'Oh, you’re GOOD. Fine. ALL IN.',
    down: [b('boss', '…Well played. Genuinely. The Last Table is yours.'), b('boss', 'Go on. You’ve earned it. Ask.')],
    win: 'The house always wins. I should know. I am the house.',
  },
  clockmaker: {
    intro: [b('boss', 'Shh. It’s almost midnight. It has been almost midnight for a hundred years.'), b('boss', 'If no time passes, nothing is lost. Do you understand? NOTHING.')],
    half: 'TWELVE. TWELVE. TWELVE.',
    down: [b('boss', 'Tick. …Tock. Oh. I’d forgotten that sound.'), b('wick', 'Time’s moving again. Let’s use it.')],
    win: 'Stay. Stay forever. It’s only ever one minute to midnight here.',
  },
  forgemother: {
    intro: [b('boss', 'Every card in this Circuit came out of my fire. Including the ones in your hand.'), b('boss', 'I made them. I can unmake them. Come here, little deck.')],
    half: 'THE CRUCIBLE! Into the mould!',
    down: [b('boss', 'Good metal. Keep it. Make something better than I did.'), b('wick', 'She was warm. Like, actually warm. I liked that part.')],
    win: 'Back into the fire. I’ll make something new out of you.',
  },
  orrery: {
    intro: [b('boss', 'Without a sun, I turn the stars by hand. All of them. Do you know how many there are?'), b('boss', 'Sun or moon, little duelist? Call it.')],
    half: 'The planets align. ECLIPSE!',
    down: [b('boss', 'The gears are slowing. Someone else will have to turn the sky now.'), b('wick', 'Volunteering! Small candle, big sky. Easy.')],
    win: 'Moon. It was always going to be moon.',
  },
  gravelord: {
    intro: [b('boss', 'Every duelist who loses here comes to me. I keep them. I raise them. I play them.'), b('boss', 'Rise, my skeletons. We have company.')],
    half: 'Bones rise! They always rise!',
    down: [b('boss', 'Tell the Sexton he can have them. Tell him the ground can have them all.'), b('wick', 'Rest well, everybody. You earned it.')],
    win: 'Welcome to the choir. Pick a bone. Any bone.',
  },
  // ── Act 4 ──
  reflection: {
    intro: [b('wick', 'Er. That’s… you.'), b('boss', 'Every winner sits in this seat. Every winner becomes me. That’s the Circuit’s real trick.'), b('boss', 'The only deck that can answer yours is yours. Shall we?')],
    half: 'You’re winning. That’s what I did, too.',
    down: [b('boss', '…Then go. Leave the seat empty. Nobody ever has.'), b('wick', 'You beat yourself. In the good way!')],
    win: 'Don’t worry. I’ll take good care of your deck.',
  },
  // ── The Long Night ──
  night_mare: {
    intro: [b('boss', 'You beat the house and you still came down? Sweet dreams, duelist.'), b('wick', 'Horse. Big horse. Big dark horse. Cool cool cool.')],
    half: 'Wake up. WAKE UP. Oh, you can’t.',
    down: [b('narrator', 'The dream breaks. Far above, a bird you have never heard starts to sing.'), b('wick', 'That’s a morning bird. Mornings have birds! I forgot!')],
    win: 'Sleep. Just a little longer. Forever is only a little longer.',
  },
  dawn_eater: {
    intro: [b('boss', 'I ate your sun. I am still hungry.'), b('wick', '…That’s it. That’s the thing that ate me. I’m going to need a minute.'), b('wick', 'Minute’s over. Get it.')],
    half: 'HUNGER.',
    down: [b('narrator', 'It coughs up a sliver of gold light. Wick drinks it in and burns twice as bright.'), b('wick', 'I got some of me back! I’m like eleven percent sun now!')],
    win: 'Crunchy little candle. Delicious.',
  },
};

/** Any boss without its own lines (should not happen, but new bosses may arrive). */
export const BOSS_FALLBACK: BossStory = {
  intro: [b('boss', 'So. You’re the one carrying the candle.')],
  half: 'Not bad. Not good enough.',
  down: [b('wick', 'Down it goes! Onward and downward.')],
  win: 'Deal again, duelist.',
};

// ═════════════════════════ ECHOES, NEMESES, PATRONS ═════════════════════════

export const ECHO_LINES = [
  'An Echo shuffles a deck somebody once loved. It plays the same way they did.',
  'The Circuit keeps a copy of everyone who sits at its tables. Here is one of them.',
  'The Echo nods at you, polite as a ghost. It has played this hand ten thousand times.',
];
/** v0.14: run two, first Rival. The deck you carried last time sits down across from you. */
export const ECHO_BEAT: Beat[] = [
  b('dealer', 'I kept something for you. Last time you left in a hurry and forgot your deck.'),
  b('wick', 'Wait. Those are your cards. Why is it holding your cards?'),
  b('dealer', 'Everyone who sits at my table leaves an Echo. This one plays exactly like you did.'),
  b('wick', 'Then we know every trick it has. Let’s show it the new ones.'),
];
export const NEMESIS_LINES = [
  '☠ {name} remembers you. It has been practising.',
  '☠ {name}: “Twice now. You never learn.”',
  '☠ {name}: “Again? I’m starting to like you.”',
];
export const PATRON_WICK: Record<string, string> = {
  archivist: 'Wick: “She has a file on everyone. Mine is mostly complaints.”',
  bellmaiden: 'Wick: “She rang the bell before every duel for two hundred years. Now nobody listens. Be nice.”',
  ferryman: 'Wick: “He carried me for a century. Don’t let him tell you I whined.”',
  gardener: 'Wick: “She grew the hedges that wall the Circuit. Everything here is her garden, even the bits that bite.”',
  masked: 'Wick: “Nobody knows who signed the Accord in a mask. I have theories. They’re all bad.”',
};

// ═════════════════════════ ENDINGS ═════════════════════════

/** The Ask scene opens the same way for everyone. */
export const ASK_OPEN: Beat[] = [
  b('narrator', 'Beyond the last fight is a small round table, a deck, and a man in a dealer’s waistcoat who has not slept in a hundred years.'),
  b('dealer', 'The Last Table. Nobody’s reached it since me. You’ve won your Ask, duelist. Make it a good one.'),
];
/** When you beat Cassius himself, he skips the introduction. */
export const ASK_OPEN_DEALER: Beat[] = [b('dealer', 'Don’t look so surprised. Somebody had to beat me eventually. Go on: ask.')];

export const ASK_STING: Beat[] = [
  b('dealer', 'Granted. One small print, though. The house always keeps a copy.'),
  b('narrator', 'Somewhere in the Circuit, a new Echo picks up your deck and starts to shuffle.'),
];

/** After the Ask, when you also beat the Reflection: the true ending. */
export const TRUE_END: Beat[] = [
  b('narrator', 'You do not sit in the seat. You walk back up the stair, all of it, with a candle that will not stop grinning.'),
  b('narrator', 'Above Vesper, for the first time in a hundred years, a thin grey line opens between the roofs and the sky.'),
  b('wick', 'That’s not the sun yet. But it’s the sun thinking about it.'),
];
export const MIRROR_LOST: Beat[] = [
  b('narrator', 'The Reflection keeps the seat warm, and keeps your face.'),
  b('wick', 'You still won your Ask. Next time, we take the mirror too.'),
];

/** The Long Night ending, by nights cleared. */
export const NIGHT_END: { min: number; beats: Beat[] }[] = [
  { min: 0, beats: [b('narrator', 'The Long Night swallows you, but the Ask is already yours.'), b('wick', 'We went further down than anyone. That counts. I’m counting it.')] },
  { min: 1, beats: [b('narrator', 'You cleared {n} night(s). Above, the sky over Vesper is a shade lighter. People are pointing at it.'), b('wick', 'They’re pointing at US. Well, at our handiwork.')] },
  { min: 3, beats: [b('narrator', 'You cleared {n} nights. Somewhere in Vesper, a baker opens up, because it feels like morning.'), b('wick', 'Bread! There will be bread! Because of us!')] },
  { min: 6, beats: [b('narrator', 'You cleared {n} nights. The dark itself has started keeping its distance from you.'), b('wick', 'I think the night is scared of us. I would be.')] },
];

/** The end screen when you fall. */
export const FALL_WICK = [
  'I’m still lit. You’re still you. Deal again?',
  'Next time, maybe don’t hit the thing with the spikes.',
  'Losing is just practice with a worse ending.',
  'New plan: same plan, but better.',
  'Hey. Hey! We got further than a hundred years of duelists. Probably. I’m guessing.',
];
export const FALL_FERRY = [
  'The first crossing is free. They’re all free. That’s the problem.',
  'Back in the boat. Mind the oar.',
  'The river and I agree: you were close.',
  'I’ll have you at the top of the stair before the candle cools.',
];
export const FALL_NEMESIS = b('narrator', '{name} has your scent now. It will be waiting next run.');

// ═════════════════════════ CLASSES ═════════════════════════

export interface ClassStory {
  /** One line on who they are (Story book). */
  who: string;
  /** What they will ask for. */
  ask: string;
  /** Run-start motive (one is picked). */
  motive: string[];
  /** One line at the start of acts 1, 2 and 3. */
  acts: [string, string, string];
  /** Their usual retort to a boss. */
  retort: string;
  /** Special lines against bosses with history. */
  rivals: Record<string, string>;
  /** The Reflection. */
  mirror: string;
  /** The Ask scene (after ASK_OPEN). */
  win: Beat[];
  /** Added to the true ending. */
  trueEnd: string;
  /** The end screen when you fall. */
  fall: string;
}

export const CLASSES: Record<CharId, ClassStory> = {
  duelist: {
    who: 'The last student of the Ember school, whose grandmother trained under Cassius Vane. The ash on the coat is from the night the sun went out.',
    ask: 'That Cassius Vane loses. Just once.',
    motive: ['My grandmother was his student. Her last words were: “Somebody has to answer him.”', 'Ember school. We parry, then we burn. Let’s go.'],
    acts: ['Grandmother walked this road. She said the lamps were friendlier back then.', 'Halfway. I can hear his cards being shuffled from here.', 'Cassius. I’m coming to finish your lesson.'],
    retort: 'Every move has an answer. Here’s mine.',
    rivals: { last_dealer: 'You taught my grandmother. She taught me the answer to you. It’s one word: riposte.' },
    mirror: 'Grandmother used to say the hardest duel is the one against your own habits.',
    win: [b('class', 'I ask that Cassius Vane loses.'), b('dealer', '…That’s it? Not wealth, not the sun, not revenge?'), b('class', 'You never lost. Not once in a hundred years. That’s why you’re stuck.'), b('dealer', 'Oh. Oh, that’s cruel. That’s… kind. Thank you.')],
    trueEnd: 'You pin the ash-grey coat over the door of the old Ember school. It can come down now.',
    fall: 'Ash to ash. Coat’s still on. Again.',
  },
  warden: {
    who: 'Keeper of the Ninefold Garden above the Circuit, where nothing has grown in a century except barbs, which the Warden keeps alive out of spite.',
    ask: 'One spring.',
    motive: ['I’ve got seeds in my pocket that have been waiting since my grandfather’s time. They’re getting impatient.', 'Let them hit me. Barbs are patient. So am I.'],
    acts: ['Roots down here. Somebody has been gardening badly.', 'Good soil, this. Shame about the knives.', 'Nearly there. I can feel the seeds in my pocket waking up.'],
    retort: 'Go on, swing. I’m mostly barbs.',
    rivals: { briar_queen: 'You’re one of mine. A cutting I lost down a drain thirty years ago. You’ve grown.', antlered_king: 'You brought the forest down here. I’d like to bring it back up.' },
    mirror: 'Huh. Do I always frown like that? I always frown like that.',
    win: [b('class', 'One spring. That’s all I want. One proper spring.'), b('dealer', 'A gardener’s wish. Small, sensible, utterly impossible without a sun.'), b('wick', 'Hello. Sun. Right here. Bit of me, anyway.'), b('class', 'Then that’s a yes.')],
    trueEnd: 'Up top, a single green shoot pushes through the barbs. You don’t say anything. You just water it.',
    fall: 'Pruned. Barbs grow back. So do I.',
  },
  hollow: {
    who: 'A duelist who already won a small Ask, decades ago, and asked to forget a grief. The Circuit took it, and the name, and the face, and everything that went with it.',
    ask: 'Give it back. All of it. Even the part that hurt.',
    motive: ['I don’t know what I lost. I know it was worth forgetting. I want it back anyway.', 'Empty hands make good cards. Nothing to drop.'],
    acts: ['I’ve been here before. I don’t remember it. That’s the problem.', 'Something on this floor knows my name. I want to ask it.', 'Whatever I gave up is at the bottom. I can feel the shape of the hole.'],
    retort: 'You can’t hurt what isn’t there.',
    rivals: { blotted_saint: 'You wrote over me. I can see my name under your ink.', reflection: 'It has my face. I’d forgotten I had one.' },
    mirror: 'So that’s what I look like. Huh. Not bad.',
    win: [b('class', 'Give it back. Whatever I asked you to take.'), b('dealer', 'It hurt so much you paid a wish to lose it.'), b('class', 'I know. Give it back anyway.'), b('narrator', 'Something comes home behind your eyes. It hurts. You have a name again. You keep it.')],
    trueEnd: 'You tell Wick your name on the way up. Wick says it’s a good one. Wick is right.',
    fall: 'Hollow again. Fine. I’m good at hollow.',
  },
  sharp: {
    who: 'A grifter, card mechanic and part-time liar, who came down because every house can be beaten, and this is the biggest house there is.',
    ask: 'Everything the house has ever won.',
    motive: ['The house always wins? Lovely. That means the house has a LOT of money.', 'Heads I win, tails you lose. Shall we?'],
    acts: ['Nice place. Terrible security.', 'Halfway down and nobody’s caught me cheating. Mostly because I haven’t. Yet.', 'The big table. My hands are actually sweating. Don’t tell anyone.'],
    retort: 'Call it. Wrong. Try again.',
    rivals: { last_dealer: 'Professional courtesy, Cassius?', impresario: 'We had a double act once. He kept the money.', magpie_king: 'You still owe me a crown.' },
    mirror: 'Oh, this one’s good. It cheats exactly like I do.',
    win: [b('class', 'I ask for everything the house has ever won.'), b('dealer', 'That’s a hundred years of mornings. The house won them all.'), b('class', '…Fine. I’ll take the mornings.'), b('wick', 'You just did a good deed by accident.'), b('class', 'Tell anyone and I’ll deny it.')],
    trueEnd: 'You sell the first sunrise in a century to absolutely nobody, because it’s free. You’re still a bit annoyed about that.',
    fall: 'Double or nothing. I’ll take double next time.',
  },
  magpie: {
    who: 'The best thief the Magpie King’s flock ever hatched. She came down to steal the one thing nobody has ever stolen: an Ask.',
    ask: 'Nothing. She takes it.',
    motive: ['Everyone asks. I don’t ask. I take.', 'Pockets: empty. Hands: quick. Conscience: misplaced.'],
    acts: ['Shiny, shiny, trap, shiny. I love this floor.', 'The old man’s nest is on this floor. I’m not visiting. I’m robbing.', 'The Ask is down there, unguarded except by everything. Perfect.'],
    retort: 'I’ll be taking that.',
    rivals: { magpie_king: 'Hi, Dad. No. You’re not my dad. You’re a bird.' },
    mirror: 'It stole my face. Respect.',
    win: [b('class', 'I don’t ask. I just… take it.'), b('dealer', 'You can’t steal a wish.'), b('class', 'Already did. It’s in my pocket. Now…'), b('class', 'Here, Wick. Shiny. Do something nice with it.'), b('wick', 'For me? Oh, I’m going to cry wax.')],
    trueEnd: 'The first thing she ever gave away. She tells everyone she stole the sunrise. Nobody can prove otherwise.',
    fall: 'Caught. Bad luck. Not bad skill.',
  },
  sexton: {
    who: 'The Circuit’s gravedigger for a hundred years. Nobody dies down here, so he buries what is left: lost cards, tired decks, Echoes that cannot play another hand.',
    ask: 'Let them rest.',
    motive: ['Nothing stays dead in the Circuit. I would like to change that. Gently.', 'Spade’s sharp. Crypt’s open. Let’s fill it.'],
    acts: ['I know every grave on this floor. I dug most of them.', 'The Middle Circuit. The graves here are shallow. Mind your step.', 'The Deep. Older graves. Older debts.'],
    retort: 'Everything ends. I’m just the one who tidies up.',
    rivals: { gravelord: 'You keep digging up my work.' },
    mirror: 'Hm. I always wondered who would bury me.',
    win: [b('class', 'Let them rest. Every Echo. Every deck. Let me fill in the last grave.'), b('dealer', 'Even mine?'), b('class', 'Especially yours, Cassius. You look tired.'), b('dealer', '…I am. Thank you, gravedigger.')],
    trueEnd: 'You plant your spade at the top of the stair and leave it there. Somebody else can dig now. You’d like to see a sunrise first.',
    fall: 'Buried again. I know the way out.',
  },
  arbiter: {
    who: 'The last judge of the House of Dawn, who kept the Accord. A hundred years late, the Arbiter is holding the hearing for the Unanswered Hand.',
    ask: 'A ruling: the Unanswered Hand is out of order.',
    motive: ['The court of Dawn is now in session. Defendant: Cassius Vane. Charge: the last word.', 'Objection first, questions later.'],
    acts: ['Evidence, everywhere. Mostly evidence that things want to bite me.', 'Halfway to the bench. The witnesses here are all made of knives.', 'The Deep. The defendant is close. I can smell the smugness.'],
    retort: 'Objection!',
    rivals: { blotted_saint: 'You defaced the Accord. That is a crime, and also rude.', last_dealer: 'Cassius Vane, you are summoned.' },
    mirror: 'I will not be cross-examined by myself. …Fine. Proceed.',
    win: [b('class', 'I ask for a ruling: the Unanswered Hand is out of order.'), b('dealer', 'There’s no law that covers it. I checked. For a century.'), b('class', 'Then I set one. Every last word can be answered. Precedent: this hearing.'), b('dealer', 'Objection?'), b('class', 'Overruled.')],
    trueEnd: 'You carve the new ruling over the door, under the old rule. EVERY MOVE HAS AN ANSWER. EVEN THE LAST ONE.',
    fall: 'Adjourned. Not dismissed.',
  },
  tempest: {
    who: 'A storm-chaser who has spent years bottling lightning, on the theory that the sun is just a very big spark.',
    ask: 'To see the real sky. Just once.',
    motive: ['The sun’s a big spark, right? I’ve got sparks. LOTS of sparks.', 'Stand back. Stand further back. Okay, that’s good.'],
    acts: ['Underground thunder sounds amazing. Listen to that echo!', 'Halfway. My bottles are humming. That’s a good sign or a very bad one.', 'Last floor. I’m saving the big bottle for the end.'],
    retort: 'Charging. Charging. CHARGED.',
    rivals: { orrery: 'You’ve been running the stars without a sun? On WHAT?' },
    mirror: 'Whoa. Am I always this loud? …Yes. Good.',
    win: [b('class', 'I just want to see the sky. The real one.'), b('dealer', 'The sky’s black, duelist. It’s been black for a century.'), b('class', 'Then I’ll bring my own light.'), b('narrator', 'Every bottle opens at once. Lightning runs up the stair and out over Vesper, and for one second the whole city is lit.')],
    trueEnd: 'One second of lightning, then a slow grey dawn. You stand on a roof and yell at it until it’s embarrassed.',
    fall: 'Discharged. Recharging.',
  },
  rimeblade: {
    who: 'A duelist who froze herself on the night of the Unanswered Hand rather than become an Echo. She thawed last winter. Her sister Isolde did not freeze in time.',
    ask: 'Let Isolde put her cards down.',
    motive: ['A hundred years in the ice. Everyone I knew is an Echo now. One of them is my sister.', 'Cold hands. Steady hands.'],
    acts: ['The lamps are different. Everything is different. Except the cold.', 'Isolde played her best hands on this floor.', 'If she’s anywhere, she’s down here.'],
    retort: 'Hold still. This will be cold.',
    rivals: { clockmaker: 'You stopped time. I stopped myself. Neither of us got what we wanted.' },
    mirror: 'For a second I thought it was Isolde. We always did look alike.',
    win: [b('class', 'Let Isolde put her cards down.'), b('dealer', 'One Echo. Out of thousands.'), b('class', 'I know. Start with her.'), b('narrator', 'Far above, an Echo in a blue coat sets her deck on a table, stretches, and laughs for the first time in a century.')],
    trueEnd: 'Isolde is waiting at the top of the stair. She is a little cold. So are you. You hold hands until you aren’t.',
    fall: 'Frozen out. Not frozen.',
  },
  beastcaller: {
    who: 'Raised by the pack in the Hollow Woods, the forest that came down looking for the sun. The Antlered King was once the pack’s gentle old leader.',
    ask: 'Let the pack see the sky.',
    motive: ['The pack has never seen the sky. Not once. Not one of them.', 'Wolf says hello. Bear says nothing. Bear never says anything.'],
    acts: ['Smells like home down here. Home smells like wet dog.', 'Hawk doesn’t like ceilings. Hawk is being very brave.', 'Last floor. Everyone stay close. Yes, you too, Serpent.'],
    retort: 'Pack! With me!',
    rivals: { antlered_king: 'You were kind once. You taught me to howl.' },
    mirror: 'The pack is confused. There are two of me. There is only one of the bear, thank goodness.',
    win: [b('class', 'Let the pack see the sky.'), b('dealer', 'Just the animals? Not you?'), b('class', 'I’m in the pack, Dealer. Where else would I be?')],
    trueEnd: 'The first thing the pack does under an open sky is howl at it. The second thing is nap.',
    fall: 'Pack’s tired. We go home. We come back.',
  },
  geomancer: {
    who: 'An engineer of Vesper’s foundations. The Circuit holds the city up, and every year without an answer the stone cracks a little more.',
    ask: 'That Vesper stays up.',
    motive: ['There’s a crack under the old cathedral the width of my hand. It was a finger last year.', 'No hurry. The mountain isn’t in a hurry either.'],
    acts: ['Load-bearing walls with spikes on. Original features.', 'The pilings are wet here. Something is eating them.', 'Bedrock. Finally. Somewhere solid to stand.'],
    retort: 'I don’t move. You move around me.',
    rivals: { leviathan: 'You’re eating my pilings.', forgemother: 'You’re melting my foundations. Stop that.' },
    mirror: 'Like arguing with a wall. I should know. I’ve built walls.',
    win: [b('class', 'I ask that the city stays up. That’s all.'), b('dealer', 'That’s a big ask, for a small one.'), b('class', 'It’s a big city.'), b('narrator', 'Somewhere under the cathedral, a crack quietly closes.')],
    trueEnd: 'Dawn shows the city the way you see it every day: standing. You check the cathedral anyway. Twice.',
    fall: 'Subsidence. Temporary.',
  },
  alchemist: {
    who: 'A scholar who believes a sun can be brewed, and wants the one formula nobody has ever written down: how a wish actually works.',
    ask: 'The recipe.',
    motive: ['If a wish can make the sun go out, a wish can be reverse-engineered. I brought notes.', 'Flask, flame, formula. Fun!'],
    acts: ['Fascinating. Everything here is trying to kill me in a different element.', 'Halfway. My samples are excellent. My hands are shaking. Unrelated.', 'The source is close. I can taste copper and destiny.'],
    retort: 'Let’s see what you’re made of. Literally.',
    rivals: { forgemother: 'You made the cards. What are they made of?' },
    mirror: 'A perfect control sample. Me versus me. Hypothesis: I win.',
    win: [b('class', 'I ask for the recipe. How does an Ask work?'), b('dealer', 'One answer, freely given, at the right moment. That’s it.'), b('class', '…That’s not chemistry. That’s a metaphor.'), b('wick', 'Welcome to magic, nerd.')],
    trueEnd: 'You write it down anyway: ONE ANSWER, FREELY GIVEN. Then, under it, in small letters: “still checking”.',
    fall: 'Failed experiment. Very informative.',
  },
  nightblade: {
    who: 'The last blade of the House of Dusk, sworn to end whoever broke the Accord. One name has been at the top of the list for a hundred years.',
    ask: 'His name, crossed off.',
    motive: ['One name on the list. Cassius Vane. A hundred years overdue.', 'Quiet now. Mark the target.'],
    acts: ['Shadows here are thin. I’ll make do.', 'Halfway. The target hasn’t moved in a century.', 'The Deep. Close enough to hear him breathe.'],
    retort: 'Marked.',
    rivals: { last_dealer: 'Cassius Vane. You’re a hundred years overdue.' },
    mirror: 'Even my shadow has a shadow. Annoying.',
    win: [b('class', 'His name. Crossed off the list.'), b('dealer', 'Go on, then. I won’t stop you.'), b('class', 'The oath says a broken Accord must end. It doesn’t say who ends. I ask that the Accord be kept.'), b('dealer', 'So someone answers me instead of killing me. You’re soft, Dusk.'), b('class', 'I’m thorough.')],
    trueEnd: 'You cross the name off the list. Under it you write a new one: “Nobody.” It is the best list you have ever kept.',
    fall: 'Missed. I don’t miss twice.',
  },
};

/** When you beat Cassius but your class has no history with him. */
export const DEALER_RETORT = 'Every move has an answer, Dealer. Even yours.';

// ═════════════════════════ THE STORY BOOK ═════════════════════════

export interface Chapter { id: string; title: string; hint: string; text: string[] }

export const CHAPTERS: Chapter[] = [
  { id: 'deal', title: 'Deal Me In', hint: 'Start a run.', text: [
    'Vesper is a city of eight Houses. The six elemental Houses (Blaze, Frost, Wild, Storm, Flood and Stone) drew up the Wheel: each beats the next two and loses to the two before, so no House can ever rule them all.',
    'The House of Dawn judged their duels. The House of Dusk punished anyone who cheated. And under it all ran the Undercroft Circuit, three floors of duel halls, and at the bottom, the Last Table.',
    'Win the Last Table and the Circuit grants you one Ask. Kings were crowned that way. Rivers were moved. One man asked for the last word.',
  ] },
  { id: 'ferry', title: 'The Ferryman’s Fare', hint: 'Lose a run.', text: [
    'Nobody dies in the Circuit. The Accord forbade it: a duel is for settling things, not ending them. So when you fall, the Ferryman rows you back up the black river to the top of the stair.',
    'He has done this for every duelist for a hundred years. He does not charge. He says the fare is that you try again.',
    'He carried Wick for all that time, too, in a jar, waiting for someone stubborn enough to take the candle down.',
  ] },
  { id: 'door', title: 'The Door', hint: 'Beat an Act I boss.', text: [
    'The Upper Circuit was the public floor: market stalls, practice halls, the lamplit road to the stair. When the sun went out it was the first floor to go strange.',
    'The Lantern Warden stayed on the door because nobody relieved him. The Tide Broker kept lending money in a city where nobody could leave. And the forest, finding no sun above, grew down through the cracks to look for it.',
  ] },
  { id: 'grudge', title: 'A Grudge', hint: 'Get a Nemesis.', text: [
    'Things in the Circuit feed on winning. When one of them beats you it gets a taste, and it remembers.',
    'Next run it will be waiting for you, promoted and pleased with itself. Beat it and it lets go. Lose to it three times and it gets bored and moves on, which somehow feels worse.',
  ] },
  { id: 'audience', title: 'The Audience', hint: 'Beat an Act II boss.', text: [
    'The Middle Circuit was where the famous duels were held. The audience never left. A hundred years of watching turned them into the Chorus of Knives.',
    'The Impresario still sells tickets. The Leviathan moved into the drowned docks. And the Patrons, five old founders of the Accord, still haunt the stairs between floors, offering gifts with strings attached.',
  ] },
  { id: 'copies', title: 'Copies', hint: 'Fight an Echo or mint a Legacy deck.', text: [
    'The Circuit keeps a copy of everyone who plays at its tables. That is what an Echo is: a deck that kept playing after its duelist stopped.',
    'When you mint a Legacy deck you leave a copy on purpose. It will be waiting for the next duelist. It may even be waiting for you.',
  ] },
  { id: 'table', title: 'The Last Table', hint: 'Win a run.', text: [
    'You reached the Last Table and made your Ask. The Dealer granted it. He always does. He always takes a copy, too.',
    'Every winner gets what they asked for. Nobody has asked for the sun back yet. Wick has noticed. Wick is being very patient about it.',
  ] },
  { id: 'cassius', title: 'Cassius', hint: 'Beat the Last Dealer.', text: [
    'Cassius Vane never lost a duel. Not one. When he won the Last Table, he asked for the only thing he did not have: the last word, a move no one could answer.',
    'The Accord could not hold both rules at once. It broke. The Dawnwick, the great lamp at the Last Table whose fire was Vesper’s sun, cracked and went dark.',
    'Cassius got exactly what he asked for. He has the last word forever. He can never play again, only deal. The house always wins, because he is the house.',
  ] },
  { id: 'mirror', title: 'The Mirror', hint: 'Face the Reflection.', text: [
    'Behind the Last Table hangs a mirror. Every winner sees it. Every winner sits down in front of it, sooner or later.',
    'This is the Circuit’s real trick. Winners don’t leave. They become the next thing a duelist has to beat. The only deck that can answer yours is yours.',
  ] },
  { id: 'night', title: 'The Long Night', hint: 'Descend into the Long Night.', text: [
    'Under the Last Table the stair goes on, down into the night itself, the one that never ended.',
    'The thing that swallowed the sun lives down there, with the Night Mare and worse. Every night you clear, the sky over Vesper gets a shade lighter. People have started to notice.',
  ] },
  { id: 'masked', title: 'The Masked Signature', hint: 'Win 3 runs.', text: [
    'Five founders signed the Accord: the Archivist, the Bellmaiden, the Ferryman, the Gardener, and a fifth who signed in a porcelain mask.',
    'The Archivist’s records say the masked one was the House: the cut every game takes. The House was the one who whispered to Cassius, the night of the Unanswered Hand, that he deserved the last word.',
    'The House does not want the sun back. A city in the dark plays cards all night.',
  ] },
  { id: 'riposte', title: 'The Dawnwick', hint: 'Beat the Reflection.', text: [
    'Here is the secret the Accord was hiding in plain sight. Every move has an answer. Cassius has the last word. Both can be true only if someone answers after the last word.',
    'The old fencing schools of Vesper call that reply a riposte. The Dawnwick never burned on wishes. It burned on answers.',
    'Every time a duelist beats the mirror and walks out, the Dawnwick catches a little. Not as a prize. As a reply.',
    'Wick has noticed. Wick is being very patient about it.',
  ] },
];
