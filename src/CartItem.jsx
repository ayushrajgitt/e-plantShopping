import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

/**
 * CartItem Component
 * Renders the shopping cart page layout, handles product quantity modifications,
 * calculates total expenditure, and manages item deletion states.
 */
function CartItem({ onContinue }) {
  // Retrieve the global cart items array from the Redux store
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculates the line-item total cost for a specific plant variety.
   * @param {Object} item - The individual plant object containing cost and quantity.
   * @returns {Number} Total accumulated cost for this specific item type.
   */
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  /**
   * Computes the global cumulative order total for all selected nursery plants in the cart.
   * @returns {Number} The aggregate sum of all plant line subtotals.
   */
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + calculateTotalCost(item), 0);
  };

  /**
   * Simulates the transition to secure checkout payment networks.
   * Displays an informative user status alert for demonstration mode.
   */
  const handleCheckoutShopping = () => {
    const totalCost = calculateTotalAmount();
    alert(`Thank you for choosing Paradise Nursery!\n\nYour order total is $${totalCost}. This system is currently in demonstration mode. Secure checkout processing and shipping confirmation protocols will be fully deployed in the next production release.`);
  };

  /**
   * Decrements a specific item's quantity selector.
   * Automatically triggers a dispatch clear if the value reaches zero.
   * @param {Object} item - The target plant record being modified.
   */
  const handleDecrement = (item) => {
    if (item.quantity - 1 <= 0) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  return (
    <div className="cart-container" style={{ padding: '30px' }}>
      <h3 className="cart-title">Shopping Cart Summary</h3>
      <h4 className="cart-total-amount" style={{ color: '#2e7d32' }}>Total Cart Amount: ${calculateTotalAmount()}</h4>
      
      <div className="cart-items-list" style={{ marginTop: '20px', marginBottom: '20px' }}>
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your shopping cart is empty.</p>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="cart-item-row" style={{ borderBottom: '1px solid #ccc', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="cart-item-details">
                <h5 className="cart-item-name">{item.name}</h5>
                <p className="cart-item-price-breakdown">Unit Price: ${item.cost} | Subtotal: ${calculateTotalCost(item)}</p>
              </div>
              <div className="cart-item-actions">
                <button className="btn-decrement" onClick={() => handleDecrement(item)} style={{ padding: '2px 8px' }}>-</button>
                <span className="cart-item-quantity-display" style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                <button className="btn-increment" onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))} style={{ padding: '2px 8px' }}>+</button>
                <button className="btn-delete-item" onClick={() => dispatch(removeItem(item.name))} style={{ marginLeft: '20px', backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="cart-navigation-controls">
        <button className="btn-continue-shopping" onClick={onContinue} style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>Continue Shopping</button>
        <button className="btn-checkout" onClick={handleCheckoutShopping} style={{ marginLeft: '15px', backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
