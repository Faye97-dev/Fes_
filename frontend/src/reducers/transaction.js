import {
  GET_TRANSACTIONS,
  GET_CLIENTS,
  GET_AGENCES,
  ADD_TRANSFERT,
  ADD_RETRAIT,
  ADD_CLIENT,
  HISTORY_TRANSACTIONS,
} from "../actions/types.js";

const initialState = {
  transactions: [],
  agences: [],
  clients: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload],
      };
    case HISTORY_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload].slice(0, 5),
      };
    case GET_AGENCES:
      return {
        ...state,
        agences: action.payload,
      };

    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [action.payload, ...state.clients],
      };
    case ADD_TRANSFERT:
    case ADD_RETRAIT:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions].slice(0, 5),
      };

    default:
      return state;
  }
}
