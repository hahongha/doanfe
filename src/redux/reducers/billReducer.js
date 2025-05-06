import {
    ADD_BILL_FAIL,
    ADD_BILL_REQUEST,
    ADD_BILL_SUCCESS,
    ALL_BILL_FAIL,
    ALL_BILL_REQUEST,
    ALL_BILL_SUCCESS,
    DELETE_BILL_FAIL,
    DELETE_BILL_REQUEST,
    DELETE_BILL_SUCCESS,
    SEARCH_BILL_FAIL,
    SEARCH_BILL_REQUEST,
    SEARCH_BILL_SUCCESS,
    UPDATE_BILL_FAIL,
    UPDATE_BILL_REQUEST,
    UPDATE_BILL_SUCCESS
  } from '../constaints/billConstaints';
  
  const initialState = {
    bills: [],
    all_bills: [],
    bill: {},
    totalRecords: 0,
    loading: true,
    error: false
  };
  const billReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_BILL_REQUEST:
      case ADD_BILL_REQUEST:
      case DELETE_BILL_REQUEST:
      case UPDATE_BILL_REQUEST:
      case SEARCH_BILL_REQUEST:
        return {
          ...state,
          error: null,
          loading: true
        };
      case ALL_BILL_SUCCESS:
        return {
          ...state,
          all_bills: action?.payload?.data,
          // totalRecords: action?.payload?.totalElements,
          loading: false
        };
      case SEARCH_BILL_SUCCESS:
        return {
          ...state,
          bills: action?.payload?.data,
          totalRecords: action?.payload?.totalElements,
          loading: false
        };
      case ADD_BILL_SUCCESS:
      case UPDATE_BILL_SUCCESS:
        return {
          ...state,
          bill: action?.payload?.data,
          error: null
        };
      case DELETE_BILL_SUCCESS:
        return {
          ...state,
          error: null
        };
      case ALL_BILL_FAIL:
      case ADD_BILL_FAIL:
      case DELETE_BILL_FAIL:
      case UPDATE_BILL_FAIL:
      case SEARCH_BILL_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  export default billReducer;
  