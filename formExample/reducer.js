import { BASIC_INFO } from "../actions/basicInfo";
const initialState = {
  type: 1,
  id: "",
  title: "Resume for Google",
  jobTitle: "Front End Developer",
  firstName: "User",
  lastName: "Usersky",
  email: "user@gmail.com",
  phone: "067-345-65-45",
  country: "Ukraine",
  city: "Kyiv",
  summary: "Bla bla bla bla",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BASIC_INFO:
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};
