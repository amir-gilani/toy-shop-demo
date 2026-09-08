/**
 * Hand-drawn toy illustrations.
 *
 * Product photography would mean shipping (or hot-linking) bitmaps; drawing the
 * shelf instead keeps the shop self-contained, sharp at any size and always
 * on-palette. Every piece is authored on the same 200x200 grid, so a card can
 * swap art without touching layout.
 */

type ArtProps = { title: string }

const FRAME = {
  viewBox: '0 0 200 200',
  xmlns: 'http://www.w3.org/2000/svg',
  role: 'img' as const,
  className: 'h-full w-full',
}

const INK = '#241a2e'

/** Two dark eyes with a catchlight — the detail that makes a shape look alive. */
function Eyes({
  cx1,
  cx2,
  cy,
  r = 6,
}: {
  cx1: number
  cx2: number
  cy: number
  r?: number
}) {
  return (
    <>
      <circle cx={cx1} cy={cy} r={r} fill={INK} />
      <circle cx={cx2} cy={cy} r={r} fill={INK} />
      <circle cx={cx1 + r * 0.35} cy={cy - r * 0.35} r={r * 0.32} fill="#fff" />
      <circle cx={cx2 + r * 0.35} cy={cy - r * 0.35} r={r * 0.32} fill="#fff" />
    </>
  )
}

function Blush({
  cx,
  cy,
  fill = '#ff9ec9',
}: {
  cx: number
  cy: number
  fill?: string
}) {
  return <ellipse cx={cx} cy={cy} rx="8.5" ry="5" fill={fill} opacity="0.75" />
}

/* ------------------------------------------------------------------------ */

function Bear({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <circle cx="62" cy="56" r="21" fill="#c98a5a" />
      <circle cx="138" cy="56" r="21" fill="#c98a5a" />
      <circle cx="62" cy="56" r="10" fill="#efbd91" />
      <circle cx="138" cy="56" r="10" fill="#efbd91" />
      <ellipse
        cx="52"
        cy="140"
        rx="15"
        ry="21"
        fill="#b87a4c"
        transform="rotate(-18 52 140)"
      />
      <ellipse
        cx="148"
        cy="140"
        rx="15"
        ry="21"
        fill="#b87a4c"
        transform="rotate(18 148 140)"
      />
      <ellipse cx="100" cy="152" rx="45" ry="40" fill="#c98a5a" />
      <ellipse cx="100" cy="156" rx="26" ry="25" fill="#efbd91" />
      <circle cx="100" cy="88" r="43" fill="#c98a5a" />
      <ellipse cx="100" cy="104" rx="24" ry="18" fill="#f7ddc2" />
      <Eyes cx1={84} cx2={116} cy={82} />
      <ellipse cx="100" cy="97" rx="8" ry="6" fill={INK} />
      <path
        d="M100 103v4m0 0c-3.5 0-6.5-1.5-8-4m8 4c3.5 0 6.5-1.5 8-4"
        stroke={INK}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <Blush cx={66} cy={96} />
      <Blush cx={134} cy={96} />
      <path
        d="M100 132c-9-8-22-4-20 4 1 5 12 5 20 0 8 5 19 5 20 0 2-8-11-12-20-4Z"
        fill="#f4438b"
      />
      <circle cx="100" cy="134" r="5" fill="#ff9ec9" />
    </svg>
  )
}

function Bunny({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <ellipse
        cx="78"
        cy="46"
        rx="15"
        ry="38"
        fill="#ffd3e6"
        transform="rotate(-11 78 46)"
      />
      <ellipse
        cx="122"
        cy="46"
        rx="15"
        ry="38"
        fill="#ffd3e6"
        transform="rotate(11 122 46)"
      />
      <ellipse
        cx="78"
        cy="48"
        rx="6.5"
        ry="25"
        fill="#ff9ec9"
        transform="rotate(-11 78 48)"
      />
      <ellipse
        cx="122"
        cy="48"
        rx="6.5"
        ry="25"
        fill="#ff9ec9"
        transform="rotate(11 122 48)"
      />
      <ellipse
        cx="56"
        cy="148"
        rx="14"
        ry="19"
        fill="#ffc4dd"
        transform="rotate(-20 56 148)"
      />
      <ellipse
        cx="144"
        cy="148"
        rx="14"
        ry="19"
        fill="#ffc4dd"
        transform="rotate(20 144 148)"
      />
      <ellipse cx="100" cy="154" rx="42" ry="38" fill="#ffd3e6" />
      <ellipse cx="100" cy="158" rx="24" ry="24" fill="#fff2f8" />
      <circle cx="100" cy="102" r="40" fill="#ffd3e6" />
      <path
        d="M80 100c3.5-6 10.5-6 14 0M106 100c3.5-6 10.5-6 14 0"
        stroke={INK}
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M94 110h12l-6 7Z" fill="#f4438b" />
      <path
        d="M100 117v3m0 0c-3 0-5.5-1.2-7-3.4m7 3.4c3 0 5.5-1.2 7-3.4"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <Blush cx={68} cy={110} fill="#ff7bb4" />
      <Blush cx={132} cy={110} fill="#ff7bb4" />
      {/* Bow tie under the chin. */}
      <path
        d="M100 141c-6-8-18-9-18-1s12 8 18 1c6 7 18 7 18-1s-12-7-18 1Z"
        fill="#6ec6ff"
      />
      <circle cx="100" cy="141" r="4.5" fill="#4fb3f5" />
    </svg>
  )
}

function Train({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <rect x="18" y="146" width="164" height="7" rx="3.5" fill="#d9bb96" />
      <rect x="96" y="72" width="80" height="62" rx="12" fill="#ff8a5b" />
      <rect x="108" y="86" width="26" height="24" rx="6" fill="#fff3e6" />
      <rect x="142" y="86" width="26" height="24" rx="6" fill="#fff3e6" />
      <rect x="26" y="88" width="66" height="46" rx="12" fill="#7adfc0" />
      <rect x="34" y="52" width="24" height="40" rx="8" fill="#6ec6ff" />
      <rect x="28" y="44" width="36" height="12" rx="6" fill="#ffd66e" />
      <circle cx="46" cy="30" r="10" fill="#fff" opacity="0.85" />
      <circle cx="62" cy="18" r="7" fill="#fff" opacity="0.7" />
      <circle cx="74" cy="30" r="5" fill="#fff" opacity="0.55" />
      <rect x="64" y="100" width="24" height="22" rx="6" fill="#fff3e6" />
      <rect x="88" y="108" width="12" height="8" rx="4" fill="#c98a5a" />
      <circle cx="48" cy="146" r="17" fill="#ffd66e" />
      <circle cx="48" cy="146" r="6" fill="#c98a5a" />
      <circle cx="116" cy="146" r="14" fill="#ffd66e" />
      <circle cx="116" cy="146" r="5" fill="#c98a5a" />
      <circle cx="160" cy="146" r="14" fill="#ffd66e" />
      <circle cx="160" cy="146" r="5" fill="#c98a5a" />
    </svg>
  )
}

function Robot({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <path d="M100 22v16" stroke="#c6a8ff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="20" r="8" fill="#ffd66e" />
      <rect x="30" y="104" width="20" height="46" rx="10" fill="#8fb8ff" />
      <rect x="150" y="104" width="20" height="46" rx="10" fill="#8fb8ff" />
      <rect x="52" y="96" width="96" height="80" rx="20" fill="#6ec6ff" />
      <rect x="70" y="116" width="60" height="34" rx="10" fill="#eaf6ff" />
      <path
        d="M80 133h8l4-8 6 16 5-12 4 4h13"
        stroke="#f4438b"
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="58" y="38" width="84" height="66" rx="20" fill="#8fb8ff" />
      <rect x="70" y="52" width="60" height="34" rx="14" fill="#241a2e" />
      <circle cx="88" cy="69" r="7" fill="#7adfc0" />
      <circle cx="112" cy="69" r="7" fill="#7adfc0" />
      <circle cx="90" cy="66" r="2.4" fill="#fff" />
      <circle cx="114" cy="66" r="2.4" fill="#fff" />
      <rect x="46" y="60" width="12" height="20" rx="6" fill="#ffd66e" />
      <rect x="142" y="60" width="12" height="20" rx="6" fill="#ffd66e" />
      <rect x="68" y="160" width="22" height="18" rx="8" fill="#241a2e" />
      <rect x="110" y="160" width="22" height="18" rx="8" fill="#241a2e" />
    </svg>
  )
}

function Doll({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <path
        d="M64 60c0-24 16-38 36-38s36 14 36 38c0 10-4 16-4 16H68s-4-6-4-16Z"
        fill="#ffb27a"
      />
      <ellipse cx="60" cy="76" rx="12" ry="20" fill="#ffb27a" />
      <ellipse cx="140" cy="76" rx="12" ry="20" fill="#ffb27a" />
      <circle cx="100" cy="74" r="38" fill="#ffe0c4" />
      <path
        d="M62 66c4-26 18-40 38-40s34 14 38 40c-10-12-22-18-38-18s-28 6-38 18Z"
        fill="#ffb27a"
      />
      <Eyes cx1={86} cx2={114} cy={76} r={5.5} />
      <path
        d="M92 92c4 4 12 4 16 0"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Blush cx={76} cy={88} />
      <Blush cx={124} cy={88} />
      <path
        d="M100 112c-26 0-44 16-46 44a4 4 0 0 0 4 4h84a4 4 0 0 0 4-4c-2-28-20-44-42-44Z"
        fill="#c6a8ff"
      />
      <path
        d="M64 152h72"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle cx="100" cy="120" r="6" fill="#ffd66e" />
      <circle cx="72" cy="36" r="9" fill="#f4438b" />
      <circle cx="72" cy="36" r="3.5" fill="#ffd66e" />
    </svg>
  )
}

function Blocks({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <rect x="26" y="128" width="56" height="52" rx="12" fill="#ff8a5b" />
      <rect x="92" y="128" width="56" height="52" rx="12" fill="#6ec6ff" />
      <rect x="58" y="70" width="56" height="52" rx="12" fill="#ffd66e" />
      <rect x="120" y="70" width="46" height="52" rx="12" fill="#7adfc0" />
      <rect x="76" y="14" width="52" height="50" rx="12" fill="#ff6fb5" />
      <g fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="30" textAnchor="middle">
        <text x="54" y="165" fill="#fff">
          A
        </text>
        <text x="120" y="165" fill="#fff">
          B
        </text>
        <text x="86" y="107" fill="#241a2e">
          C
        </text>
        <text x="102" y="51" fill="#fff">
          1
        </text>
      </g>
      <circle cx="143" cy="96" r="10" fill="#fff" opacity="0.8" />
    </svg>
  )
}

function Dino({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <path d="M40 150c-14-4-22-12-22-20 0-10 12-14 26-12" fill="#5cc9a7" />
      <path
        d="M62 172c-10 0-18-4-20-14-6-30 10-58 42-64 10-2 18-2 26 0 6-16 22-24 36-16-6 6-8 12-6 18 14 10 22 26 20 44-2 20-16 32-38 32H62Z"
        fill="#7adfc0"
      />
      <path
        d="M60 132c-2-18 8-32 26-36 12-2 22 0 30 6"
        stroke="#5cc9a7"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="104" cy="150" rx="30" ry="22" fill="#d6f7ec" />
      <path
        d="M120 70c6-8 14-10 20-4M136 62c4-8 12-10 18-4"
        stroke="#ffd66e"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <Eyes cx1={140} cx2={160} cy={74} r={5} />
      <path
        d="M142 92c6 4 14 4 20-1"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Blush cx={134} cy={88} />
      <rect x="66" y="168" width="24" height="14" rx="7" fill="#5cc9a7" />
      <rect x="112" y="168" width="24" height="14" rx="7" fill="#5cc9a7" />
    </svg>
  )
}

function Horse({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      {/* Rocker, legs and tail sit behind the body. */}
      <path
        d="M18 168c12 16 44 24 82 24s70-8 82-24"
        stroke="#c98a5a"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="62" y="112" width="17" height="56" rx="8" fill="#efbd91" />
      <rect x="116" y="112" width="17" height="56" rx="8" fill="#efbd91" />
      <path d="M52 86c-15-9-24 2-17 15 5 9 14 13 21 10Z" fill="#ff6fb5" />

      {/* Mane, drawn first so it fringes the back of the neck. */}
      <g fill="#ff6fb5">
        <circle cx="110" cy="84" r="10" />
        <circle cx="115" cy="68" r="10" />
        <circle cx="121" cy="52" r="9.5" />
        <circle cx="129" cy="38" r="9" />
        <circle cx="138" cy="26" r="8" />
      </g>

      <path
        d="M48 96c0-17 14-29 34-29h40c19 0 30 13 30 30 0 16-11 27-30 27H82c-20 0-34-11-34-28Z"
        fill="#fff3e6"
      />
      {/* Neck as one fat rounded stroke — cleaner than closing the shape by hand. */}
      <path
        d="M126 98 146 44"
        stroke="#fff3e6"
        strokeWidth="34"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M141 24l3-13 10 11Z" fill="#fff3e6" />
      <ellipse
        cx="156"
        cy="40"
        rx="26"
        ry="17"
        fill="#fff3e6"
        transform="rotate(-16 156 40)"
      />

      {/* Saddle and handle. */}
      <path d="M82 70h34v8c0 7-5 12-12 12h-10c-7 0-12-5-12-12Z" fill="#6ec6ff" />
      <rect x="96" y="62" width="42" height="8" rx="4" fill="#4fb3f5" />

      {/* Bridle and face. */}
      <path
        d="M152 48c8 1 15 4 22 8"
        stroke="#ffd66e"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="157" cy="34" r="5" fill={INK} />
      <circle cx="159" cy="32" r="1.9" fill="#fff" />
      <circle cx="177" cy="44" r="2.6" fill="#c98a5a" />
      <path
        d="M170 52c4 1 7 1 10 0"
        stroke="#c98a5a"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function Rocket({ title }: ArtProps) {
  return (
    <svg {...FRAME} aria-label={title}>
      <path d="M100 14c22 16 34 42 34 72v34H66V86c0-30 12-56 34-72Z" fill="#fff3e6" />
      <path d="M100 14c-10 7-18 17-24 30h48c-6-13-14-23-24-30Z" fill="#f4438b" />
      <circle cx="100" cy="82" r="18" fill="#6ec6ff" />
      <circle cx="100" cy="82" r="11" fill="#eaf6ff" />
      <path d="M66 104 44 138c-4 6 0 12 6 10l16-6Z" fill="#ff6fb5" />
      <path d="M134 104l22 34c4 6 0 12-6 10l-16-6Z" fill="#ff6fb5" />
      <rect x="66" y="118" width="68" height="12" rx="6" fill="#c6a8ff" />
      <path d="M84 130h32l-6 22c-2 6-18 6-20 0Z" fill="#ffd66e" />
      <path d="M92 156c2 12 6 22 8 26 2-4 6-14 8-26Z" fill="#ff8a5b" />
      <circle cx="42" cy="46" r="5" fill="#ffd66e" />
      <circle cx="162" cy="34" r="4" fill="#ffd66e" />
      <circle cx="172" cy="86" r="3.5" fill="#7adfc0" />
      <circle cx="30" cy="96" r="4" fill="#7adfc0" />
    </svg>
  )
}

export const TOY_ART = {
  bear: Bear,
  bunny: Bunny,
  train: Train,
  robot: Robot,
  doll: Doll,
  blocks: Blocks,
  dino: Dino,
  horse: Horse,
  rocket: Rocket,
} as const

export type ToyArtKey = keyof typeof TOY_ART

export default function ToyArt({ name, title }: { name: ToyArtKey; title: string }) {
  const Art = TOY_ART[name]
  return <Art title={title} />
}
