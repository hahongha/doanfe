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

const initialState = {
  roomTypes: [],
  all_roomTypes: [],
  roomType: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const roomTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ROOM_TYPE_REQUEST:
    case ADD_ROOM_TYPE_REQUEST:
    case DELETE_ROOM_TYPE_REQUEST:
    case UPDATE_ROOM_TYPE_REQUEST:
    case SEARCH_ROOM_TYPE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_ROOM_TYPE_SUCCESS:
      return {
        ...state,
        all_roomTypes: action?.payload?.data,
        // totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_ROOM_TYPE_SUCCESS:
      return {
        ...state,
        roomTypes: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_ROOM_TYPE_SUCCESS:
    case UPDATE_ROOM_TYPE_SUCCESS:
      return {
        ...state,
        roomType: action?.payload?.data,
        error: null
      };
    case DELETE_ROOM_TYPE_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_ROOM_TYPE_FAIL:
    case ADD_ROOM_TYPE_FAIL:
    case DELETE_ROOM_TYPE_FAIL:
    case UPDATE_ROOM_TYPE_FAIL:
    case SEARCH_ROOM_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default roomTypeReducer;
