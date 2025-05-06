import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addRenterFail,
  addRenterSuccess,
  deleteRenterFail,
  deleteRenterSuccess,
  getAllRenterFail,
  getAllRenterSuccess,
  searchRenterFail,
  searchRenterRequest,
  searchRenterSuccess,
  updateRenterFail,
  updateRenterSuccess
} from 'redux/actions/RenterAction';
import {
  ADD_RENTER_REQUEST,
  ALL_RENTER_REQUEST,
  DELETE_RENTER_REQUEST,
  SEARCH_RENTER_REQUEST,
  UPDATE_RENTER_REQUEST
} from '../constaints/renterConstaints';
import { addRenter, deleteRenter, getAllRenter, searchRenter, updateRenter } from '../api/renterApi';

function* getAllRenterSaga() {
  try {
    const response = yield call(getAllRenter);
    if (response?.data.code === '200') {
      yield put(getAllRenterSuccess(response?.data));
    } else {
      yield put(getAllRenterFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllRenterFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchRenterSaga(action) {
  try {
    const response = yield call(searchRenter, action.payload);
    if (response?.data.code === '200') {
      yield put(searchRenterSuccess(response?.data));
    } else {
      yield put(searchRenterFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchRenterFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addRenterSaga(action) {
  try {
    const response = yield call(addRenter, action.payload);
    if (response?.data?.code === '200') {
      yield put(addRenterSuccess(response?.data));
      toast.success('Thêm khách thuê thành công!');
      yield put(
        searchRenterRequest({
          searchDTO: { 
            page: 0,
            size: 5,
            value: `%%`
          }
        })
      );
    } else {
      yield put(addRenterFail('Thêm khách thuê thất bại!'));
      toast.error('Thêm khách thuê thất bại!');
    }
  } catch (error) {
    yield put(addRenterFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteRenterSaga(action) {
  try {
    const response = yield call(deleteRenter, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteRenterSuccess());
      toast.success('Xóa khách thuê thành công!');
      yield put(
        searchRenterRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteRenterFail('Xóa khách thuê thất bại'));
      toast.error('Xóa khách thuê thất bại');
    }
  } catch (error) {
    yield put(deleteRenterFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateRenterSaga(action) {
  try {
    const response = yield call(updateRenter, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateRenterSuccess(response?.data));
      toast.success('Cập nhật khách thuê thành công!');
      yield put(
        searchRenterRequest({
          searchDTO: { 
            page: 0,
            size: 5,
            value: `%%`
          }
        })
      );
    } else {
      yield put(updateRenterFail('Cập nhật khách thuê thất bại'));
      toast.error('Cập nhật khách thuê thất bại!');
    }
  } catch (error) {
    yield put(updateRenterFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* renterSaga() {
  yield takeEvery(ALL_RENTER_REQUEST, getAllRenterSaga);
  yield takeEvery(ADD_RENTER_REQUEST, addRenterSaga);
  yield takeEvery(DELETE_RENTER_REQUEST, deleteRenterSaga);
  yield takeEvery(UPDATE_RENTER_REQUEST, updateRenterSaga);
  yield takeEvery(SEARCH_RENTER_REQUEST, searchRenterSaga);
}
