/* eslint-disable react/prop-types */
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "./checkoutForm.css";
import { format } from "date-fns";

const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const { _id, price, patient, patientName, date, treatment, slot } =
    appointment;
  const formatedDate = format(date, "PP");

  const sendPaymentConfirmationEmail = (appointment) => {
    emailjs
      .send(
        "service_jb96gwt",
        "template_6pvbn0t",
        appointment,
        "hxJ6ABoPK03KoCgzs"
      )
      .then(
        () => {
          toast.success("An payment confirmation email send successfully!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ amount: price * 100 }), // convert to cents
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch client secret");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error(error.message);
        setCardError("Failed to initialize payment. Please try again.");
      }
    };

    if (price > 0) {
      fetchClientSecret();
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setProcessing(true);

    try {
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: patientName,
            email: patient,
          },
        });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setPaymentStatus("success");
        setCardError("");

        // Store payment in database
        const payment = {
          appointment: _id,
          transactionId: paymentIntent.id,
        };
        fetch(`http://localhost:5000/booking/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(payment),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              sendPaymentConfirmationEmail({
                ...appointment,
                name: patientName,
                email: patient,
                subject: `Payment confirmation message for ${treatment} is on ${formatedDate} at ${slot} is Confirmed.`,
                message: `We have received payment for ${treatment} is Confirmed by payment id :${payment.transactionId} . Looking forward to seeing you on ${formatedDate} at ${slot}.`,
              });
              setProcessing(false);
            }
          });
      }
    } catch (error) {
      setCardError(error.message);
      setPaymentStatus("error");
      setProcessing(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button
          type="submit"
          className="mt-8 bg-slate-500 px-8 py-1 text-white rounded-md"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? <span className="spinner"></span> : "Pay"}
        </button>
      </form>
      {cardError && (
        <p className="pt-4 text-red-600">
          <small>{cardError}</small>
        </p>
      )}
      {paymentStatus === "success" && (
        <div className="pt-4 text-green-600">
          <p>Payment succeeded!</p>
          <small>Your Transaction Id is: {transactionId}</small>
        </div>
      )}
      {paymentStatus === "error" && !cardError && (
        <p className="pt-4 text-red-600">
          <small>Payment failed. Please try again.</small>
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
