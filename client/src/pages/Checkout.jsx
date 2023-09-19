import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useStripe } from '@stripe/react-stripe-js';

const Checkout = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const totalCents = total * 100;
  const stripe = useStripe();

  const handleCheckout = async () => {
    !stripe ? console.error('Stripe failed to load.') : null;

    const response = await fetch('http://localhost:3001/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart,
        currency: 'usd',
        total: totalCents,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.url;
    } else {
      console.error('Failed to checkout.');
    }
  };

  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <img className='cartIcon' alt="Cart" width={25} src="/images/cart.png" />
      </button>
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul>
          {cart.map((item) => (
            <li className="pb-3" key={item._id}>
              {item.name} - ${item.price}
              <button
                className="text-danger"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <h4 className="pb-1 font-bold text-xl">Total: ${total.toFixed(2)}</h4>
        <button
          onClick={handleCheckout}
          className="pb-1 px-2 text-white text-xl font-bold bg-green-400"
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default Checkout;
