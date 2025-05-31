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

export const getAllPaymentRequest = (payload) => ({
  type: ALL_PAYMENT_REQUEST,
  payload
});

export const getAllPaymentSuccess = (payload) => ({
  type: ALL_PAYMENT_SUCCESS,
  payload
});

export const getAllPaymentFail = (payload) => ({
  type: ALL_PAYMENT_FAIL,
  payload
});

export const searchPaymentRequest = (payload) => ({
  type: SEARCH_PAYMENT_REQUEST,
  payload
});

export const searchPaymentSuccess = (payload) => ({
  type: SEARCH_PAYMENT_SUCCESS,
  payload
});

export const searchPaymentFail = (payload) => ({
  type: SEARCH_PAYMENT_FAIL,
  payload
});

// ADD
export const addPaymentRequest = (payload) => ({
  type: ADD_PAYMENT_REQUEST,
  payload
});

export const addPaymentSuccess = (payload) => ({
  type: ADD_PAYMENT_SUCCESS,
  payload
});

export const addPaymentFail = (payload) => ({
  type: ADD_PAYMENT_FAIL,
  payload
});

// DELETE
export const deletePaymentRequest = (payload) => ({
  type: DELETE_PAYMENT_REQUEST,
  payload
});

export const deletePaymentSuccess = (payload) => ({
  type: DELETE_PAYMENT_SUCCESS,
  payload
});

export const deletePaymentFail = (payload) => ({
  type: DELETE_PAYMENT_FAIL,
  payload
});

// UPDATE
export const updatePaymentRequest = (payload) => ({
  type: UPDATE_PAYMENT_REQUEST,
  payload
});

export const updatePaymentSuccess = (payload) => ({
  type: UPDATE_PAYMENT_SUCCESS,
  payload
});

export const updatePaymentFail = (payload) => ({
  type: UPDATE_PAYMENT_FAIL,
  payload
});
