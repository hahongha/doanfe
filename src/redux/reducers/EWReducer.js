import {
  ADD_EW_FAIL,
  ADD_EW_REQUEST,
  ADD_EW_SUCCESS,
  ALL_EW_FAIL,
  ALL_EW_REQUEST,
  ALL_EW_SUCCESS,
  DELETE_EW_FAIL,
  DELETE_EW_REQUEST,
  DELETE_EW_SUCCESS,
  SEARCH_EW_FAIL,
  SEARCH_EW_REQUEST,
  SEARCH_EW_SUCCESS,
  UPDATE_EW_FAIL,
  UPDATE_EW_REQUEST,
  UPDATE_EW_SUCCESS
} from '../constaints/EWConstaints';

const initialState = {
  EWs: [],
  all_EW: [],
  EW: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const EWReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_EW_REQUEST:
    case ADD_EW_REQUEST:
    case DELETE_EW_REQUEST:
    case UPDATE_EW_REQUEST:
    case SEARCH_EW_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_EW_SUCCESS:
      return {
        ...state,
        all_EW: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_EW_SUCCESS:
      return {
        ...state,
        EWs: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_EW_SUCCESS:
    case UPDATE_EW_SUCCESS:
      return {
        ...state,
        EW: action?.payload?.data,
        error: null
      };
    case DELETE_EW_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_EW_FAIL:
    case ADD_EW_FAIL:
    case DELETE_EW_FAIL:
    case UPDATE_EW_FAIL:
    case SEARCH_EW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default EWReducer;
