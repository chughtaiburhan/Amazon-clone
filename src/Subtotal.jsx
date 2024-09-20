import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

function Subtotal() {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate(); // Hook for navigation

  const itemCount = basket?.length;
  const subtotalValue = getBasketTotal(basket);

  const handleCheckout = () => {
    // Navigate to the order history page
    navigate('/order-history');
  };

  return (
    <div className='subtotal'>
      <p>
        Subtotal ({itemCount} items): <strong>{formatCurrency(subtotalValue)}</strong>
      </p>
      <small className='subtotal_gift'>
        <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={handleCheckout}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
