import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, setSelectedCategory, setPage } = useFilters();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        setPage(1);           // reset page first
        setSelectedCategory(''); // clear category
        setSearchQuery(localQuery);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [localQuery]);

  return (
    <div className="relative w-full group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
      <input
        type="text"
        placeholder="Search products by name..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="w-full bg-[#f8f8f8] border border-gray-200 rounded-lg py-2.5 pl-10 pr-10 focus:outline-none focus:border-black transition-all placeholder:text-gray-400 text-sm"
      />
      {localQuery && (
        <button
          onClick={() => setLocalQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
