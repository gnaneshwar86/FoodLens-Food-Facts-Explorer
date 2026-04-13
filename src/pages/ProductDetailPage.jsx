import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Info, CheckCircle2, AlertCircle, Scale, Zap, Droplet, Cookie } from 'lucide-react';
import { fetchProductByBarcode } from '../utils/api';

const ProductDetailPage = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductByBarcode(barcode);
        // V0 API: { status: 1, product: {...} } or { status: 0, status_verbose: "product not found" }
        if (!data || data.status !== 1 || !data.product) {
          throw new Error('Product not found');
        }
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [barcode]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-10 h-10 animate-spin text-black opacity-10" />
        <p className="font-syncopate text-[10px] uppercase tracking-[0.5em] text-gray-400 animate-pulse">Syncing Details</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-16 h-16 text-gray-200 mb-6" />
        <h2 className="text-3xl font-black font-syncopate mb-4 uppercase tracking-tighter text-black">Dead End</h2>
        <p className="text-gray-400 mb-10 max-w-md text-sm font-medium">Barcode {barcode} is not in our records.</p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-black text-white px-8 py-3 rounded-lg font-bold transition-all hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-syncopate text-[10px] uppercase tracking-widest">Back to Core</span>
        </button>
      </div>
    );
  }

  const nutritients = product.nutriments || {};
  
  const stats = [
    { label: 'Energy', value: `${nutritients['energy-kcal_100g'] || 0} kcal`, icon: Zap },
    { label: 'Fat', value: `${nutritients.fat_100g || 0}g`, icon: Droplet },
    { label: 'Carbs', value: `${nutritients.carbohydrates_100g || 0}g`, icon: Cookie },
    { label: 'Proteins', value: `${nutritients.proteins_100g || 0}g`, icon: Scale },
  ];

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-syncopate text-[10px] uppercase tracking-[0.3em]">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image & Stats */}
        <div className="space-y-10">
          <div className="bg-[#f8f8f8] border border-[#eeeeee] rounded-3xl p-12 aspect-square flex items-center justify-center overflow-hidden">
            <img 
              src={product.image_front_url || 'https://via.placeholder.com/600?text=No+Image'} 
              alt={product.product_name_en || product.product_name}
              className="max-w-full max-h-full object-contain mix-blend-multiply" 
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-[#eeeeee] p-6 rounded-xl flex flex-col items-center text-center gap-1 shadow-sm">
                <span className="text-xl font-black text-black">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold font-syncopate">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-10 text-black">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              {product.nutrition_grades && (
                <span className="px-3 py-1 bg-black text-white font-black text-[10px] font-syncopate uppercase tracking-widest rounded-sm">
                  GRADE {product.nutrition_grades}
                </span>
              )}
              {product.brands && (
                <span className="text-gray-400 font-syncopate text-[10px] uppercase tracking-widest">/ {product.brands}</span>
              )}
            </div>
            <h1 className="text-5xl font-black font-syncopate tracking-tight leading-[1.1] uppercase">
              {product.product_name_en || product.product_name}
            </h1>
            <p className="text-gray-300 font-mono text-xs tracking-widest">ID: {barcode}</p>
          </header>

          {/* Ingredients */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold font-syncopate uppercase tracking-[0.4em] text-gray-400 border-b border-[#eeeeee] pb-2">Analysis</h2>
            <p className="text-gray-600 leading-relaxed text-sm font-medium">
              {product.ingredients_text_en || product.ingredients_text || 'No detailed ingredients available for this product.'}
            </p>
          </section>

          {/* Labels */}
          {product.labels_tags && product.labels_tags.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold font-syncopate uppercase tracking-[0.4em] text-gray-400">Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {product.labels_tags.map((label, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 border border-[#eeeeee] bg-[#f8f8f8] text-gray-500 text-[9px] font-bold uppercase tracking-widest font-syncopate"
                  >
                    {label.replace(/en:|fr:/g, '').replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Nutrition Table */}
          <section className="space-y-4">
            <div className="bg-white border border-[#eeeeee] rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-[10px] font-bold uppercase tracking-widest font-syncopate">
                <tbody className="divide-y divide-[#eeeeee]">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">Saturated Fat</td>
                    <td className="px-6 py-4 text-right text-black font-black">{nutritients.saturated_fat_100g || 0}g</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">Sugars</td>
                    <td className="px-6 py-4 text-right text-black font-black">{nutritients.sugars_100g || 0}g</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">Fiber</td>
                    <td className="px-6 py-4 text-right text-black font-black">{nutritients.fiber_100g || 0}g</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">Salt</td>
                    <td className="px-6 py-4 text-right text-black font-black">{nutritients.salt_100g || 0}g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
