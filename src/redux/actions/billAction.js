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
    GET_BILL_FAIL,
    GET_BILL_REQUEST,
    GET_BILL_SUCCESS,
    SEARCH_BILL_FAIL,
    SEARCH_BILL_REQUEST,
    SEARCH_BILL_SUCCESS,
    UPDATE_BILL_FAIL,
    UPDATE_BILL_REQUEST,
    UPDATE_BILL_SUCCESS
  } from '../constaints/billConstaints';
  
  export const getAllBillRequest = (payload) => ({
    type: ALL_BILL_REQUEST,
    payload
  });
  
  export const getAllBillSuccess = (payload) => ({
    type: ALL_BILL_SUCCESS,
    payload
  });
  
  export const getAllBillFail = (payload) => ({
    type: ALL_BILL_FAIL,
    payload
  });
  
  export const searchBillRequest = (payload) => ({
    type: SEARCH_BILL_REQUEST,
    payload
  });
  
  export const searchBillSuccess = (payload) => ({
    type: SEARCH_BILL_SUCCESS,
    payload
  });
  
  export const searchBillFail = (payload) => ({
    type: SEARCH_BILL_FAIL,
    payload
  });
  
  // ADD
  export const addBillRequest = (payload) => ({
    type: ADD_BILL_REQUEST,
    payload
  });
  
  export const addBillSuccess = (payload) => ({
    type: ADD_BILL_SUCCESS,
    payload
  });
  
  export const addBillFail = (payload) => ({
    type: ADD_BILL_FAIL,
    payload
  });
  
  // DELETE
  export const deleteBillRequest = (payload) => ({
    type: DELETE_BILL_REQUEST,
    payload
  });
  
  export const deleteBillSuccess = (payload) => ({
    type: DELETE_BILL_SUCCESS,
    payload
  });
  
  export const deleteBillFail = (payload) => ({
    type: DELETE_BILL_FAIL,
    payload
  });
  
  // UPDATE
  export const updateBillRequest = (payload) => ({
    type: UPDATE_BILL_REQUEST,
    payload
  });
  
  export const updateBillSuccess = (payload) => ({
    type: UPDATE_BILL_SUCCESS,
    payload
  });
  
  export const updateBillFail = (payload) => ({
    type: UPDATE_BILL_FAIL,
    payload
  });
  
  // get
  export const getBillRequest = (payload) => ({
    type: GET_BILL_REQUEST,
    payload
  });
  
  export const getBillSuccess = (payload) => ({
    type: GET_BILL_SUCCESS,
    payload
  });
  
  export const getBillFail = (payload) => ({
    type: GET_BILL_FAIL,
    payload
  });