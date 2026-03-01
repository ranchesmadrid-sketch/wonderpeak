/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Mountain as MountainIcon, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Search, 
  Info, 
  ShieldCheck, 
  Leaf, 
  Phone, 
  FileText, 
  CreditCard,
  ArrowLeft,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
  Map as MapIcon,
  Globe,
  Award,
  BookOpen,
  History,
  Utensils,
  Calendar
} from 'lucide-react';

// --- DATA SCULPTING ---

export interface Mountain {
  id: string;
  name: string;
  image: string;
  elevation: string;
  location: string;
  difficulty: string;
  duration: string;
  bestTime: string;
  region: string;
  description: string;
  coordinates: { lat: number; lng: number };
  mapUrl: string;
  permits: { where: string; contact: string; fees: string; documents: string[] };
  howToGetThere: { fromManila: string; localRoute: string };
  thingsToBring: string[];
  safetyReminders: string[];
}

const mountains: Mountain[] = [
  { 
    id: "pulag",
    name: "Mount Pulag", 
    image: "Mount Pulag.jpg", 
    elevation: "2,928", 
    location: "Benguet, Ifugao, Nueva Vizcaya", 
    difficulty: "Intermediate",
    duration: "2-3 Days",
    bestTime: "December to February",
    region: "Cordillera",
    description: "Famous for its stunning 'sea of clouds' and chilly temperatures, it is a premier hiking destination known as the 'Playground of the Gods'.", 
    coordinates: { lat: 16.5967, lng: 120.8989 },
    mapUrl: "https://maps.app.goo.gl/FvbvhWDpaApPi3DM8",
    permits: { where: "DENR Mount Pulag National Park Office", contact: "DENR CAR", fees: "₱175 (Local)", documents: ["Medical Certificate", "Valid ID"] },
    howToGetThere: { fromManila: "Bus to Baguio City (4-6 hours).", localRoute: "Charter a jeepney from Baguio to the Ranger Station in Kabayan." },
    thingsToBring: ["Thermal wear", "Waterproof jacket", "Tent", "Trekking poles"],
    safetyReminders: ["Beware of hypothermia", "Always stay on the trail", "Follow Leave No Trace principles"]
  },
  { 
    id: "mayon",
    name: "Mount Mayon", 
    image: "Mayon Volcano.jpg", 
    elevation: "2,462", 
    location: "Albay", 
    difficulty: "Advanced",
    duration: "2-3 Days",
    bestTime: "March to May",
    region: "Bicol Region",
    description: "An active stratovolcano renowned for its symmetrical 'perfect cone' shape. The most active volcano in the Philippines.", 
    coordinates: { lat: 13.2548, lng: 123.6861 },
    mapUrl: "https://maps.app.goo.gl/2rzm4nwsXCXgd9vW7",
    permits: { where: "Albay Tourism Office", contact: "Local LGU", fees: "Varies depending on activity", documents: ["Valid ID", "Waiver"] },
    howToGetThere: { fromManila: "Fly to Legazpi City, Albay.", localRoute: "Take a tricycle or jeep to the jump-off points depending on your registered trail." },
    thingsToBring: ["Sun protection", "Sturdy hiking boots", "Dust mask (for ash)"],
    safetyReminders: ["Monitor PHIVOLCS alerts constantly", "Do not enter the permanent danger zone during high alert levels"]
  },
  { 
    id: "pinatubo",
    name: "Mt. Pinatubo", 
    image: "Mt Pinatubo.jpg", 
    elevation: "1,486", 
    location: "Zambales Mountains", 
    difficulty: "Beginner",
    duration: "1 Day",
    bestTime: "November to May",
    region: "Central Luzon",
    description: "Known for its massive 1991 eruption. The mountain's summit collapsed, forming a caldera that now hosts a beautiful emerald-hued crater lake.", 
    coordinates: { lat: 15.1333, lng: 120.3500 },
    mapUrl: "https://maps.app.goo.gl/6TjntVUDKKiA1yno8",
    permits: { where: "Capas Tourism Office / Base Camp", contact: "Capas LGU", fees: "₱500+ (Includes environmental fee & 4x4)", documents: ["Valid ID"] },
    howToGetThere: { fromManila: "Bus to Capas, Tarlac (2-3 hours).", localRoute: "Hire a tricycle to the Tourism office, then rent a 4x4 off-road vehicle to the trailhead." },
    thingsToBring: ["Sunscreen", "Waterless wash", "Trekking sandals"],
    safetyReminders: ["Lahar terrain can be extremely hot", "Swimming in the crater lake is currently prohibited"]
  },
  { 
    id: "madja-as",
    name: "Mount Madja-as", 
    image: "Mount Madja-as.jpg", 
    elevation: "2,117", 
    location: "Culasi, Antique", 
    difficulty: "Advanced",
    duration: "3-4 Days",
    bestTime: "February to May",
    region: "Western Visayas",
    description: "Highest peak on Panay Island. A dormant volcano famous for its lush, mossy forests, rich biodiversity, and over 14 scenic waterfalls.", 
    coordinates: { lat: 11.3833, lng: 122.1500 },
    mapUrl: "https://maps.app.goo.gl/zHD9Rqct6QYxAsBb7",
    permits: { where: "Culasi Municipal Tourism Office", contact: "Culasi LGU", fees: "₱150", documents: ["Medical Certificate", "Valid ID"] },
    howToGetThere: { fromManila: "Fly to Kalibo, Aklan or Iloilo City.", localRoute: "Take a bus/van to Culasi, Antique. Register at the municipal hall." },
    thingsToBring: ["Rain gear", "Water filtration", "First-aid kit"],
    safetyReminders: ["Expect technical climbs and slippery roots", "Prepare for limatik (leeches)"]
  },
  { 
    id: "manunggal",
    name: "Mount Manunggal", 
    image: "Mount Manunggal.jpg", 
    elevation: "1,003", 
    location: "Balamban, Cebu", 
    difficulty: "Beginner",
    duration: "1 Day",
    bestTime: "Year-round",
    region: "Central Visayas",
    description: "Historically significant as the 1957 crash site of President Ramon Magsaysay's plane. Features a memorial and 360-degree viewing deck.", 
    coordinates: { lat: 10.4500, lng: 123.8333 },
    mapUrl: "https://maps.app.goo.gl/HE8TWMiAkxjDYwrP7",
    permits: { where: "On-site registration", contact: "Local Baranggay", fees: "₱50-100", documents: ["Valid ID"] },
    howToGetThere: { fromManila: "Fly to Cebu City.", localRoute: "Take a V-hire from Ayala Center Cebu to Balamban via Transcentral Highway." },
    thingsToBring: ["Light jacket", "Camera", "Trail snacks"],
    safetyReminders: ["Stay on established paths", "Respect the historical memorial site"]
  },
  { 
    id: "timbak",
    name: "Mount Timbak", 
    image: "Mount Timbak.jpg", 
    elevation: "2,717", 
    location: "Atok, Benguet", 
    difficulty: "Beginner",
    duration: "1 Day",
    bestTime: "December to April",
    region: "Cordillera",
    description: "Part of the 'Luzon 3-2-1' trio. Offers panoramic sunrise views, a sea of clouds, and a summit featuring three crosses.", 
    coordinates: { lat: 16.6167, lng: 120.8000 },
    mapUrl: "https://maps.app.goo.gl/acfmjzbefJNvHELu9",
    permits: { where: "Atok Municipal Hall", contact: "Atok Tourism", fees: "₱50", documents: ["Valid ID"] },
    howToGetThere: { fromManila: "Bus to Baguio City.", localRoute: "Take a bus bound for Bontoc or Sagada, drop off at KM 55 (Timbak jump-off)." },
    thingsToBring: ["Fleece jacket", "Gloves", "Sun protection"],
    safetyReminders: ["Temperatures can drop near freezing", "Respect local mummies and burial sites nearby"]
  },
  { 
    id: "alto",
    name: "Alto Peak", 
    image: "Alto Peak.jpg", 
    elevation: "1,332", 
    location: "Ormoc City, Leyte", 
    difficulty: "Advanced",
    duration: "2-3 Days",
    bestTime: "March to May",
    region: "Eastern Visayas",
    description: "Known as the 'Tower of the East'. A challenging, 90-degree slope, and a popular hiking destination with rich, biodiverse trails.", 
    coordinates: { lat: 11.1000, lng: 124.7000 },
    mapUrl: "https://maps.app.goo.gl/MXmPTfKyYHkYDDv6A",
    permits: { where: "Ormoc City Tourism", contact: "Ormoc LGU", fees: "₱100", documents: ["Medical Certificate"] },
    howToGetThere: { fromManila: "Fly to Tacloban City, Leyte.", localRoute: "Van to Ormoc City, then hire a habal-habal to Lake Danao or Brgy. Cabintan." },
    thingsToBring: ["Gloves (for ropes and roots)", "Sturdy boots", "Trekking pants"],
    safetyReminders: ["Very steep assaults requiring ropes", "Beware of sulfuric vents"]
  },
  { 
    id: "tabeyo",
    name: "Mount Tabeyo", 
    image: "Mount Tabeyo.jpg", 
    elevation: "2,842", 
    location: "Kabayan, Benguet", 
    difficulty: "Intermediate",
    duration: "1-2 Days",
    bestTime: "December to May",
    region: "Cordillera",
    description: "Often called 'Junior Pulag', famed for its enchanted mossy forest, monkey trail, and the scenic 4 Lakes of Kabayan.", 
    coordinates: { lat: 16.6333, lng: 120.8833 },
    mapUrl: "https://maps.app.goo.gl/3Q6Ly4pDsVZaGw4z6",
    permits: { where: "Kabayan Tourism Office", contact: "Kabayan LGU", fees: "₱150", documents: ["Medical Certificate"] },
    howToGetThere: { fromManila: "Bus to Baguio City.", localRoute: "Take a monster jeepney or bus bound for Kabayan via Ambuklao Road." },
    thingsToBring: ["Cold weather gear", "Camera", "Trail food"],
    safetyReminders: ["Mossy forests are extremely fragile", "Do not disturb the flora"]
  },
  { 
    id: "magsanga",
    name: "Mount Magsanga", 
    image: "Mount Magsanga.JPG", 
    elevation: "655+", 
    location: "Merida, Leyte", 
    difficulty: "Intermediate",
    duration: "1 Day",
    bestTime: "Year-round",
    region: "Eastern Visayas",
    description: "Known for its two peaks. Offers panoramic views of a 'sea of green' and a peaceful, scenic horizon.", 
    coordinates: { lat: 10.9500, lng: 124.5333 },
    mapUrl: "https://maps.app.goo.gl/mS9tQAr5okEYQ7YW9",
    permits: { where: "Merida Tourism Office", contact: "Merida LGU", fees: "₱50", documents: ["Valid ID"] },
    howToGetThere: { fromManila: "Fly to Tacloban City or Ormoc.", localRoute: "Take a van or bus to Merida, Leyte, then proceed to the jump-off." },
    thingsToBring: ["Sun protection", "Plenty of water", "Trekking pole"],
    safetyReminders: ["Trails can be overgrown", "Wear long sleeves to avoid scratches"]
  },
  { 
    id: "ulap",
    name: "Mount Ulap", 
    image: "Mount Ulap.jpg", 
    elevation: "1,846", 
    location: "Itogon, Benguet", 
    difficulty: "Beginner",
    duration: "1 Day",
    bestTime: "November to May",
    region: "Cordillera",
    description: "A premier hiking destination known for its stunning sea of clouds, pine forests, and grassy ridges. Perfect for beginners.", 
    coordinates: { lat: 16.2917, lng: 120.6250 },
    mapUrl: "https://maps.app.goo.gl/b5eyXXJDQFFZcmobA",
    permits: { where: "Brgy. Ampucao Hall", contact: "Ampucao Eco-Tourism", fees: "₱100", documents: ["Valid ID"] },
    howToGetThere: { fromManila: "Bus to Baguio City.", localRoute: "Take a jeepney from Baguio (near Center Mall) bound for Ampucao." },
    thingsToBring: ["Light jacket", "Sunscreen", "Camera"],
    safetyReminders: ["Be careful when taking photos at Gungal Rock", "Stay hydrated"]
  },
  { 
    id: "sierramadre",
    name: "Sierra Madre", 
    image: "Sierra Madre.webp", 
    elevation: "Various", 
    location: "Luzon", 
    difficulty: "Advanced",
    duration: "Multi-Day Treks",
    bestTime: "February to May",
    region: "Multiple Regions",
    description: "The longest mountain range in the Philippines, acting as a 540-kilometer-long 'backbone of Luzon' that protects the island from typhoons.", 
    coordinates: { lat: 16.0000, lng: 121.5000 },
    mapUrl: "https://maps.app.goo.gl/SgSwD9h2NMt8d5N28",
    permits: { where: "Various LGU Offices", contact: "Local DENR", fees: "Varies widely", documents: ["Permits heavily required"] },
    howToGetThere: { fromManila: "Depends on specific peak.", localRoute: "Various jump-off points in Rizal, Quezon, Aurora, or Cagayan." },
    thingsToBring: ["Heavy-duty trekking gear", "Survival kits", "Navigation tools"],
    safetyReminders: ["Only hike with accredited and experienced local guides", "Prepare for river crossings"]
  },
  { 
    id: "talomo",
    name: "Mt. Talomo", 
    image: "Apo Talomo.jpg", 
    elevation: "2,674", 
    location: "Apo-Talomo Range, Mindanao", 
    difficulty: "Advanced",
    duration: "3 Days",
    bestTime: "March to May",
    region: "Davao Region",
    description: "A challenging peak known for its dense, mossy forests. As a major climb, it offers views of Mt. Apo and the Lipadas watershed.", 
    coordinates: { lat: 6.9667, lng: 125.3333 },
    mapUrl: "https://maps.app.goo.gl/kUJokQGLT5Hsu7BX8",
    permits: { where: "Davao City Tourism", contact: "DENR Region XI", fees: "₱500+", documents: ["Medical Certificate", "Valid ID"] },
    howToGetThere: { fromManila: "Fly to Davao City.", localRoute: "Take a jeep to Calinan, then hire a habal-habal to the jump-off." },
    thingsToBring: ["Waterproofing", "Trekking poles", "Warm clothing"],
    safetyReminders: ["Limatik (leeches) are abundant", "Prepare for heavy rains in the mossy forest"]
  }
];

const cuisines = [
  { 
    category: "Must-Try Traditional Cuisines", 
    items: [
      { name: "Adobo", desc: "Often called the national dish, this stew features chicken or pork, simmered in soy sauce, vinegar, garlic, bay leaves, and peppercorns.", image: "adobo.jpg" },
      { name: "Sinigang", desc: "A popular sour broth soup, typically made with tamarind, pork, fish, or shrimp, and vegetables.", image: "sinigang.jpg" },
      { name: "Lechon", desc: "A whole roasted pig with crispy skin, a staple at Filipino celebrations and fiestas.", image: "lechon.jpg" },
      { name: "Sisig", desc: "A popular sizzling appetizer made from minced pig's ears, cheeks, and liver, seasoned with calamansi and onions.", image: "Sisig.jpg" },
      { name: "Kare-Kare", desc: "A thick, rich stew made with oxtail, tripe, and vegetables in a peanut sauce.", image: "Kare-Kare.jpg" },
      { name: "Pancit", desc: "Stir-fried noodles representing long life, with popular variations like Pancit Canton and Pancit Palabok.", image: "Pancit.jpg" },
      { name: "Lumpia", desc: "Crispy fried or fresh spring rolls filled with meat and vegetables.", image: "Lumpia.jpg" },
      { name: "Bulalo", desc: "A light-colored soup made by cooking beef shanks and marrow bones for hours.", image: "bulalo.jpg" }
    ]
  },
  { 
    category: "Delicacies and Snacks", 
    items: [
      { name: "Taho", desc: "A popular morning snack of fresh soft tofu, caramelized sugar syrup, and sago pearls.", image: "Taho.jpg" },
      { name: "Halo-Halo", desc: "A beloved dessert featuring shaved ice, evaporated milk, and various ingredients like sweetened beans, fruits, and ube ice cream.", image: "Halo-Halo.jpg" },
      { name: "Bibingka & Puto", desc: "Traditional rice cakes often enjoyed during the Christmas season.", image: "bibingka and puto.jpg" },
      { name: "Kakanin", desc: "Rice cakes, including puto, bibingka, and suman (glutinous rice wrapped in banana leaves).", image: "kakanin.jpeg" }
    ]
  },
  { 
    category: "Regional Specialities & Street Food", 
    items: [
      { name: "Ilocos Empanada", desc: "A crispy rice-flour pastry filled with sausage, papaya, and egg.", image: "Empanada.jpg" },
      { name: "Laing", desc: "Bicol region’s dish of shredded taro leaves cooked in coconut milk.", image: "Laing.jpg" },
      { name: "Chicken Inasal", desc: "Grilled chicken marinated in vinegar and spices, originating from the Visayas.", image: "chicken inasal.jpg" },
      { name: "Balut", desc: "A famous street food: a fertilized duck egg embryo that is boiled and eaten from the shell.", image: "Balut.jpeg" },
      { name: "Grilled Balut", desc: "A modern street food twist, grilled and seasoned with sweet and spicy sauces.", image: "grilledbalut.jpg" },
      { name: "Kwek-Kwek", desc: "Hard-boiled quail eggs covered in a vibrant orange batter and deep-fried.", image: "Kwek-Kwek.jpg" },
      { name: "Inihaw na Liempo", desc: "Grilled pork belly marinated in soy sauce, calamansi, and garlic.", image: "Inihaw na Liempo.jpg" }
    ]
  }
];

const festivals = [
  { 
    name: "Kadayawan Festival", 
    date: "August", 
    location: "Davao City", 
    desc: "A thanksgiving celebration for nature's bounty and indigenous tribes. A vibrant, colorful, and joyous celebration of life, heritage, and harmony.", 
    image: "KADAYAWAN.jpg" 
  },
  { 
    name: "Sinulog Festival", 
    date: "January", 
    location: "Cebu", 
    desc: "Honors the Santo Niño (Child Jesus). Features vibrant street parades, the signature 'two steps forward, one step backward' dance, and energetic drums.", 
    image: "KADAYWAN FESTIVAL.jpg" 
  },
  { 
    name: "Ati-Atihan Festival", 
    date: "January", 
    location: "Kalibo, Aklan", 
    desc: "Known for participants painting faces with soot and dancing in indigenous costumes.",
    image: null
  },
  { 
    name: "Dinagyang Festival", 
    date: "January", 
    location: "Iloilo City", 
    desc: "Features intricate, choreographed street dancing.",
    image: null
  },
  { 
    name: "Panagbenga Festival", 
    date: "February", 
    location: "Baguio City", 
    desc: "Known as the Flower Festival, featuring magnificent floats covered entirely in fresh flowers.",
    image: null
  },
  { 
    name: "Pahiyas Festival", 
    date: "May", 
    location: "Lucban, Quezon", 
    desc: "Houses are decorated with kiping (rice wafers) and agricultural products in honor of San Isidro Labrador.",
    image: null
  },
  { 
    name: "MassKara Festival", 
    date: "October", 
    location: "Bacolod City", 
    desc: "The 'Festival of Smiles' featuring street dancers wearing elaborate, smiling masks.",
    image: null
  }
];

// --- Weather Widget ---
const WeatherWidget = ({ lat, lng }: { lat: number, lng: number }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        console.error("Failed to fetch weather", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lng]);

  if (loading) return <div className="animate-pulse bg-stone-100 h-24 rounded-2xl"></div>;
  if (!weather) return null;

  return (
    <div className="bg-emerald-600 p-6 rounded-[32px] text-white shadow-xl shadow-emerald-100 flex items-center justify-between">
      <div>
        <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">Current Weather</div>
        <div className="text-3xl font-black">{weather.temperature}°C</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold capitalize">
          {weather.weathercode <= 3 ? 'Clear Sky' : 
           weather.weathercode <= 48 ? 'Foggy' : 
           weather.weathercode <= 67 ? 'Rainy' : 
           weather.weathercode <= 77 ? 'Snowy' : 'Stormy'}
        </div>
        <div className="text-[10px] opacity-80">Wind: {weather.windspeed} km/h</div>
      </div>
    </div>
  );
};

// --- Video Modal ---
const VideoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform scale-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
        >
          <X size={24} />
        </button>
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/1ua4LzzmFGM?autoplay=1" 
          title="Philippines Tourism Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// --- Components ---

const Navbar = ({ onNavigate, currentView }: { onNavigate: (view: string) => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 mr-3 transition-transform overflow-hidden border border-stone-100 hover:scale-105 duration-300">
              <img src="trekora.jpg" className="w-full h-full object-cover p-1" alt="Trekora Logo" />
            </div>
            <div>
              <span className="text-xl font-black text-stone-900 block leading-tight tracking-tight">Trekora</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-600 font-black">Above the Philippines</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Mountains', 'Cuisines', 'Festivals', 'Map', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => onNavigate(item.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-bold transition-colors hover:text-emerald-600 ${
                  currentView === item.toLowerCase().replace(' ', '-') ? 'text-emerald-600' : 'text-stone-600'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 absolute w-full left-0 px-4 py-6 space-y-4 shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          {['Home', 'Mountains', 'Cuisines', 'Festivals', 'Map', 'About'].map((item) => (
            <button
              key={item}
              onClick={() => {
                onNavigate(item.toLowerCase().replace(' ', '-'));
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-stone-600 font-bold hover:bg-stone-50 rounded-lg"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const MountainCard: React.FC<{ mountain: Mountain, onClick: () => void }> = ({ mountain, onClick }) => {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={mountain.image} 
          alt={mountain.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=800'; }}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
            mountain.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
            mountain.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
            'bg-rose-100 text-rose-700'
          }`}>
            {mountain.difficulty}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-stone-400 text-xs mb-2">
          <MapPin size={14} className="mr-1 text-emerald-500" />
          {mountain.location.split(',')[0]}
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">{mountain.name}</h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {mountain.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="text-stone-500 text-sm">
            <span className="font-semibold text-stone-900">{mountain.elevation}m</span> ASL
          </div>
          <button className="text-emerald-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
            View Details <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MapEmbed = ({ lat, lng, name }: { lat: number, lng: number, name: string }) => {
  const fallbackUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full h-[450px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-stone-100">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={fallbackUrl}
        title={`Map of ${name}`}
      ></iframe>
    </div>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (view: string) => void }) => (
  <footer className="bg-stone-900 text-stone-400 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white mr-3">
              <MountainIcon size={24} />
            </div>
            <span className="text-2xl font-bold text-white">Trekora</span>
          </div>
          <p className="max-w-md mb-8 leading-relaxed">
            Discover towering summits, mist-covered forests, and breathtaking highlands across the country. Your journey above the clouds starts here.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/18FvnqrnSj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            {[Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Explore Trekora</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-500 transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate('mountains')} className="hover:text-emerald-500 transition-colors">Mountains</button></li>
            <li><button onClick={() => onNavigate('cuisines')} className="hover:text-emerald-500 transition-colors">Cuisines</button></li>
            <li><button onClick={() => onNavigate('festivals')} className="hover:text-emerald-500 transition-colors">Festivals</button></li>
            <li><button onClick={() => onNavigate('map')} className="hover:text-emerald-500 transition-colors">Map Search</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center"><MapPin size={16} className="mr-2 text-emerald-500" /> Manila, Philippines</li>
            <li className="flex items-center"><Phone size={16} className="mr-2 text-emerald-500" /> +63 900 123 4567</li>
            <li className="flex items-center"><FileText size={16} className="mr-2 text-emerald-500" /> trekora.adventures@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-stone-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Trekora. All rights reserved. | Above the Philippines</p>
      </div>
    </div>
  </footer>
);

const AboutPage = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="relative h-[50vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
          alt="JIB College" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <img src="jib.png" className="w-32 h-32 mx-auto mb-8 bg-white p-4 rounded-3xl shadow-2xl object-contain" alt="JIB Logo" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Joji Ilagan College of Business and Tourism</h1>
          <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">Pioneering Excellence Since 1982</p>
        </div>
      </div>
    </section>

    {/* Official Info */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center text-emerald-600 font-bold mb-4">
              <Award size={20} className="mr-2" /> <span>Official Institution Profile</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-8">World-Class Hospitality & Tourism Education</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Joji Ilagan College of Business and Tourism (JIB-CBT) is a premier educational institution in the Philippines, recognized for its specialized programs in hospitality, tourism, and culinary arts. Founded in 1982, JIB has consistently set the standard for industry-aligned education in Mindanao.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              As part of the Joji Ilagan International Schools, the college is committed to producing globally competitive professionals. It is the first school in Mindanao to be accredited by international bodies, ensuring that its curriculum meets global standards.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-2xl font-black text-stone-900">1982</div>
                <div className="text-xs text-stone-500 uppercase font-bold">Year Founded</div>
              </div>
              <div className="border-l-4 border-stone-900 pl-4">
                <div className="text-2xl font-black text-stone-900">Davao City</div>
                <div className="text-xs text-stone-500 uppercase font-bold">Main Campus</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://www.jib.edu.ph/web/image/2942" className="rounded-[40px] shadow-2xl" alt="Campus Life" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 p-8 rounded-3xl text-white shadow-xl hidden md:block hover:-translate-y-2 transition-transform duration-300">
              <Globe size={32} className="mb-4" />
              <div className="text-lg font-bold">Global Network</div>
              <div className="text-xs opacity-80">International Internships</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Contact Info */}
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-[60px] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-[100px]"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-8">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="text-emerald-500 mr-4 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Davao Campus</h4>
                    <p className="text-stone-400">Gov. Chavez St., Davao City, 8000 Philippines</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-emerald-500 mr-4 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Admissions</h4>
                    <p className="text-stone-400">+63 82 227 5602 | +63 917 701 1746</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="text-emerald-500 mr-4 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Official Website</h4>
                    <p className="text-stone-400">www.jojiilaganschools.edu.ph</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-80 rounded-3xl overflow-hidden border-4 border-stone-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4435668755787!2d125.61514587499803!3d7.0744610929283125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d98ff1ad573%3A0xeb97da4ae22505d2!2sJoji%20Ilagan%20Career%20Centre%20Foundation%20Inc.!5e0!3m2!1sid!2sau!4v1771763380686!5m2!1sid!2sau" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const CuisinesPage = () => (
  <div className="pt-20 bg-stone-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Utensils className="mx-auto text-emerald-600 mb-4" size={48} />
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">Traditional Cuisines & Delicacies</h1>
        <p className="text-stone-600 text-lg">A culinary journey through the rich and diverse flavors of the Philippines.</p>
      </div>

      {cuisines.map((group, groupIdx) => (
        <div key={groupIdx} className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-stone-900">{group.category}</h2>
            <div className="h-px bg-stone-200 flex-grow mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {group.items.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-2 transition-all duration-300 border border-stone-100 group"
              >
                <div className="aspect-square rounded-[24px] overflow-hidden mb-5 bg-stone-100 relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=800'; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2 px-2">{item.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed px-2 pb-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FestivalsPage = () => (
  <div className="pt-20 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Calendar className="mx-auto text-emerald-600 mb-4" size={48} />
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">Cultural Festivals</h1>
        <p className="text-stone-600 text-lg">Experience the vibrant colors, rhythmic dances, and deep-rooted traditions of the archipelago.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {festivals.map((festival, idx) => (
          <div 
            key={idx} 
            className="flex flex-col sm:flex-row bg-stone-50 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-2 border border-stone-100 transition-all duration-300 group"
          >
            {festival.image && (
              <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden shrink-0">
                <img 
                  src={festival.image} 
                  alt={festival.name}
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=800'; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            )}
            <div className={`p-8 flex flex-col justify-center ${!festival.image ? 'w-full' : 'sm:w-3/5'}`}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-widest">
                  <Calendar size={12} className="mr-1.5" /> {festival.date}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-stone-200 text-stone-800 uppercase tracking-widest">
                  <MapPin size={12} className="mr-1.5" /> {festival.location}
                </span>
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-3">{festival.name}</h3>
              <p className="text-stone-600 leading-relaxed">
                {festival.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StartExploringPage = ({ onSelectMountain }: { onSelectMountain: (m: Mountain) => void }) => {
  return (
    <div className="pt-20 h-screen flex flex-col relative">
      <div className="flex-1 w-full bg-stone-100 relative">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://maps.google.com/maps?q=Philippines&t=&z=6&ie=UTF8&iwloc=&output=embed"
          title="Interactive Map of the Philippines"
        ></iframe>
      </div>

      {/* Map Selection Sidebar Overlay */}
      <div className="absolute top-28 right-4 md:right-8 z-10 w-[90%] md:w-80 max-h-[70vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col pointer-events-auto">
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
          <h3 className="font-black text-lg">Destinations</h3>
          <span className="text-xs bg-emerald-600 px-2 py-1 rounded-full font-bold">{mountains.length} Peaks</span>
        </div>
        <div className="overflow-y-auto p-3 space-y-2">
          {mountains.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMountain(m)}
              className="w-full flex items-center gap-4 p-3 hover:bg-emerald-50 rounded-2xl transition-all text-left border border-transparent hover:border-emerald-100 group"
            >
              <img 
                src={m.image} 
                alt={m.name} 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=800'; }}
                className="w-14 h-14 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" 
              />
              <div>
                <div className="font-bold text-stone-900 text-sm">{m.name}</div>
                <div className="text-xs text-stone-500 font-medium flex items-center mt-1">
                  <MapPin size={10} className="mr-1 text-emerald-500" />{m.elevation}m ASL
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Overlay Info - Only visible on medium screens and up */}
      <div className="absolute top-28 left-8 z-10 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-stone-200 p-6 pointer-events-none hidden md:block">
        <h2 className="text-2xl font-black text-stone-900 mb-2">Interactive Map</h2>
        <p className="text-stone-500 text-sm leading-relaxed mb-4">Select a destination from the list to explore the majestic mountains of the Philippines.</p>
        <div className="flex items-center text-xs font-bold text-emerald-600">
          <MapPin size={14} className="mr-1" /> Ready to Explore
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ onSelectMountain, setIsVideoOpen }: { onSelectMountain: (m: Mountain) => void, setIsVideoOpen: (open: boolean) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filteredMountains = useMemo(() => {
    return mountains.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || m.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="Mount Pulag.jpg" 
            alt="Mountains" 
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=800'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-1000">
            <span className="inline-block px-4 py-1.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6 shadow-lg">
              Trekora Dashboard
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] drop-shadow-xl">
              Above the <span className="text-emerald-400">Philippines</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed font-light drop-shadow-md">
              Discover towering summits, mist-covered forests, and breathtaking highlands across the country. Your journey above the clouds starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('mountains-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
              >
                Start Exploring
              </button>
              <a 
                href="https://www.facebook.com/share/18FvnqrnSj/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl"
              >
                <Facebook size={20} />
                Join our Community
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-stone-50 border-b border-stone-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input 
                type="text" 
                placeholder="Search mountains..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficultyFilter(lvl)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    difficultyFilter === lvl 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mountains Grid */}
      <section id="mountains-grid" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">The Great Peaks</h2>
            <p className="text-stone-500">Select a mountain to view detailed hiking guides and maps.</p>
          </div>
          
          {filteredMountains.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredMountains.map((m) => (
                <MountainCard key={m.id} mountain={m} onClick={() => onSelectMountain(m)} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
              <p className="text-stone-400 font-medium">No mountains found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-24 bg-stone-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/10 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4 block">The Trekora Experience</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Why Visit the Country's Peaks?</h2>
              <div className="space-y-8">
                {[
                  { title: 'Untouched Biodiversity', desc: 'Home to the Philippine Eagle and thousands of endemic flora and fauna species found nowhere else on Earth.' },
                  { title: 'Cultural Heritage', desc: 'Many peaks are sacred ancestral domains of Indigenous Peoples, offering a deep spiritual connection to the land.' },
                  { title: 'Challenging Terrains', desc: 'From mossy forests to volcanic craters, the Philippines offers some of the most beautiful climbs in Southeast Asia.' }
                ].map((item, i) => (
                  <div key={i} className="flex group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 mr-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-stone-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden rotate-3 shadow-2xl hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://www.thehiplife.asia/wp-content/uploads/2025/08/SOLO-DINING-1-1.png" 
                  alt="Nature" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 aspect-square w-64 rounded-3xl overflow-hidden -rotate-6 border-8 border-stone-900 shadow-2xl hidden md:block hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://www.edgeofexistence.org/wp-content/uploads/2017/06/Philippine-Eagle-6_ALAIN-PASCUA_copyrighted-1000x667.jpg" 
                  alt="Philippine Eagle" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Hiking Guide */}
      <section className="py-24 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Leaf className="mx-auto text-emerald-600 mb-4" size={40} />
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-6">Responsible Hiking Guide</h2>
            <p className="text-stone-600">Our mountains are fragile ecosystems and sacred lands. Please follow the Leave No Trace principles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Plan Ahead', desc: 'Secure all permits and hire accredited guides. Never climb without proper authorization.' },
              { title: 'Pack It Out', desc: 'Whatever you bring to the mountain, bring it back down. This includes all trash and food waste.' },
              { title: 'Respect Culture', desc: 'Many mountains are ancestral domains. Observe silence and follow local rituals when required.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold mb-6">{i + 1}</div>
                <h4 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const DetailPage = ({ mountain, onBack }: { mountain: Mountain, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 bg-white animate-in fade-in duration-500">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={mountain.image} 
          alt={mountain.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=800'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={onBack}
              className="flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" /> Back to Mountains
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                {mountain.difficulty}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                {mountain.elevation}m ASL
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-md">{mountain.name}</h1>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-black text-stone-900 mb-6">Overview</h2>
                <p className="text-stone-600 text-lg leading-relaxed mb-8">
                  {mountain.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Location', value: mountain.location.split(',')[0], icon: MapPin },
                    { label: 'Duration', value: mountain.duration, icon: Clock },
                    { label: 'Best Time', value: mountain.bestTime, icon: Info },
                    { label: 'Region', value: mountain.region, icon: MapPin }
                  ].map((item, i) => (
                    <div key={i} className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                      <item.icon size={18} className="text-emerald-600 mb-2" />
                      <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">{item.label}</div>
                      <div className="text-sm font-bold text-stone-900">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permits */}
              <div className="bg-emerald-50 p-8 md:p-12 rounded-[40px] border border-emerald-100">
                <h3 className="text-2xl font-black text-stone-900 mb-8 flex items-center">
                  <FileText className="mr-3 text-emerald-600" /> Required Permits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Where to Apply</h4>
                      <p className="text-stone-700 font-medium">{mountain.permits.where}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Contact Information</h4>
                      <p className="text-stone-700 font-medium flex items-center"><Phone size={14} className="mr-2" /> {mountain.permits.contact}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Fees</h4>
                      <p className="text-stone-700 font-medium flex items-center"><CreditCard size={14} className="mr-2" /> {mountain.permits.fees}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">Required Documents</h4>
                    <ul className="space-y-3">
                      {mountain.permits.documents.map((doc, i) => (
                        <li key={i} className="flex items-start text-sm text-stone-600">
                          <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 mr-3 mt-0.5 shrink-0">
                            <ChevronRight size={12} />
                          </div>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Get There */}
              <div>
                <h3 className="text-2xl font-black text-stone-900 mb-8">How to Get There</h3>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-500 mr-6 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-stone-900 mb-2">From Manila</h4>
                      <p className="text-stone-600 leading-relaxed">{mountain.howToGetThere.fromManila}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-500 mr-6 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-stone-900 mb-2">Local Route</h4>
                      <p className="text-stone-600 leading-relaxed">{mountain.howToGetThere.localRoute}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div>
                <h3 className="text-2xl font-black text-stone-900 mb-8">Interactive Map</h3>
                <MapEmbed lat={mountain.coordinates.lat} lng={mountain.coordinates.lng} name={mountain.name} />
                <p className="mt-4 text-xs text-stone-400 italic text-center">Interactive map showing the general location of {mountain.name}. Use zoom controls to explore the terrain.</p>
              </div>
            </div>

            {/* Sidebar Data */}
            <div className="space-y-8">
              <WeatherWidget lat={mountain.coordinates.lat} lng={mountain.coordinates.lng} />
              
              {/* Things to Bring */}
              <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
                <h4 className="text-lg font-black text-stone-900 mb-6">Things to Bring</h4>
                <ul className="space-y-4">
                  {mountain.thingsToBring.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-stone-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Reminders */}
              <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
                <h4 className="text-lg font-black text-rose-900 mb-6 flex items-center">
                  <ShieldCheck size={20} className="mr-2" /> Safety Reminders
                </h4>
                <ul className="space-y-4">
                  {mountain.safetyReminders.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-rose-800">
                      <Info size={14} className="mr-2 mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-stone-900 p-8 rounded-3xl text-white shadow-xl shadow-stone-200">
                <h4 className="text-xl font-bold mb-4">Ready to Climb?</h4>
                <p className="text-stone-400 text-sm mb-6 leading-relaxed">Make sure to contact the tourism office at least 2 weeks before your planned date.</p>
                <a 
                  href={`tel:${mountain.permits.contact.replace(/\s/g, '')}`}
                  className="block w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-colors text-center shadow-lg"
                >
                  Contact Tourism Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedMountain(null);
    window.scrollTo(0, 0);
  };

  const handleSelectMountain = (m: Mountain) => {
    setSelectedMountain(m);
    setCurrentView('mountain-detail');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      <main>
        {currentView === 'home' && <HomePage onSelectMountain={handleSelectMountain} setIsVideoOpen={setIsVideoOpen} />}
        {currentView === 'mountain-detail' && selectedMountain && (
          <DetailPage mountain={selectedMountain} onBack={() => handleNavigate('home')} />
        )}
        {currentView === 'cuisines' && <CuisinesPage />}
        {currentView === 'festivals' && <FestivalsPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'map' && <StartExploringPage onSelectMountain={handleSelectMountain} />}
        {currentView === 'mountains' && (
          <div className="pt-40 pb-20 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-black mb-12">All Mountains</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {mountains.map((m) => (
                  <MountainCard key={m.id} mountain={m} onClick={() => handleSelectMountain(m)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}