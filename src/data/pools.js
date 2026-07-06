// Mock pool data for Pool Finder App
// 12 pools in the Atlanta, GA area

export const POOL_TYPES = [
  'Public',
  'Private Rental',
  'Hotel',
  'Community',
  'Athletic Club',
];
export const FEATURES = [
  'Indoor',
  'Outdoor',
  'Heated',
  'Saltwater',
  'Lap Lanes',
  'Diving Board',
  'Kiddie Pool',
  'Accessibility',
];
export const ACTIVITIES = [
  'Swim Lessons',
  'Lifeguards',
  'Water Aerobics',
  'Competitive Swimming',
];
export const AMENITIES_LIST = [
  'Showers',
  'Lockers',
  'Parking',
  'Wi-Fi',
  'Lifeguards',
  'Wheelchair Access',
  'Snack Bar',
  'Pro Shop',
];
export const PRICING_TYPES = [
  'Free',
  'Daily Pass',
  'Membership',
  'Hourly Rental',
];

export const pools = [
  {
    id: 1,
    name: 'Piedmont Park Aquatic Center',
    type: 'Public',
    description:
      "Atlanta's premier public aquatic facility nestled in the heart of Piedmont Park. Olympic-size lap pool with stunning skyline views, dedicated family swim areas, and top-notch instructional programs for all ages.",
    address: '400 Park Dr NE, Atlanta, GA 30306',
    phone: '(404) 875-7275',
    website: 'www.piedmontpark.org',
    lat: 33.7888,
    lng: -84.3733,
    rating: 4.7,
    reviewCount: 312,
    price: 6,
    priceType: 'Daily Pass',
    priceDisplay: '$6/visit',
    distance: 0.8,
    features: ['Outdoor', 'Lap Lanes', 'Kiddie Pool', 'Accessibility'],
    activities: [
      'Swim Lessons',
      'Lifeguards',
      'Water Aerobics',
      'Competitive Swimming',
    ],
    amenities: [
      'Showers',
      'Lockers',
      'Parking',
      'Lifeguards',
      'Wheelchair Access',
    ],
    isOpenNow: true,
    hours: {
      Monday: '6:00 AM – 9:00 PM',
      Tuesday: '6:00 AM – 9:00 PM',
      Wednesday: '6:00 AM – 9:00 PM',
      Thursday: '6:00 AM – 9:00 PM',
      Friday: '6:00 AM – 8:00 PM',
      Saturday: '8:00 AM – 7:00 PM',
      Sunday: '10:00 AM – 6:00 PM',
    },
    pricing: [
      { type: 'Daily Pass – Adult', price: '$6' },
      { type: 'Daily Pass – Child (under 12)', price: '$3' },
      { type: 'Monthly Membership', price: '$45' },
      { type: 'Annual Membership', price: '$420' },
    ],
    reviews: [
      {
        author: 'Jamie T.',
        rating: 5,
        date: 'June 2026',
        text: 'Best public pool in Atlanta by far. The lap lanes are always clean and the staff is super helpful.',
      },
      {
        author: 'Maria R.',
        rating: 4,
        date: 'May 2026',
        text: 'Great facility. Can get crowded on weekends but the kiddie area is fantastic for little ones.',
      },
      {
        author: 'Derek L.',
        rating: 5,
        date: 'April 2026',
        text: 'Love the water aerobics classes — amazing instructor energy!',
      },
    ],
    gradient: 'linear-gradient(135deg, #0f4c81 0%, #1a7a8a 100%)',
    color: '#1a7a8a',
  },
  {
    id: 2,
    name: 'The Starfish Club',
    type: 'Athletic Club',
    description:
      'An exclusive athletic club with a heated indoor Olympic-length pool, personal coaching, and year-round competitive swim team. Full spa and fitness amenities complement the aquatic experience.',
    address: '2180 Peachtree Rd NW, Atlanta, GA 30309',
    phone: '(404) 351-7910',
    website: 'www.starfishclub.com',
    lat: 33.8008,
    lng: -84.3918,
    rating: 4.9,
    reviewCount: 187,
    price: 25,
    priceType: 'Daily Pass',
    priceDisplay: '$25/day',
    distance: 2.1,
    features: ['Indoor', 'Heated', 'Lap Lanes', 'Accessibility'],
    activities: ['Swim Lessons', 'Lifeguards', 'Competitive Swimming'],
    amenities: [
      'Showers',
      'Lockers',
      'Parking',
      'Wi-Fi',
      'Lifeguards',
      'Wheelchair Access',
      'Pro Shop',
    ],
    isOpenNow: true,
    hours: {
      Monday: '5:30 AM – 10:00 PM',
      Tuesday: '5:30 AM – 10:00 PM',
      Wednesday: '5:30 AM – 10:00 PM',
      Thursday: '5:30 AM – 10:00 PM',
      Friday: '5:30 AM – 9:00 PM',
      Saturday: '7:00 AM – 8:00 PM',
      Sunday: '8:00 AM – 7:00 PM',
    },
    pricing: [
      { type: 'Day Pass', price: '$25' },
      { type: 'Monthly Membership', price: '$120' },
      { type: 'Annual Membership', price: '$1,200' },
      { type: 'Family Plan (annual)', price: '$1,800' },
    ],
    reviews: [
      {
        author: 'Sarah K.',
        rating: 5,
        date: 'June 2026',
        text: 'World-class facility. The pool is always at the perfect temperature and never overcrowded.',
      },
      {
        author: 'Tom W.',
        rating: 5,
        date: 'May 2026',
        text: 'My kids have been in the swim team for 2 years. Fantastic coaches and atmosphere.',
      },
      {
        author: 'Priya M.',
        rating: 4,
        date: 'May 2026',
        text: 'Expensive but worth every penny. Pristine facility.',
      },
    ],
    gradient: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    color: '#283593',
  },
  {
    id: 3,
    name: 'Marriott Marquis Pool Deck',
    type: 'Hotel',
    description:
      'A rooftop oasis in the heart of downtown Atlanta. This stunning heated pool offers panoramic city views, cabana rentals, and full bar service. Reservations required for non-guests.',
    address: '265 Peachtree Center Ave NE, Atlanta, GA 30303',
    phone: '(404) 521-0000',
    website: 'www.marriott.com/atlanta',
    lat: 33.7605,
    lng: -84.3879,
    rating: 4.6,
    reviewCount: 429,
    price: 35,
    priceType: 'Daily Pass',
    priceDisplay: '$35/day',
    distance: 3.2,
    features: ['Outdoor', 'Heated', 'Accessibility'],
    activities: ['Lifeguards'],
    amenities: [
      'Showers',
      'Lockers',
      'Parking',
      'Wi-Fi',
      'Lifeguards',
      'Wheelchair Access',
      'Snack Bar',
    ],
    isOpenNow: true,
    hours: {
      Monday: '7:00 AM – 10:00 PM',
      Tuesday: '7:00 AM – 10:00 PM',
      Wednesday: '7:00 AM – 10:00 PM',
      Thursday: '7:00 AM – 10:00 PM',
      Friday: '7:00 AM – 11:00 PM',
      Saturday: '7:00 AM – 11:00 PM',
      Sunday: '7:00 AM – 9:00 PM',
    },
    pricing: [
      { type: 'Day Pass (non-guest)', price: '$35' },
      { type: 'Cabana Rental (half day)', price: '$75' },
      { type: 'Cabana Rental (full day)', price: '$130' },
    ],
    reviews: [
      {
        author: 'Alex B.',
        rating: 5,
        date: 'June 2026',
        text: 'The city views from this pool are incredible. Perfect for a relaxing afternoon.',
      },
      {
        author: 'Lisa H.',
        rating: 4,
        date: 'June 2026',
        text: 'Great vibe and drinks by the pool. Can be pricey but the experience is worth it.',
      },
    ],
    gradient: 'linear-gradient(135deg, #4a1942 0%, #6a1e5a 100%)',
    color: '#6a1e5a',
  },
  {
    id: 4,
    name: 'Chastain Park Pool',
    type: 'Public',
    description:
      'A beloved community pool in the Chastain Park neighborhood. Outdoor pool surrounded by beautiful green space, with an excellent swim lesson program for children and competitive lap swimming for adults.',
    address: '235 W Wieuca Rd NW, Atlanta, GA 30342',
    phone: '(404) 255-0863',
    website: 'www.chastainpool.com',
    lat: 33.8645,
    lng: -84.3833,
    rating: 4.4,
    reviewCount: 218,
    price: 5,
    priceType: 'Daily Pass',
    priceDisplay: '$5/visit',
    distance: 5.4,
    features: ['Outdoor', 'Lap Lanes', 'Diving Board', 'Kiddie Pool'],
    activities: ['Swim Lessons', 'Lifeguards', 'Competitive Swimming'],
    amenities: ['Showers', 'Lockers', 'Parking', 'Lifeguards', 'Snack Bar'],
    isOpenNow: false,
    hours: {
      Monday: 'Closed',
      Tuesday: '10:00 AM – 7:00 PM',
      Wednesday: '10:00 AM – 7:00 PM',
      Thursday: '10:00 AM – 7:00 PM',
      Friday: '10:00 AM – 8:00 PM',
      Saturday: '9:00 AM – 8:00 PM',
      Sunday: '11:00 AM – 6:00 PM',
    },
    pricing: [
      { type: 'Daily Admission – Adult', price: '$5' },
      { type: 'Daily Admission – Child', price: '$3' },
      { type: 'Season Pass – Individual', price: '$80' },
      { type: 'Season Pass – Family', price: '$200' },
    ],
    reviews: [
      {
        author: 'Kevin J.',
        rating: 4,
        date: 'May 2026',
        text: 'Classic community pool experience. Kids love the diving board!',
      },
      {
        author: 'Amanda S.',
        rating: 5,
        date: 'May 2026',
        text: 'So glad this pool exists. Affordable, clean, and great staff.',
      },
    ],
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
    color: '#2e7d32',
  },
  {
    id: 5,
    name: 'AquaVibe Private Pool',
    type: 'Private Rental',
    description:
      'A stunning private saltwater pool available for hourly rental. Perfect for birthday parties, corporate events, or intimate family gatherings. Fully automated, zero-chemical saltwater system.',
    address: '1421 Virginia Ave NE, Atlanta, GA 30306',
    phone: '(678) 901-2345',
    website: 'www.aquavibeatl.com',
    lat: 33.7752,
    lng: -84.3492,
    rating: 4.8,
    reviewCount: 94,
    price: 75,
    priceType: 'Hourly Rental',
    priceDisplay: '$75/hr',
    distance: 1.3,
    features: [
      'Outdoor',
      'Heated',
      'Saltwater',
      'Kiddie Pool',
      'Accessibility',
    ],
    activities: ['Swim Lessons'],
    amenities: ['Showers', 'Parking', 'Wi-Fi', 'Snack Bar'],
    isOpenNow: true,
    hours: {
      Monday: '8:00 AM – 9:00 PM',
      Tuesday: '8:00 AM – 9:00 PM',
      Wednesday: '8:00 AM – 9:00 PM',
      Thursday: '8:00 AM – 9:00 PM',
      Friday: '8:00 AM – 10:00 PM',
      Saturday: '8:00 AM – 10:00 PM',
      Sunday: '9:00 AM – 8:00 PM',
    },
    pricing: [
      { type: 'Hourly Rental (up to 8 guests)', price: '$75/hr' },
      { type: 'Half-Day Rental (4 hrs)', price: '$250' },
      { type: 'Full-Day Rental (8 hrs)', price: '$450' },
      { type: 'Weekend Package', price: '$700' },
    ],
    reviews: [
      {
        author: 'Brittany C.',
        rating: 5,
        date: 'June 2026',
        text: "Rented for my daughter's birthday. Absolutely perfect. Easy booking, pristine pool!",
      },
      {
        author: 'Marcus D.',
        rating: 5,
        date: 'April 2026',
        text: "The saltwater pool is so gentle on the eyes. We've rented 3 times already.",
      },
    ],
    gradient: 'linear-gradient(135deg, #006064 0%, #00838f 100%)',
    color: '#00838f',
  },
  {
    id: 6,
    name: 'Buckhead YMCA Aquatics',
    type: 'Community',
    description:
      'The Buckhead Family YMCA offers comprehensive aquatic programs for all ages in a welcoming community setting. Features both an indoor heated pool and an outdoor seasonal pool.',
    address: '3692 Ashford Dunwoody Rd NE, Atlanta, GA 30319',
    phone: '(404) 237-1308',
    website: 'www.ymcaatlanta.org/buckhead',
    lat: 33.8821,
    lng: -84.3248,
    rating: 4.3,
    reviewCount: 156,
    price: 15,
    priceType: 'Daily Pass',
    priceDisplay: '$15/day',
    distance: 7.1,
    features: [
      'Indoor',
      'Outdoor',
      'Heated',
      'Lap Lanes',
      'Kiddie Pool',
      'Accessibility',
    ],
    activities: [
      'Swim Lessons',
      'Lifeguards',
      'Water Aerobics',
      'Competitive Swimming',
    ],
    amenities: [
      'Showers',
      'Lockers',
      'Parking',
      'Wi-Fi',
      'Lifeguards',
      'Wheelchair Access',
    ],
    isOpenNow: true,
    hours: {
      Monday: '5:30 AM – 9:30 PM',
      Tuesday: '5:30 AM – 9:30 PM',
      Wednesday: '5:30 AM – 9:30 PM',
      Thursday: '5:30 AM – 9:30 PM',
      Friday: '5:30 AM – 8:00 PM',
      Saturday: '7:00 AM – 7:00 PM',
      Sunday: '9:00 AM – 6:00 PM',
    },
    pricing: [
      { type: 'Day Pass (member)', price: 'Free' },
      { type: 'Day Pass (non-member)', price: '$15' },
      { type: 'Monthly Membership', price: '$58' },
      { type: 'Annual Membership', price: '$580' },
    ],
    reviews: [
      {
        author: 'Rachel F.',
        rating: 4,
        date: 'June 2026',
        text: 'Great value for the price. The indoor pool is always warm and the classes are excellent.',
      },
      {
        author: 'James P.',
        rating: 4,
        date: 'May 2026',
        text: 'YMCA does it right. Always clean, staff is friendly.',
      },
    ],
    gradient: 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)',
    color: '#f57c00',
  },
  {
    id: 7,
    name: 'SplashZone Aquatics Complex',
    type: 'Public',
    description:
      'A massive outdoor water complex featuring a competition pool, lazy river, water slides, and spray pad. Perfect for families looking for a full day of fun in the sun.',
    address: '4800 Old National Hwy, Atlanta, GA 30349',
    phone: '(404) 763-3200',
    website: 'www.splashzoneatl.com',
    lat: 33.6518,
    lng: -84.4756,
    rating: 4.2,
    reviewCount: 533,
    price: 18,
    priceType: 'Daily Pass',
    priceDisplay: '$18/person',
    distance: 11.3,
    features: ['Outdoor', 'Lap Lanes', 'Diving Board', 'Kiddie Pool'],
    activities: ['Swim Lessons', 'Lifeguards'],
    amenities: ['Showers', 'Lockers', 'Parking', 'Lifeguards', 'Snack Bar'],
    isOpenNow: false,
    hours: {
      Monday: 'Closed',
      Tuesday: 'Closed',
      Wednesday: '10:00 AM – 7:00 PM',
      Thursday: '10:00 AM – 7:00 PM',
      Friday: '10:00 AM – 8:00 PM',
      Saturday: '9:00 AM – 9:00 PM',
      Sunday: '10:00 AM – 7:00 PM',
    },
    pricing: [
      { type: 'General Admission (adult)', price: '$18' },
      { type: 'Child (under 12)', price: '$12' },
      { type: 'Senior (55+)', price: '$10' },
      { type: 'Season Pass', price: '$99' },
    ],
    reviews: [
      {
        author: 'Nina G.',
        rating: 4,
        date: 'June 2026',
        text: 'Huge complex, great for families. The slides are a blast!',
      },
      {
        author: 'Carlos M.',
        rating: 4,
        date: 'June 2026',
        text: 'Can be really crowded on weekends. Go on a weekday for the best experience.',
      },
    ],
    gradient: 'linear-gradient(135deg, #01579b 0%, #0288d1 100%)',
    color: '#0288d1',
  },
  {
    id: 8,
    name: 'The Grand Hyatt Pool',
    type: 'Hotel',
    description:
      'Luxury resort-style pool at the Grand Hyatt Buckhead. Heated year-round with an adjacent hot tub, full poolside dining and cocktail service, and private cabanas for rent.',
    address: '3300 Peachtree Rd NE, Atlanta, GA 30305',
    phone: '(404) 365-8100',
    website: 'www.hyatt.com/atlanta',
    lat: 33.8391,
    lng: -84.3804,
    rating: 4.5,
    reviewCount: 267,
    price: 40,
    priceType: 'Daily Pass',
    priceDisplay: '$40/day',
    distance: 4.9,
    features: ['Outdoor', 'Heated', 'Accessibility'],
    activities: ['Lifeguards'],
    amenities: [
      'Showers',
      'Lockers',
      'Parking',
      'Wi-Fi',
      'Lifeguards',
      'Wheelchair Access',
      'Snack Bar',
    ],
    isOpenNow: true,
    hours: {
      Monday: '7:00 AM – 9:00 PM',
      Tuesday: '7:00 AM – 9:00 PM',
      Wednesday: '7:00 AM – 9:00 PM',
      Thursday: '7:00 AM – 9:00 PM',
      Friday: '7:00 AM – 10:00 PM',
      Saturday: '7:00 AM – 10:00 PM',
      Sunday: '8:00 AM – 9:00 PM',
    },
    pricing: [
      { type: 'Day Pass (non-guest)', price: '$40' },
      { type: 'Cabana (4 hrs)', price: '$100' },
      { type: 'Cabana (full day)', price: '$180' },
    ],
    reviews: [
      {
        author: 'Sophie L.',
        rating: 5,
        date: 'May 2026',
        text: 'Absolute luxury. The poolside food and drinks are amazing.',
      },
      {
        author: 'Ryan T.',
        rating: 4,
        date: 'May 2026',
        text: 'Beautiful pool. Staff is attentive and professional.',
      },
    ],
    gradient: 'linear-gradient(135deg, #880e4f 0%, #ad1457 100%)',
    color: '#ad1457',
  },
  {
    id: 9,
    name: 'Decatur Swim Center',
    type: 'Community',
    description:
      "The City of Decatur's community aquatic center offering year-round indoor swimming, a comprehensive learn-to-swim curriculum, and masters swim programs.",
    address: '231 Sycamore St, Decatur, GA 30030',
    phone: '(404) 377-0494',
    website: 'www.decaturga.com/swim',
    lat: 33.7748,
    lng: -84.2963,
    rating: 4.6,
    reviewCount: 142,
    price: 0,
    priceType: 'Free',
    priceDisplay: 'Free',
    distance: 6.2,
    features: ['Indoor', 'Heated', 'Lap Lanes', 'Accessibility'],
    activities: ['Swim Lessons', 'Lifeguards', 'Water Aerobics'],
    amenities: [
      'Showers',
      'Lockers',
      'Parking',
      'Lifeguards',
      'Wheelchair Access',
    ],
    isOpenNow: true,
    hours: {
      Monday: '6:00 AM – 8:30 PM',
      Tuesday: '6:00 AM – 8:30 PM',
      Wednesday: '6:00 AM – 8:30 PM',
      Thursday: '6:00 AM – 8:30 PM',
      Friday: '6:00 AM – 7:00 PM',
      Saturday: '8:00 AM – 5:00 PM',
      Sunday: '12:00 PM – 5:00 PM',
    },
    pricing: [
      { type: 'General Swim (resident)', price: 'Free' },
      { type: 'General Swim (non-resident)', price: '$5' },
      { type: 'Swim Lessons (per session)', price: '$45' },
    ],
    reviews: [
      {
        author: 'Olivia N.',
        rating: 5,
        date: 'June 2026',
        text: 'Amazing that a facility this good is free for residents. So well maintained!',
      },
      {
        author: 'Dan H.',
        rating: 4,
        date: 'May 2026',
        text: 'Great swim programs. My son has learned so much here.',
      },
    ],
    gradient: 'linear-gradient(135deg, #33691e 0%, #558b2f 100%)',
    color: '#558b2f',
  },
  {
    id: 10,
    name: 'LifeTime Fitness Aquatics',
    type: 'Athletic Club',
    description:
      'Premium athletic club featuring an Olympic-size lap pool, resort-style outdoor pool, and eucalyptus steam rooms. Year-round heated indoor facility with cutting-edge filtration.',
    address: '1901 Savoy Dr, Chamblee, GA 30341',
    phone: '(770) 455-4653',
    website: 'www.lifetime.life/atlanta',
    lat: 33.8892,
    lng: -84.3071,
    rating: 4.5,
    reviewCount: 389,
    price: 30,
    priceType: 'Daily Pass',
    priceDisplay: '$30/day',
    distance: 8.7,
    features: [
      'Indoor',
      'Outdoor',
      'Heated',
      'Saltwater',
      'Lap Lanes',
      'Kiddie Pool',
      'Accessibility',
    ],
    activities: [
      'Swim Lessons',
      'Lifeguards',
      'Water Aerobics',
      'Competitive Swimming',
    ],
    amenities: [
      'Showers',
      'Lockers',
      'Parking',
      'Wi-Fi',
      'Lifeguards',
      'Wheelchair Access',
      'Snack Bar',
      'Pro Shop',
    ],
    isOpenNow: true,
    hours: {
      Monday: '4:00 AM – 11:00 PM',
      Tuesday: '4:00 AM – 11:00 PM',
      Wednesday: '4:00 AM – 11:00 PM',
      Thursday: '4:00 AM – 11:00 PM',
      Friday: '4:00 AM – 10:00 PM',
      Saturday: '6:00 AM – 9:00 PM',
      Sunday: '8:00 AM – 8:00 PM',
    },
    pricing: [
      { type: 'Day Pass', price: '$30' },
      { type: 'Monthly Membership', price: '$149' },
      { type: 'Annual Membership', price: '$1,500' },
      { type: 'Family Plan (annual)', price: '$2,200' },
    ],
    reviews: [
      {
        author: 'Michelle W.',
        rating: 5,
        date: 'June 2026',
        text: 'Top tier facility. The outdoor pool with the saltwater system is incredible.',
      },
      {
        author: 'Gregory A.',
        rating: 4,
        date: 'April 2026',
        text: 'Expensive membership but the amenities justify the cost.',
      },
    ],
    gradient: 'linear-gradient(135deg, #311b92 0%, #4527a0 100%)',
    color: '#4527a0',
  },
  {
    id: 11,
    name: 'Ponce City Market Rooftop Pool',
    type: 'Private Rental',
    description:
      "An exclusive rooftop pool at Atlanta's iconic Ponce City Market. Available for private events and small group reservations. Stunning 360° views of Atlanta with a vibrant, social atmosphere.",
    address: '675 Ponce De Leon Ave NE, Atlanta, GA 30308',
    phone: '(404) 900-7900',
    website: 'www.poncecitigm.com',
    lat: 33.7716,
    lng: -84.3649,
    rating: 4.8,
    reviewCount: 76,
    price: 100,
    priceType: 'Hourly Rental',
    priceDisplay: '$100/hr',
    distance: 2.0,
    features: ['Outdoor', 'Heated', 'Saltwater'],
    activities: [],
    amenities: ['Showers', 'Parking', 'Wi-Fi', 'Snack Bar'],
    isOpenNow: true,
    hours: {
      Monday: 'By Reservation',
      Tuesday: 'By Reservation',
      Wednesday: 'By Reservation',
      Thursday: 'By Reservation',
      Friday: 'By Reservation',
      Saturday: '10:00 AM – 10:00 PM',
      Sunday: '10:00 AM – 8:00 PM',
    },
    pricing: [
      { type: 'Hourly Rental (min. 2 hrs)', price: '$100/hr' },
      { type: 'Private Event (4 hrs)', price: '$350' },
      { type: 'Full Day Exclusive', price: '$600' },
    ],
    reviews: [
      {
        author: 'Tanya B.',
        rating: 5,
        date: 'June 2026',
        text: 'Used for a corporate event. The team loved it! Views are absolutely stunning.',
      },
      {
        author: 'Chris M.',
        rating: 5,
        date: 'May 2026',
        text: 'Most Instagram-worthy pool in Atlanta. Period.',
      },
    ],
    gradient: 'linear-gradient(135deg, #bf360c 0%, #e64a19 100%)',
    color: '#e64a19',
  },
  {
    id: 12,
    name: 'Grant Park Pool',
    type: 'Public',
    description:
      'A historic neighborhood pool in the heart of Grant Park, recently renovated with modern filtration systems and a new splash pad for young children. Free during open swim hours for city residents.',
    address: '625 Park Ave SW, Atlanta, GA 30315',
    phone: '(404) 624-0789',
    website: 'www.atlantaparks.org/grantpark',
    lat: 33.7371,
    lng: -84.3716,
    rating: 4.1,
    reviewCount: 198,
    price: 4,
    priceType: 'Daily Pass',
    priceDisplay: '$4/visit',
    distance: 3.5,
    features: ['Outdoor', 'Kiddie Pool', 'Accessibility'],
    activities: ['Swim Lessons', 'Lifeguards'],
    amenities: ['Showers', 'Parking', 'Lifeguards', 'Wheelchair Access'],
    isOpenNow: false,
    hours: {
      Monday: 'Closed',
      Tuesday: '11:00 AM – 6:00 PM',
      Wednesday: '11:00 AM – 6:00 PM',
      Thursday: '11:00 AM – 6:00 PM',
      Friday: '11:00 AM – 7:00 PM',
      Saturday: '10:00 AM – 7:00 PM',
      Sunday: '12:00 PM – 5:00 PM',
    },
    pricing: [
      { type: 'Admission (adult)', price: '$4' },
      { type: 'Admission (child)', price: '$2' },
      { type: 'Season Pass', price: '$60' },
    ],
    reviews: [
      {
        author: 'Hannah K.',
        rating: 4,
        date: 'June 2026',
        text: 'Love the renovations! The splash pad is a huge hit with the little ones.',
      },
      {
        author: 'Jamal S.',
        rating: 4,
        date: 'May 2026',
        text: 'Great neighborhood pool. Very affordable.',
      },
    ],
    gradient: 'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
    color: '#00897b',
  },
];

export const getFeaturedPools = () => pools.slice(0, 6);

export const getPoolById = (id) => pools.find((p) => p.id === Number(id));

export const filterPools = ({
  query = '',
  types = [],
  features = [],
  activities = [],
  amenities = [],
  pricingTypes = [],
  openNow = false,
  sortBy = 'distance',
}) => {
  let results = [...pools];

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  if (types.length > 0) {
    results = results.filter((p) => types.includes(p.type));
  }

  if (features.length > 0) {
    results = results.filter((p) =>
      features.every((f) => p.features.includes(f)),
    );
  }

  if (activities.length > 0) {
    results = results.filter((p) =>
      activities.every((a) => p.activities.includes(a)),
    );
  }

  if (amenities.length > 0) {
    results = results.filter((p) =>
      amenities.every((a) => p.amenities.includes(a)),
    );
  }

  if (pricingTypes.length > 0) {
    results = results.filter((p) => pricingTypes.includes(p.priceType));
  }

  if (openNow) {
    results = results.filter((p) => p.isOpenNow);
  }

  switch (sortBy) {
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'price_asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'distance':
    default:
      results.sort((a, b) => a.distance - b.distance);
      break;
  }

  return results;
};
