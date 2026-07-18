import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: 'Air Purifying',
      plants: [
        { name: 'Snake Plant', cost: 15, image: 'snake.jpg' },
        { name: 'Spider Plant', cost: 12, image: 'spider.jpg' },
        { name: 'Peace Lily', cost: 18, image: 'lily.jpg' },
        { name: 'Boston Fern', cost: 22, image: 'fern.jpg' },
        { name: 'Rubber Plant', cost: 25, image: 'rubber.jpg' },
        { name: 'English Ivy', cost: 14, image: 'ivy.jpg' }
      ]
    },
    {
      category: 'Aromatic',
      plants: [
        { name: 'Lavender', cost: 20, image: 'lavender.jpg' },
        { name: 'Mint', cost: 10, image: 'mint.jpg' },
        { name: 'Rosemary', cost: 16, image: 'rosemary.jpg' },
        { name: 'Eucalyptus', cost: 24, image: 'eucalyptus.jpg' },
        { name: 'Jasmine', cost: 22, image: 'jasmine.jpg' },
        { name: 'Basil', cost: 8, image: 'basil.jpg' }
      ]
    },
    {
      category: 'Low Maintenance',
      plants: [
        { name: 'Aloe Vera', cost: 14, image: 'aloe.jpg' },
        { name: 'ZZ Plant', cost: 26, image: 'zz.jpg' },
        { name: 'Pothos', cost: 12, image: 'pothos.jpg' },
        { name: 'Jade Plant', cost: 15, image: 'jade.jpg' },
        { name: 'Cast Iron Plant', cost: 28, image: 'castiron.jpg' },
        { name: 'Sago Palm', cost: 35, image: 'sago.jpg' }
      ]
    }
  ];

  const isItemInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Navbar displays consistently across product view and cart view */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#2e7d32', color: 'white' }}>
        <div style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setShowCart(false)}>Paradise Nursery</div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setShowCart(false)}>Plants Catalog</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setShowCart(true)}>Cart Icon ({totalCount})</span>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinue={() => setShowCart(false)} />
      ) : (
        <div className="product-grid" style={{ padding: '30px' }}>
          {plantsArray.map((cat, idx) => (
            <div key={idx} style={{ marginBottom: '40px' }}>
              <h2>{cat.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="plant-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
                    <h4>{plant.name}</h4>
                    <p>${plant.cost}</p>
                    <button 
                      disabled={isItemInCart(plant.name)} 
                      onClick={() => dispatch(addItem(plant))}
                      style={{ backgroundColor: isItemInCart(plant.name) ? '#ccc' : '#2e7d32', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}
                    >
                      {isItemInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
