import axios from "axios";
import { LOGIN_SUCCESS, HOST, AGENCE_STATUS } from "./types";
import Snackbars from "../app-components/utils/Alerts";
export const login = () => (dispatch) => {
  //const access = getState().auth.access;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get(HOST + `api/agence/get/2/`, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const updateStatusAgence = (status) => (dispatch, getState) => {
  const agence = { ...getState().auth.agence };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  agence.commune = agence.commune.commune_code;
  agence.online = status;

  axios
    .put(HOST + `api/agence/update/${agence.id}/`, agence, config)
    .then((res) => {
      dispatch({
        type: AGENCE_STATUS,
        payload: res.data,
      });
      //Snackbars(false, "sucess");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
