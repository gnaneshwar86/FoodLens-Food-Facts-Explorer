// OpenFoodFacts API utility
// Uses Vite dev proxy (/cgi, /api routes in vite.config.js) to avoid CORS issues.
// - Name search  → CGI endpoint (actually filters by product name)
// - Category     → V2 search with categories_tags filter
// - Barcode      → V2 product endpoint

const FIELDS = 'code,product_name,product_name_en,image_front_small_url,image_front_url,categories,ingredients_text,ingredients_text_en,nutrition_grades,brands';

// ─── Name Search ───────────────────────────────────────────────────────────────
// CGI endpoint does true full-text product name search.
// Returns { products: [...], count: N }
export const fetchProductsByName = async (name, page = 1) => {
  const params = new URLSearchParams({
    search_terms: name,
    search_simple: '1',
    action: 'process',
    json: '1',
    page_size: '24',
    page: String(page),
    fields: FIELDS,
    sort_by: 'unique_scans_n',
    lc: 'en',
    tags_lc: 'en',
  });

  const res = await fetch(`/cgi/search.pl?${params}`);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Search returned an invalid response. Please try again.');
  }
};

// ─── Category Search ───────────────────────────────────────────────────────────
// V2 search with categories_tags filter.
// Returns { products: [...], count: N }
export const fetchProductsByCategory = async (category, page = 1) => {
  const params = new URLSearchParams({
    categories_tags: category,
    fields: FIELDS,
    page_size: '24',
    page: String(page),
    sort_by: 'unique_scans_n',
    lc: 'en',
    tags_lc: 'en',
  });

  const res = await fetch(`/api/v2/search?${params}`);
  if (!res.ok) throw new Error(`Category fetch failed: ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Category returned an invalid response. Please try again.');
  }
};

// ─── Product by Barcode ────────────────────────────────────────────────────────
export const fetchProductByBarcode = async (barcode) => {
  const res = await fetch(`/api/v0/product/${barcode}.json`);
  if (!res.ok) throw new Error(`Barcode lookup failed: ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Product returned an invalid response. Please try again.');
  }
};

// ─── Categories ───────────────────────────────────────────────────────────────
// Hardcoded — avoids the blocked/heavy categories.json endpoint.
export const fetchCategories = async () => [
  { id: 'en:beverages',           name: 'Beverages' },
  { id: 'en:snacks',              name: 'Snacks' },
  { id: 'en:dairies',             name: 'Dairies' },
  { id: 'en:breads',              name: 'Breads' },
  { id: 'en:chocolates',          name: 'Chocolates' },
  { id: 'en:biscuits-and-cakes',  name: 'Biscuits & Cakes' },
  { id: 'en:cheeses',             name: 'Cheeses' },
  { id: 'en:yogurts',             name: 'Yogurts' },
  { id: 'en:meats',               name: 'Meats' },
  { id: 'en:frozen-foods',        name: 'Frozen Foods' },
  { id: 'en:sauces',              name: 'Sauces' },
  { id: 'en:spreads',             name: 'Spreads' },
  { id: 'en:pasta',               name: 'Pasta' },
  { id: 'en:soups',               name: 'Soups' },
  { id: 'en:ice-creams',          name: 'Ice Creams' },
  { id: 'en:chips-and-crisps',    name: 'Chips & Crisps' },
  { id: 'en:candies',             name: 'Candies' },
  { id: 'en:juices-and-nectars',  name: 'Juices & Nectars' },
  { id: 'en:waters',              name: 'Waters' },
  { id: 'en:coffees',             name: 'Coffees' },
  { id: 'en:teas',                name: 'Teas' },
  { id: 'en:plant-based-foods',   name: 'Plant-Based Foods' },
  { id: 'en:seafood',             name: 'Seafood' },
  { id: 'en:breakfast-cereals',   name: 'Breakfast Cereals' },
  { id: 'en:nuts',                name: 'Nuts' },
  { id: 'en:dried-fruits',        name: 'Dried Fruits' },
  { id: 'en:cookies',             name: 'Cookies' },
  { id: 'en:energy-drinks',       name: 'Energy Drinks' },
  { id: 'en:cereals-and-potatoes',name: 'Cereals & Potatoes' }
];
