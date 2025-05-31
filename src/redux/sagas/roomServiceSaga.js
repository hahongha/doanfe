import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addRoomService, deleteRoomService, getAllRoomService, searchRoomService, updateRoomService } from '../api/roomServiceApi';
import {
  addRoomServiceFail,
  addRoomServiceSuccess,
  deleteRoomServiceFail,
  deleteRoomServiceSuccess,
  getAllRoomServiceFail,
  getAllRoomServiceSuccess,
  searchRoomServiceFail,
  searchRoomServiceRequest,
  searchRoomServiceSuccess,
  updateRoomServiceFail,
  updateRoomServiceSuccess
} from '../actions/roomServiceAction';
import {
  ADD_ROOM_SERVICE_REQUEST,
  ALL_ROOM_SERVICE_REQUEST,
  DELETE_ROOM_SERVICE_REQUEST,
  SEARCH_ROOM_SERVICE_REQUEST,
  UPDATE_ROOM_SERVICE_REQUEST
} from '../constaints/roomServiceConstaints';
function* getAllRoomServiceSaga() {
  try {
    const response = yield call(getAllRoomService);
    if (response?.data.code === '200') {
      yield put(getAllRoomServiceSuccess(response?.data));
    } else {
      yield put(getAllRoomServiceFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllRoomServiceFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchRoomServiceSaga(action) {
  try {
    const response = yield call(searchRoomService, action.payload);
    if (response?.data.code === '200') {
      yield put(searchRoomServiceSuccess(response?.data));
    } else {
      yield put(searchRoomServiceFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchRoomServiceFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addRoomServiceSaga(action) {
  try {
    const response = yield call(addRoomService, action.payload);
    if (response?.data?.code === '200') {
      yield put(addRoomServiceSuccess(response?.data));
      toast.success('Thêm phòng thành công!');
      yield put(
        searchRoomServiceRequest({
        searchDTO: { 
          page: 0,
          size: 8
        }
      })
      );
    } else {
      yield put(addRoomServiceFail('Thêm phòng thất bại!'));
      toast.error('Thêm phòng thất bại!');
    }
  } catch (error) {
    yield put(addRoomServiceFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteRoomServiceSaga(action) {
  try {
    const response = yield call(deleteRoomService, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteRoomServiceSuccess());
      toast.success('Xóa phòng thành công!');
      yield put(
        searchRoomServiceRequest({
        searchDTO: { 
          page: 0,
          size: 8
        }
      })
      );
    } else {
      yield put(deleteRoomServiceFail('Xóa phòng thất bại'));
      toast.error('Xóa phòng thất bại');
    }
  } catch (error) {
    yield put(deleteRoomServiceFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateRoomServiceSaga(action) {
  try {
    const response = yield call(updateRoomService, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateRoomServiceSuccess(response?.data));
      toast.success('Cập nhật phòng thành công!');
      yield put(
        searchRoomServiceRequest({
        searchDTO: { 
          page: 0,
          size: 8
        }
      })
      );
    } else {
      yield put(updateRoomServiceFail('Cập nhật phòng thất bại'));
      toast.error('Cập nhật phòng thất bại!');
    }
  } catch (error) {
    yield put(updateRoomServiceFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* roomServiceSaga() {
  yield takeEvery(ALL_ROOM_SERVICE_REQUEST, getAllRoomServiceSaga);
  yield takeEvery(ADD_ROOM_SERVICE_REQUEST, addRoomServiceSaga);
  yield takeEvery(DELETE_ROOM_SERVICE_REQUEST, deleteRoomServiceSaga);
  yield takeEvery(UPDATE_ROOM_SERVICE_REQUEST, updateRoomServiceSaga);
  yield takeEvery(SEARCH_ROOM_SERVICE_REQUEST, searchRoomServiceSaga);
}
