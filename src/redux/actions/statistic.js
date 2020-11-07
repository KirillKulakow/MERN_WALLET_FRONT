import { STATISTIC_GET } from "../../constants";

export const statisticGetData = (params) => ({
  type: STATISTIC_GET,
  payload: params,
});
