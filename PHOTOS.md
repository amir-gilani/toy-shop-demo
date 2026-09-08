# Where the photographs go

Three sections of the site render a photograph when one exists and leave the
space empty when it doesn't. Nothing in the code needs changing to add one —
drop a file at the path below and it appears.

A missing file is not an error: the `<img>` fails to load, the component drops
it, and the tinted frame stays exactly the size it already was. So the site can
be deployed with none, some, or all of these present.

## `public/products/` — shop cards

Landscape, cropped to roughly **4:3.4** (900×765 works well).

| File | Product |
| --- | --- |
| `bramble.jpg` | Bramble the Bear |
| `pip.jpg` | Pip the Bunny |
| `wobble.jpg` | Wobble Express |
| `bolt.jpg` | Bolt the Robot |
| `juno.jpg` | Juno Rag Doll |
| `alphabet.jpg` | Alphabet Stackers |
| `sprout.jpg` | Sprout the Dino |
| `clover.jpg` | Clover Rocking Horse |

## `public/categories/` — "Pick an aisle"

Square (600×600 works well); shown as a rounded tile.

| File | Category |
| --- | --- |
| `plush-friends.jpg` | Plush friends |
| `wooden-classics.jpg` | Wooden classics |
| `build-stack.jpg` | Build & stack |
| `little-dreamers.jpg` | Little dreamers |
| `whirr-whizz.jpg` | Whirr & whizz |
| `ready-wrapped.jpg` | Ready-wrapped gifts |

## `public/ages/` — "Tell us how old they are"

Square (500×500 works well); shown as a circle, so keep the subject centred and
fairly close — a wide shot reads as an empty disc at this size.

| File | Age band |
| --- | --- |
| `first-cuddles.jpg` | 0–1 |
| `grabbers-stackers.jpg` | 1–3 |
| `whole-worlds.jpg` | 3–5 |
| `proper-projects.jpg` | 5+ |

## Changing a filename

The paths live in [`src/data/shop.ts`](src/data/shop.ts) (`image` on each
product and category) and in the `AGES` list at the top of
[`src/components/Gifts.tsx`](src/components/Gifts.tsx).

## Not covered here

The hero panda images (`public/panda-*.jpg`) are already in the repo and are
wired up separately in `HeroBackdrop.tsx`.
