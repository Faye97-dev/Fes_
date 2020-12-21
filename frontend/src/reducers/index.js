import { combineReducers } from "redux";
import ThemeOptions from "./ThemeOptions";
import transaction from "./transaction";
import auth from "./auth";

export default combineReducers({
  ThemeOptions,
  transaction,
  auth,
});
