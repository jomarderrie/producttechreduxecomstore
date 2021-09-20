import axios from "axios";

export const userCart = async (cart, authToken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        {cart},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const getUserCart = async (authToken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authorization: authToken,
        },
    });

export const emptyUserCart = async (authToken) =>
    await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authorization: authToken,
        },
    });

export const saveUserAddress = async (authToken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        {address},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const applyCoupon = async (authToken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`,
        {coupon},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const createOrder = async (stripeResponse, authToken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        {stripeResponse},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const getUserOrders = async (authToken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
            authorization: authToken,
        },
    });

export const getWishlist = async (authToken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
        headers: {
            authorization: authToken,
        },
    });

export const removeWishlist = async (productId, authToken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
        {},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const addToWishlist = async (productId, authToken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/wishlist`,
        {productId},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const createCashOrderForUser = async (
    authToken,
    COD,
    couponTrueOrFalse
) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cash-order`,
        {couponApplied: couponTrueOrFalse, COD},
        {
            headers: {
                authorization: authToken,
            },
        }
    );
