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
        { name: 'Spider Plant', cost: 12, image: 'spider.jpg' }
      ]
    },
    {
      category: 'Aromatic',
      plants: [
        { name: 'Lavender', cost: 20, image: 'lavender.jpg' },
        { name: 'Mint', cost: 10, image: 'mint.jpg' }
      ]
    },
    {
      category: 'Low Maintenance',
      plants: [
        { name: 'Aloe Vera', cost: 14, image: 'aloe.jpg' },
        { name: 'Peace Lily', cost: 18, image: 'lily.jpg' }
      ]
    }
  ];

  return (
    <div>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#eee' }}>
        <span onClick={() => setShowCart(false)}>Home</span>
        <span onClick={() => setShowCart(false)}>Plants</span>
        <span onClick={() => setShowCart(true)}>Cart ({totalCount})</span>
      </nav>
      {showCart ? (
        <CartItem onContinue={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((cat, idx) => (
            <div key={idx}>
              <h2>{cat.category}</h2>
              {cat.plants.map((plant, pIdx) => (
                <div key={pIdx} className="plant-card">
                  <h4>{plant.name} - ${plant.cost}</h4>
                  <button onClick={() => dispatch(addItem(plant))}>Add to Cart</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
