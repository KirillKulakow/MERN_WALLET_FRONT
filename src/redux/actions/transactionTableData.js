import {
  TRANSACTION_UPDATE,
  TRANSACTIONS_GET,
  ADD_TRANSACTION,
  TRANSACTION_DELETE,
} from "../../constants";

export const addTransactionToRedux = (data) => ({
  type: ADD_TRANSACTION,
  payload: data,
});

export const getTransactionList = (transactions) => ({
  type: TRANSACTIONS_GET,
  payload: transactions,
});

export const editTransaction = (id, transaction) => ({
  type: TRANSACTION_UPDATE,
  payload: { id, transaction },
});

export const deleteTransactionFromState = (id) => ({
  type: TRANSACTION_DELETE,
  payload: id,
});
