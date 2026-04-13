import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

const SortControls = () => {
  const { sortOption, setSortOption } = useFilters();

  const options = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'grade-asc', label: 'Nutrition (Best First)' },
    { value: 'grade-desc', label: 'Nutrition (Worst First)' },
  ];

  return (
    <div className="flex items-center gap-3 w-full lg:w-auto">
      <div className="flex items-center gap-2 text-gray-400">
        <ArrowUpDown className="w-3 h-3" />
        <span className="text-[10px] font-bold uppercase tracking-widest font-syncopate whitespace-nowrap">Sort:</span>
      </div>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="flex-1 lg:w-48 bg-white border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:border-black appearance-none cursor-pointer hover:bg-gray-50 transition-all text-xs font-bold text-black uppercase tracking-tighter"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortControls;
