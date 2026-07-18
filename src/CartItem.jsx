import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinue }) {
  // Access items slice from Redux global store
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Computes the total grand cumulative cost of all selected nursery plants
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  // Triggers alert feedback array for pending payment infrastructure integration
  const handleCheckoutShopping = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div style={{ padding: '30px' }}>
      <h3>Shopping Cart Summary</h3>
      <h4 style={{ color: '#2e7d32' }}>Total Cart Amount: ${calculateTotalAmount()}</h4>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        {cart.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #ccc', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5>{item.name}</h5>
                <p>Unit Price: ${item.cost} | Subtotal: ${item.cost * item.quantity}</p>
              </div>
              <div>
                <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))} style={{ padding: '2px 8px' }}>-</button>
                <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))} style={{ padding: '2px 8px' }}>+</button>
                <button onClick={() => dispatch(removeItem(item.name))} style={{ marginLeft: '20px', backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <button onClick={onContinue} style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>Continue Shopping</button>
      <button onClick={handleCheckoutShopping} style={{ marginLeft: '15px', backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>Checkout</button>
    </div>
  );
}

export default CartItem;
