import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ScanLine } from 'lucide-react';
import SearchBar from './SearchBar';
import BarcodeSearch from './BarcodeSearch';
import { useFilters } from '../context/FilterContext';

const Navbar = () => {
  const { setSearchQuery, setSelectedCategory, setPage } = useFilters();
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 py-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => {
            setSearchQuery('');
            setSelectedCategory('');
            setPage(1);
          }}
          className="flex items-center gap-3 group mt-1"
        >
          <img src="/favicon.svg" alt="FoodLens Logo" className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-black leading-none">
              FoodLens
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] font-syncopate mt-1 group-hover:text-black transition-colors">
              Food Facts Explorer
            </span>
          </div>
        </Link>
        
        {/* Search Controls */}
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <div className="relative w-full">
            <SearchBar />
          </div>
          <div className="w-full sm:w-auto">
            <BarcodeSearch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
