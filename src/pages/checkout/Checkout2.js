import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";

import {
  CALCULATE_SUBTOTAL2,
  CALCULATE_TOTAL_QUANTITY2,
  selectCartItems2,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";

import { selectEmail } from "../../redux/slice/authSlice";

import { selectShippingAddress } from "../../redux/slice/checkoutSlice";

import { toast } from "react-toastify";
import CheckoutForm2 from "../../components/checkoutForm/CheckoutForm2.component";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout2 = () => {
  const [message, setMessage] = useState("Fizetés előkészítése...");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems2);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL2());
    dispatch(CALCULATE_TOTAL_QUANTITY2());
  }, [dispatch, cartItems]);

  const description = `hepukaShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    // http://localhost:4242/create-payment-intent
    // Create PaymentIntent as soon as the page loads
    fetch("https://hepukashopb.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Hiba történt!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm2 />
        </Elements>
      )}
    </>
  );
};

export default Checkout2;
