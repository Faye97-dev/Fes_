import {
  UPDATE_SOLDE,
  AGENCE_STATUS,
  GET_EMPLOYES,
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types.js";

const initialState = {
  //agence: null,
  employes: [],
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //case LOGIN_SUCCESS:
    case UPDATE_SOLDE:
      return {
        ...state,
        user: { ...state.user, agence: { ...action.payload } },
      };

    case GET_EMPLOYES:
      return {
        ...state,
        employes: [...action.payload],
      };

    case AGENCE_STATUS:
      return {
        ...state,
        user: {
          ...state.user,
          agence: { ...state.user.agence, online: action.payload.online },
        },
      };

    /*case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };*/
    case LOGIN_SUCCESS:
      //localStorage.setItem("access", action.payload.access);
      //localStorage.setItem("refresh", action.payload.refresh);
      return {
        ...state,
        user: { ...action.payload },
        isLoading: false,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
      //localStorage.removeItem("access");
      //localStorage.removeItem("refresh");
      return {
        ...state,
        refresh: null,
        access: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case LOGOUT:
      //localStorage.removeItem("access");
      //localStorage.removeItem("refresh");
      return {
        ...state,
        refresh: null,
        access: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
