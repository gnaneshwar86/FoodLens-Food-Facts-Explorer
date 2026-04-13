<div align="center">
  <img src="public/favicon.svg" alt="FoodLens Logo" width="120"/>

# FoodLens

### 🔍 Decode What You Eat. Instantly.

  <p>
    A production-grade, minimalist food intelligence platform that transforms raw nutritional data into actionable insights — powered by global datasets and engineered for speed.
  </p>

🌐 **Live App** → https://foodlens-phi.vercel.app/

  <br/>

  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css"/>
  <img src="https://img.shields.io/badge/API-OpenFoodFacts-FF9900?style=for-the-badge"/>

</div>

---

## 🧠 Why FoodLens?

Most food apps **show data**.
FoodLens is built to **help you decide**.

> ⚡ From scanning products to analyzing ingredients — everything is optimized for **clarity, speed, and real-world usability**.

---

## ✨ Core Capabilities

### 🔎 Intelligent Search Engine

* Real-time, debounced product search across **3M+ global food items**
* Optimized query routing for high-accuracy results

### 📦 Barcode Intelligence

* Instant lookup using product barcodes
* Designed for real-world usage (store, home, comparison)

### 📊 Nutrition Deep Dive

* Macro breakdown (energy, fat, carbs, protein)
* Ingredient-level inspection with structured rendering

### 🗂️ Smart Category Navigation

* Explore high-density categories (Snacks, Beverages, Chocolates)
* Efficient caching + pagination strategy

### 🌍 Global Dataset Integration

* Powered by **OpenFoodFacts**
* Intelligent localization fallback (English-first prioritization)

---

## 🧬 Architecture Highlights

### ⚡ Performance-First Frontend

* **React 19 (Hooks + Functional Architecture)**
* **Vite 6** → ultra-fast builds + HMR
* **Tailwind v4** → zero-runtime styling system

### 📡 API Engineering

* Proxy-based request routing for:

  * CORS bypass
  * Header injection (custom User-Agent)
* Multi-endpoint orchestration:

  * `/cgi/search.pl` → precision search
  * `/api/v2/search` → category filtering
  * `/api/v0/product` → exact product resolution

### 🧠 State Management

* Centralized via Context API (`FilterContext`)
* Eliminates prop-drilling
* Enables global reactive UI updates

---

## 🎯 What Makes This Project Stand Out

* 🧠 **Data → Insight Transformation (not just display)**
* ⚡ **Blazing-fast UX with minimal bundle size**
* 🎨 **Hyper-minimal premium UI (glassmorphism + typography system)**
* 🌐 **Production deployment with CDN (Vercel)**
* 🧩 **Clean, scalable component architecture**

---

## 📸 Product Preview

<div align="center">

<img src="public/HomePage.png" width="800"/>

<i>Dynamic product grid with filtering + pagination</i>

<br/><br/>

<img src="public/SearchByName.png" width="800"/>

<i>Real-time intelligent search experience</i>

<br/><br/>

<img src="public/ProductDetail.png" width="800"/>

<i>Deep nutritional and ingredient analysis</i>

</div>

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/FoodLens.git
cd FoodLens
npm install
npm run dev
```

---

## ⚠️ Production Note

In development, API requests are routed through a **Vite proxy** to handle:

* CORS restrictions
* Custom headers
* API throttling

For production, this should be replaced with **serverless functions (e.g., Vercel API routes)** to ensure reliability and scalability.

---

## 📁 Project Structure

```
src/
├── components/
├── pages/
├── context/
├── utils/
├── App.jsx
└── index.css
```

---

## 🧭 Future Roadmap (Top 1% Upgrades)

* 🟢 Health Score Engine (AI-like food grading)
* ⚠️ Ingredient Risk Detection
* ⚖️ Product Comparison Tool
* 📷 Live Barcode Scanner (Camera API)
* 🧠 Smart Query Search (“high protein low sugar snacks”)

---

## 🏁 Final Thought

> FoodLens is not just a UI project —
> it's a **foundation for intelligent food decision systems**.

---

<div align="center">
  <b>Engineered for the Top 1%</b><br/>
  Minimal. Fast. Intentional.
</div>
