import { haversineDistance } from './distance';

/**
 * Parses a raw OpenStreetMap element from Overpass API into a standardized Pool object.
 * Enriching missing tags with seeded mock values to ensure premium display design.
 *
 * @param {object} element Raw Overpass element
 * @param {number} centerLat Search query center latitude
 * @param {number} centerLng Search query center longitude
 * @returns {object|null} Standardized Pool object or null if invalid
 */
export const parseOSMPool = (element, centerLat, centerLng) => {
  const tags = element.tags || {};
  const lat = element.lat || (element.center && element.center.lat);
  const lng = element.lon || (element.center && element.center.lon);
  if (!lat || !lng) return null;

  const id = element.id;
  const name =
    tags.name || tags.operator || tags.official_name || 'Public Swimming Pool';

  // Determine Type based on OSM tags
  let type = 'Public';
  if (tags.access === 'private') {
    type = 'Private Rental';
  } else if (tags.access === 'customers' || tags.membership === 'yes') {
    type = 'Athletic Club';
  } else if (
    tags.leisure === 'water_park' ||
    tags.tourism === 'hotel' ||
    tags.hotel === 'yes'
  ) {
    type = 'Hotel';
  } else if (
    tags.operator_type === 'community' ||
    tags.owner === 'community' ||
    tags.club === 'swimming'
  ) {
    type = 'Community';
  } else {
    // Deterministic seed fallback based on id
    const typeIndex = id % 5;
    const fallbackTypes = [
      'Public',
      'Community',
      'Hotel',
      'Athletic Club',
      'Private Rental',
    ];
    type = fallbackTypes[typeIndex];
  }

  // Build Address
  const street = tags['addr:street'] || '';
  const num = tags['addr:housenumber'] || '';
  const city = tags['addr:city'] || '';
  const postcode = tags['addr:postcode'] || '';
  const country = tags['addr:country'] || '';
  const addressList = [num, street, city, postcode, country].filter(Boolean);
  const address =
    addressList.join(', ') || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;

  // Calculate Distance if search coordinates are available
  let distance = 0;
  if (centerLat && centerLng) {
    distance = haversineDistance(centerLat, centerLng, lat, lng);
  } else {
    // If no search coordinates, set a default distance or make it global
    distance = 0;
  }

  // Parse Features
  const features = [];
  if (
    tags.covered === 'yes' ||
    tags.indoor === 'yes' ||
    tags.swimming_pool === 'indoor'
  ) {
    features.push('Indoor');
  } else {
    features.push('Outdoor');
  }

  if (tags.heated === 'yes' || tags.pool_heated === 'yes') {
    features.push('Heated');
  }
  if (tags.wheelchair === 'yes' || tags['wheelchair:description']) {
    features.push('Accessibility');
  }
  if (tags.saltwater === 'yes' || tags.water_treatment === 'salt') {
    features.push('Saltwater');
  }
  if (tags.lanes || tags.lap_lanes === 'yes') {
    features.push('Lap Lanes');
  }

  // Seed remaining features to ensure visual richness
  const seedVal = id % 4;
  if (!features.includes('Heated') && seedVal === 0) features.push('Heated');
  if (!features.includes('Lap Lanes') && seedVal === 1 && type !== 'Hotel')
    features.push('Lap Lanes');
  if (!features.includes('Kiddie Pool') && seedVal === 2)
    features.push('Kiddie Pool');
  if (!features.includes('Saltwater') && seedVal === 3)
    features.push('Saltwater');
  if (!features.includes('Accessibility') && id % 3 === 0)
    features.push('Accessibility');

  // Parse Amenities
  const amenities = [];
  if (tags.wheelchair === 'yes') amenities.push('Wheelchair Access');
  if (tags.shower === 'yes' || tags.showers === 'yes')
    amenities.push('Showers');
  if (tags.toilets === 'yes') amenities.push('Lockers');
  if (tags.parking === 'yes' || tags.amenity === 'parking')
    amenities.push('Parking');
  if (tags.internet_access || tags.wifi === 'yes') amenities.push('Wi-Fi');
  if (tags.supervised === 'yes' || tags.lifeguard === 'yes')
    amenities.push('Lifeguards');

  // Fill amenities seeds
  const defaultAmenities = [
    'Showers',
    'Lockers',
    'Parking',
    'Wi-Fi',
    'Lifeguards',
  ];
  defaultAmenities.forEach((a, i) => {
    if (!amenities.includes(a) && (id + i) % 3 === 0) {
      amenities.push(a);
    }
  });

  // Calculate pricing
  let price = 0;
  let priceType = 'Free';
  if (type === 'Private Rental') {
    price = 45 + (id % 120);
    priceType = 'Hourly Rental';
  } else if (type === 'Athletic Club') {
    price = 15 + (id % 25);
    priceType = 'Daily Pass';
  } else if (type === 'Hotel') {
    price = 25 + (id % 45);
    priceType = 'Daily Pass';
  } else if (type === 'Community') {
    price = 3 + (id % 8);
    priceType = 'Daily Pass';
  } else {
    price = 4 + (id % 10);
    priceType = 'Daily Pass';
  }

  // Make some pools free
  if (id % 9 === 0 && type !== 'Private Rental') {
    price = 0;
    priceType = 'Free';
  }

  const priceDisplay =
    price === 0
      ? 'Free'
      : `$${price}/${priceType === 'Hourly Rental' ? 'hr' : 'day'}`;

  // Description builder
  const typeLabels = {
    Public: 'public community swimming pool',
    'Private Rental': 'privately bookable rental pool',
    Hotel: 'luxurious resort-style hotel pool',
    Community: 'local neighborhood community pool',
    'Athletic Club': 'professional athletic club training facility',
  };
  const descPhrase = typeLabels[type] || 'beautiful swimming facility';
  const description =
    tags.description ||
    `Welcome to ${name}, a ${descPhrase} located in ${city || 'the area'}. This facility provides clean changing rooms, fresh water circulation, and family-friendly swimming sessions. Ideal for recreational swimmers, lap workouts, and weekend relaxation.`;

  // Rating & Review details
  const rating = 4.0 + (id % 10) / 10; // 4.0 to 4.9 rating
  const reviewCount = 8 + (id % 340);

  // Styling properties
  const gradients = [
    'linear-gradient(135deg, #0f4c81 0%, #1a7a8a 100%)',
    'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    'linear-gradient(135deg, #006064 0%, #00838f 100%)',
    'linear-gradient(135deg, #01579b 0%, #0288d1 100%)',
    'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
  ];
  const colors = ['#1a7a8a', '#283593', '#00838f', '#0288d1', '#00897b'];
  const styleIdx = id % colors.length;

  // Mock comments generator based on seed
  const commentPool = [
    'Amazing pool! Exceptionally clean water and very friendly lifeguards.',
    'Great lanes for swimming laps early in the morning. Not too crowded.',
    'Perfect for families and children. The splash area is highly recommended.',
    'A nice hidden gem. Clean facilities and reasonably priced admissions.',
    'Super relaxing environment, great temperature control on the heated side.',
    'Decent place, but gets quite busy on hot summer weekends.',
    'Excellent value for the price. We will definitely be back next week!',
  ];
  const reviewerNames = [
    'Derrick L.',
    'Sarah K.',
    'Alex B.',
    'James P.',
    'Hannah K.',
    'Tanya B.',
    'Marcus D.',
    'Olivia N.',
    'Jamie T.',
  ];

  const reviews = Array.from({ length: 2 + (id % 3) }).map((_, rIdx) => {
    const comIdx = (id + rIdx) % commentPool.length;
    const nameIdx = (id + rIdx * 2) % reviewerNames.length;
    return {
      author: reviewerNames[nameIdx],
      rating: Math.round(rating) - (rIdx % 2),
      date: 'June 2026',
      text: commentPool[comIdx],
    };
  });

  return {
    id,
    name,
    type,
    description,
    address,
    phone: tags.phone || tags['contact:phone'] || '(555) 398-0284',
    website:
      tags.website ||
      tags['contact:website'] ||
      'https://www.openstreetmap.org',
    lat,
    lng,
    rating: parseFloat(rating.toFixed(1)),
    reviewCount,
    price,
    priceType,
    priceDisplay,
    distance: parseFloat(distance.toFixed(1)),
    features,
    activities: ['Swim Lessons', 'Lifeguards', 'Water Aerobics'],
    amenities,
    isOpenNow: id % 2 === 0,
    hours: {
      Monday: '6:00 AM – 9:00 PM',
      Tuesday: '6:00 AM – 9:00 PM',
      Wednesday: '6:00 AM – 9:00 PM',
      Thursday: '6:00 AM – 9:00 PM',
      Friday: '6:00 AM – 8:00 PM',
      Saturday: '8:00 AM – 6:00 PM',
      Sunday: '10:00 AM – 5:00 PM',
    },
    pricing: [
      { type: 'General Admission', price: priceDisplay },
      {
        type: 'Monthly Membership Pass',
        price: price === 0 ? 'Free' : `$${price * 10}`,
      },
    ],
    reviews,
    gradient: gradients[styleIdx],
    color: colors[styleIdx],
  };
};
