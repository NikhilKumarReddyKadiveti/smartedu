
import React, { useState } from 'react';
import { geminiService } from '../services/gemini';
import { User } from '../types';

const CampusNavModule: React.FC<{ user: User }> = ({ user }) => {
  const [query, setQuery] = useState('');
  const [directions, setDirections] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mapType, setMapType] = useState<'STANDARD' | 'SATELLITE'>('STANDARD');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await geminiService.getDirections(query, "Main Gate");
      setDirections(result || "No directions found.");
    } catch (err) {
      setDirections("Error fetching directions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const quickLocations = [
    { label: 'Admin Block', icon: '🏛️' },
    { label: 'Food Court', icon: '🍔' },
    { label: 'Library', icon: '📚' },
    { label: 'Sports Complex', icon: '⚽' },
    { label: 'Lab Wing', icon: '🧪' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Campus Map</h2>
          <p className="text-sm text-gray-500">Live navigation & block search</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setMapType('STANDARD')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition ${mapType === 'STANDARD' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
          >
            2D
          </button>
          <button 
            onClick={() => setMapType('SATELLITE')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition ${mapType === 'SATELLITE' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
          >
            3D
          </button>
        </div>
      </div>
      
      <div className="relative group">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search classrooms, labs, facilities..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-xl shadow-indigo-100/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold active:scale-95 transition shadow-lg shadow-indigo-200"
        >
          {loading ? '...' : 'Go'}
        </button>
      </div>

      {/* Quick Access Grid */}
      <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
        {quickLocations.map(loc => (
          <button 
            key={loc.label}
            onClick={() => { setQuery(loc.label); handleSearch(); }}
            className="flex-shrink-0 flex flex-col items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 min-w-[90px] hover:border-indigo-200 transition"
          >
            <span className="text-2xl mb-1">{loc.icon}</span>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{loc.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Map Iframe (Simulated Live Map) */}
      <div className="bg-gray-200 rounded-3xl h-64 relative overflow-hidden shadow-inner border-4 border-white">
        <iframe 
          title="Campus Map"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src={`https://www.openstreetmap.org/export/embed.html?bbox=-0.01%2C51.50%2C0.01%2C51.52&layer=${mapType === 'SATELLITE' ? 'cyclemap' : 'mapnik'}`}
          className="grayscale-[0.2] brightness-[1.05]"
        />
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
           <button className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg text-indigo-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/></svg></button>
           <button className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg text-indigo-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v10h2V7z"/></svg></button>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-800 shadow-lg">
          📍 You are near Library
        </div>
      </div>

      {directions && (
        <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-200 animate-in zoom-in-95 duration-300">
          <div className="flex items-center mb-4 text-indigo-100">
            <svg className="w-6 h-6 mr-3 bg-white/20 p-1 rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            <h3 className="font-bold text-white uppercase tracking-widest text-xs">Route Summary</h3>
          </div>
          <div className="text-white text-sm font-medium leading-relaxed opacity-90">
            {directions}
          </div>
          <button className="mt-6 w-full bg-white text-indigo-600 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-[0.98] transition">
            Start Live Navigation
          </button>
        </div>
      )}
    </div>
  );
};

export default CampusNavModule;
