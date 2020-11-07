import {
  TRANSACTION_UPDATE,
  TRANSACTIONS_GET,
  ADD_TRANSACTION,
  TRANSACTION_DELETE,
} from "../../constants";

const initialState = [];

const tableData = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TRANSACTION:
      return [...state, payload];
    case TRANSACTIONS_GET: {
      return payload;
    }
    case TRANSACTION_UPDATE: {
      return state.map((transaction) =>
        transaction._id === payload.id
          ? { ...transaction, ...payload.transaction }
          : transaction
      );
    }
    case TRANSACTION_DELETE:
      return state.filter((transaction) => transaction._id !== payload);
    default:
      return state;
  }
};

export default tableData;
