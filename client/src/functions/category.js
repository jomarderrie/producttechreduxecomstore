import axios from "axios";

export const getCategories = async () =>
  await axios.get(`http://localhost:8000/api/categories`);

export const getCategory = async (slug) =>
  await axios.get(`http://localhost:8000/api/category/${slug}`);

export const removeCategory = async (slug, authToken) =>
  await axios.delete(`http://localhost:8000/api/category/${slug}`, {
      headers: {
          authorization:authToken,
      },
  });

export const updateCategory = async (slug, category, authToken) =>
  await axios.put(`http://localhost:8000/api/category/${slug}`, category, {
      headers: {
          authorization:authToken,
      },
  });

export const createCategory = async (category, authToken) =>
  await axios.post(`http://localhost:8000/api/category`, category, {
      headers: {
          authorization:authToken,
      },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`http://localhost:8000/api/category/subs/${_id}`);
