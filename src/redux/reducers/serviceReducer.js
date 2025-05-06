import {
  ADD_SERVICE_FAIL,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_SUCCESS,
  ALL_SERVICE_FAIL,
  ALL_SERVICE_REQUEST,
  ALL_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  SEARCH_SERVICE_FAIL,
  SEARCH_SERVICE_REQUEST,
  SEARCH_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS
} from '../constaints/serviceConstaints';

const initialState = {
  services: [],
  all_services: [],
  service: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SERVICE_REQUEST:
    case ADD_SERVICE_REQUEST:
    case DELETE_SERVICE_REQUEST:
    case UPDATE_SERVICE_REQUEST:
    case SEARCH_SERVICE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_SERVICE_SUCCESS:
      return {
        ...state,
        all_service: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_SERVICE_SUCCESS:
      return {
        ...state,
        services: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_SERVICE_SUCCESS:
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        service: action?.payload?.data,
        error: null
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_SERVICE_FAIL:
    case ADD_SERVICE_FAIL:
    case DELETE_SERVICE_FAIL:
    case UPDATE_SERVICE_FAIL:
    case SEARCH_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default serviceReducer;
