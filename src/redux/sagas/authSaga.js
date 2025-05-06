import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAllUserFail,
  getAllUserSuccess,
  getUserInfoFailure,
  getUserInfoSuccess,
  loginFail,
  loginSuccess,
  refreshTokenFail,
  refreshTokenSuccess
} from '../actions/authActions';
import { GET_ALL_USER_REQUEST, GET_USER_INFO_REQUEST, LOGIN_REQUEST, REFRESH_TOKEN_REQUEST } from 'redux/constaints/authConstaints';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userAPI from '../api/use.api';
import auth from '../api/auth.api';

// Login saga
function* loginSaga(action) {
  try {
    
    const response = yield call(auth.loginAccount, action.payload);
    if (response?.data?.code === '200') {
      yield put(loginSuccess(response?.data));
      toast.success('Đăng nhập thành công!');
    } else {
      const errorMessage = response?.data?.message || 'Đăng nhập thất bại!';
      yield put(loginFail(errorMessage));
      toast.error(errorMessage);
    }
  } catch (error) {
    console.log(error);
    
    const errorMessage = error?.response?.data?.message || 'Lỗi đăng nhập!';
    yield put(loginFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Refresh token saga
function* refreshTokenSaga(action) {
  // try {
  const response = yield call(auth.refreshToken);
  const data = response?.data;
  if (data && data.accessToken && data.refreshToken) {
    yield put(refreshTokenSuccess(data));
  } else {
    yield put(refreshTokenFail('Refresh token failed!'));
    toast.error('Refresh token failed!');
  }
}

// Get user info saga
function* handleGetUserInfo() {
  try {
    const response = yield call(userAPI.getProfile);
    const profile = response.data.data;
    localStorage.setItem('profile', JSON.stringify(profile));
    yield put(getUserInfoSuccess(response.data));
  } catch (error) {
    yield put(getUserInfoFailure(error.message));
  }
}

// Get all user saga
function* getAllUserSaga(action) {
  try {
    const response = yield call(auth.getAllUser, action.payload);
    if (response?.data?.code === '200') {
      yield put(getAllUserSuccess(response?.data));
    } else {
      yield put(getAllUserFail(response?.message));
    }
  } catch (error) {
    console.error('Có lỗi khi gọi API');
  }
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
  yield takeLatest(GET_USER_INFO_REQUEST, handleGetUserInfo);
  yield takeLatest(GET_ALL_USER_REQUEST, getAllUserSaga);
}
