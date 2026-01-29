
import React, { useState, useEffect, useRef } from 'react';
import { Search, Info, MapPin, ChevronRight, FileText, Wheat, Building, House, Building2 } from 'lucide-react';
import { ZONING_DATA } from '../constants';
import { ZoningControl } from '../types';

interface Props {
  onSelect: (item: ZoningControl) => void;
}

const SearchInterface: React.FC<Props> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ZoningControl[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      const filtered = ZONING_DATA.filter(z => 
        z.code.toLowerCase().includes(val.toLowerCase()) || 
        z.name.toLowerCase().includes(val.toLowerCase()) ||
        z.intent.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const isAgriMatch = query.toLowerCase().includes('agri');
  const isCoreMatch = query.toLowerCase().includes('core') || query.toLowerCase().includes('mc');

  const getResultIcon = (code: string) => {
    if (code.startsWith('AGR')) return <Wheat size={18} className="text-green-700" />;
    if (code.startsWith('MC')) return <Building size={18} className="text-purple-700" />;
    if (code === 'RO1') return <House size={18} className="text-yellow-600" />;
    if (code === 'RM1') return <Building2 size={18} className="text-orange-700" />;
    return <span className="text-[10px]">{code}</span>;
  };

  const getResultColor = (code: string) => {
    if (code.startsWith('AGR')) return 'bg-green-100';
    if (code.startsWith('MC')) return 'bg-purple-100';
    if (code === 'RO1') return 'bg-yellow-100';
    if (code === 'RM1') return 'bg-orange-100';
    return 'bg-blue-50';
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative" ref={containerRef}>
      <div className="relative group z-20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          className={`block w-full pl-12 pr-4 py-4 border border-gray-200 bg-white shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all text-lg font-google ${isFocused && results.length > 0 ? 'rounded-t-[2rem]' : 'rounded-full'}`}
          placeholder="Search Zoning Code (e.g. RO1) or Property Type..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={handleSearch}
        />
      </div>

      {isFocused && (results.length > 0 || isAgriMatch || isCoreMatch) && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-b-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 z-10 border-t-0">
          <div className="p-3 space-y-1 max-h-[400px] overflow-y-auto">
            {isAgriMatch && (
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                <Wheat size={12} className="text-green-600" />
                <span>Agricultural Classifications</span>
              </div>
            )}

            {isCoreMatch && !isAgriMatch && (
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                <Building size={12} className="text-purple-600" />
                <span>Mixed Use Classifications</span>
              </div>
            )}
            
            {results.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  onSelect(item);
                  setIsFocused(false);
                  setQuery('');
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-blue-50/50 rounded-2xl transition-colors group text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-google ${getResultColor(item.code)}`}>
                    {getResultIcon(item.code)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{item.code}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.intent}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
            
            {!results.length && (isAgriMatch || isCoreMatch) && (
              <div className="p-8 text-center text-gray-400 italic">
                No exact matches for "{query}". Try "AGR1", "MC1", or "Mixed Use".
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
             <button className="text-xs font-google font-bold text-blue-600 hover:underline">
               View All Municipal Scheme Controls
             </button>
          </div>
        </div>
      )}
      
      {!query && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { tag: 'RO1 (Res)', icon: <House size={14} className="text-[#FBBC05]" /> },
            { tag: 'Agriculture', icon: <Wheat size={14} className="text-green-600" /> },
            { tag: 'Core Mix', icon: <Building size={14} className="text-purple-600" /> },
            { tag: 'MC1-MC4', icon: <Building size={14} className="text-purple-600" /> },
            { tag: 'RM1 (Impact)', icon: <Building2 size={14} className="text-orange-600" /> },
            { tag: 'Relaxations', icon: <Info size={14} /> }
          ].map(({ tag, icon }) => (
            <button 
              key={tag}
              onClick={() => {
                const searchTag = tag === 'MC1-MC4' || tag === 'Core Mix' ? 'MC' : tag.split(' ')[0];
                setQuery(searchTag);
                setIsFocused(true);
                const filtered = ZONING_DATA.filter(z => 
                  z.code.toLowerCase().includes(searchTag.toLowerCase()) || 
                  z.name.toLowerCase().includes(searchTag.toLowerCase())
                );
                setResults(filtered);
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95"
            >
              {icon}
              <span className="font-medium">{tag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
