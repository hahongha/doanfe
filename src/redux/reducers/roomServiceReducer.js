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

const initialState = {
  roomServices: [],
  all_roomServices: [],
  roomService: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const roomServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ROOM_SERVICE_REQUEST:
    case ADD_ROOM_SERVICE_REQUEST:
    case DELETE_ROOM_SERVICE_REQUEST:
    case UPDATE_ROOM_SERVICE_REQUEST:
    case SEARCH_ROOM_SERVICE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_ROOM_SERVICE_SUCCESS:
      return {
        ...state,
        all_roomServices: action?.payload?.data,
        // totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_ROOM_SERVICE_SUCCESS:
      return {
        ...state,
        roomServices: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_ROOM_SERVICE_SUCCESS:
    case UPDATE_ROOM_SERVICE_SUCCESS:
      return {
        ...state,
        roomService: action?.payload?.data,
        error: null
      };
    case DELETE_ROOM_SERVICE_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_ROOM_SERVICE_FAIL:
    case ADD_ROOM_SERVICE_FAIL:
    case DELETE_ROOM_SERVICE_FAIL:
    case UPDATE_ROOM_SERVICE_FAIL:
    case SEARCH_ROOM_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default roomServiceReducer;
