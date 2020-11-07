import {
  updateTransaction,
  setAuthToken,
  clearAuthToken,
  addTransaction,
  deleteTransaction,
  getSortedTransctionPerDate,
} from "../../api/walletServices";
import {
  addTransactionToRedux,
  getTransactionList,
  editTransaction,
  deleteTransactionFromState,
} from "../actions/transactionTableData";
import { loaderOn, loaderOff } from "../actions/loader";
import { getUser } from "./login";

export const asyncAddTransaction = (newTransaction, token) => async (
  dispatch
) => {
  dispatch(loaderOn());
  try {
    setAuthToken(token);
    const { data } = await addTransaction(newTransaction);
    const { userBalance, transaction } = data;
    dispatch(
      addTransactionToRedux({
        ...newTransaction,
        balance: userBalance,
        _id: transaction[transaction.length - 1]._id,
      })
    );
    dispatch(getUserTransactions());
    dispatch(getUser());
  } catch (error) {
    console.log("Error adding ---->>", error.response);
  } finally {
    clearAuthToken();
    dispatch(loaderOff());
  }
};

export const updateUserTransaction = (id, transaction, token) => async (
  dispatch
) => {
  dispatch(loaderOn());

  try {
    setAuthToken(token);

    const { data } = await updateTransaction(id, transaction);

    dispatch(editTransaction(data._id, data));
    dispatch(getUserTransactions());
    dispatch(getUser());
  } catch (error) {
    console.log("Error update ---->>", error.response);
  } finally {
    clearAuthToken();
    dispatch(loaderOff());
  }
};

export const getUserTransactions = () => async (dispatch, getState) => {
  dispatch(loaderOn());

  const token = getState().session.token;

  try {
    setAuthToken(token);

    const { data } = await getSortedTransctionPerDate();

    dispatch(getTransactionList(data));
  } catch (error) {
    console.log("Error get ---->>", error.response);
  } finally {
    clearAuthToken();
    dispatch(loaderOff());
  }
};

export const deleteUsersTransaction = (id, token) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    setAuthToken(token);
    await deleteTransaction(id);
    dispatch(deleteTransactionFromState(id));
    dispatch(getUserTransactions());
    dispatch(getUser());
  } catch (error) {
    console.log("Error delete ---->>", error.response);
  } finally {
    clearAuthToken();
    dispatch(loaderOff());
  }
};
