import React from 'react';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom'; // For navigation
import { db } from './firebase'; // Import Firestore instance
import './PaymentPage.css'; // Ensure this CSS file is styled properly

function PaymentPage() {
  const [{ basket, user }] = useStateValue(); // Access user info from context
  const navigate = useNavigate(); // Hook for navigation

  const totalAmount = basket.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharges = 5.99;
  const grandTotal = totalAmount + deliveryCharges;

  const handlePayment = async () => {
    try {
      // Save order data to Firebase
      await db.collection('users').doc(user?.uid).collection('orders').add({
        basket: basket,
        amount: grandTotal,
        created: new Date(),
        deliveryAddress: {
          email: user?.email,
          address: '123 React Lane', // Replace with actual address if available
          city: 'Los Angeles',
          state: 'CA'
        }
      });

      // Show a success message or navigate to a different page
      alert("Payment processed successfully!");
      navigate('/orders'); // Redirect to the orders page or wherever appropriate
    } catch (error) {
      console.error("Error saving order to Firebase:", error);
      alert("An error occurred while processing your payment. Please try again.");
    }
  };

  return (
    <div className='paymentPage'>
      <div className='paymentContainer'>
        <h1>Payment Method</h1>
        <div className='paymentSummary'>
          <h2>Order Summary</h2>
          <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          <p>Delivery Charges: ${deliveryCharges.toFixed(2)}</p>
          <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>
        
        <div className='paymentDetails'>
          <h3>Delivery Address</h3>
          <p>{user?.email}</p>
          <p>123 React Lane</p> {/* Replace with actual address if available */}
          <p>Los Angeles, CA</p> {/* Replace with actual address if available */}
        </div>

        <div className='paymentMethods'>
          <h3>Select a Payment Method</h3>
          <div className='paymentOptions'>
            <label>
              <input type="radio" name="paymentMethod" value="Credit Card" />
              Credit Card
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="PayPal" />
              PayPal
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="Cash on Delivery" />
              Cash on Delivery
            </label>
          </div>
        </div>

        <button onClick={handlePayment} className="payButton">Confirm Payment</button>
      </div>
    </div>
  );
}

export default PaymentPage;
