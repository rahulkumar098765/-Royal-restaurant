import { FacilityItem, GalleryItem, ReviewItem, ServiceItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'Royal Spice Restaurant',
  tagline: 'Where Every Bite Becomes a Memory.',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  whatsappDirectUrl: 'https://wa.me/919876543210?text=Hello%20Royal%20Spice%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation%20/%20order.',
  phoneCallUrl: 'tel:+919876543210',
  email: 'contact@royalspicerestaurant.com',
  website: 'www.royalspicerestaurant.com',
  address: 'MG Road, Patna, Bihar 800001, India',
  openingHours: 'Monday – Sunday: 11:00 AM – 11:30 PM (Kitchen closes 11:00 PM)',
  parking: 'Complimentary Valet Parking & 120-car secure basement space',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8974519965315!2d85.13756457593256!3d25.608304914937748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed585d8f6d2b51%3A0x2a9b3d09a25b1622!2sMG%20Rd%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  hours: [
    { days: 'Monday – Thursday', time: '11:00 AM – 11:30 PM' },
    { days: 'Friday – Saturday', time: '11:00 AM – 12:30 AM (Midnight)' },
    { days: 'Sunday Buffet & Dining', time: '10:30 AM – 12:00 AM' }
  ],
  cuisines: [
    'North Indian',
    'South Indian',
    'Chinese',
    'Tandoori',
    'Mughlai',
    'Fast Food',
    'Continental',
    'Italian',
    'Street Food',
    'Beverages',
    'Desserts'
  ],
  stats: [
    { label: 'Culinary Masterpieces', value: '150+' },
    { label: 'Happy Royal Guests', value: '45,000+' },
    { label: 'Five Star Reviews', value: '4.9 ★' },
    { label: 'Years of Royal Heritage', value: '18+' }
  ]
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Dine-In Luxury',
    description: 'Immerse in warm, regal hospitality with attentive butler service and hand-crafted tableware.',
    iconName: 'Utensils',
    actionLabel: 'Reserve Table'
  },
  {
    id: 'srv-2',
    name: 'Online Food Ordering',
    description: 'Order your favorite delicacies seamlessly through our interactive digital cart with live tracking.',
    iconName: 'Smartphone',
    actionLabel: 'Order Now'
  },
  {
    id: 'srv-3',
    name: 'Home Delivery',
    description: 'Piping hot, insulated eco-friendly packaging delivered directly to your doorstep in 35-45 minutes.',
    iconName: 'Truck',
    actionLabel: 'Check Pincode'
  },
  {
    id: 'srv-4',
    name: 'Express Takeaway',
    description: 'Order ahead online and collect your fresh, ready-to-enjoy gourmet feast without waiting.',
    iconName: 'ShoppingBag',
    actionLabel: 'Self Pickup'
  },
  {
    id: 'srv-5',
    name: 'VIP Table Reservation',
    description: 'Guaranteed premium seating with dedicated sommelier recommendations and personalized service.',
    iconName: 'CalendarCheck',
    actionLabel: 'Book VIP Table'
  },
  {
    id: 'srv-6',
    name: 'Birthday Celebrations',
    description: 'Custom theme decorations, complimentary celebratory cake, photographer, and bespoke banquet menus.',
    iconName: 'Gift',
    actionLabel: 'Plan Party'
  },
  {
    id: 'srv-7',
    name: 'Anniversary Dinners',
    description: 'Romantic candlelight ambiance, rose petal walkways, violinist on request, and private booths.',
    iconName: 'Heart',
    actionLabel: 'Romantic Setup'
  },
  {
    id: 'srv-8',
    name: 'Corporate & Executive Events',
    description: 'High-speed audio-visual presentation setup, private conference hall, and multi-course executive lunches.',
    iconName: 'Briefcase',
    actionLabel: 'Corporate Booking'
  },
  {
    id: 'srv-9',
    name: 'Bespoke Catering Service',
    description: 'Five-star culinary catering for weddings, milestone parties, and grand receptions up to 2,000 guests.',
    iconName: 'ChefHat',
    actionLabel: 'Get Quote'
  },
  {
    id: 'srv-10',
    name: 'Outdoor Live Catering',
    description: 'Live clay tandoors, flaming woks, chaat counters, and dessert live stations at your outdoor venue.',
    iconName: 'Flame',
    actionLabel: 'Live Counters'
  },
  {
    id: 'srv-11',
    name: 'Private Dining Chambers',
    description: 'Exclusive sound-isolated luxury dining suites for intimate gatherings and dignitary meetings.',
    iconName: 'Crown',
    actionLabel: 'Reserve Suite'
  },
  {
    id: 'srv-12',
    name: 'Live Music & Ghazal Nights',
    description: 'Soulful live acoustic melodies, classical sitar, and Bollywood fusion every Friday & Saturday evening.',
    iconName: 'Music',
    actionLabel: 'View Schedule'
  },
  {
    id: 'srv-13',
    name: 'Ultra High-Speed Free Wi-Fi',
    description: 'Complimentary gigabit Wi-Fi across all indoor dining spaces and VIP executive suites.',
    iconName: 'Wifi',
    actionLabel: 'Instant Access'
  },
  {
    id: 'srv-14',
    name: 'Wheelchair Accessible',
    description: 'Dedicated step-free access ramps, spacious elevators, and comfortable wide-aisle seating.',
    iconName: 'Accessibility',
    actionLabel: 'Assisted Seating'
  },
  {
    id: 'srv-15',
    name: 'Valet Parking Available',
    description: 'Secure, covered on-site valet parking with dedicated 24/7 security attendants and EV charging stations.',
    iconName: 'Car',
    actionLabel: 'Complimentary Valet'
  }
];

export const FACILITIES_LIST: FacilityItem[] = [
  {
    id: 'fac-1',
    name: 'Air Conditioned Dining Hall',
    description: 'Triple-filtered climate control with pure air circulation and ambient dimmable gold lighting.',
    iconName: 'Wind',
    badge: 'Climate Controlled'
  },
  {
    id: 'fac-2',
    name: 'Family Seating Enclaves',
    description: 'Spacious cushioned booths and round banquet tables crafted for comfortable family get-togethers.',
    iconName: 'Users',
    badge: 'Spacious'
  },
  {
    id: 'fac-3',
    name: 'VIP Dining Area',
    description: 'Private gold-accented mahogany lounges featuring dedicated butler service and customized music.',
    iconName: 'ShieldCheck',
    badge: 'Executive'
  },
  {
    id: 'fac-4',
    name: 'Royal Kids Zone',
    description: 'Supervised engaging play area with toddler games, cartoon cinema, and child-safe play cushions.',
    iconName: 'Smile',
    badge: 'Child Safe'
  },
  {
    id: 'fac-5',
    name: '100% Hygienic Open Kitchen',
    description: 'ISO-certified spotless kitchen visible through glass, adhering to stringent international sanitation.',
    iconName: 'CheckCircle2',
    badge: '5-Star Sanitation'
  },
  {
    id: 'fac-6',
    name: 'Smart Digital Menu',
    description: 'Interactive iPad menu at every table featuring high-definition food previews, allergens, and calories.',
    iconName: 'Tablet',
    badge: 'Interactive'
  },
  {
    id: 'fac-7',
    name: 'Instant QR Code Table Menu',
    description: 'Scan from your personal smartphone to browse the menu, customize spice levels, and order directly.',
    iconName: 'QrCode',
    badge: 'Contactless'
  },
  {
    id: 'fac-8',
    name: 'UPI / Card / Cash Payments',
    description: 'Full multi-mode payment support including Apple Pay, Google Pay, RuPay, Visa, Mastercard, and Cash.',
    iconName: 'CreditCard',
    badge: 'All Modes'
  },
  {
    id: 'fac-9',
    name: '24/7 CCTV Security',
    description: 'High-definition 360-degree security coverage and trained security personnel for utmost guest safety.',
    iconName: 'Eye',
    badge: 'Secure'
  }
];

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Vikramaditya Roy',
    rating: 5,
    date: '2 days ago',
    comment: 'The Butter Chicken and Dal Makhani are in a league of their own. Melt-in-your-mouth perfection! The royal black and gold ambiance makes you feel like an emperor.',
    dishRecommended: 'Butter Chicken & Dal Makhani',
    verifiedGuest: true
  },
  {
    id: 'rev-2',
    author: 'Ananya Deshmukh',
    rating: 5,
    date: '1 week ago',
    comment: 'We booked the VIP Dining Room for our 10th wedding anniversary. The customized candlelight setup, live ghazal music, and sizzling brownie made it an unforgettable night!',
    dishRecommended: 'Anniversary Dinner Package & Tandoori Fish',
    verifiedGuest: true
  },
  {
    id: 'rev-3',
    author: 'Col. Rajesh Sharma',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Exceptional hospitality. The Mutton Dum Biryani has that authentic Awadhi potli aroma you rarely find outside Lucknow. Valet parking and prompt staff were stellar.',
    dishRecommended: 'Mutton Biryani & Seekh Kebab',
    verifiedGuest: true
  },
  {
    id: 'rev-4',
    author: 'Priya & Sneha Patel',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The Cheese Burst Pizza and Chilli Paneer were absolute hits with our kids. Cleanest washrooms and great kids play zone. Royal Spice is now our weekend family spot.',
    dishRecommended: 'Cheese Burst Pizza & Chilli Paneer',
    verifiedGuest: true
  },
  {
    id: 'rev-5',
    author: 'Dr. Sameer Al-Hassan',
    rating: 5,
    date: '1 month ago',
    comment: 'Remarkable balance of flavors. The Tandoori Chicken and Malai Tikka were juicy, perfectly charred, and not oily. True fine dining standards in the heart of the city.',
    dishRecommended: 'Malai Tikka & Paneer Tikka',
    verifiedGuest: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Imperial Dining Hall',
    category: 'Ambience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Gold-lit crystal chandeliers and plush velvet seating in the grand dining hall.'
  },
  {
    id: 'gal-2',
    title: 'Signature Awadhi Dum Biryani',
    category: 'Signature Dishes',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    description: 'Slow-dum cooked long grain Basmati rice sealed in clay handi with pure saffron.'
  },
  {
    id: 'gal-3',
    title: 'Royal VIP Candlelight Suite',
    category: 'VIP Dining',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Private candlelit alcoves designed for intimate anniversaries and private family banquets.'
  },
  {
    id: 'gal-4',
    title: 'Charcoal Clay Tandoor Craft',
    category: 'Kitchen & Tandoor',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    description: 'Master chefs grilling tikkas and skewered kebabs over white-hot charcoal coals.'
  },
  {
    id: 'gal-5',
    title: 'Gourmet Sizzling Brownie & Desserts',
    category: 'Signature Dishes',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    description: 'Molten chocolate indulgence served with vanilla bean ice cream and hot fudge.'
  },
  {
    id: 'gal-6',
    title: 'Grand Birthday & Anniversary Celebrations',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'Tailored event decoration with celebratory champagne toasts and custom royal menus.'
  },
  {
    id: 'gal-7',
    title: 'Artisanal Neapolitan Pizza Oven',
    category: 'Kitchen & Tandoor',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    description: 'Wood-fired brick oven delivering blistered, airy crusts and melted mozzarella.'
  },
  {
    id: 'gal-8',
    title: 'Terrace Garden Dining at Sunset',
    category: 'Ambience',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    description: 'Open-air starlit dining with ambient acoustic music and panoramic city skyline views.'
  }
];

export const CHEF_PHILOSOPHY = {
  name: 'Executive Chef Ranveer Kapoor',
  title: 'Master of Royal Indian & Global Haute Cuisine',
  experience: '24+ Years of Culinary Excellence',
  bio: 'Trained under traditional Awadhi ustads and Michelin-star kitchens across Europe, Chef Ranveer brings a rare mastery of slow-coal dum cooking, secret heirloom spice blends, and contemporary plating aesthetics to Royal Spice Restaurant.',
  quote: '"Cooking is not merely a recipe; it is an ancestral ritual of scent, warmth, and emotion. When our guests dine with us, every bite must whisper a story of royal hospitality."',
  portrait: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
  highlights: [
    'Hand-roasted whole spices ground daily in traditional stone mortars',
    '100% farm-fresh, organic dairy and pasture-raised meats',
    'Pure A2 Desi Cow Ghee and cold-pressed mustard & olive oils',
    'Zero artificial additives, preservatives, or synthetic colorings'
  ]
};

export const RESTAURANT_FAQS = [
  {
    question: 'How do I reserve a VIP table or private dining room?',
    answer: 'You can book directly using our online reservation tool on this website, call us at +91 98765 43210, or send a quick WhatsApp message. We confirm VIP requests within minutes with an instant digital booking pass.'
  },
  {
    question: 'What are the delivery hours and delivery radii?',
    answer: 'We deliver all across the metropolitan area within a 12km radius. Our specialized thermal insulated delivery runs daily from 11:00 AM to 11:30 PM with average delivery times of 35-45 minutes.'
  },
  {
    question: 'Is parking available at the restaurant?',
    answer: 'Yes! We provide complimentary secured valet parking for all guests right at the front portico with 24/7 attendant assistance and CCTV monitoring.'
  },
  {
    question: 'Can you accommodate dietary restrictions (Pure Jain, Vegan, Gluten-Free)?',
    answer: 'Absolutely. We have a dedicated separate vegetarian kitchen section and provide Jain-friendly (no onion/garlic), Vegan, and Gluten-Free options on request. Mention your preferences when ordering or booking.'
  },
  {
    question: 'Do you offer outdoor catering for weddings and corporate banquets?',
    answer: 'Yes, Royal Spice operates a premier luxury outdoor catering division. We bring live clay tandoors, chaat stations, Italian pasta carts, and royal buffet setups to venues hosting 50 to 2,000 guests.'
  }
];
