import {
  ADD_ROOM_RETURN_FAIL,
  ADD_ROOM_RETURN_REQUEST,
  ADD_ROOM_RETURN_SUCCESS,
  ALL_ROOM_RETURN_FAIL,
  ALL_ROOM_RETURN_REQUEST,
  ALL_ROOM_RETURN_SUCCESS,
  DELETE_ROOM_RETURN_FAIL,
  DELETE_ROOM_RETURN_REQUEST,
  DELETE_ROOM_RETURN_SUCCESS,
  SEARCH_ROOM_RETURN_FAIL,
  SEARCH_ROOM_RETURN_REQUEST,
  SEARCH_ROOM_RETURN_SUCCESS,
  UPDATE_ROOM_RETURN_FAIL,
  UPDATE_ROOM_RETURN_REQUEST,
  UPDATE_ROOM_RETURN_SUCCESS
} from '../constaints/roomReturnConstaints';

const initialState = {
  roomReturns: [],
  all_roomReturns: [],
  roomReturn: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const roomReturnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ROOM_RETURN_REQUEST:
    case ADD_ROOM_RETURN_REQUEST:
    case DELETE_ROOM_RETURN_REQUEST:
    case UPDATE_ROOM_RETURN_REQUEST:
    case SEARCH_ROOM_RETURN_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_ROOM_RETURN_SUCCESS:
      return {
        ...state,
        all_roomReturns: action?.payload?.data,
        // totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_ROOM_RETURN_SUCCESS:
      return {
        ...state,
        roomReturns: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_ROOM_RETURN_SUCCESS:
    case UPDATE_ROOM_RETURN_SUCCESS:
      return {
        ...state,
        roomReturn: action?.payload?.data,
        error: null
      };
    case DELETE_ROOM_RETURN_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_ROOM_RETURN_FAIL:
    case ADD_ROOM_RETURN_FAIL:
    case DELETE_ROOM_RETURN_FAIL:
    case UPDATE_ROOM_RETURN_FAIL:
    case SEARCH_ROOM_RETURN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default roomReturnReducer;
