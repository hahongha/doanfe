import {
  ADD_STAFF_FAIL,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ALL_STAFF_FAIL,
  ALL_STAFF_REQUEST,
  ALL_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  SEARCH_STAFF_FAIL,
  SEARCH_STAFF_REQUEST,
  SEARCH_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS
} from '../constaints/staffConstaints';

const initialState = {
  staffs: [],
  all_staff: [],
  staff: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_STAFF_REQUEST:
    case ADD_STAFF_REQUEST:
    case DELETE_STAFF_REQUEST:
    case UPDATE_STAFF_REQUEST:
    case SEARCH_STAFF_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_STAFF_SUCCESS:
      return {
        ...state,
        all_staff: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_STAFF_SUCCESS:
      return {
        ...state,
        staffs: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_STAFF_SUCCESS:
    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        staff: action?.payload?.data,
        error: null
      };
    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_STAFF_FAIL:
    case ADD_STAFF_FAIL:
    case DELETE_STAFF_FAIL:
    case UPDATE_STAFF_FAIL:
    case SEARCH_STAFF_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default staffReducer;
