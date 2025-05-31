import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addEWFail,
  addEWSuccess,
  deleteEWFail,
  deleteEWSuccess,
  getAllEWFail,
  getAllEWSuccess,
  searchEWFail,
  searchEWRequest,
  searchEWSuccess,
  updateEWFail,
  updateEWSuccess
} from 'redux/actions/ewActions';
import {
  ADD_EW_REQUEST,
  ALL_EW_REQUEST,
  DELETE_EW_REQUEST,
  SEARCH_EW_REQUEST,
  UPDATE_EW_REQUEST
} from '../constaints/EWConstaints';
import { addEW, deleteEW, getAllEW, searchEW, updateEW } from '../api/ewApi';

function* getAllEWSaga() {
  try {
    const response = yield call(getAllEW);
    if (response?.data.code === '200') {
      yield put(getAllEWSuccess(response?.data));
    } else {
      yield put(getAllEWFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllEWFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchEWSaga(action) {
  try {
    const response = yield call(searchEW, action.payload);
    if (response?.data.code === '200') {
      yield put(searchEWSuccess(response?.data));
    } else {
      yield put(searchEWFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchEWFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addEWSaga(action) {
  try {
    const response = yield call(addEW, action.payload);
    if (response?.data?.code === '200') {
      yield put(addEWSuccess(response?.data));
      toast.success('Thêm chỉ số thành công!');
      yield put(
        searchEWRequest({
          searchDTO:{
          page: 8,
          size: 0,
          value: null
        }
        })
      );
    } else {
      yield put(addEWFail('Thêm chỉ số thất bại!'));
      toast.error('Thêm chỉ số thất bại!');
    }
  } catch (error) {
    yield put(addEWFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteEWSaga(action) {
  try {
    const response = yield call(deleteEW, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteEWSuccess());
      toast.success('Xóa chỉ số thành công!');
      yield put(
        searchEWRequest({
          searchDTO:{
          page: 8,
          size: 0,
          value: null
        }
        })
      );
    } else {
      yield put(deleteEWFail('Xóa chỉ số thất bại'));
      toast.error('Xóa chỉ số thất bại');
    }
  } catch (error) {
    yield put(deleteEWFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateEWSaga(action) {
  try {
    const response = yield call(updateEW, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateEWSuccess(response?.data));
      toast.success('Cập nhật chỉ số thành công!');
      yield put(
        searchEWRequest({
          searchDTO:{
          page: 8,
          size: 0,
          value: null
        }
        })
      );
    } else {
      yield put(updateEWFail('Cập nhật chỉ số thất bại'));
      toast.error('Cập nhật chỉ số thất bại!');
    }
  } catch (error) {
    yield put(updateEWFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* EWSaga() {
  yield takeEvery(ALL_EW_REQUEST, getAllEWSaga);
  yield takeEvery(ADD_EW_REQUEST, addEWSaga);
  yield takeEvery(DELETE_EW_REQUEST, deleteEWSaga);
  yield takeEvery(UPDATE_EW_REQUEST, updateEWSaga);
  yield takeEvery(SEARCH_EW_REQUEST, searchEWSaga);
}
