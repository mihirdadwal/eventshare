// PaymentForm.tsx
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePublicKey } from './config';

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      // Send the token to your server for payment processing
      console.log(token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className='cardPay' />
      <button className="buyTicket pay" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
