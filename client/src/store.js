import { createStore } from "redux";
import postReducer from "./redux/reducers/postReducer";

const store = createStore(postReducer);

export default store;
