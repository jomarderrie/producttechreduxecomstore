import axios from "axios";

export const createProduct = async (product, authToken) =>
    await axios.post(`http://http://localhost:8000/api/product`, product, {
        headers: {
            authorization:authToken,
        },
    });

export const getProductsByCount = async (count) =>
    await axios.get(`http://localhost:8000/api/products/${count}`);

export const removeProduct = async (slug, authToken) =>
    await axios.delete(`http://localhost:8000/api/product/${slug}`, {
        headers: {
            authorization:authToken,
        },
    });

export const getProduct = async (slug) =>
    await axios.get(`http://localhost:8000/api/product/${slug}`);

export const updateProduct = async (slug, product, authToken) =>
    await axios.put(`http://localhost:8000/api/product/${slug}`, product, {
        headers: {
            authorization:authToken,
        },
    });

export const getProducts = async (sort, order, page) =>
    await axios.post(`http://localhost:8000/api/products`, {
        sort,
        order,
        page,
    });

export const getProductsCount = async () =>
    await axios.get(`http://localhost:8000/api/products/total`);

export const productStar = async (productId, star, authToken) =>
    await axios.put(
        `http://localhost:8000/api/product/star/${productId}`,
        {star},
        {
            headers: {
                authorization:authToken,
            },
        }
    );

export const getRelated = async (title) =>

    await axios.get(`http://localhost:8000/api/product/related/${title}`);

export const fetchProductsByFilter = async (arg) =>
    await axios.post(`http://localhost:8000/api/search/filters`, arg);
