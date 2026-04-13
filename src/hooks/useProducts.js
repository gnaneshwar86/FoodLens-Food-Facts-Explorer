import { useEffect, useRef } from 'react';
import { useFilters } from '../context/FilterContext';
import { fetchProductsByName, fetchProductsByCategory } from '../utils/api';

const useProducts = () => {
  const {
    searchQuery,
    selectedCategory,
    page,
    setProducts,
    setLoading,
    setError,
    setHasMore,
  } = useFilters();

  // Track whether the current run is a new search or a load-more
  const isFirstPageRef = useRef(true);
  const prevSearchRef = useRef({ searchQuery: null, selectedCategory: null });

  useEffect(() => {
    const prev = prevSearchRef.current;
    const isNewSearch =
      prev.searchQuery !== searchQuery ||
      prev.selectedCategory !== selectedCategory;

    prevSearchRef.current = { searchQuery, selectedCategory };
    isFirstPageRef.current = isNewSearch || page === 1;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentPage = isFirstPageRef.current ? 1 : page;
        const query = searchQuery || 'snacks';
        const data = selectedCategory
          ? await fetchProductsByCategory(selectedCategory, currentPage)
          : await fetchProductsByName(query, currentPage);

        if (cancelled) return;

        const items = Array.isArray(data?.products) ? data.products : [];
        const totalCount = data?.count || 0;

        if (isFirstPageRef.current) {
          setProducts(items);
        } else {
          setProducts(prev => [...prev, ...items]);
        }
        setHasMore(items.length > 0 && totalCount > currentPage * 24);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [searchQuery, selectedCategory, page]);
};

export default useProducts;
