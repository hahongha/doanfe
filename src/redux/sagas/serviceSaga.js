import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addServiceFail,
  addServiceSuccess,
  deleteServiceFail,
  deleteServiceSuccess,
  getAllServiceFail,
  getAllServiceSuccess,
  searchServiceFail,
  searchServiceRequest,
  searchServiceSuccess,
  updateServiceFail,
  updateServiceSuccess
} from '../actions/serviceAction';
import {
  ADD_SERVICE_REQUEST,
  ALL_SERVICE_REQUEST,
  DELETE_SERVICE_REQUEST,
  SEARCH_SERVICE_REQUEST,
  UPDATE_SERVICE_REQUEST
} from '../constaints/serviceConstaints';
import { addService, deleteService, getAllService, searchService, updateService } from '../api/serviceApi';

function* getAllServiceSaga() {
  try {
    const response = yield call(getAllService);
    if (response?.data.code === '200') {
      yield put(getAllServiceSuccess(response?.data));
    } else {
      yield put(getAllServiceFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllServiceFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchServiceSaga(action) {
  try {
    const response = yield call(searchService, action.payload);
    if (response?.data.code === '200') {
      yield put(searchServiceSuccess(response?.data));
    } else {
      yield put(searchServiceFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchServiceFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addServiceSaga(action) {
  try {
    const response = yield call(addService, action.payload);
    if (response?.data?.code === '200') {
      yield put(addServiceSuccess(response?.data));
      toast.success('Thêm dịch vụ thành công!');
      yield put(
        searchServiceRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(addServiceFail('Thêm dịch vụ thất bại!'));
      toast.error('Thêm dịch vụ thất bại!');
    }
  } catch (error) {
    yield put(addServiceFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteServiceSaga(action) {
  try {
    const response = yield call(deleteService, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteServiceSuccess());
      toast.success('Xóa dịch vụ thành công!');
      yield put(
        searchServiceRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteServiceFail('Xóa dịch vụ thất bại'));
      toast.error('Xóa dịch vụ thất bại');
    }
  } catch (error) {
    yield put(deleteServiceFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateServiceSaga(action) {
  try {
    const response = yield call(updateService, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateServiceSuccess(response?.data));
      toast.success('Cập nhật dịch vụ thành công!');
      yield put(
        searchServiceRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(updateServiceFail('Cập nhật dịch vụ thất bại'));
      toast.error('Cập nhật dịch vụ thất bại!');
    }
  } catch (error) {
    yield put(updateServiceFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* serviceSaga() {
  yield takeEvery(ALL_SERVICE_REQUEST, getAllServiceSaga);
  yield takeEvery(ADD_SERVICE_REQUEST, addServiceSaga);
  yield takeEvery(DELETE_SERVICE_REQUEST, deleteServiceSaga);
  yield takeEvery(UPDATE_SERVICE_REQUEST, updateServiceSaga);
  yield takeEvery(SEARCH_SERVICE_REQUEST, searchServiceSaga);
}
