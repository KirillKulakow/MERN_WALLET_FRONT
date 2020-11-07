const { userTypes } = require("../../constants");

const initilState = null;

const tokenReducer = (state = initilState, { type, payload }) => {
  switch (type) {
    case userTypes.LOGIN:
    case userTypes.LOGIN_WITH_GOOGLE:
    case userTypes.LOGIN_WITH_FACEBOOK:
      return payload.token;
    case userTypes.LOG_OUT:
      return initilState;
    default:
      return state;
  }
};

export default tokenReducer;
