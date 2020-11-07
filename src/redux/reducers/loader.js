import { LOADER_ON, LOADER_OFF } from "../../constants";

const initialState = false;

const loader = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADER_ON:
      return payload;
    case LOADER_OFF:
      return payload;
    default:
      return state;
  }
};

export default loader;
