import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addAuthorityFail,
  addAuthoritySuccess,
  deleteAuthorityFail,
  deleteAuthoritySuccess,
  getAllAuthorityFail,
  getAllAuthoritySuccess,
  searchAuthorityFail,
  searchAuthorityRequest,
  searchAuthoritySuccess,
  updateAuthorityFail,
  updateAuthoritySuccess
} from '../actions/authorityAction';
import {
  ADD_AUTHORITY_REQUEST,
  ALL_AUTHORITY_REQUEST,
  DELETE_AUTHORITY_REQUEST,
  SEARCH_AUTHORITY_REQUEST,
  UPDATE_AUTHORITY_REQUEST
} from '../constaints/authotityConstaints';
import { addAuthority, deleteAuthority, getAllAuthority, searchAuthority, updateAuthority } from '../api/authorityApi';

function* getAllAuthoritySaga() {
  try {
    const response = yield call(getAllAuthority);
    if (response?.data.code === '200') {
      yield put(getAllAuthoritySuccess(response?.data));
    } else {
      yield put(getAllAuthorityFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllAuthorityFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchAuthoritySaga(action) {
  try {
    const response = yield call(searchAuthority, action.payload);
    if (response?.data.code === '200') {
      yield put(searchAuthoritySuccess(response?.data));
    } else {
      yield put(searchAuthorityFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchAuthorityFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addAuthoritySaga(action) {
  try {
    const response = yield call(addAuthority, action.payload);
    if (response?.data?.code === '200') {
      yield put(addAuthoritySuccess(response?.data));
      toast.success('Thêm quyền hạn thành công!');
      yield put(
        searchAuthorityRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(addAuthorityFail('Thêm quyền hạn thất bại!'));
      toast.error('Thêm quyền hạn thất bại!');
    }
  } catch (error) {
    yield put(addAuthorityFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteAuthoritySaga(action) {
  try {
    const response = yield call(deleteAuthority, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteAuthoritySuccess());
      toast.success('Xóa quyền hạn thành công!');
      yield put(
        searchAuthorityRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteAuthorityFail('Xóa quyền hạn thất bại'));
      toast.error('Xóa quyền hạn thất bại');
    }
  } catch (error) {
    yield put(deleteAuthorityFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateAuthoritySaga(action) {
  try {
    const response = yield call(updateAuthority, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateAuthoritySuccess(response?.data));
      toast.success('Cập nhật quyền hạn thành công!');
      yield put(
        searchAuthorityRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(updateAuthorityFail('Cập nhật quyền hạn thất bại'));
      toast.error('Cập nhật quyền hạn thất bại!');
    }
  } catch (error) {
    yield put(updateAuthorityFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* authoritySaga() {
  yield takeEvery(ALL_AUTHORITY_REQUEST, getAllAuthoritySaga);
  yield takeEvery(ADD_AUTHORITY_REQUEST, addAuthoritySaga);
  yield takeEvery(DELETE_AUTHORITY_REQUEST, deleteAuthoritySaga);
  yield takeEvery(UPDATE_AUTHORITY_REQUEST, updateAuthoritySaga);
  yield takeEvery(SEARCH_AUTHORITY_REQUEST, searchAuthoritySaga);
}
