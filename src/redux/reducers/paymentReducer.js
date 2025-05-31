import {
  ADD_PAYMENT_FAIL,
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_SUCCESS,
  ALL_PAYMENT_FAIL,
  ALL_PAYMENT_REQUEST,
  ALL_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAIL,
  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
  SEARCH_PAYMENT_FAIL,
  SEARCH_PAYMENT_REQUEST,
  SEARCH_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAIL,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS
} from '../constaints/paymentConstaints';

const initialState = {
  payments: [],
  all_payments: [],
  payment: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PAYMENT_REQUEST:
    case ADD_PAYMENT_REQUEST:
    case DELETE_PAYMENT_REQUEST:
    case UPDATE_PAYMENT_REQUEST:
    case SEARCH_PAYMENT_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_PAYMENT_SUCCESS:
      return {
        ...state,
        all_payments: action?.payload?.data,
        // totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_PAYMENT_SUCCESS:
    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: action?.payload?.data,
        error: null
      };
    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_PAYMENT_FAIL:
    case ADD_PAYMENT_FAIL:
    case DELETE_PAYMENT_FAIL:
    case UPDATE_PAYMENT_FAIL:
    case SEARCH_PAYMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default paymentReducer;
