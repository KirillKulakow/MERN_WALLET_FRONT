import { getStatisticsItem, setAuthToken } from "../../api/walletServices";
import { statisticGetData } from "../actions/statistic";
import { loaderOn, loaderOff } from "../actions/loader";

export const statisticUserGet = (params, token) => async (dispatch) => {
  dispatch(loaderOn());
  try {
    setAuthToken(token);
    const { year, month } = params;
    const result = await getStatisticsItem(year, month);
    const statItems = result.data;
    dispatch(statisticGetData(statItems));
  } catch (error) {
    console.warn("ERROR", error);
  } finally {
    dispatch(loaderOff());
  }
};
