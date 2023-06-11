import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
    return async (dispatch: any) => {
        const res = await axios.get("/api/current_user");
        console.log(res);
        dispatch({
                type: FETCH_USER,
                payload: res.data
        })
    }
};