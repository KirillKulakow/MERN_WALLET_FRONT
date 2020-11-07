import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers";
import { persistStore } from "redux-persist";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
