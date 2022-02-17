import { combineReducers } from "redux";
import folderReducer from "./folderReducer.js";
import postReducer from "./postReducer.js";
import categoryReducer from "./categoryReducer.js";

const rootReducer = combineReducers({
  categoryReducer,
  folderReducer,
  postReducer,
});

export default rootReducer;
