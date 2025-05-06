import {
  ADD_ROLE_FAIL,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  ALL_ROLE_FAIL,
  ALL_ROLE_REQUEST,
  ALL_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  SEARCH_ROLE_FAIL,
  SEARCH_ROLE_REQUEST,
  SEARCH_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS
} from '../constaints/RoleConstaints';

const initialState = {
  roles: [],
  all_role: [],
  role: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ROLE_REQUEST:
    case ADD_ROLE_REQUEST:
    case DELETE_ROLE_REQUEST:
    case UPDATE_ROLE_REQUEST:
    case SEARCH_ROLE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_ROLE_SUCCESS:
      return {
        ...state,
        all_role: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_ROLE_SUCCESS:
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        role: action?.payload?.data,
        error: null
      };
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_ROLE_FAIL:
    case ADD_ROLE_FAIL:
    case DELETE_ROLE_FAIL:
    case UPDATE_ROLE_FAIL:
    case SEARCH_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default roleReducer;
