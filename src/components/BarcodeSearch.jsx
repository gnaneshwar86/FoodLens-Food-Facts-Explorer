import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, ArrowRight } from 'lucide-react';

const BarcodeSearch = () => {
  const [barcode, setBarcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) {
      navigate(`/product/${barcode.trim()}`);
      setBarcode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full sm:w-40 bg-[#f8f8f8] border border-[#eeeeee] rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-black transition-all font-mono text-sm text-black"
        />
      </div>
      <button
        type="submit"
        disabled={!barcode.trim()}
        className="p-2.5 bg-black hover:bg-gray-800 disabled:opacity-20 rounded-lg transition-all"
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </button>
    </form>
  );
};

export default BarcodeSearch;
