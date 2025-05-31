import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addStaffFail,
  addStaffSuccess,
  deleteStaffFail,
  deleteStaffSuccess,
  getAllStaffFail,
  getAllStaffSuccess,
  searchStaffFail,
  searchStaffRequest,
  searchStaffSuccess,
  updateStaffFail,
  updateStaffSuccess
} from '../actions/staffAction';
import {
  ADD_STAFF_REQUEST,
  ALL_STAFF_REQUEST,
  DELETE_STAFF_REQUEST,
  SEARCH_STAFF_REQUEST,
  UPDATE_STAFF_REQUEST
} from '../constaints/staffConstaints';
import { addStaff, deleteStaff, getAllStaff, searchStaff, updateStaff } from '../api/staffApi';

function* getAllStaffSaga() {
  try {
    const response = yield call(getAllStaff);
    if (response?.data.code === '200') {
      yield put(getAllStaffSuccess(response?.data));
    } else {
      yield put(getAllStaffFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllStaffFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchStaffSaga(action) {
  try {
    const response = yield call(searchStaff, action.payload);
    if (response?.data.code === '200') {
      yield put(searchStaffSuccess(response?.data));
    } else {
      yield put(searchStaffFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchStaffFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addStaffSaga(action) {
  try {
    const response = yield call(addStaff, action.payload);
    if (response?.data?.code === '200') {
      yield put(addStaffSuccess(response?.data));
      toast.success('Thêm nhân viên thành công!');
      yield put(
        searchStaffRequest({
          searchDTO: { 
            page: 0,
            size: 5,
            value: `%%`
          }
        })
      );
    } else {
      yield put(addStaffFail('Thêm nhân viên thất bại!'));
      toast.error('Thêm nhân viên thất bại!');
    }
  } catch (error) {
    yield put(addStaffFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteStaffSaga(action) {
  try {
    const response = yield call(deleteStaff, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteStaffSuccess());
      toast.success('Xóa nhân viên thành công!');
      yield put(
        searchStaffRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteStaffFail('Xóa nhân viên thất bại'));
      toast.error('Xóa nhân viên thất bại');
    }
  } catch (error) {
    yield put(deleteStaffFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateStaffSaga(action) {
  try {
    const response = yield call(updateStaff, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateStaffSuccess(response?.data));
      toast.success('Cập nhật nhân viên thành công!');
      yield put(
        searchStaffRequest({
          searchDTO: { 
            page: 0,
            size: 5,
            value: `%%`
          }
        })
      );
    } else {
      yield put(updateStaffFail('Cập nhật nhân viên thất bại'));
      toast.error('Cập nhật nhân viên thất bại!');
    }
  } catch (error) {
    yield put(updateStaffFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* StaffSaga() {
  yield takeEvery(ALL_STAFF_REQUEST, getAllStaffSaga);
  yield takeEvery(ADD_STAFF_REQUEST, addStaffSaga);
  yield takeEvery(DELETE_STAFF_REQUEST, deleteStaffSaga);
  yield takeEvery(UPDATE_STAFF_REQUEST, updateStaffSaga);
  yield takeEvery(SEARCH_STAFF_REQUEST, searchStaffSaga);
}
