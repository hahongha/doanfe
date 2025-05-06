import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addRoomReturn, deleteRoomReturn, getAllRoomReturn, searchRoomReturn, updateRoomReturn } from '../api/roomReturnApi';
import {
  addRoomReturnFail,
  addRoomReturnSuccess,
  deleteRoomReturnFail,
  deleteRoomReturnSuccess,
  getAllRoomReturnFail,
  getAllRoomReturnSuccess,
  searchRoomReturnFail,
  searchRoomReturnRequest,
  searchRoomReturnSuccess,
  updateRoomReturnFail,
  updateRoomReturnSuccess
} from '../actions/roomReturnAction';
import {
  ADD_ROOM_RETURN_REQUEST,
  ALL_ROOM_RETURN_REQUEST,
  DELETE_ROOM_RETURN_REQUEST,
  SEARCH_ROOM_RETURN_REQUEST,
  UPDATE_ROOM_RETURN_REQUEST
} from '../constaints/roomReturnConstaints';
function* getAllRoomReturnSaga() {
  try {
    const response = yield call(getAllRoomReturn);
    if (response?.data.code === '200') {
      yield put(getAllRoomReturnSuccess(response?.data));
    } else {
      yield put(getAllRoomReturnFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllRoomReturnFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchRoomReturnSaga(action) {
  try {
    const response = yield call(searchRoomReturn, action.payload);
    if (response?.data.code === '200') {
      yield put(searchRoomReturnSuccess(response?.data));
    } else {
      yield put(searchRoomReturnFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchRoomReturnFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addRoomReturnSaga(action) {
  try {
    const response = yield call(addRoomReturn, action.payload);
    if (response?.data?.code === '200') {
      yield put(addRoomReturnSuccess(response?.data));
      toast.success('Thêm phòng thành công!');
      yield put(
        searchRoomReturnRequest({
        searchDTO: { 
          page: 0,
          size: 5
        }
      })
      );
    } else {
      yield put(addRoomReturnFail('Thêm phòng thất bại!'));
      toast.error('Thêm phòng thất bại!');
    }
  } catch (error) {
    yield put(addRoomReturnFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteRoomReturnSaga(action) {
  try {
    const response = yield call(deleteRoomReturn, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteRoomReturnSuccess());
      toast.success('Xóa phòng thành công!');
      yield put(
        searchRoomReturnRequest({
        searchDTO: { 
          page: 0,
          size: 5
        }
      })
      );
    } else {
      yield put(deleteRoomReturnFail('Xóa phòng thất bại'));
      toast.error('Xóa phòng thất bại');
    }
  } catch (error) {
    yield put(deleteRoomReturnFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateRoomReturnSaga(action) {
  try {
    const response = yield call(updateRoomReturn, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateRoomReturnSuccess(response?.data));
      toast.success('Cập nhật phòng thành công!');
      yield put(
        searchRoomReturnRequest({
        searchDTO: { 
          page: 0,
          size: 5
        }
      })
      );
    } else {
      yield put(updateRoomReturnFail('Cập nhật phòng thất bại'));
      toast.error('Cập nhật phòng thất bại!');
    }
  } catch (error) {
    yield put(updateRoomReturnFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* roomReturnSaga() {
  yield takeEvery(ALL_ROOM_RETURN_REQUEST, getAllRoomReturnSaga);
  yield takeEvery(ADD_ROOM_RETURN_REQUEST, addRoomReturnSaga);
  yield takeEvery(DELETE_ROOM_RETURN_REQUEST, deleteRoomReturnSaga);
  yield takeEvery(UPDATE_ROOM_RETURN_REQUEST, updateRoomReturnSaga);
  yield takeEvery(SEARCH_ROOM_RETURN_REQUEST, searchRoomReturnSaga);
}
