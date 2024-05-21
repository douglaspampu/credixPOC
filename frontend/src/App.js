import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/home/home'
import Catalog from './components/catalog/catalog';
import ProductPage from './components/catalog/product_page';
import Recipes from './components/receitas/recipes';
import Checkout from './components/checkout/checkout'

import ChatWidget from './components/chatWidget/chatWidget';

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:product" element={<ProductPage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/chat" element={<ChatWidget />} />
          <Route path="/checkout" element={<Checkout />} />
       </Routes>
       <ChatWidget></ChatWidget>
    </>
  );
}

export default App;
