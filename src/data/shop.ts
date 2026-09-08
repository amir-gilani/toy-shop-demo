import type { ToyArtKey } from '../components/ToyArt'

export type Product = {
  id: string
  name: string
  blurb: string
  price: number
  /** Set only when the toy is on offer; the card strikes it through. */
  wasPrice?: number
  badge?: string
  rating: number
  reviews: number
  age: string
  art: ToyArtKey
  /** Card background — every product owns one pastel so the grid stays varied. */
  tint: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'bramble',
    name: 'Bramble the Bear',
    blurb: 'Weighted paws, hand-stitched smile, endlessly huggable.',
    price: 42,
    wasPrice: 54,
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 318,
    age: '0+',
    art: 'bear',
    tint: '#ffeede',
  },
  {
    id: 'pip',
    name: 'Pip the Bunny',
    blurb: 'Floppy ears, bamboo-soft fur and a bow that stays tied.',
    price: 36,
    badge: 'New',
    rating: 4.8,
    reviews: 204,
    age: '0+',
    art: 'bunny',
    tint: '#ffe6f2',
  },
  {
    id: 'wobble',
    name: 'Wobble Express',
    blurb: 'Solid beech engine with magnetic carriages that click.',
    price: 58,
    rating: 4.9,
    reviews: 142,
    age: '3+',
    art: 'train',
    tint: '#e4f8f1',
  },
  {
    id: 'bolt',
    name: 'Bolt the Robot',
    blurb: 'Twist the head, the arms wave. No batteries, ever.',
    price: 48,
    wasPrice: 60,
    badge: '20% off',
    rating: 4.7,
    reviews: 96,
    age: '4+',
    art: 'robot',
    tint: '#e6f3ff',
  },
  {
    id: 'juno',
    name: 'Juno Rag Doll',
    blurb: 'Organic cotton, embroidered face, a wardrobe that grows.',
    price: 39,
    rating: 4.8,
    reviews: 173,
    age: '1+',
    art: 'doll',
    tint: '#f1e9ff',
  },
  {
    id: 'alphabet',
    name: 'Alphabet Stackers',
    blurb: 'Thirty-six maple blocks, water-based paint, one canvas bag.',
    price: 34,
    badge: 'Gift pick',
    rating: 5,
    reviews: 261,
    age: '2+',
    art: 'blocks',
    tint: '#fff4dd',
  },
  {
    id: 'sprout',
    name: 'Sprout the Dino',
    blurb: 'A very polite dinosaur with a velvet belly and tiny socks.',
    price: 44,
    rating: 4.9,
    reviews: 188,
    age: '0+',
    art: 'dino',
    tint: '#e4f8f1',
  },
  {
    id: 'clover',
    name: 'Clover Rocking Horse',
    blurb: 'Heirloom birch, wool mane, built to outlast the childhood.',
    price: 129,
    wasPrice: 149,
    badge: 'Heirloom',
    rating: 5,
    reviews: 74,
    age: '18m+',
    art: 'horse',
    // Blue, not cream: the horse is painted cream and would vanish into a warm
    // tint the way it does on the shelf photos.
    tint: '#e6f3ff',
  },
]

export type Category = {
  name: string
  count: string
  art: ToyArtKey
  tint: string
  tilt: string
}

export const CATEGORIES: Category[] = [
  { name: 'Plush friends', count: '84 cuddles', art: 'bunny', tint: '#ffe6f2', tilt: '-3deg' },
  { name: 'Wooden classics', count: '52 pieces', art: 'train', tint: '#e4f8f1', tilt: '2deg' },
  { name: 'Build & stack', count: '38 sets', art: 'blocks', tint: '#fff4dd', tilt: '-2deg' },
  { name: 'Little dreamers', count: '27 dolls', art: 'doll', tint: '#f1e9ff', tilt: '3deg' },
  { name: 'Whirr & whizz', count: '31 gadgets', art: 'robot', tint: '#e6f3ff', tilt: '-2deg' },
  { name: 'Ready-wrapped gifts', count: '19 boxes', art: 'rocket', tint: '#ffeede', tilt: '2deg' },
]

export type Promise = { title: string; body: string; icon: string }

export const PROMISES: Promise[] = [
  {
    title: 'Made to be mauled',
    body: 'Double-stitched seams and a wash-test every batch has to survive twenty times over.',
    icon: 'stitch',
  },
  {
    title: 'Safe to chew on',
    body: 'Water-based paints, FSC timber and EN71 certification on every single shelf.',
    icon: 'shield',
  },
  {
    title: 'Wrapped by hand',
    body: 'Recycled tissue, a ribbon, and a note in your handwriting if you want one.',
    icon: 'gift',
  },
  {
    title: 'Home in two days',
    body: 'Free UK delivery over £40, and a 60-day change-of-heart window.',
    icon: 'truck',
  },
]

export const MARQUEE_ITEMS = [
  'Free delivery over £40',
  'Hand-finished in Bristol',
  '60-day returns',
  'EN71 safety tested',
  'Gift wrap on the house',
  'Spare parts sent free, forever',
]

export type Review = {
  quote: string
  name: string
  detail: string
  art: ToyArtKey
  tint: string
}

export const REVIEWS: Review[] = [
  {
    quote:
      'Bramble has been dragged through three countries, one puddle and a washing machine. He looks better than I do.',
    name: 'Hannah W.',
    detail: 'bought Bramble the Bear',
    art: 'bear',
    tint: '#ffeede',
  },
  {
    quote:
      'The train is the first toy in this house that both children play with at the same time without a summit meeting.',
    name: 'Deniz A.',
    detail: 'bought Wobble Express',
    art: 'train',
    tint: '#e4f8f1',
  },
  {
    quote:
      'A ribbon, tissue paper and a handwritten note. I bought it for my niece and got the nicer surprise.',
    name: 'Marco P.',
    detail: 'bought Alphabet Stackers',
    art: 'blocks',
    tint: '#fff4dd',
  },
]
