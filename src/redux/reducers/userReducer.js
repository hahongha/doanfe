import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_PASSWORD_REQUEST
} from "redux/constaints/userConstaints";

const initialState = {
    users: [],
    all_user:[],
    user: {},
    totalRecords: 0,
    loading: true,
    error: false,
  };
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_USER_REQUEST:
      case ADD_USER_REQUEST:
      case DELETE_USER_REQUEST:
      case UPDATE_USER_REQUEST:
      case SEARCH_USER_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
        return {
          ...state,
          error: null,
          loading: true,
        };
      case ALL_USER_SUCCESS:
        return {
          ...state,
          all_user: action?.payload?.data,
          totalRecords: action?.payload?.totalElements,
          loading: false,
        };
        case SEARCH_USER_SUCCESS:
          return {
            ...state,
            users: action?.payload?.data,
            totalRecords: action?.payload?.totalElements,
            loading: false,
          };
      case ADD_USER_SUCCESS:
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          user: action?.payload?.data,
          error: null,
        };
      case DELETE_USER_SUCCESS:
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          error: null,
        };
      case ALL_USER_FAIL:
      case ADD_USER_FAIL:
      case DELETE_USER_FAIL:
      case UPDATE_USER_FAIL:
      case SEARCH_USER_FAIL:
      case UPDATE_PASSWORD_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  export default userReducer;
  