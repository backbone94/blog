import { combineReducers } from "redux";
import folderReducer from "./folderReducer.js";
import postReducer from "./postReducer.js";

const rootReducer = combineReducers({
  folderReducer,
  postReducer,
});

export default rootReducer;
