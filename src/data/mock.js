// Mock data for the Xtreem Drive screens — expanded with PakWheels-style features.

export const featuredCars = [
  {
    id: '1',
    title: 'Toyota Corolla Altis 1.6',
    year: 2024,
    mileage: '8,200 km',
    price: 'PKR 62.5 Lac',
    tags: ['Auto', 'Petrol'],
    image: 'https://images.unsplash.com/photo-1621007690695-45aaed9e7a3a?w=800',
    verified: true,
    location: 'Lahore',
    featured: true,
    managed: true,
  },
  {
    id: '2',
    title: 'Honda Civic Oriel 1.5T',
    year: 2023,
    mileage: '15,400 km',
    price: 'PKR 85.0 Lac',
    tags: ['Auto', 'Turbo'],
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    verified: true,
    location: 'Karachi',
    featured: true,
    managed: false,
  },
  {
    id: '3',
    title: 'Suzuki Swift GL 1.2',
    year: 2025,
    mileage: '500 km',
    price: 'PKR 37.8 Lac',
    tags: ['Manual', 'Petrol'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800',
    verified: true,
    location: 'Islamabad',
    featured: false,
    managed: true,
  },
  {
    id: '4',
    title: 'KIA Sportage AWD',
    year: 2024,
    mileage: '12,000 km',
    price: 'PKR 95.0 Lac',
    tags: ['Auto', 'AWD'],
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    verified: false,
    location: 'Rawalpindi',
    featured: true,
    managed: false,
  },
  {
    id: '5',
    title: 'Hyundai Tucson GLS',
    year: 2023,
    mileage: '22,000 km',
    price: 'PKR 78.9 Lac',
    tags: ['Auto', 'FWD'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    verified: true,
    location: 'Faisalabad',
    featured: false,
    managed: false,
  },
  {
    id: '6',
    title: 'MG HS Essence',
    year: 2024,
    mileage: '3,200 km',
    price: 'PKR 72.5 Lac',
    tags: ['Auto', 'Turbo'],
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800',
    verified: true,
    location: 'Multan',
    featured: true,
    managed: true,
  },
  {
    id: '7',
    title: 'Toyota Yaris ATIV X',
    year: 2023,
    mileage: '18,600 km',
    price: 'PKR 44.5 Lac',
    tags: ['Auto', '1.5L'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    verified: true,
    location: 'Peshawar',
    featured: false,
    managed: false,
  },
  {
    id: '8',
    title: 'Suzuki Cultus VXL',
    year: 2022,
    mileage: '30,000 km',
    price: 'PKR 28.9 Lac',
    tags: ['Auto', '1.0L'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    verified: false,
    location: 'Quetta',
    featured: false,
    managed: false,
  },
];

export const categories = [
  { id: 'used', label: 'Used Cars', icon: 'directions-car', sub: 'Verified pre-owned' },
  { id: 'new', label: 'New Cars', icon: 'fiber-new', sub: 'Latest arrivals' },
  { id: 'bikes', label: 'Bikes', icon: 'two-wheeler', sub: 'Sport & cruise' },
  { id: 'parts', label: 'Auto Store', icon: 'build', sub: 'Parts & accessories' },
];

// --- PakWheels Services ---
export const services = [
  { id: 's1', title: 'Car Inspection', desc: '200+ checkpoint inspection', icon: 'verified-user', color: '#E74C3C' },
  { id: 's2', title: 'Sell It For Me', desc: 'We handle the sale for you', icon: 'storefront', color: '#3498DB' },
  { id: 's3', title: 'Car Finance', desc: 'Easy installment plans', icon: 'account-balance', color: '#27AE60' },
  { id: 's4', title: 'Car Insurance', desc: 'Protect your investment', icon: 'shield', color: '#9B59B6' },
  { id: 's5', title: 'Auction Sheet', desc: 'Verify imported cars', icon: 'fact-check', color: '#F39C12' },
  { id: 's6', title: 'Registration', desc: 'Hassle-free paperwork', icon: 'description', color: '#1ABC9C' },
  { id: 's7', title: 'Transfer', desc: 'Ownership transfer made easy', icon: 'swap-horiz', color: '#E67E22' },
  { id: 's8', title: 'Price Check', desc: 'What\'s my car worth?', icon: 'price-check', color: '#2ECC71' },
];

// --- New Cars Data ---
export const newCars = [
  { id: 'nc1', title: 'Toyota Corolla', price: 'PKR 61.94 - 78.04 Lac', image: 'https://images.unsplash.com/photo-1621007690695-45aaed9e7a3a?w=600', reviews: 648, rating: 4.2 },
  { id: 'nc2', title: 'Honda Civic', price: 'PKR 84.99 Lac - 1.01 Cr', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600', reviews: 384, rating: 4.5 },
  { id: 'nc3', title: 'Suzuki Swift', price: 'PKR 35.99 - 40.49 Lac', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600', reviews: 120, rating: 4.0 },
  { id: 'nc4', title: 'Honda City', price: 'PKR 47.37 - 61.49 Lac', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600', reviews: 476, rating: 4.3 },
  { id: 'nc5', title: 'Suzuki Alto', price: 'PKR 29.95 - 33.26 Lac', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600', reviews: 238, rating: 3.8 },
  { id: 'nc6', title: 'Toyota Fortuner', price: 'PKR 1.22 - 1.55 Cr', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600', reviews: 203, rating: 4.6 },
  { id: 'nc7', title: 'KIA Sportage', price: 'PKR 72.99 - 94.99 Lac', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600', reviews: 156, rating: 4.4 },
  { id: 'nc8', title: 'Hyundai Tucson', price: 'PKR 73.49 - 87.79 Lac', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600', reviews: 189, rating: 4.1 },
];

export const newCarMakes = [
  { id: 'toyota', label: 'Toyota', count: 12 },
  { id: 'honda', label: 'Honda', count: 8 },
  { id: 'suzuki', label: 'Suzuki', count: 7 },
  { id: 'kia', label: 'KIA', count: 5 },
  { id: 'hyundai', label: 'Hyundai', count: 6 },
  { id: 'mg', label: 'MG', count: 4 },
  { id: 'byd', label: 'BYD', count: 3 },
  { id: 'changan', label: 'Changan', count: 3 },
];

// --- Bikes Data ---
export const bikes = [
  { id: 'b1', title: 'Honda CD 70', price: 'PKR 1.41 Lac', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600' },
  { id: 'b2', title: 'Honda CG 125', price: 'PKR 2.35 Lac', image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=600' },
  { id: 'b3', title: 'Yamaha YBR 125', price: 'PKR 3.69 Lac', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600' },
  { id: 'b4', title: 'Suzuki GS 150', price: 'PKR 4.30 Lac', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600' },
  { id: 'b5', title: 'Honda CB 150F', price: 'PKR 4.99 Lac', image: 'https://images.unsplash.com/photo-1571646750618-48d20fc7d7c8?w=600' },
];

// --- Auto Store / Parts ---
export const autoStoreCategories = [
  { id: 'as1', title: 'Car Covers', icon: 'directions-car', count: 245 },
  { id: 'as2', title: 'Tyres', icon: 'tire-repair', count: 1200 },
  { id: 'as3', title: 'LED Lights', icon: 'light', count: 890 },
  { id: 'as4', title: 'GPS Trackers', icon: 'gps-fixed', count: 340 },
  { id: 'as5', title: 'Floor Mats', icon: 'grid-on', count: 560 },
  { id: 'as6', title: 'Air Fresheners', icon: 'air', count: 410 },
  { id: 'as7', title: 'Car Shampoo', icon: 'local-car-wash', count: 280 },
  { id: 'as8', title: 'Dash Cams', icon: 'videocam', count: 190 },
];

export const autoStoreProducts = [
  { id: 'p1', title: '3M Car Cover - Double Layer', price: 'PKR 4,500', rating: 4.5, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400', category: 'Car Covers' },
  { id: 'p2', title: 'Bridgestone Ecopia 195/65R15', price: 'PKR 18,500', rating: 4.7, image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=400', category: 'Tyres' },
  { id: 'p3', title: 'Philips Ultinon Pro LED H4', price: 'PKR 8,200', rating: 4.3, image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400', category: 'LED Lights' },
  { id: 'p4', title: 'Tracker Pro GPS + SIM', price: 'PKR 7,999', rating: 4.1, image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400', category: 'GPS Trackers' },
];

// --- News / Blog ---
export const newsArticles = [
  {
    id: 'a1',
    title: 'Toyota Cuts Freight Charges After Fuel Price Relief',
    summary: 'Toyota IMC reduces delivery charges by up to PKR 20,000 following the recent fuel price cut.',
    time: '2h ago',
    image: 'https://images.unsplash.com/photo-1621007690695-45aaed9e7a3a?w=600',
    category: 'News',
  },
  {
    id: 'a2',
    title: 'KIA Sportage 2025: What to Expect',
    summary: 'The next-gen Sportage promises AWD, hybrid options, and a completely redesigned interior.',
    time: '5h ago',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600',
    category: 'Review',
  },
  {
    id: 'a3',
    title: 'Electric Vehicles in Pakistan: A Complete Guide',
    summary: 'From BYD to MG, here\'s everything you need to know about EVs available in Pakistan.',
    time: '1d ago',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600',
    category: 'Guide',
  },
  {
    id: 'a4',
    title: 'Suzuki Swift 2026 Review: Best Hatchback?',
    summary: 'We test the all-new Swift and find out if it deserves the hype.',
    time: '2d ago',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600',
    category: 'Review',
  },
];

// --- Videos ---
export const videos = [
  { id: 'v1', title: 'Nora E30 First Look Review', duration: '12:34', views: '45K', thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600' },
  { id: 'v2', title: 'Jetour T1 First Look Review', duration: '15:20', views: '32K', thumbnail: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600' },
  { id: 'v3', title: 'Jaecoo J7 Expert Review', duration: '18:45', views: '28K', thumbnail: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600' },
];

// --- Car Comparison Data ---
export const comparisonPairs = [
  {
    id: 'cp1',
    car1: { title: 'Honda Civic', price: 'PKR 85 Lac', engine: '1.5L Turbo', power: '173 hp', fuel: 'Petrol', transmission: 'CVT' },
    car2: { title: 'Toyota Corolla', price: 'PKR 78 Lac', engine: '1.6L', power: '121 hp', fuel: 'Petrol', transmission: 'CVT' },
  },
  {
    id: 'cp2',
    car1: { title: 'KIA Sportage', price: 'PKR 95 Lac', engine: '2.0L', power: '155 hp', fuel: 'Petrol', transmission: 'Auto' },
    car2: { title: 'Hyundai Tucson', price: 'PKR 88 Lac', engine: '2.0L', power: '155 hp', fuel: 'Petrol', transmission: 'Auto' },
  },
];

// --- Search Filters ---
export const cities = ['All Cities', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot'];
export const makes = ['All Makes', 'Toyota', 'Honda', 'Suzuki', 'KIA', 'Hyundai', 'MG', 'BYD', 'Changan', 'Chery', 'Daihatsu'];
export const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Crossover', 'Pickup', 'Van', 'Coupe'];
export const priceRanges = [
  { label: 'Under 25 Lac', min: 0, max: 2500000 },
  { label: '25 - 50 Lac', min: 2500000, max: 5000000 },
  { label: '50 - 100 Lac', min: 5000000, max: 10000000 },
  { label: '1 - 2 Crore', min: 10000000, max: 20000000 },
  { label: '2 Crore+', min: 20000000, max: 999999999 },
];

export const conversations = [
  {
    id: 'c1',
    name: 'Premium Motors',
    lastMessage: 'Is this still available at your listed price?',
    time: '10:24',
    unread: 2,
    online: true,
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'c2',
    name: 'Ali Raza',
    lastMessage: 'Sure, I can send you more photos tonight.',
    time: '09:12',
    unread: 0,
    online: false,
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
  {
    id: 'c3',
    name: 'Xtreem Showroom',
    lastMessage: 'The Civic has just been serviced.',
    time: 'Yesterday',
    unread: 1,
    online: true,
    avatar: 'https://i.pravatar.cc/150?img=34',
  },
  {
    id: 'c4',
    name: 'Sara Khan',
    lastMessage: 'Thanks for the quick response!',
    time: 'Mon',
    unread: 0,
    online: false,
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
];

export const chatMessages = [
  { id: 'm1', text: 'Hi, is the Toyota Corolla still available?', fromMe: true, time: '10:20' },
  { id: 'm2', text: 'Yes it is! Just got a fresh inspection done.', fromMe: false, time: '10:21' },
  { id: 'm3', text: 'Great. Any flexibility on the price?', fromMe: true, time: '10:22' },
  { id: 'm4', text: 'We can discuss after you see the car in person. When can you visit?', fromMe: false, time: '10:24' },
];

// --- Forums / Community threads ---
export const forumThreads = [
  {
    id: 'f1',
    title: 'Best hybrid SUV under 1 Crore in Pakistan?',
    author: 'Ahsan Malik',
    category: 'Buying Advice',
    replies: 47,
    views: '3.2K',
    time: '2h ago',
    pinned: true,
  },
  {
    id: 'f2',
    title: 'Toyota Corolla 2024 ownership review — 15,000 km',
    author: 'Hamza K.',
    category: 'Reviews',
    replies: 23,
    views: '1.8K',
    time: '5h ago',
  },
  {
    id: 'f3',
    title: 'CNG kit recommendations for Suzuki Cultus',
    author: 'Zain Raza',
    category: 'Modifications',
    replies: 12,
    views: '840',
    time: '1d ago',
  },
  {
    id: 'f4',
    title: 'Honda Civic RS vs Oriel — which to pick in 2025?',
    author: 'Fahad S.',
    category: 'Buying Advice',
    replies: 89,
    views: '6.4K',
    time: '2d ago',
  },
  {
    id: 'f5',
    title: 'Fuel average tips for 1.3L sedans',
    author: 'Umer T.',
    category: 'Maintenance',
    replies: 34,
    views: '2.1K',
    time: '3d ago',
  },
  {
    id: 'f6',
    title: 'Are KIA Sportage parts really that expensive?',
    author: 'Sana Ali',
    category: 'Ownership',
    replies: 56,
    views: '4.5K',
    time: '4d ago',
  },
];

// --- Dealer / Showroom directory ---
export const dealers = [
  {
    id: 'd1',
    name: 'Premium Motors',
    city: 'Lahore',
    area: 'DHA Phase 5',
    rating: 4.8,
    reviews: 312,
    listings: 48,
    verified: true,
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400',
  },
  {
    id: 'd2',
    name: 'Karachi Auto Gallery',
    city: 'Karachi',
    area: 'Clifton Block 5',
    rating: 4.6,
    reviews: 189,
    listings: 64,
    verified: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
  },
  {
    id: 'd3',
    name: 'Capital Cars',
    city: 'Islamabad',
    area: 'F-10 Markaz',
    rating: 4.7,
    reviews: 245,
    listings: 37,
    verified: true,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
  },
  {
    id: 'd4',
    name: 'Xtreem Showroom',
    city: 'Rawalpindi',
    area: 'Saddar',
    rating: 4.3,
    reviews: 98,
    listings: 26,
    verified: false,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
  },
  {
    id: 'd5',
    name: 'Royal Motors',
    city: 'Faisalabad',
    area: 'D Ground',
    rating: 4.5,
    reviews: 143,
    listings: 41,
    verified: true,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400',
  },
];

// --- Saved searches (notification alerts) ---
export const savedSearches = [
  {
    id: 'ss1',
    name: 'Hybrid SUVs in Lahore',
    summary: 'Lahore · Hybrid · SUV · Under 1 Cr',
    filters: { cities: ['Lahore'], fuel: ['Hybrid'], body: ['SUV'] },
    matches: 34,
    alerts: true,
  },
  {
    id: 'ss2',
    name: 'Civic 2022+ Karachi',
    summary: 'Karachi · Honda Civic · 2022+',
    filters: { cities: ['Karachi'], makes: ['Honda'], yearMin: '2022' },
    matches: 18,
    alerts: true,
  },
  {
    id: 'ss3',
    name: 'Automatic sedans under 50 Lac',
    summary: 'Sedan · Automatic · Under 50 Lac',
    filters: { body: ['Sedan'], transmission: ['Automatic'], price: ['25–50 Lac'] },
    matches: 126,
    alerts: false,
  },
];

// --- Inspection booking slots ---
export const inspectionSlots = [
  '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM',
];

export const notifications = [
  {
    id: 'n1',
    title: 'New inquiry on Corolla',
    body: 'Ali Raza is interested in your listing.',
    time: '2m ago',
    icon: 'mail',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Listing viewed 5 times',
    body: 'Your Honda Civic got 5 new views today.',
    time: '1h ago',
    icon: 'visibility',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Price alert',
    body: 'A similar KIA Sportage was listed for PKR 92 Lac.',
    time: 'Yesterday',
    icon: 'local-offer',
    unread: false,
  },
  {
    id: 'n4',
    title: 'Inspection booked',
    body: 'Your car inspection is scheduled for tomorrow at 2 PM.',
    time: '2d ago',
    icon: 'schedule',
    unread: false,
  },
];
