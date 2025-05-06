import {
  ADD_IMAGE_FAIL,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_LIST_IMAGE_FAIL,
  ADD_LIST_IMAGE_SUCCESS
} from '../constaints/imageConstaints';

const initialState = {
  files: [],
  all_files: [],
  file: {},
  totalRecords: 0,
  loading: true,
  error: false
};
const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ADD_LIST_IMAGE_SUCCESS:
      return {
        ...state,
        all_files: action?.payload?.data,
        totalRecords: action?.payload?.totalElements,
        loading: false
      };
    case ADD_IMAGE_SUCCESS:
      return {
        ...state,
        file: action?.payload?.data,
        error: null
      };
    case ADD_IMAGE_FAIL:
    case ADD_LIST_IMAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default imageReducer;
