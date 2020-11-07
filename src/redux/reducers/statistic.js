import { STATISTIC_GET } from "../../constants";
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATISTIC_GET:
      return action.payload;
    default:
      return state;
  }
};
