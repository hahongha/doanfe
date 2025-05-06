import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addImageFail,
  addImageRequest,
  addImageSuccess,
  addListImageFail,
  addListImageRequest,
  addListImageSuccess
} from '../actions/imageAction';
import { ADD_IMAGE_REQUEST, ADD_LIST_IMAGE_REQUEST } from '../constaints/imageConstaints';

function* addImageSaga(action) {
  try {
    const response = yield call(addImageRequest, action.payload);
    console.log('saga');

    console.log(response);
    if (response?.data?.code === '200') {
      yield put(addImageSuccess(response?.data));
      toast.success('Thêm file thành công!');
    } else {
      yield put(addImageFail('Thêm file thất bại!'));
      toast.error('Thêm file thất bại!');
    }
  } catch (error) {
    yield put(addImageFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* addListImageSaga(action) {
  try {
    const response = yield call(addListImageRequest, action.payload);
    console.log('saga');

    console.log(response);

    if (response?.data?.code === '200') {
      yield put(addListImageSuccess(response?.data));
      toast.success('Thêm file thành công!');
    } else {
      yield put(addImageFail('Thêm file thất bại!'));
      toast.error('Thêm file thất bại!');
    }
  } catch (error) {
    yield put(addListImageFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}
export default function* imageSaga() {
  yield takeEvery(ADD_IMAGE_REQUEST, addImageSaga);
  yield takeEvery(ADD_LIST_IMAGE_REQUEST, addListImageSaga);
}
