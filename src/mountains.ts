export interface Mountain {
  id: string;
  name: string;
  elevation: number;
  location: string;
  region: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  bestTime: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  permits: {
    where: string;
    contact: string;
    documents: string[];
    fees: string;
  };
  howToGetThere: {
    fromDavao: string;
    fromCDO: string;
  };
  thingsToBring: string[];
  safetyReminders: string[];
}

export const mountains: Mountain[] = [
  {
    id: 'mount-apo',
    name: 'Mount Apo',
    elevation: 2954,
    location: 'Davao City, Davao del Sur & Kidapawan, North Cotabato',
    region: 'Region XI & Region XII',
    difficulty: 'Advanced',
    duration: '2-3 Days',
    bestTime: 'March to May (Dry Season)',
    description: 'Mount Apo is a large solfataric, potentially active stratovolcano in the island of Mindanao, Philippines. With an elevation of 2,954 meters above sea level, it is the highest mountain in the Philippine Archipelago and is located between Davao City and Davao del Sur province in Region XI and Cotabato province in Region XII.',
    image: 'https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/1280px-Mount_Apo.jpeg?raw=true',
    coordinates: { lat: 7.0053, lng: 125.2711 },
    permits: {
      where: 'DENR-PAMB Office in Digos City or Kidapawan City',
      contact: '+63 912 345 6789',
      documents: ['Valid ID', 'Medical Certificate', 'Signed Waiver', 'Climb Entry Form'],
      fees: 'PHP 2,000 - 3,500 (Inclusive of guide and porter fees vary)'
    },
    howToGetThere: {
      fromDavao: 'Take a bus from Ecoland Terminal to Digos City or Kidapawan. From there, hire a tricycle or habal-habal to the jump-off point (Kapatagan or Baras).',
      fromCDO: 'Take a bus to Davao City (approx. 7-8 hours). From Davao, follow the directions above.'
    },
    thingsToBring: ['Cold weather gear', 'Sturdy hiking boots', 'Rain protection', 'Headlamp', 'Personal First Aid Kit', 'Hydration system (3L min)'],
    safetyReminders: ['Respect the sacredness of the mountain', 'Follow your guide at all times', 'Be prepared for sudden weather changes', 'Monitor for altitude sickness']
  },
  {
    id: 'mount-dulang-dulang',
    name: 'Mount Dulang-Dulang',
    elevation: 2938,
    location: 'Lantapan, Bukidnon',
    region: 'Region X',
    difficulty: 'Advanced',
    duration: '3-4 Days (often combined with Kitanglad)',
    bestTime: 'February to April',
    description: 'Mount Dulang-dulang, nicknamed D2, is the highest peak of the Kitanglad Mountain Range and the second highest mountain in the Philippines. It is considered a sacred place by the Talaandig tribe of Lantapan.',
    image: 'https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/Dulang-dulang_peak.JPG?raw=true',
    coordinates: { lat: 8.1139, lng: 124.9214 },
    permits: {
      where: 'Lantapan Municipal Tourism Office',
      contact: '+63 926 123 4567',
      documents: ['Ritual Fee (for the tribe)', 'Valid ID', 'Medical Certificate'],
      fees: 'PHP 1,500 - 2,500'
    },
    howToGetThere: {
      fromDavao: 'Take a bus to Malaybalay City. From Malaybalay, take a jeepney to Lantapan.',
      fromCDO: 'Take a bus to Malaybalay City or a van directly to Lantapan. Hire a habal-habal to the jump-off point.'
    },
    thingsToBring: ['Heavy winter clothes', 'Waterproof bags', 'Camping gear', 'Talaandig ritual offerings (usually white chicken)'],
    safetyReminders: ['Observe tribal customs and rituals', 'The mossy forest is extremely slippery', 'Stay on marked trails to protect the ecosystem']
  },
  {
    id: 'mount-kitanglad',
    name: 'Mount Kitanglad',
    elevation: 2899,
    location: 'Impasug-ong, Bukidnon',
    region: 'Region X',
    difficulty: 'Advanced',
    duration: '2 Days',
    bestTime: 'March to May',
    description: 'Mount Kitanglad is an inactive volcano located in the Kitanglad Mountain Range in Bukidnon province. It is the fourth highest mountain in the Philippines and features a prominent communication tower at its summit.',
    image: 'https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/Mount_Kitanglad_and_the_Kitanglad_Mountain_Range.jpg?raw=true',
    coordinates: { lat: 8.1311, lng: 124.9158 },
    permits: {
      where: 'PAMB Office, Malaybalay City',
      contact: '+63 917 987 6543',
      documents: ['Climb Permit', 'Waiver', 'Health Clearance'],
      fees: 'PHP 1,000 - 2,000'
    },
    howToGetThere: {
      fromDavao: 'Take a bus to Malaybalay. From there, take a jeepney to Impasug-ong.',
      fromCDO: 'Take a bus to Malaybalay. Alight at Impasug-ong junction and take a habal-habal to the park entrance.'
    },
    thingsToBring: ['Warm layers', 'Gloves and bonnet', 'Power bank', 'Binoculars for bird watching'],
    safetyReminders: ['The trail can be very steep', 'Be mindful of the communication equipment at the top', 'Pack all trash out']
  },
  {
    id: 'mount-matutum',
    name: 'Mount Matutum',
    elevation: 2286,
    location: 'Tupi, South Cotabato',
    region: 'Region XII',
    difficulty: 'Intermediate',
    duration: '1-2 Days',
    bestTime: 'January to June',
    description: 'Mount Matutum is an active volcano located in South Cotabato. It is a landmark of the province and is home to the Philippine Tarsier and various endemic bird species.',
    image: 'https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/Matutum.jpg?raw=true',
    coordinates: { lat: 6.3600, lng: 125.0700 },
    permits: {
      where: 'Tupi Municipal Tourism Office',
      contact: '+63 933 456 7890',
      documents: ['Valid ID', 'Registration Form'],
      fees: 'PHP 500 - 1,000'
    },
    howToGetThere: {
      fromDavao: 'Take a bus to General Santos City. From GenSan, take a bus or van to Tupi.',
      fromCDO: 'Take a bus to GenSan via Wao or Kabacan. Alight at Tupi.'
    },
    thingsToBring: ['Light jacket', 'Insect repellent', 'Trail snacks', 'Camera'],
    safetyReminders: ['The trail is known for its "90-degree" segments', 'Watch out for leeches (limatik) during wet conditions', 'Respect the local Blaan community']
  },
  {
    id: 'mount-hibok-hibok',
    name: 'Mount Hibok-Hibok',
    elevation: 1332,
    location: 'Mambajao, Camiguin',
    region: 'Region X',
    difficulty: 'Intermediate',
    duration: '1 Day',
    bestTime: 'April to October',
    description: 'Mount Hibok-Hibok is a popular hiking destination in the island province of Camiguin. It offers a stunning view of the white island and the nearby provinces of Bohol and Cebu from its summit.',
    image: 'https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/Mount_Hibok_Hibok.jpg?raw=true',
    coordinates: { lat: 9.2031, lng: 124.6725 },
    permits: {
      where: 'DENR Office in Mambajao',
      contact: '+63 908 111 2222',
      documents: ['Entry Permit', 'Guide Assignment'],
      fees: 'PHP 300 - 700'
    },
    howToGetThere: {
      fromDavao: 'Take a bus to CDO, then a ferry to Camiguin.',
      fromCDO: 'Take a bus to Balingoan Port, then a ferry to Benoni Port, Camiguin. Take a multicab to Mambajao.'
    },
    thingsToBring: ['Sun protection', 'Swimwear (for the hot springs after)', 'Light trekking clothes', 'At least 2L of water'],
    safetyReminders: ['Start early to avoid the midday heat', 'The trail involves some scrambling over rocks', 'Check volcanic activity status before climbing']
  },
  {
    id: 'mount-malindang',
    name: 'Mount Malindang',
    elevation: 2404,
    location: 'Oroquieta City, Misamis Occidental',
    region: 'Region X',
    difficulty: 'Intermediate',
    duration: '2-3 Days',
    bestTime: 'March to May',
    description: 'Mount Malindang is a complex volcano range and a National Park. It is famous for its crater lake, Lake Duminagat, which is considered sacred by the Subanen tribe.',
    image: 'https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/Mt._malindang.jpg?raw=true',
    coordinates: { lat: 8.2167, lng: 123.6333 },
    permits: {
      where: 'PAMB Office, Oroquieta City',
      contact: '+63 945 333 4444',
      documents: ['Climb Permit', 'Subanen Ritual Consent'],
      fees: 'PHP 1,000 - 1,500'
    },
    howToGetThere: {
      fromDavao: 'Take a flight to Ozamiz City or a long bus ride via CDO.',
      fromCDO: 'Take a bus to Oroquieta City. From the city center, hire a habal-habal to the jump-off point.'
    },
    thingsToBring: ['Waterproof gear', 'Camping equipment', 'Warm clothes', 'Gifts for the Subanen community'],
    safetyReminders: ['Respect the Subanen culture', 'The area is prone to rain even in dry season', 'Do not swim in the lake without permission']
  },
  {
    id: 'mount-kalatungan',
    name: 'Mount Kalatungan',
    elevation: 2824,
    location: 'Pangantucan, Bukidnon',
    region: 'Region X',
    difficulty: 'Advanced',
    duration: '3 Days',
    bestTime: 'February to April',
    description: 'Mount Kalatungan is one of the highest peaks in the Philippines. It is known for its challenging "Dead Trail" and the beautiful "Wiji" peak. It offers a rugged and wild experience for seasoned hikers.',
    image: 'https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/Mt._Kalatungan_Range.jpg?raw=true',
    coordinates: { lat: 7.9500, lng: 124.8000 },
    permits: {
      where: 'Pangantucan Tourism Office',
      contact: '+63 919 555 6666',
      documents: ['Valid ID', 'Medical Certificate', 'Ritual Fee'],
      fees: 'PHP 1,500 - 2,500'
    },
    howToGetThere: {
      fromDavao: 'Take a bus to Maramag, Bukidnon. From Maramag, take a bus or van to Pangantucan.',
      fromCDO: 'Take a bus to Maramag. From Maramag, take a bus or van to Pangantucan.'
    },
    thingsToBring: ['Heavy-duty hiking gear', 'Cold weather protection', 'Emergency whistle', 'High-energy trail food'],
    safetyReminders: ['The trail is very technical and steep', 'Water sources are limited on some segments', 'Be prepared for extreme cold at night']
  }
];
