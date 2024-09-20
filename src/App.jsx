import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Header from './Header';
import Home from './Home';
import Login from './Login';
// import PaymentPage from './PaymentPage'; // Import PaymentPage component
import OrderHistory from './OrderHistory';
// import Payment from './Payment';
import PaymentPage from './PaymentPage';
// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useEffect } from 'react';

const promise = loadStripe("your-stripe-public-key");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={
            <>
              <Header />
              <Checkout />
            </>
          } />
          <Route path='/payment' element={
            <>
              <Header />
              <PaymentPage /> {/* PaymentPage route */}
            </>
          } />
          <Route path='/order-history' element={
            <>
              <Header />
              <OrderHistory />
            </>
          } />
          <Route path='/' element={
            <>
              <Header />
              <Home />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
