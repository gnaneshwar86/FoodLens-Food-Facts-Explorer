import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { useFilters } from '../context/FilterContext';
import { fetchCategories } from '../utils/api';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, setSearchQuery, setPage } = useFilters();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    setSearchQuery(''); // Clear name search when category is selected
    setPage(1);
  };

  return (
    <div className="flex items-center gap-3 w-full lg:w-auto">
      <div className="flex items-center gap-2 text-gray-400">
        <Filter className="w-3 h-3" />
        <span className="text-[10px] font-bold uppercase tracking-widest font-syncopate whitespace-nowrap">Category:</span>
      </div>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="flex-1 lg:w-56 bg-white border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:border-black appearance-none cursor-pointer hover:bg-gray-50 transition-all text-xs font-bold text-black uppercase tracking-tighter"
      >
        <option value="" className="bg-slate-900">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id} className="bg-white text-black">
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
