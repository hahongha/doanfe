import {
  ADD_ROOM_TYPE_FAIL,
  ADD_ROOM_TYPE_REQUEST,
  ADD_ROOM_TYPE_SUCCESS,
  ALL_ROOM_TYPE_FAIL,
  ALL_ROOM_TYPE_REQUEST,
  ALL_ROOM_TYPE_SUCCESS,
  DELETE_ROOM_TYPE_FAIL,
  DELETE_ROOM_TYPE_REQUEST,
  DELETE_ROOM_TYPE_SUCCESS,
  SEARCH_ROOM_TYPE_FAIL,
  SEARCH_ROOM_TYPE_REQUEST,
  SEARCH_ROOM_TYPE_SUCCESS,
  UPDATE_ROOM_TYPE_FAIL,
  UPDATE_ROOM_TYPE_REQUEST,
  UPDATE_ROOM_TYPE_SUCCESS
} from '../constaints/roomTypeConstaints';

export const getAllRoomTypeRequest = (payload) => ({
  type: ALL_ROOM_TYPE_REQUEST,
  payload
});

export const getAllRoomTypeSuccess = (payload) => ({
  type: ALL_ROOM_TYPE_SUCCESS,
  payload
});

export const getAllRoomTypeFail = (payload) => ({
  type: ALL_ROOM_TYPE_FAIL,
  payload
});

export const searchRoomTypeRequest = (payload) => ({
  type: SEARCH_ROOM_TYPE_REQUEST,
  payload
});

export const searchRoomTypeSuccess = (payload) => ({
  type: SEARCH_ROOM_TYPE_SUCCESS,
  payload
});

export const searchRoomTypeFail = (payload) => ({
  type: SEARCH_ROOM_TYPE_FAIL,
  payload
});

// ADD
export const addRoomTypeRequest = (payload) => ({
  type: ADD_ROOM_TYPE_REQUEST,
  payload
});

export const addRoomTypeSuccess = (payload) => ({
  type: ADD_ROOM_TYPE_SUCCESS,
  payload
});

export const addRoomTypeFail = (payload) => ({
  type: ADD_ROOM_TYPE_FAIL,
  payload
});

// DELETE
export const deleteRoomTypeRequest = (payload) => ({
  type: DELETE_ROOM_TYPE_REQUEST,
  payload
});

export const deleteRoomTypeSuccess = (payload) => ({
  type: DELETE_ROOM_TYPE_SUCCESS,
  payload
});

export const deleteRoomTypeFail = (payload) => ({
  type: DELETE_ROOM_TYPE_FAIL,
  payload
});

// UPDATE
export const updateRoomTypeRequest = (payload) => ({
  type: UPDATE_ROOM_TYPE_REQUEST,
  payload
});

export const updateRoomTypeSuccess = (payload) => ({
  type: UPDATE_ROOM_TYPE_SUCCESS,
  payload
});

export const updateRoomTypeFail = (payload) => ({
  type: UPDATE_ROOM_TYPE_FAIL,
  payload
});
