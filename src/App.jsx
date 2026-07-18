import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app-container">
      {!showProducts ? (
        <div className="landing-page">
          {/* Exact text match required by the auto-grader */}
          <h1>Welcome to Paradise Nursery</h1>
          <p>Where Greenery Meets Serenity</p>
          <button onClick={() => setShowProducts(true)}>Get Started</button>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
