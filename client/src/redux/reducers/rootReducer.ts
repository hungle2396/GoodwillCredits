import { combineReducers } from "redux";
import { authApi } from "../api/authApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer
});

export default rootReducer;