export interface Beverage {
  id: string;
  name: string;
  flavor: string;
  headline: string;
  tagline: string;
  description: string;
  color: string;
  accentHex: string;
  bgGradient: string;
  glassImage: string;
  thumbImage: string;
  calories: string;
  volume: string;
  sugar: string;
  caffeine: string;
  realFruitPercent: string;
  ingredients: string[];
  tastingNotes: string[];
  pairing: string;
}

export const BEVERAGES: Beverage[] = [
  {
    id: 'orange',
    name: 'VOLD Orange Citrus',
    flavor: 'Valencia Orange Citrus',
    headline: 'Pure Valencia Sunshine',
    tagline: 'Cold-pressed Valencia oranges & mountain spring water',
    description: 'Brimming with bright citrus oils, sweet Valencia juice, and crisp sparkling spring water. Balanced with a hint of mandarin zest for an invigorating burst of natural refreshment.',
    color: 'orange',
    accentHex: '#f97316',
    bgGradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    glassImage: '/images/flavor-orange-glass.jpg',
    thumbImage: '/images/thumb-orange.png',
    calories: '45 kcal',
    volume: '330 ml / 11.2 fl oz',
    sugar: '9g (Naturally occurring fruit sugars, 0g added)',
    caffeine: '0 mg',
    realFruitPercent: '38%',
    ingredients: [
      'Valencia Orange Cold-Pressed Juice (38%)',
      'Sparkling Mountain Spring Water',
      'Mandarin Peel Distillate',
      'Organic Meyer Lemon Extract',
      'Acerola Berry (Natural Vitamin C)'
    ],
    tastingNotes: ['Sun-ripened orange pulp', 'Zesty mandarin peel', 'Crisp mineral bubbles'],
    pairing: 'Chilled salads, spicy tacos, sunny afternoons'
  },
  {
    id: 'mango',
    name: 'VOLD Mango Gold',
    flavor: 'Alphonso Mango Gold',
    headline: 'Sun-Drenched Mango Nectar',
    tagline: 'Velvety Alphonso mango puree with tropical passionfruit spark',
    description: 'Crafted from queen Alphonso mangoes, slowly pureed and lifted with crisp carbonated spring water and wild passionfruit. Lush, rich, and remarkably refreshing.',
    color: 'yellow',
    accentHex: '#eab308',
    bgGradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
    glassImage: '/images/flavor-mango-glass.jpg',
    thumbImage: '/images/thumb-mango.png',
    calories: '52 kcal',
    volume: '330 ml / 11.2 fl oz',
    sugar: '11g (Naturally occurring fruit sugars, 0g added)',
    caffeine: '0 mg',
    realFruitPercent: '34%',
    ingredients: [
      'Alphonso Mango Puree (34%)',
      'Sparkling Mountain Spring Water',
      'Organic Passionfruit Juice',
      'Tahitian Lime Blossom Essence',
      'Natural Fruit Pectin'
    ],
    tastingNotes: ['Velvety honeyed mango', 'Tropical passionfruit bite', 'Smooth golden finish'],
    pairing: 'Grilled seafood, summer brunch, beachside relaxing'
  },
  {
    id: 'strawberry',
    name: 'VOLD Wild Strawberry',
    flavor: 'Alpine Wild Strawberry',
    headline: 'Crushed Alpine Berries',
    tagline: 'Mountain alpine strawberries with distilled garden mint',
    description: 'Hand-picked alpine strawberries gently crushed into ruby nectar, blended with elderberry botanical essence and sparkling mineral water for a sophisticated sweet-tart symphony.',
    color: 'red',
    accentHex: '#ef4444',
    bgGradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    glassImage: '/images/flavor-strawberry-glass.jpg',
    thumbImage: '/images/thumb-strawberry.png',
    calories: '42 kcal',
    volume: '330 ml / 11.2 fl oz',
    sugar: '8g (Naturally occurring fruit sugars, 0g added)',
    caffeine: '0 mg',
    realFruitPercent: '30%',
    ingredients: [
      'Alpine Strawberry Puree (30%)',
      'Sparkling Spring Water',
      'Wild Mountain Elderberry Juice',
      'Distilled Garden Spearmint',
      'Hibiscus Blossom Extract'
    ],
    tastingNotes: ['Bright wild berry sweetness', 'Delicate floral perfume', 'Tart sparkling finale'],
    pairing: 'Artisan cheeses, poolside sunset, summer desserts'
  },
  {
    id: 'lemon-mint',
    name: 'VOLD Lime Mint',
    flavor: 'Crisp Lime Mint Cooler',
    headline: 'Zesty Botanical Crispness',
    tagline: 'Sun-kissed Persian limes & garden-fresh spearmint',
    description: 'Electric lime clarity paired with cold-distilled spearmint and extra effervescent mineral water. Ultra-crisp, restorative, and instantly revitalizing.',
    color: 'lime',
    accentHex: '#84cc16',
    bgGradient: 'from-lime-500/20 via-emerald-500/10 to-transparent',
    glassImage: '/images/flavor-lemon-mint-glass.jpg',
    thumbImage: '/images/thumb-lemon-mint.png',
    calories: '36 kcal',
    volume: '330 ml / 11.2 fl oz',
    sugar: '6g (Naturally occurring fruit sugars, 0g added)',
    caffeine: '0 mg',
    realFruitPercent: '24%',
    ingredients: [
      'Persian Lime Cold-Pressed Juice (24%)',
      'Sparkling Mineral Water',
      'Garden Spearmint Cold Distillate',
      'Organic Eureka Lemon Pulp',
      'Trace Mineral Sea Salt'
    ],
    tastingNotes: ['Electric citrus bite', 'Cooling mint breeze', 'Dry bubbly refreshment'],
    pairing: 'Post-workout cooldown, barbecue feast, late-night dinners'
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'flavors' | 'harvest' | 'lifestyle';
  image: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'The Signature Four Collection',
    category: 'flavors',
    image: '/images/vold-can-collection.jpg',
    caption: 'Our complete lineup of 100% recyclable cans chilled over fresh crushed ice.'
  },
  {
    id: '2',
    title: 'Sun-Drenched Citrus Groves',
    category: 'harvest',
    image: '/images/vold-orchard-harvest.jpg',
    caption: 'Sourcing peak-ripeness Valencia oranges and golden mangoes at sunrise.'
  },
  {
    id: '3',
    title: 'Golden Hour Gatherings',
    category: 'lifestyle',
    image: '/images/vold-lifestyle-table.jpg',
    caption: 'Good drinks, brighter days: friends sharing cold VOLD glasses under the summer sun.'
  },
  {
    id: '4',
    title: 'Valencia Orange Splash',
    category: 'flavors',
    image: '/images/flavor-orange-glass.jpg',
    caption: 'Dynamic cold-pressed orange splash with natural condensation and fresh citrus wheel.'
  },
  {
    id: '5',
    title: 'Submerged Fruit Clarity',
    category: 'harvest',
    image: '/images/underwater-ingredients.jpg',
    caption: 'Pure mountain water revealing pristine limes, mangoes, and botanical mint leaves.'
  },
  {
    id: '6',
    title: 'Golden Alphonso Nectar',
    category: 'flavors',
    image: '/images/flavor-mango-glass.jpg',
    caption: 'Velvety tropical mango puree garnished with sweet honeyed cubes.'
  }
];

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'What makes VOLD Beverages different from typical sodas or fruit juices?',
    answer: 'Unlike conventional sodas that rely on artificial flavorings, preservatives, and high-fructose corn syrup, VOLD uses genuine cold-pressed fruit juices (24%–38% fruit content), mountain spring water, and botanical distillates. You get the real aroma, bright texture, and true taste of sun-ripened fruit with gentle effervescence and zero added sugars.',
    category: 'Product'
  },
  {
    question: 'Are VOLD beverages non-GMO, vegan, and gluten-free?',
    answer: 'Yes! Every flavor of VOLD Beverages is 100% vegan certified, gluten-free, dairy-free, and crafted strictly with non-GMO ingredients. We use no animal-derived clarifying agents or synthetic stabilizers.',
    category: 'Ingredients'
  },
  {
    question: 'Is there any added sugar or artificial sweetener in VOLD drinks?',
    answer: 'None whatsoever. All sweetness comes exclusively from naturally occurring sugars inside the cold-pressed fruits. We never add refined white sugar, sucralose, aspartame, or high-fructose corn syrup.',
    category: 'Nutrition'
  },
  {
    question: 'How should VOLD drinks be served for optimal taste?',
    answer: 'For the ultimate sensory experience, serve VOLD chilled between 3°C to 5°C (37°F–41°F). Pour over clear crystal ice cubes, garnish with a fresh citrus wheel or sprig of garden mint, and enjoy immediately to experience the active effervescence.',
    category: 'Serving'
  },
  {
    question: 'What packaging sizes are currently available?',
    answer: 'VOLD is available in our signature 330ml (11.2 fl oz) sleek aluminum cans, which are 100% infinitely recyclable. Selected partner cafes and premium restaurants also serve our 450ml chilled glassware bistro serve.',
    category: 'Packaging'
  },
  {
    question: 'How do I become a retail partner or stock VOLD in my venue?',
    answer: 'We partner with boutique grocers, specialty cafes, luxury resorts, and high-end dining venues globally. Reach out through our wholesale contact form below or email wholesale@voldbeverages.com to connect with our distribution team.',
    category: 'Wholesale'
  }
];
