import {
  ADD_CONTRACT_FAIL,
  ADD_CONTRACT_REQUEST,
  ADD_CONTRACT_SUCCESS,
  ALL_CONTRACT_FAIL,
  ALL_CONTRACT_REQUEST,
  ALL_CONTRACT_SUCCESS,
  DELETE_CONTRACT_FAIL,
  DELETE_CONTRACT_REQUEST,
  DELETE_CONTRACT_SUCCESS,
  SEARCH_CONTRACT_FAIL,
  SEARCH_CONTRACT_REQUEST,
  SEARCH_CONTRACT_SUCCESS,
  UPDATE_CONTRACT_FAIL,
  UPDATE_CONTRACT_REQUEST,
  UPDATE_CONTRACT_SUCCESS
} from 'redux/constaints/contractConstaints';

const initialState = {
  contracts: [],
  all_contract: [],
  contract: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const contractReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CONTRACT_REQUEST:
    case ADD_CONTRACT_REQUEST:
    case DELETE_CONTRACT_REQUEST:
    case UPDATE_CONTRACT_REQUEST:
    case SEARCH_CONTRACT_REQUEST:
      console.log(action.type);
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_CONTRACT_SUCCESS:
      return {
        ...state,
        all_contract: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_CONTRACT_SUCCESS:
      return {
        ...state,
        contracts: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_CONTRACT_SUCCESS:
    case UPDATE_CONTRACT_SUCCESS:
      return {
        ...state,
        contract: action?.payload?.data,
        error: null
      };
    case DELETE_CONTRACT_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_CONTRACT_FAIL:
    case ADD_CONTRACT_FAIL:
    case DELETE_CONTRACT_FAIL:
    case UPDATE_CONTRACT_FAIL:
    case SEARCH_CONTRACT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default contractReducer;
