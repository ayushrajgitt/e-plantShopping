import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinue }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleCheckoutShopping = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div>
      <h3>Shopping Cart</h3>
      <h4>Total Cost: ${calculateTotalAmount()}</h4>
      <div>
        {cart.map((item, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <h5>{item.name} (Unit Price: ${item.cost})</h5>
            <p>Subtotal: ${item.cost * item.quantity}</p>
            <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))}>-</button>
            <span> {item.quantity} </span>
            <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
            <button onClick={() => dispatch(removeItem(item.name))} style={{ marginLeft: '10px' }}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={onContinue}>Continue Shopping</button>
      <button onClick={handleCheckoutShopping} style={{ marginLeft: '10px' }}>Checkout</button>
    </div>
  );
}

export default CartItem;
