import axios from "axios";

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://guarded-cliffs-65841.herokuapp.com";

export const setAuthToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  axios.defaults.headers.common["Authorization"] = null;
};

export const loginToWallet = (credentials) =>
  axios.post("/auth/login", credentials);

export const loginToWalletWithGoogle = (credentials) =>
  axios.post("/auth/google", credentials);

export const loginToWalletWithFacebook = (credentials) =>
  axios.post("/auth/facebook", credentials);

export const registerToWallet = (credentials) =>
  axios.post("/auth/register", credentials);

export const logoutFromWallet = () => axios.post("/auth/logout");

export const getTransactions = () => axios.get("/get");

export const addTransaction = async (transaction) =>
  await axios.post("/trans/post", transaction);

export const deleteTransaction = (transactionId) =>
  axios.delete("/trans/delete", { data: { transactionId } });

export const updateTransaction = (transactionId, transaction) =>
  axios.patch("/trans/update", { transactionId, ...transaction });

export const getCurrentUser = () => axios.get("/user");

export const getStatisticsItem = (year, month) =>
  axios.get(`/trans/get/stat?type=all&year=${year}&month=${month}`);

export const getSortedTransctionPerDate = () => axios.get("/trans/get");
