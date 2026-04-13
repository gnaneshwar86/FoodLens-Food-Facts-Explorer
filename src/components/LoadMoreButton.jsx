import React from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

const LoadMoreButton = () => {
  const { setPage, loading, hasMore, products } = useFilters();

  if (!hasMore || products.length === 0) return null;

  return (
    <div className="flex justify-center py-12">
      <button
        onClick={() => setPage(prev => prev + 1)}
        disabled={loading}
        className="flex items-center gap-3 bg-black text-white hover:bg-gray-800 disabled:opacity-20 px-10 py-4 rounded-lg font-bold transition-all hover:-translate-y-1 shadow-xl shadow-black/10"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span className="font-syncopate text-[10px] uppercase tracking-[0.5em]">Inventory</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
