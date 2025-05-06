import {
  ADD_ROOM_FAIL,
  ADD_ROOM_REQUEST,
  ADD_ROOM_SUCCESS,
  ALL_ROOM_FAIL,
  ALL_ROOM_REQUEST,
  ALL_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  SEARCH_ROOM_FAIL,
  SEARCH_ROOM_REQUEST,
  SEARCH_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS
} from '../constaints/roomConstaints';

const initialState = {
  rooms: [],
  all_rooms: [],
  room: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ROOM_REQUEST:
    case ADD_ROOM_REQUEST:
    case DELETE_ROOM_REQUEST:
    case UPDATE_ROOM_REQUEST:
    case SEARCH_ROOM_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_ROOM_SUCCESS:
      return {
        ...state,
        all_rooms: action?.payload?.data,
        // totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_ROOM_SUCCESS:
      return {
        ...state,
        rooms: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_ROOM_SUCCESS:
    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        room: action?.payload?.data,
        error: null
      };
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_ROOM_FAIL:
    case ADD_ROOM_FAIL:
    case DELETE_ROOM_FAIL:
    case UPDATE_ROOM_FAIL:
    case SEARCH_ROOM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default roomReducer;
