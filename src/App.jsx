import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';

function App() {
  return (
    <FilterProvider>
      <Router>
        <div className="min-h-screen bg-white text-[#131313] selection:bg-black selection:text-white font-['Sen']">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:barcode" element={<ProductDetailPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FilterProvider>
  );
}

export default App;
