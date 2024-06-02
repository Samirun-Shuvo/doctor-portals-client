/* eslint-disable react/prop-types */
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PJCncBSNug8Eq2SZSDajq0xjGrcsdRTLSQTZZuNWImvXreiQGVxN3jiwhUxwWHOzKAcK7reO0SI6oUxT3BOpqBD007zVDP4yD');

const StripeWrapper = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;