import {
  ADD_CONTRACT_MEMBER_FAIL,
  ADD_CONTRACT_MEMBER_REQUEST,
  ADD_CONTRACT_MEMBER_SUCCESS,
  ALL_CONTRACT_MEMBER_FAIL,
  ALL_CONTRACT_MEMBER_REQUEST,
  ALL_CONTRACT_MEMBER_SUCCESS,
  DELETE_CONTRACT_MEMBER_FAIL,
  DELETE_CONTRACT_MEMBER_REQUEST,
  DELETE_CONTRACT_MEMBER_SUCCESS,
  SEARCH_CONTRACT_MEMBER_FAIL,
  SEARCH_CONTRACT_MEMBER_REQUEST,
  SEARCH_CONTRACT_MEMBER_SUCCESS,
  UPDATE_CONTRACT_MEMBER_FAIL,
  UPDATE_CONTRACT_MEMBER_REQUEST,
  UPDATE_CONTRACT_MEMBER_SUCCESS
} from '../constaints/contractMemberConstaints';

const initialState = {
  contractMembers: [],
  all_contractMember: [],
  contractMember: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const contractMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CONTRACT_MEMBER_REQUEST:
    case ADD_CONTRACT_MEMBER_REQUEST:
    case DELETE_CONTRACT_MEMBER_REQUEST:
    case UPDATE_CONTRACT_MEMBER_REQUEST:
    case SEARCH_CONTRACT_MEMBER_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ALL_CONTRACT_MEMBER_SUCCESS:
      return {
        ...state,
        all_contractMember: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case SEARCH_CONTRACT_MEMBER_SUCCESS:
      return {
        ...state,
        contractMembers: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_CONTRACT_MEMBER_SUCCESS:
    case UPDATE_CONTRACT_MEMBER_SUCCESS:
      return {
        ...state,
        contractMember: action?.payload?.data,
        error: null
      };
    case DELETE_CONTRACT_MEMBER_SUCCESS:
      return {
        ...state,
        error: null
      };
    case ALL_CONTRACT_MEMBER_FAIL:
    case ADD_CONTRACT_MEMBER_FAIL:
    case DELETE_CONTRACT_MEMBER_FAIL:
    case UPDATE_CONTRACT_MEMBER_FAIL:
    case SEARCH_CONTRACT_MEMBER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default contractMemberReducer;
