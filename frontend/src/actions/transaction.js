import axios from "axios";
import {
  HOST,
  GET_TRANSACTIONS,
  GET_AGENCES,
  GET_CLIENTS,
  ADD_TRANSFERT,
  ADD_RETRAIT,
  ADD_CLIENT,
  UPDATE_SOLDE,
} from "./types";

import { updateSolde } from "./async";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";
/*export const cleanSession = () => (dispatch) => {
  dispatch({
    type: CLEAN_SESSION,
  });
};*/

export const getTransactions = () => (dispatch, getState) => {
  //const access = getState().auth.access;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/
  axios
    .get(HOST + `api/transaction/list/`, config)
    .then((res) => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);

      /*if (err.response.status === 401) {
        dispatch({
          type: LOGOUT,
        });
      }*/
    });
};

export const getAgences = () => (dispatch, getState) => {
  //const access = getState().auth.access;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/
  axios
    .get(HOST + `api/agence/list/`, config)
    .then((res) => {
      dispatch({
        type: GET_AGENCES,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);

      /*if (err.response.status === 401) {
        dispatch({
          type: LOGOUT,
        });
      }*/
    });
};

export const getClients = () => (dispatch, getState) => {
  //const access = getState().auth.access;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/

  axios
    .get(HOST + `api/client/`, config)
    .then((res) => {
      dispatch({
        type: GET_CLIENTS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);

      /*if (err.response.status === 401) {
        dispatch({
          type: LOGOUT,
        });
      }*/
    });
};

export const addTransfert = (transfert) => (dispatch, getState) => {
  //const access = getState().auth.access;
  //var csrftoken = getCookie("csrftoken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      //"X-CSRFToken": csrftoken,
    },
  };

  //axios.defaults.withCredentials = true;
  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/

  //axios.defaults.xsrfHeaderName = "HELLO";
  //axios.defaults.xsrfCookieName = "welcome";
  axios
    .post(HOST + `api/func/transfert/add/`, transfert, config)
    .then((res) => {
      dispatch({
        type: ADD_TRANSFERT,
        payload: res.data,
      });
      console.log(res.data);

      updateSolde().then((res) => {
        dispatch({
          type: UPDATE_SOLDE,
          payload: res,
        });
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const addRetrait = (transfert) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(HOST + `api/func/retrait/add/`, transfert, config)
    .then((res) => {
      dispatch({
        type: ADD_RETRAIT,
        payload: res.data,
      });
      console.log(res.data);

      updateSolde().then((res) => {
        dispatch({
          type: UPDATE_SOLDE,
          payload: res,
        });
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const addClient = (client) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(HOST + `api/client/`, client, config)
    .then((res) => {
      dispatch({
        type: ADD_CLIENT,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

/*transfert.status = "NOT_WITHDRAWED";
axios
.post(HOST + `api/transfert/create/`, transfert, config)
.then((res) => {
  const newtrans = {
    categorie_transaction: res.data["categorie_transaction"],
    //type_transaction: "TRANSFERT",
    date: res.data["date_creation"],
    agence: res.data["agence_origine"],
    transaction: res.data["id"],
  };
  newtrans.type_transaction = "01";
  newTransaction(newtrans, config).then((res1) => {
    if (res1) {
      //console.log(res1);
      const id = res1.id;
      getTransaction(id, config).then((res2) => {
        if (res2) {
          dispatch({
            type: ADD_TRANSFERT,
            payload: res2,
          });
          //console.log(res2);
        } else {
          console.log(res2);
        }
      });

      //console.log(res2);
    } else {
      console.log(res1);
    }
  });
  //getTransactions();
  //console.log(res.data);
})
.catch((err) => {
  console.log(err.response);

  //if (err.response.status === 401) {
    //dispatch({
    //  type: LOGOUT,
    //});
  //}
});*/

/*
async function newTransaction(body, config) {
  let data;
  await axios
    .post(HOST + `api/transaction/create/`, body, config)
    .then((res) => {
      //console.log(res.data);
      data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      data = false;
    });
  return data;
}

async function getTransaction(id, config) {
  let data;
  await axios
    .get(HOST + `api/transaction/get/${id}/`, config)
    .then((res) => {
      //console.log(res.data);
      data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      data = false;
    });
  return data;
}
*/
