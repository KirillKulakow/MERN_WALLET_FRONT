import { userTypes } from "../../constants";
const initialState = {};
const userLogOut = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN:
      return action.payload;
    case userTypes.LOGIN_WITH_GOOGLE:
      return action.payload;
    case userTypes.LOGIN_WITH_FACEBOOK:
      return action.payload;
    case userTypes.USER_ERROR:
      return { ...state, error: action.payload };
    case userTypes.GET_CURRENT_USER:
      return action.payload;
    case userTypes.LOG_OUT:
      return userLogOut;
    default:
      return state;
  }
};
// import { LOG_OUT } from "../actions/user";

// const initialState = {
//   userName: "User",
//   email: "user@gmail.com",
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case LOG_OUT:
//       return { ...state, email: "" };

//     default:
//       return state;
//   }
// };
