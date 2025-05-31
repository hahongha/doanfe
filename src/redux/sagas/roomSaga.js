import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addRoom, deleteRoom, getAllRoom, searchRoom, updateRoom } from '../api/roomApi';
import {
  addRoomFail,
  addRoomSuccess,
  deleteRoomFail,
  deleteRoomSuccess,
  getAllRoomFail,
  getAllRoomSuccess,
  searchRoomFail,
  searchRoomRequest,
  searchRoomSuccess,
  updateRoomFail,
  updateRoomSuccess
} from '../actions/roomAction';
import {
  ADD_ROOM_REQUEST,
  ALL_ROOM_REQUEST,
  DELETE_ROOM_REQUEST,
  SEARCH_ROOM_REQUEST,
  UPDATE_ROOM_REQUEST
} from '../constaints/roomConstaints';
function* getAllRoomSaga() {
  try {
    const response = yield call(getAllRoom);
    if (response?.data.code === '200') {
      yield put(getAllRoomSuccess(response?.data));
    } else {
      yield put(getAllRoomFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllRoomFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchRoomSaga(action) {
  try {
    const response = yield call(searchRoom, action.payload);
    if (response?.data.code === '200') {
      yield put(searchRoomSuccess(response?.data));
    } else {
      yield put(searchRoomFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchRoomFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addRoomSaga(action) {
  try {
    const response = yield call(addRoom, action.payload);
    if (response?.data?.code === '200') {
      yield put(addRoomSuccess(response?.data));
      toast.success('Thêm phòng thành công!');
      yield put(
        searchRoomRequest({
          page: 0,
          size: 3,
          value: `%%`
        })
      );
    } else {
      yield put(addRoomFail('Thêm phòng thất bại!'));
      toast.error('Thêm phòng thất bại!');
    }
  } catch (error) {
    yield put(addRoomFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteRoomSaga(action) {
  try {
    const response = yield call(deleteRoom, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteRoomSuccess());
      toast.success('Xóa phòng thành công!');
      yield put(
        searchRoomRequest({
          page: 0,
          size: 3,
          value: `%%`
        })
      );
    } else {
      yield put(deleteRoomFail('Xóa phòng thất bại'));
      toast.error('Xóa phòng thất bại');
    }
  } catch (error) {
    yield put(deleteRoomFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateRoomSaga(action) {
  try {
    const response = yield call(updateRoom, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateRoomSuccess(response?.data));
      toast.success('Cập nhật phòng thành công!');
      yield put(
        searchRoomRequest({
          page: 0,
          size: 3,
          value: `%%`
        })
      );
    } else {
      yield put(updateRoomFail('Cập nhật phòng thất bại'));
      toast.error('Cập nhật phòng thất bại!');
    }
  } catch (error) {
    yield put(updateRoomFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* roomSaga() {
  yield takeEvery(ALL_ROOM_REQUEST, getAllRoomSaga);
  yield takeEvery(ADD_ROOM_REQUEST, addRoomSaga);
  yield takeEvery(DELETE_ROOM_REQUEST, deleteRoomSaga);
  yield takeEvery(UPDATE_ROOM_REQUEST, updateRoomSaga);
  yield takeEvery(SEARCH_ROOM_REQUEST, searchRoomSaga);
}
