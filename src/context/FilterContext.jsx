import React, { createContext, useContext, useState, useEffect } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const resetProducts = () => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        sortOption, setSortOption,
        products, setProducts,
        page, setPage,
        loading, setLoading,
        error, setError,
        hasMore, setHasMore,
        resetProducts
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
