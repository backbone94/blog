import { combineReducers } from "redux";
import folderReducer from "./folderReducer.js";
import postReducer from "./postReducer.js";
import categoryReducer from "./categoryReducer.js";
import authReducer from "./authReducer.js";

const rootReducer = combineReducers({
  categoryReducer,
  folderReducer,
  postReducer,
  authReducer,
});

export default rootReducer;
