import React, { useMemo } from 'react';
import useProducts from '../hooks/useProducts';
import { useFilters } from '../context/FilterContext';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SortControls from '../components/SortControls';
import LoadMoreButton from '../components/LoadMoreButton';
import { Loader2, Inbox, AlertCircle } from 'lucide-react';

const HomePage = () => {
  useProducts(); // Initialize fetching
  const { products, loading, error, sortOption } = useFilters();

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return (a.product_name || '').localeCompare(b.product_name || '');
        case 'name-desc':
          return (b.product_name || '').localeCompare(a.product_name || '');
        case 'grade-asc': {
          const gA = a.nutrition_grades || 'z';
          const gB = b.nutrition_grades || 'z';
          return gA.localeCompare(gB);
        }
        case 'grade-desc': {
          const gA = a.nutrition_grades || '';
          const gB = b.nutrition_grades || '';
          return gB.localeCompare(gA);
        }
        default:
          return 0;
      }
    });
  }, [products, sortOption]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-red-500/10 p-4 rounded-full mb-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-slate-400 mb-6 max-w-md">
          {error === 'Failed to fetch' 
            ? 'Connection error: This might be caused by CORS restrictions on localhost. Try using a CORS proxy or a "CORS Unblock" browser extension for development.' 
            : error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg transition-colors font-bold font-syncopate text-[10px] uppercase tracking-widest"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Filters */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-[#eeeeee]">
        <div>
          <h1 className="text-4xl font-black font-syncopate tracking-tight mb-2 uppercase text-black">
            Discover <span className="text-gray-400">Pure</span> Ingredients
          </h1>
          <p className="text-gray-400 max-w-xl text-sm font-medium">
            Explore thousands of products with precise nutritional data and ingredients analysis.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CategoryFilter />
          <SortControls />
        </div>
      </section>

      {/* Grid */}
      {products.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <Inbox className="w-16 h-16 mb-4 text-slate-500" />
          <h2 className="text-xl font-medium">No products found</h2>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, idx) => (
              <ProductCard key={`${product.code}-${idx}`} product={product} />
            ))}
            
            {/* Skeletons while loading more */}
            {loading && products.length > 0 && 
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl aspect-[3/4] animate-pulse" />
              ))
            }
          </div>

          {loading && products.length === 0 && (
            <div className="flex items-center justify-center py-40">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
            </div>
          )}

          <LoadMoreButton />
        </>
      )}
    </div>
  );
};

export default HomePage;
