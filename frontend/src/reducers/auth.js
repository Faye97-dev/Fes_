import {
  LOGIN_SUCCESS,
  UPDATE_SOLDE,
  AGENCE_STATUS,
} from "../actions/types.js";

const initialState = {
  agence: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case UPDATE_SOLDE:
      return {
        ...state,
        agence: { ...action.payload },
      };
    case AGENCE_STATUS:
      return {
        ...state,
        agence: { ...state.agence, online: action.payload.online },
      };

    default:
      return state;
  }
}
