import { combineReducers } from "redux";
import langReducer from "./langReducer.js";
import postReducer from "./postReducer.js";

const rootReducer = combineReducers({
  langReducer,
  postReducer,
});

export default rootReducer;
