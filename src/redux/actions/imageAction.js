import {
  ADD_IMAGE_FAIL,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_LIST_IMAGE_FAIL,
  ADD_LIST_IMAGE_REQUEST,
  ADD_LIST_IMAGE_SUCCESS
} from '../constaints/imageConstaints';

// ADD
export const addImageRequest = (payload) => ({
  type: ADD_IMAGE_REQUEST,
  payload
});

export const addImageSuccess = (payload) => ({
  type: ADD_IMAGE_SUCCESS,
  payload
});

export const addImageFail = (payload) => ({
  type: ADD_IMAGE_FAIL,
  payload
});

// ADD
export const addImageBase64Request = (payload) => ({
  type: ADD_IMAGE_REQUEST,
  payload
});

export const addImageBase64Success = (payload) => ({
  type: ADD_IMAGE_SUCCESS,
  payload
});

export const addListImageBase64Fail = (payload) => ({
  type: ADD_LIST_IMAGE_FAIL,
  payload
});

// ADDList
export const addListImageRequest = (formData, headers) => ({
  type: ADD_LIST_IMAGE_REQUEST,
  payload: { formData, headers } // Truyền headers cùng với formData
});

export const addListImageSuccess = (payload) => ({
  type: ADD_LIST_IMAGE_SUCCESS,
  payload
});

export const addListImageFail = (payload) => ({
  type: ADD_LIST_IMAGE_FAIL,
  payload
});
