import React from 'react';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

function OrderHistory() {
  const [{ basket, user }] = useStateValue();
  const navigate = useNavigate();

  // Calculate total amount and total items
  const totalAmount = basket.reduce((sum, item) => sum + item.price, 0);
  const totalItems = basket.length;

  // Create a serializable version of the basket
  const serializedBasket = basket.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    image: item.image,
    rating: item.rating,
    // Add any other necessary fields, excluding non-serializable ones
  }));

  const handleOrderNow = () => {
    // Navigate to payment page with a serializable basket object
    navigate('/payment', {
      state: {
        basket: serializedBasket,
        user: {
          email: user.email, // Ensure user object is also serializable
          uid: user.uid,
        },
        totalAmount,
        totalItems,
      },
    });
  };

  return (
    <div className='orderHistory'>
      <h1>Your Order Summary</h1>
      <div className='orderSummary'>
        <h2>Summary</h2>
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
        <p>Total Items: {totalItems}</p>
        <hr />
        <button onClick={handleOrderNow} className='orderNowButton'>
          Order Now
        </button>
      </div>

      <div className='orderItems'>
        {basket.map((item, index) => (
          <div key={`${item.id}-${index}`} className='orderItem'>
            <img src={item.image} alt={item.title} />
            <div className='itemDetails'>
              <p>{item.title}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Rating: {item.rating} stars</p>
              <hr />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
