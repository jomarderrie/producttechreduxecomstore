import axios from "axios";

export const createPaymentIntent = (authToken, coupon) =>
  axios.post(
    `http://localhost:8000/api/create-payment-intent`,
    { couponApplied: coupon },
    {
        headers: {
            authorization: authToken,
        }
    }
  );
