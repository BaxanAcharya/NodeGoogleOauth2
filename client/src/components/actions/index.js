import axois from 'axios'
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  return function (dispatch) {
    axois.get("http://localhost:5000/api/current_user").then((response) =>
      dispatch({
        type: FETCH_USER,
        payload: response
      })
    );
  };
};


