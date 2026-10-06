import { RestaurantConfig } from '../types/restaurant';

// High-fidelity image assets generated for the template
import heroImage from '../assets/images/hero_restaurant_dining_1791288176258.jpg';
import aboutChefImage from '../assets/images/about_chef_kitchen_1791288188744.jpg';
import truffleDishImage from '../assets/images/dish_truffle_tagliatelle_1791288200334.jpg';
import salmonDishImage from '../assets/images/dish_pan_seared_salmon_1791288213130.jpg';
import interiorImage from '../assets/images/gallery_restaurant_interior_1791288224259.jpg';

/**
 * RESTAURANT CONFIGURATION & DATA SOURCE
 * 
 * NOTE FOR AGENCIES & DEVELOPERS:
 * This file is the single source of truth for the entire website.
 * To adapt this template for a new restaurant client, simply modify the fields below:
 * - Restaurant name, tagline & descriptions
 * - Menu categories, dishes, prices & photos
 * - Address, phone, email & opening hours
 * - About section story, stats & chef details
 * - Reviews & gallery photos
 */
export const restaurantConfig: RestaurantConfig = {
  name: 'The Table',
  tagline: 'Good Food. Great Moments.',
  taglineSecondary: 'Modern American & Mediterranean Culinary Craft',
  shortDescription:
    'An intentional gathering place where seasonal farm-to-table cuisine meets warm, timeless hospitality in the heart of the city.',
  
  fullStory: [
    'Founded with a simple yet uncompromising philosophy: exceptional meals are rooted in honest ingredients, attentive craft, and genuine human connection.',
    'Every morning, our culinary team receives hand-selected produce from organic family growers within fifty miles, wild-caught seafood from sustainable coastal fisheries, and artisanal heritage cuts.',
    'Whether you are celebrating a life milestone or sharing a spontaneous weeknight meal, our dining room was designed as a sanctuary of warmth, elegance, and unforgettable flavors.'
  ],

  philosophy:
    'We believe the dining table is the original social network. Our open kitchen cooks without shortcuts, honoring both culinary tradition and modern seasonal innovation.',

  chef: {
    name: 'Julian Vance',
    role: 'Executive Chef & Culinary Director',
    quote: 'Cooking is not about complicating flavor; it is about having the courage to let exceptional ingredients speak for themselves.',
    bio: 'Trained in Paris and San Francisco, Chef Vance spent two decades perfecting his craft before opening The Table to celebrate regional growers and community tables.',
    image: aboutChefImage,
  },

  address: {
    street: '452 Grand Boulevard, Suite 100',
    cityStateZip: 'Metropolis, NY 10001',
    metroArea: 'Downtown Arts & Dining District',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1697042000000!5m2!1sen!2sus',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=452+Grand+Boulevard+Metropolis+NY',
  },

  contact: {
    phone: '+1 (555) 234-5678',
    phoneFormatted: '(555) 234-5678',
    email: 'reservations@thetablerestaurant.example',
    pressEmail: 'press@thetablerestaurant.example',
  },

  hours: [
    { day: 'Monday', hours: 'Closed for Private Tastings', note: 'Private events available upon request' },
    { day: 'Tuesday – Thursday', hours: '5:00 PM – 10:00 PM', note: 'Dinner Service' },
    { day: 'Friday – Saturday', hours: '5:00 PM – 11:00 PM', note: 'Dinner & Late Night Cocktails' },
    { day: 'Sunday', hours: '4:30 PM – 9:30 PM', note: 'Sunday Roast & Supper' },
  ],

  stats: [
    { value: '10+ Years', label: 'Culinary Dedication', detail: 'Serving the community since 2016' },
    { value: '50+ Dishes', label: 'Seasonal Creations', detail: 'Rotated with local harvest cycles' },
    { value: '4.9 Rating', label: 'Guest Satisfaction', detail: 'Over 1,200 verified dining reviews' },
    { value: '100% Local', label: 'Sustainable Sourcing', detail: 'Partnered with 14 family farms' },
  ],

  hero: {
    eyebrow: 'Artisanal Dining & Cocktails',
    headline: 'Good Food. Great Moments.',
    description:
      'Immerse yourself in elevated seasonal cuisine, bespoke craft cocktails, and an intimate dining room crafted for unforgettable evenings.',
    image: heroImage,
  },

  menuCategories: [
    { id: 'All', label: 'All Dishes', description: 'Explore our complete seasonal dining selection' },
    { id: 'Starters', label: 'Starters', description: 'Light, vibrant plates to awaken the palate' },
    { id: 'Main Course', label: 'Main Course', description: 'Centerpiece creations celebrating land and sea' },
    { id: 'Burgers', label: 'Burgers', description: 'Artisanal dry-aged brioche burgers and hand-cut fries' },
    { id: 'Desserts', label: 'Desserts', description: 'Decadent, house-made confections to finish gracefully' },
    { id: 'Drinks', label: 'Drinks', description: 'Signature apothecary cocktails, rare wines & botanicals' },
  ],

  menuItems: [
    // Featured / Starters
    {
      id: 'burrata-heirloom-fig',
      name: 'Pugliese Burrata & Charred Fig',
      description: 'Creamy artisanal burrata, caramelized Mission figs, aged Modena saba, toasted pine nuts, grilled levain sourdough.',
      price: 22,
      category: 'Starters',
      dietary: ['Vegetarian', "Chef's Selection"],
      featured: true,
      pairing: 'Pair with Sancerre Sauvignon Blanc',
      image: truffleDishImage,
    },
    {
      id: 'hamachi-crudo',
      name: 'Wild Hamachi Yellowtail Crudo',
      description: 'Thinly sliced Pacific yellowtail, white ponzu, pickled serrano pepper, avocado mousse, smoked sea salt crystals.',
      price: 24,
      category: 'Starters',
      dietary: ['Gluten-Free', 'Signature'],
      featured: false,
      pairing: 'Pair with Brut Nature Champagne',
    },
    {
      id: 'spanish-octopus',
      name: 'Charred Mediterranean Octopus',
      description: 'Tender wood-fired octopus, charred Catalan romesco sauce, crispy fingerlings, smoked pimentón oil, pickled shallot.',
      price: 26,
      category: 'Starters',
      dietary: ['Gluten-Free'],
      featured: false,
    },
    {
      id: 'wild-mushroom-tart',
      name: 'Foraged Forest Mushroom Tart',
      description: 'Flaky herb pastry crust, whipped goat curd, roasted chanterelles and morels, fresh thyme, black garlic gastrique.',
      price: 20,
      category: 'Starters',
      dietary: ['Vegetarian'],
      featured: false,
    },

    // Main Courses
    {
      id: 'truffle-tagliatelle',
      name: 'Handcrafted Truffle Tagliatelle',
      description: 'Fresh artisanal egg ribbon pasta, Périgord black truffle emulsion, 36-month aged Parmigiano-Reggiano, sweet butter, chives.',
      price: 34,
      category: 'Main Course',
      dietary: ['Vegetarian', "Chef's Selection", 'Signature'],
      featured: true,
      pairing: 'Pair with Barolo Nebbiolo',
      image: truffleDishImage,
    },
    {
      id: 'pan-seared-salmon',
      name: 'Pan-Seared Pacific King Salmon',
      description: 'Crispy skin wild salmon, melted baby leeks, saffron fumet reduction, roasted marble potatoes, garden micro-sorrel.',
      price: 38,
      category: 'Main Course',
      dietary: ['Gluten-Free', 'Signature'],
      featured: true,
      pairing: 'Pair with Willamette Valley Pinot Noir',
      image: salmonDishImage,
    },
    {
      id: 'wood-fired-ribeye',
      name: '45-Day Dry Aged Prime Ribeye',
      description: '14oz bone-in USDA Prime ribeye, charred shallot bordelaise, marrow butter melt, grilled king oyster mushrooms.',
      price: 52,
      category: 'Main Course',
      dietary: ['Gluten-Free', "Chef's Selection"],
      featured: true,
      pairing: 'Pair with Napa Valley Cabernet Sauvignon',
      image: heroImage,
    },
    {
      id: 'rack-of-lamb',
      name: 'Provencal Herb-Crusted Colorado Lamb',
      description: 'Roasted lamb loin chops, silk potato purée, charred Romanesco, roasted garlic cloves, rosemary demi-glace.',
      price: 46,
      category: 'Main Course',
      dietary: ['Gluten-Free'],
      featured: false,
      pairing: 'Pair with Côtes du Rhône',
    },
    {
      id: 'chilean-sea-bass',
      name: 'Miso-Glazed Chilean Sea Bass',
      description: 'Caramelized white miso glaze, braised baby bok choy, ginger-lemongrass dashi broth, lotus root crisp.',
      price: 48,
      category: 'Main Course',
      dietary: ['Gluten-Free', 'Signature'],
      featured: false,
    },
    {
      id: 'kabocha-risotto',
      name: 'Roasted Kabocha Squash Risotto',
      description: 'Aged Acquerello carnaroli rice, roasted winter pumpkin, browned butter sage, toasted pumpkin seeds, shaved pecorino.',
      price: 30,
      category: 'Main Course',
      dietary: ['Vegetarian', 'Gluten-Free'],
      featured: false,
    },

    // Burgers
    {
      id: 'dry-aged-wagyu-burger',
      name: 'Prime Dry-Aged Wagyu Burger',
      description: 'Custom blend dry-aged chuck & brisket, roasted bone marrow butter, caramelized onion jam, aged Gruyère, brioche bun, triple-cooked fries.',
      price: 28,
      category: 'Burgers',
      dietary: ["Chef's Selection", 'Signature'],
      featured: true,
      pairing: 'Pair with Smoked Rosemary Old Fashioned',
      image: salmonDishImage,
    },
    {
      id: 'the-forager-burger',
      name: 'The Forager Truffle Mushroom Burger',
      description: 'Black Angus patty, wild forest mushroom duxelles, melted fontina cheese, black truffle garlic aioli, toasted potato bun.',
      price: 26,
      category: 'Burgers',
      dietary: ['Signature'],
      featured: false,
    },
    {
      id: 'buttermilk-chicken-burger',
      name: 'Crispy Free-Range Chicken Sandwich',
      description: '24-hour buttermilk soaked chicken breast, fermented hot honey drizzle, crunchy green cabbage slaw, dill pickles, brioche.',
      price: 24,
      category: 'Burgers',
      dietary: [],
      featured: false,
    },
    {
      id: 'portobello-stack-burger',
      name: 'Charred Portobello & Whipped Feta Stack',
      description: 'Balsamic grilled giant portobello cap, whipped roasted garlic feta, piquillo peppers, wild baby arugula, rosemary focaccia.',
      price: 22,
      category: 'Burgers',
      dietary: ['Vegetarian'],
      featured: false,
    },

    // Desserts
    {
      id: 'dark-chocolate-hazelnut-torte',
      name: 'Valrhona Dark Chocolate Hazelnut Torte',
      description: '72% dark chocolate ganache, roasted Piedmont hazelnut praline crunch, Maldon smoked sea salt, freshly churned espresso gelato.',
      price: 16,
      category: 'Desserts',
      dietary: ['Vegetarian', 'Signature', "Chef's Selection"],
      featured: true,
      pairing: 'Pair with 20-Year Tawny Port',
      image: truffleDishImage,
    },
    {
      id: 'tahitian-vanilla-mille-feuille',
      name: 'Tahitian Vanilla Bean Mille-Feuille',
      description: 'Caramelized delicate puff pastry crisps, rich Bourbon vanilla bean diplomat cream, passion fruit reduction drizzle.',
      price: 15,
      category: 'Desserts',
      dietary: ['Vegetarian'],
      featured: false,
    },
    {
      id: 'warm-spiced-pear-tart',
      name: 'Warm Spiced Autumn Pear Tart',
      description: 'Poached Bosc pear, almond frangipane, flaky butter crust, salted honey caramel, rosemary infused sweet cream.',
      price: 14,
      category: 'Desserts',
      dietary: ['Vegetarian'],
      featured: false,
    },
    {
      id: 'artisan-cheese-board',
      name: 'Reserve Farmhouse Cheese Board',
      description: 'Three rotating artisan raw-milk cheeses, local honeycomb, toasted Marcona almonds, house seeded crackers, seasonal preserves.',
      price: 22,
      category: 'Desserts',
      dietary: ['Vegetarian'],
      featured: false,
    },

    // Drinks
    {
      id: 'smoked-old-fashioned',
      name: 'The Smoked Rosemary Old Fashioned',
      description: 'Small-batch Kentucky bourbon, rich demerara syrup, Angostura & orange bitters, expressed orange peel, charred rosemary smoke.',
      price: 18,
      category: 'Drinks',
      dietary: ['Signature'],
      featured: false,
    },
    {
      id: 'empress-botanical-75',
      name: 'Indigo Empress Botanical 75',
      description: 'Empress 1908 botanical gin, French elderflower liqueur, fresh Meyer lemon juice, topped with organic vintage Champagne.',
      price: 17,
      category: 'Drinks',
      dietary: ['Signature'],
      featured: false,
    },
    {
      id: 'blood-orange-paloma',
      name: 'Charred Citrus Blood Orange Paloma',
      description: 'Ocho Reposado tequila, house-pressed blood orange cordial, fresh lime, ruby red grapefruit soda, volcanic black salt rim.',
      price: 16,
      category: 'Drinks',
      dietary: [],
      featured: false,
    },
    {
      id: 'hibiscus-ginger-spritz',
      name: 'Zero-Proof Wild Hibiscus Spritz',
      description: 'Slow-steeped Mexican wild hibiscus, spicy ginger root shrub, key lime, sparkling mountain water, fresh mint bouquet.',
      price: 12,
      category: 'Drinks',
      dietary: ['Vegan', 'Gluten-Free'],
      featured: false,
    },
    {
      id: 'curated-cellar-wines',
      name: 'Sommelier Curated Cellar Selections',
      description: 'A handpicked rotating list of biodynamic European imports, natural orange wines, and aged domestic vintages by the glass.',
      price: 18,
      category: 'Drinks',
      dietary: [],
      featured: false,
    },
  ],

  reviews: [
    {
      id: 'review-1',
      author: 'Elena Rostova',
      occasion: 'Anniversary Dinner',
      rating: 5,
      date: 'October 2026',
      comment:
        'The atmosphere is magnetic and warm from the second you step through the entrance. The handmade truffle tagliatelle and pan-seared salmon were sheer culinary perfection. Service was effortless, attentive, and never rushed.',
      source: 'Verified OpenTable Diner',
    },
    {
      id: 'review-2',
      author: 'David K. Sterling',
      occasion: 'Executive Business Tasting',
      rating: 5,
      date: 'September 2026',
      comment:
        'Easily one of the most cohesive dining experiences this year. From the smoked rosemary cocktail to the dry-aged ribeye, every single plate showcased remarkable restraint and technical mastery. Our clients were thoroughly impressed.',
      source: 'Michelin Guide Community',
    },
    {
      id: 'review-3',
      author: 'Marcus & Claire Chen',
      occasion: 'Weekend Celebration',
      rating: 5,
      date: 'August 2026',
      comment:
        'The Table strikes that rare, coveted balance between relaxed comfort and world-class culinary finesse. The staff remembered our anniversary note, welcomed us warmly, and recommended spot-on wine pairings.',
      source: 'Google Reviews (5.0 Stars)',
    },
    {
      id: 'review-4',
      author: 'Dr. Sofia Alvarez',
      occasion: 'Gastronomy Enthusiast',
      rating: 5,
      date: 'July 2026',
      comment:
        'An unpretentious triumph of seasonal cooking. You can taste the freshness of the local produce in every course. Do not leave without ordering the dark chocolate hazelnut torte — genuinely unforgettable.',
      source: 'Epicurean Table Critic',
    },
  ],

  gallery: [
    {
      id: 'gallery-1',
      title: 'Intimate Dining Ambiance',
      category: 'Interior',
      image: interiorImage,
      caption: 'Warm ambient lighting, rustic timber tables, and cozy booths designed for conversation.',
    },
    {
      id: 'gallery-2',
      title: 'Handcrafted Truffle Tagliatelle',
      category: 'Dishes',
      image: truffleDishImage,
      caption: 'Fresh pasta rolled daily by hand and finished with freshly shaved black Périgord truffles.',
    },
    {
      id: 'gallery-3',
      title: 'Executive Chef at the Pass',
      category: 'Atmosphere',
      image: aboutChefImage,
      caption: 'Chef Julian Vance finishing evening dinner service in our open concept kitchen.',
    },
    {
      id: 'gallery-4',
      title: 'Crispy Skin King Salmon',
      category: 'Dishes',
      image: salmonDishImage,
      caption: 'Wild sustainable King Salmon served with saffron emulsion and farm tender leeks.',
    },
    {
      id: 'gallery-5',
      title: 'Twilight Table Setting',
      category: 'Atmosphere',
      image: heroImage,
      caption: 'Evening dining by candle flame with curated artisanal glassware and vintage cutlery.',
    },
    {
      id: 'gallery-6',
      title: 'Private Wine Cellar & Banquettes',
      category: 'Interior',
      image: interiorImage,
      caption: 'Over 300 temperature-controlled vintage bottles curated by our sommelier team.',
    },
  ],

  socialLinks: [
    { platform: 'Instagram', url: 'https://instagram.com' },
    { platform: 'Facebook', url: 'https://facebook.com' },
    { platform: 'TripAdvisor', url: 'https://tripadvisor.com' },
    { platform: 'OpenTable', url: 'https://opentable.com' },
  ],

  reservationSettings: {
    availableTimeSlots: [
      '5:00 PM',
      '5:30 PM',
      '6:00 PM',
      '6:30 PM',
      '7:00 PM',
      '7:30 PM',
      '8:00 PM',
      '8:30 PM',
      '9:00 PM',
      '9:30 PM',
    ],
    guestRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    notice:
      'We hold reserved tables for 15 minutes past scheduled arrival. For parties larger than 8 guests, please reach out via phone or email directly.',
    cancellationPolicy:
      'Cancellations are complimentary up to 6 hours prior to your reservation time.',
  },
};
