import {
    ADD_ROOM_SERVICE_FAIL,
    ADD_ROOM_SERVICE_REQUEST,
    ADD_ROOM_SERVICE_SUCCESS,
    ALL_ROOM_SERVICE_FAIL,
    ALL_ROOM_SERVICE_REQUEST,
    ALL_ROOM_SERVICE_SUCCESS,
    DELETE_ROOM_SERVICE_FAIL,
    DELETE_ROOM_SERVICE_REQUEST,
    DELETE_ROOM_SERVICE_SUCCESS,
    SEARCH_ROOM_SERVICE_FAIL,
    SEARCH_ROOM_SERVICE_REQUEST,
    SEARCH_ROOM_SERVICE_SUCCESS,
    UPDATE_ROOM_SERVICE_FAIL,
    UPDATE_ROOM_SERVICE_REQUEST,
    UPDATE_ROOM_SERVICE_SUCCESS
  } from '../constaints/roomServiceConstaints';
  
  export const getAllRoomServiceRequest = (payload) => ({
    type: ALL_ROOM_SERVICE_REQUEST,
    payload
  });
  
  export const getAllRoomServiceSuccess = (payload) => ({
    type: ALL_ROOM_SERVICE_SUCCESS,
    payload
  });
  
  export const getAllRoomServiceFail = (payload) => ({
    type: ALL_ROOM_SERVICE_FAIL,
    payload
  });
  
  export const searchRoomServiceRequest = (payload) => ({
    type: SEARCH_ROOM_SERVICE_REQUEST,
    payload
  });
  
  export const searchRoomServiceSuccess = (payload) => ({
    type: SEARCH_ROOM_SERVICE_SUCCESS,
    payload
  });
  
  export const searchRoomServiceFail = (payload) => ({
    type: SEARCH_ROOM_SERVICE_FAIL,
    payload
  });
  
  // ADD
  export const addRoomServiceRequest = (payload) => ({
    type: ADD_ROOM_SERVICE_REQUEST,
    payload
  });
  
  export const addRoomServiceSuccess = (payload) => ({
    type: ADD_ROOM_SERVICE_SUCCESS,
    payload
  });
  
  export const addRoomServiceFail = (payload) => ({
    type: ADD_ROOM_SERVICE_FAIL,
    payload
  });
  
  // DELETE
  export const deleteRoomServiceRequest = (payload) => ({
    type: DELETE_ROOM_SERVICE_REQUEST,
    payload
  });
  
  export const deleteRoomServiceSuccess = (payload) => ({
    type: DELETE_ROOM_SERVICE_SUCCESS,
    payload
  });
  
  export const deleteRoomServiceFail = (payload) => ({
    type: DELETE_ROOM_SERVICE_FAIL,
    payload
  });
  
  // UPDATE
  export const updateRoomServiceRequest = (payload) => ({
    type: UPDATE_ROOM_SERVICE_REQUEST,
    payload
  });
  
  export const updateRoomServiceSuccess = (payload) => ({
    type: UPDATE_ROOM_SERVICE_SUCCESS,
    payload
  });
  
  export const updateRoomServiceFail = (payload) => ({
    type: UPDATE_ROOM_SERVICE_FAIL,
    payload
  });
  