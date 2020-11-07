import { setUser, userError } from "../actions/user";
import { paths } from "../../constants";
import { registerToWallet} from "../../api/walletServices";

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const result = await registerToWallet(formData);
    const { id, email} = result.data;
    dispatch(setUser({ id, email }));
    history.push(paths.verifyPage);
  } catch (error) {
    dispatch(userError(error.response));
    console.log(error);
  }
};

