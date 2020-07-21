import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const pulishableKey =
    "pk_test_51H7QMuFQboouFnBAeFAmMWH8ajY85caqMgJydFwhsjGDHUt9TvanqEldzjVglOLIa45e3nEnCuDwZIJk0nxe1yIg00oBSE54HA";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      strpeKey={pulishableKey}
    />
  );
};

export default StripeCheckoutButton;
