import axios from "axios";

export const getCoupons = async () =>
  await axios.get(`http://localhost:8000/api/coupons`);

export const removeCoupon = async (couponId, authToken) =>
  await axios.delete(`http://localhost:8000/api/coupon/${couponId}`, {
      headers: {
          authorization:authToken,
      },
  });

export const createCoupon = async (coupon, authToken) =>
  await axios.post(
    `http://localhost:8000/api/coupon`,
    { coupon },
    {
        headers: {
            authorization:authToken,
        },
    }
  );
