import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addUserFail,
  addUserSuccess,
  deleteUserFail,
  deleteUserSuccess,
  getAllUserFail,
  getAllUserSuccess,
  searchUserFail,
  searchUserRequest,
  searchUserSuccess,
  updateUserFail,
  updateUserSuccess
} from 'redux/actions/userAction';
import {
  ADD_USER_REQUEST,
  ALL_USER_REQUEST,
  DELETE_USER_REQUEST,
  SEARCH_USER_REQUEST,
  UPDATE_USER_REQUEST
} from 'redux/constaints/userConstaints';
import { addUser, deleteUser, getAllUser, searchUser, updateUser } from 'redux/api/userApi';
import { updatePassword } from '../api/userApi';
import { UPDATE_PASSWORD_REQUEST } from '../constaints/userConstaints';

function* getAllUserSaga() {
  try {
    const response = yield call(getAllUser);
    if (response?.data.code === '200') {
      yield put(getAllUserSuccess(response?.data));
    } else {
      yield put(getAllUserFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllUserFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchUserSaga(action) {
  try {
    const response = yield call(searchUser, action.payload);
    if (response?.data.code === '200') {
      yield put(searchUserSuccess(response?.data));
    } else {
      yield put(searchUserFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchUserFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addUserSaga(action) {
  try {
    const response = yield call(addUser, action.payload);
    if (response?.data?.code === '200') {
      yield put(addUserSuccess(response?.data));
      toast.success('Thêm tài khoản thành công!');
      yield put(
        searchUserRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(addUserFail('Thêm người dùng thất bại!'));
      toast.error('Thêm tài khoản thất bại!');
    }
  } catch (error) {
    yield put(addUserFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteUserSaga(action) {
  try {
    const response = yield call(deleteUser, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteUserSuccess());
      toast.success('Xóa người dùng thành công!');
      yield put(
        searchUserRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteUserFail('Xóa người dùng thất bại'));
      toast.error('Xóa người dùng thất bại');
    }
  } catch (error) {
    yield put(deleteUserFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updatePasswordSaga(action) {
  try {
    const response = yield call(updatePassword, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteUserSuccess());
      toast.success('Cập nhật mật khẩu thành công!');
    } else {
      yield put(deleteUserFail('Cập nhật mật khẩu thất bại'));
      toast.error('Cập nhật mật khẩu thất bại');
    }
  } catch (error) {
    yield put(deleteUserFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateUserSaga(action) {
  try {
    const response = yield call(updateUser, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateUserSuccess(response?.data));
      toast.success('Cập nhật người dùng thành công!');
      yield put(
        searchUserRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(updateUserFail('Cập nhật người dùng thất bại'));
      toast.error('Cập nhật người dùng thất bại!');
    }
  } catch (error) {
    yield put(updateUserFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* userSaga() {
  yield takeEvery(ALL_USER_REQUEST, getAllUserSaga);
  yield takeEvery(ADD_USER_REQUEST, addUserSaga);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeEvery(SEARCH_USER_REQUEST, searchUserSaga);
  yield takeEvery(UPDATE_PASSWORD_REQUEST, updatePasswordSaga);
}
