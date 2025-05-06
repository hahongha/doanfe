import {
  ADD_AUTHORITY_FAIL,
  ADD_AUTHORITY_REQUEST,
  ADD_AUTHORITY_SUCCESS,
  ALL_AUTHORITY_FAIL,
  ALL_AUTHORITY_REQUEST,
  ALL_AUTHORITY_SUCCESS,
  DELETE_AUTHORITY_FAIL,
  DELETE_AUTHORITY_REQUEST,
  DELETE_AUTHORITY_SUCCESS,
  SEARCH_AUTHORITY_FAIL,
  SEARCH_AUTHORITY_REQUEST,
  SEARCH_AUTHORITY_SUCCESS,
  UPDATE_AUTHORITY_FAIL,
  UPDATE_AUTHORITY_REQUEST,
  UPDATE_AUTHORITY_SUCCESS
} from '../constaints/authotityConstaints';

const initialState = {
  authorities: [],
  all_authority: [],
  authority: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const authorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_AUTHORITY_REQUEST:
    case ADD_AUTHORITY_REQUEST:
    case DELETE_AUTHORITY_REQUEST:
    case UPDATE_AUTHORITY_REQUEST:
    case SEARCH_AUTHORITY_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_AUTHORITY_SUCCESS:
      return {
        ...state,
        all_authority: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_AUTHORITY_SUCCESS:
      return {
        ...state,
        authorities: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_AUTHORITY_SUCCESS:
    case UPDATE_AUTHORITY_SUCCESS:
      return {
        ...state,
        authority: action?.payload?.data,
        error: null
      };
    case DELETE_AUTHORITY_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_AUTHORITY_FAIL:
    case ADD_AUTHORITY_FAIL:
    case DELETE_AUTHORITY_FAIL:
    case UPDATE_AUTHORITY_FAIL:
    case SEARCH_AUTHORITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default authorityReducer;
