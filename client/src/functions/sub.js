import axios from "axios";

export const getSubs = async () =>
  await axios.get(`http://localhost:8000/api/subs`);

export const getSub = async (slug) =>
  await axios.get(`http://localhost:8000/api/sub/${slug}`);

export const removeSub = async (slug, authToken) =>
  await axios.delete(`http://localhost:8000/api/sub/${slug}`, {
      headers: {
          authorization: authToken,
      }
  });

export const updateSub = async (slug, sub, authToken) =>
  await axios.put(`http://localhost:8000/api/sub/${slug}`, sub, {
      headers: {
          authorization: authToken,
      }
  });

export const createSub = async (sub, authToken) =>
  await axios.post(`http://localhost:8000/api/sub`, sub, {
      headers: {
          authorization: authToken,
      }
  });
