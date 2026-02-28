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
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { mountains, Mountain } from './mountains';

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
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
      >
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
          title="Mindanao Tourism Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </motion.div>
    </div>
  );
};

// Fix Leaflet default icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- Components ---

const Navbar = ({ onNavigate, currentView }: { onNavigate: (view: string) => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 mr-3 group-hover:scale-105 transition-transform overflow-hidden border border-stone-100">
              <img src="https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/trekora.jpg?raw=true" className="w-full h-full object-contain p-1" alt="JIB Logo" />
            </div>
            <div>
              <span className="text-xl font-black text-stone-900 block leading-tight tracking-tight">Mindanao Peaks</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-600 font-black">Majestic Mindanao</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Mountains', 'Start Exploring', 'About'].map((item) => (
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-stone-100 absolute w-full left-0 px-4 py-6 space-y-4 shadow-xl"
          >
            {['Home', 'Mountains', 'Start Exploring', 'About'].map((item) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MountainCard: React.FC<{ mountain: Mountain, onClick: () => void }> = ({ mountain, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 transition-all group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={mountain.image} 
          alt={mountain.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
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
      <div className="p-6">
        <div className="flex items-center text-stone-400 text-xs mb-2">
          <MapPin size={14} className="mr-1" />
          {mountain.location.split(',')[0]}
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">{mountain.name}</h3>
        <div className="flex justify-between items-center">
          <div className="text-stone-500 text-sm">
            <span className="font-semibold text-stone-900">{mountain.elevation}m</span> ASL
          </div>
          <button className="text-emerald-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
            View Details <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MapEmbed = ({ lat, lng, name }: { lat: number, lng: number, name: string }) => {
  // Using a simple Google Maps Embed iframe with coordinates
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}&zoom=12`;
  
  // For demo purposes without an API key, we can use a standard search embed
  const fallbackUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full h-[450px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
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
            <span className="text-2xl font-bold text-white">Mindanao Peaks</span>
          </div>
          <p className="max-w-md mb-8 leading-relaxed">
            Dedicated to promoting the natural beauty of Mindanao's highlands while advocating for responsible tourism and environmental conservation.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-500 transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate('mountains')} className="hover:text-emerald-500 transition-colors">Mountains</button></li>
            <li><button onClick={() => onNavigate('start-exploring')} className="hover:text-emerald-500 transition-colors">Start Exploring</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-500 transition-colors">About Us</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center"><MapPin size={16} className="mr-2 text-emerald-500" /> Davao City, Philippines</li>
            <li className="flex items-center"><Phone size={16} className="mr-2 text-emerald-500" /> +63 82 123 4567</li>
            <li className="flex items-center"><FileText size={16} className="mr-2 text-emerald-500" /> ranches.madrid@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-stone-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Mindanao Peaks. All rights reserved. | Official Website of Mindanao Tourism Highlands</p>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src="https://github.com/ranchesmadrid-sketch/wonderpeak/blob/main/jib.png?raw=true" className="w-32 h-32 mx-auto mb-8 bg-white p-4 rounded-3xl shadow-2xl" alt="JIB Logo" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Joji Ilagan College of Business and Tourism</h1>
          <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">Pioneering Excellence Since 1982</p>
        </motion.div>
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
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 p-8 rounded-3xl text-white shadow-xl hidden md:block">
              <Globe size={32} className="mb-4" />
              <div className="text-lg font-bold">Global Network</div>
              <div className="text-xs opacity-80">International Internships</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">Specialized Programs</h2>
          <p className="text-stone-500">Industry-focused curricula designed for global careers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'BS in Tourism Management', desc: 'Focuses on travel industry operations, destination marketing, and sustainable tourism practices.', icon: MapIcon },
            { title: 'BS in Hospitality Management', desc: 'Comprehensive training in hotel and restaurant operations, guest services, and management.', icon: BookOpen },
            { title: 'Culinary Arts & Patisserie', desc: 'Professional culinary training with international standards and state-of-the-art facilities.', icon: Award }
          ].map((prog, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-stone-100 hover:shadow-xl transition-all">
              <prog.icon size={32} className="text-emerald-600 mb-6" />
              <h4 className="text-xl font-bold text-stone-900 mb-3">{prog.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed">{prog.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact Info */}
    <section className="py-24 bg-white">
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

const StartExploringPage = ({ onSelectMountain }: { onSelectMountain: (m: Mountain) => void }) => {
  return (
    <div className="pt-20 h-screen flex flex-col">
      <div className="flex-1 relative z-0">
        <MapContainer 
          center={[8.0, 125.0]} 
          zoom={7} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mountains.map((m) => (
            <Marker key={m.id} position={[m.coordinates.lat, m.coordinates.lng]}>
              <Popup className="custom-popup">
                <div className="p-2 min-w-[200px]">
                  <img src={m.image} alt={m.name} className="w-full h-24 object-cover rounded-lg mb-3" referrerPolicy="no-referrer" />
                  <h3 className="font-black text-stone-900 text-lg mb-1">{m.name}</h3>
                  <div className="text-emerald-600 font-bold text-xs mb-2">{m.elevation}m ASL</div>
                  <p className="text-stone-500 text-xs line-clamp-2 mb-4 leading-relaxed">{m.description}</p>
                  <button 
                    onClick={() => onSelectMountain(m)}
                    className="w-full bg-stone-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Overlay Info */}
        <div className="absolute top-8 left-8 z-[1000] pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-stone-100 max-w-xs pointer-events-auto"
          >
            <h2 className="text-2xl font-black text-stone-900 mb-2">Mindanao Peaks</h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">Click on the markers to explore the majestic mountains of the south.</p>
            <div className="flex items-center text-xs font-bold text-emerald-600">
              <MapPin size={14} className="mr-1" /> {mountains.length} Peaks Mapped
            </div>
          </motion.div>
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
            src="https://cdn.britannica.com/17/166817-050-1BDC8905/Mount-Apo-island-Mindanao-Philippines.jpg" 
            alt="Mindanao Mountains" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
              Adventure Awaits
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
              Explore the <span className="text-emerald-400">Majestic</span> Mountains of Mindanao
            </h1>
            <p className="text-lg text-stone-200 mb-10 leading-relaxed">
              Discover the highest peaks, mossy forests, and sacred grounds of the Philippines' southern frontier. Your journey to the clouds starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('mountains-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
              >
                Start Exploring
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Watch
              </button>
            </div>
          </motion.div>
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
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4 block">The Mindanao Experience</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Why Visit Mindanao's Mountains?</h2>
              <div className="space-y-8">
                {[
                  { title: 'Untouched Biodiversity', desc: 'Home to the Philippine Eagle and thousands of endemic flora and fauna species found nowhere else on Earth.' },
                  { title: 'Cultural Heritage', desc: 'Many peaks are sacred ancestral domains of Indigenous Peoples, offering a deep spiritual connection to the land.' },
                  { title: 'Challenging Terrains', desc: 'From mossy forests to volcanic craters, Mindanao offers some of the most technical climbs in Southeast Asia.' }
                ].map((item, i) => (
                  <div key={i} className="flex group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 mr-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
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
              <div className="aspect-square rounded-[40px] overflow-hidden rotate-3 shadow-2xl">
                <img 
                  src="https://www.thehiplife.asia/wp-content/uploads/2025/08/SOLO-DINING-1-1.png" 
                  alt="Mindanao Nature" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 aspect-square w-64 rounded-3xl overflow-hidden -rotate-6 border-8 border-stone-900 shadow-2xl hidden md:block">
                <img 
                  src="https://www.edgeofexistence.org/wp-content/uploads/2017/06/Philippine-Eagle-6_ALAIN-PASCUA_copyrighted-1000x667.jpg" 
                  alt="Mindanao Nature" 
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
            <p className="text-stone-600">Mindanao's mountains are fragile ecosystems and sacred lands. Please follow the Leave No Trace principles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Plan Ahead', desc: 'Secure all permits and hire accredited guides. Never climb without proper authorization.' },
              { title: 'Pack It Out', desc: 'Whatever you bring to the mountain, bring it back down. This includes all trash and food waste.' },
              { title: 'Respect Culture', desc: 'Many mountains are ancestral domains. Observe silence and follow local rituals when required.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100">
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
    <div className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={mountain.image} 
          alt={mountain.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={onBack}
              className="flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Mountains
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {mountain.difficulty}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {mountain.elevation}m ASL
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white">{mountain.name}</h1>
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
                      <h4 className="text-lg font-bold text-stone-900 mb-2">From Davao City</h4>
                      <p className="text-stone-600 leading-relaxed">{mountain.howToGetThere.fromDavao}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-500 mr-6 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-stone-900 mb-2">From Cagayan de Oro</h4>
                      <p className="text-stone-600 leading-relaxed">{mountain.howToGetThere.fromCDO}</p>
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

              {/* Weather & CTA */}
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
                  className="block w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-colors text-center"
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
        {currentView === 'about' && <AboutPage />}
        {currentView === 'start-exploring' && <StartExploringPage onSelectMountain={handleSelectMountain} />}
        
        {/* Placeholder for other views */}
        {currentView === 'mountains' && (
          <div className="pt-40 pb-20">
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
