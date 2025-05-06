import {
  ADD_RENTER_FAIL,
  ADD_RENTER_REQUEST,
  ADD_RENTER_SUCCESS,
  ALL_RENTER_FAIL,
  ALL_RENTER_REQUEST,
  ALL_RENTER_SUCCESS,
  DELETE_RENTER_FAIL,
  DELETE_RENTER_REQUEST,
  DELETE_RENTER_SUCCESS,
  SEARCH_RENTER_FAIL,
  SEARCH_RENTER_REQUEST,
  SEARCH_RENTER_SUCCESS,
  UPDATE_RENTER_FAIL,
  UPDATE_RENTER_REQUEST,
  UPDATE_RENTER_SUCCESS
} from '../constaints/renterConstaints';

const initialState = {
  renters: [],
  all_renter: [],
  renter: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const renterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_RENTER_REQUEST:
    case ADD_RENTER_REQUEST:
    case DELETE_RENTER_REQUEST:
    case UPDATE_RENTER_REQUEST:
    case SEARCH_RENTER_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_RENTER_SUCCESS:
      return {
        ...state,
        all_renter: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_RENTER_SUCCESS:
      return {
        ...state,
        renters: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_RENTER_SUCCESS:
    case UPDATE_RENTER_SUCCESS:
      return {
        ...state,
        renter: action?.payload?.data,
        error: null
      };
    case DELETE_RENTER_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_RENTER_FAIL:
    case ADD_RENTER_FAIL:
    case DELETE_RENTER_FAIL:
    case UPDATE_RENTER_FAIL:
    case SEARCH_RENTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default renterReducer;
