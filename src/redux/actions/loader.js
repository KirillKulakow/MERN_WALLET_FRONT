import { LOADER_ON, LOADER_OFF } from "../../constants";

export const loaderOn = () => ({
  type: LOADER_ON,
  payload: true,
});

export const loaderOff = () => ({
  type: LOADER_OFF,
  payload: false,
});
