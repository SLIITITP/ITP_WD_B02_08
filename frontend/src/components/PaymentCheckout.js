import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = () => {
  const [product, setProduct] = useState({
    name: 'Example Product',
    price: 10,
    description: 'This is an example product.',
  });

  const handleToken = async (token) => {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        product,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <StripeCheckout
      stripeKey="your_publishable_key"
      token={handleToken}
      name="Example Company"
      description={product.description}
      amount={product.price * 100}
      currency="lkr"
    >
      <button>Pay ${product.price}</button>
    </StripeCheckout>
  );
};
//මේකට යටින් ගහන්න එපා මුකුත්
// ගහන ඒවා උඩින් ගහන්න ( ගහලා)

export default Checkout;