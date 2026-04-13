import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const getNutritionColor = (grade) => {
  const grades = {
    a: 'bg-green-500',
    b: 'bg-lime-500',
    c: 'bg-yellow-500',
    d: 'bg-orange-500',
    e: 'bg-red-500',
  };
  return grades[grade?.toLowerCase()] || 'bg-slate-500';
};

const ProductCard = ({ product }) => {
  const {
    product_name,
    product_name_en,
    image_front_small_url,
    image_front_url,
    categories,
    ingredients_text,
    ingredients_text_en,
    nutrition_grades,
    code
  } = product;

  const category = categories?.split(',')[0] || 'Unknown Category';
  const nutritionColor = getNutritionColor(nutrition_grades);

  return (
    <Link 
      to={`/product/${code}`}
      className="glass-card rounded-xl overflow-hidden flex flex-col group border-[#eeeeee]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#f3f3f3]">
        <img
          src={image_front_small_url || image_front_url || 'https://via.placeholder.com/300?text=No+Image'}
          alt={product_name}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
        />
        {nutrition_grades && (
          <div className={`absolute top-3 right-3 w-8 h-8 ${nutritionColor} flex items-center justify-center rounded-md shadow-sm border border-black/10`}>
            <span className="text-sm font-black text-black uppercase">{nutrition_grades}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-2 bg-white">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-syncopate">
          {category}
        </span>
        <h3 className="text-base font-bold leading-tight line-clamp-2 text-black group-hover:text-gray-600 transition-colors">
          {product_name_en || product_name || 'Unnamed Product'}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 flex-1">
          {ingredients_text_en || ingredients_text || 'No ingredient information available.'}
        </p>
        
        <div className="mt-4 pt-4 border-t border-[#eeeeee] flex items-center justify-between text-black font-bold">
          <span className="text-[10px] uppercase tracking-[0.3em] font-syncopate opacity-40">View Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
