import { combineReducers } from "redux";
import visitorReducer from "./visitorReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
  visitor: visitorReducer,
  common:commonReducer
});