import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addRoomType, deleteRoomType, getAllRoomType, searchRoomType, updateRoomType } from '../api/roomTypeApi';
import {
  addRoomTypeFail,
  addRoomTypeSuccess,
  deleteRoomTypeFail,
  deleteRoomTypeSuccess,
  getAllRoomTypeFail,
  getAllRoomTypeSuccess,
  searchRoomTypeFail,
  searchRoomTypeRequest,
  searchRoomTypeSuccess,
  updateRoomTypeFail,
  updateRoomTypeSuccess
} from '../actions/roomTypeAction';
import {
  ADD_ROOM_TYPE_REQUEST,
  ALL_ROOM_TYPE_REQUEST,
  DELETE_ROOM_TYPE_REQUEST,
  SEARCH_ROOM_TYPE_REQUEST,
  UPDATE_ROOM_TYPE_REQUEST
} from '../constaints/roomTypeConstaints';
function* getAllRoomTypeSaga() {
  try {
    const response = yield call(getAllRoomType);
    console.log('saga');
    console.log(response);
    if (response?.data.code === '200') {
      yield put(getAllRoomTypeSuccess(response?.data));
    } else {
      yield put(getAllRoomTypeFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllRoomTypeFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchRoomTypeSaga(action) {
  try {
    const response = yield call(searchRoomType, action.payload);
    if (response?.data.code === '200') {
      yield put(searchRoomTypeSuccess(response?.data));
    } else {
      yield put(searchRoomTypeFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchRoomTypeFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addRoomTypeSaga(action) {
  try {
    const response = yield call(addRoomType, action.payload);
    if (response?.data?.code === '200') {
      yield put(addRoomTypeSuccess(response?.data));
      toast.success('Thêm loại phòng thành công!');
      yield put(
        searchRoomTypeRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(addRoomTypeFail('Thêm loại phòng thất bại!'));
      toast.error('Thêm loại phòng thất bại!');
    }
  } catch (error) {
    yield put(addRoomTypeFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteRoomTypeSaga(action) {
  try {
    const response = yield call(deleteRoomType, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteRoomTypeSuccess());
      toast.success('Xóa loại phòng thành công!');
      yield put(
        searchRoomTypeRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteRoomTypeFail('Xóa loại phòng thất bại'));
      toast.error('Xóa loại phòng thất bại');
    }
  } catch (error) {
    yield put(deleteRoomTypeFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateRoomTypeSaga(action) {
  try {
    const response = yield call(updateRoomType, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateRoomTypeSuccess(response?.data));
      toast.success('Cập nhật loại phòng thành công!');
      yield put(
        searchRoomTypeRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(updateRoomTypeFail('Cập nhật loại phòng thất bại'));
      toast.error('Cập nhật loại phòng thất bại!');
    }
  } catch (error) {
    yield put(updateRoomTypeFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* roomTypeSaga() {
  yield takeEvery(ALL_ROOM_TYPE_REQUEST, getAllRoomTypeSaga);
  yield takeEvery(ADD_ROOM_TYPE_REQUEST, addRoomTypeSaga);
  yield takeEvery(DELETE_ROOM_TYPE_REQUEST, deleteRoomTypeSaga);
  yield takeEvery(UPDATE_ROOM_TYPE_REQUEST, updateRoomTypeSaga);
  yield takeEvery(SEARCH_ROOM_TYPE_REQUEST, searchRoomTypeSaga);
}
