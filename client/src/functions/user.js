import axios from "axios";

export const userCart = async (cart, authToken) =>
    await axios.post(
        `http://localhost:8000/api/user/cart`,
        {cart},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const getUserCart = async (authToken) =>
    await axios.get(`http://localhost:8000/api/user/cart`, {
        headers: {
            authorization: authToken,
        },
    });

export const emptyUserCart = async (authToken) =>
    await axios.delete(`http://localhost:8000/api/user/cart`, {
        headers: {
            authorization: authToken,
        },
    });

export const saveUserAddress = async (authToken, address) =>
    await axios.post(
        `http://localhost:8000/api/user/address`,
        {address},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const applyCoupon = async (authToken, coupon) =>
    await axios.post(
        `http://localhost:8000/api/user/cart/coupon`,
        {coupon},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const createOrder = async (stripeResponse, authToken) =>
    await axios.post(
        `http://localhost:8000/api/user/order`,
        {stripeResponse},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const getUserOrders = async (authToken) =>
    await axios.get(`http://localhost:8000/api/user/orders`, {
        headers: {
            authorization: authToken,
        },
    });

export const getWishlist = async (authToken) =>
    await axios.get(`http://localhost:8000/api/user/wishlist`, {
        headers: {
            authorization: authToken,
        },
    });

export const removeWishlist = async (productId, authToken) =>
    await axios.put(
        `http://localhost:8000/api/user/wishlist/${productId}`,
        {},
        {
            headers: {
                authorization: authToken,
            },
        }
    );

export const addToWishlist = async (productId, authToken) =>
    await axios.post(
        `http://localhost:8000/api/user/wishlist`,
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
        `http://localhost:8000/api/user/cash-order`,
        {couponApplied: couponTrueOrFalse, COD},
        {
            headers: {
                authorization: authToken,
            },
        }
    );
