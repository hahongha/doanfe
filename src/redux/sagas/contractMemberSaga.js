import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addContractMemberFail,
  addContractMemberSuccess,
  deleteContractMemberFail,
  deleteContractMemberSuccess,
  getAllContractMemberFail,
  getAllContractMemberSuccess,
  searchContractMemberFail,
  searchContractMemberRequest,
  searchContractMemberSuccess,
  updateContractMemberFail,
  updateContractMemberSuccess
} from 'redux/actions/contractMemberAction';
import {
  ADD_CONTRACT_MEMBER_REQUEST,
  ALL_CONTRACT_MEMBER_REQUEST,
  DELETE_CONTRACT_MEMBER_REQUEST,
  SEARCH_CONTRACT_MEMBER_REQUEST,
  UPDATE_CONTRACT_MEMBER_REQUEST
} from '../constaints/contractMemberConstaints';
import {
  addContractMember,
  deleteContractMember,
  getAllContractMember,
  searchContractMember,
  updateContractMember
} from '../api/contractMemberApi';

function* getAllContractMemberSaga() {
  try {
    const response = yield call(getAllContractMember);
    if (response?.data.code === '200') {
      yield put(getAllContractMemberSuccess(response?.data));
    } else {
      yield put(getAllContractMemberFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllContractMemberFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchContractMemberSaga(action) {
  try {
    const response = yield call(searchContractMember, action.payload);
    if (response?.data.code === '200') {
      yield put(searchContractMemberSuccess(response?.data));
    } else {
      yield put(searchContractMemberFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchContractMemberFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addContractMemberSaga(action) {
  try {
    const response = yield call(addContractMember, action.payload);
    if (response?.data?.code === '200') {
      yield put(addContractMemberSuccess(response?.data));
      toast.success('Thêm vai trò thành công!');
      yield put(
        searchContractMemberRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(addContractMemberFail('Thêm vai trò thất bại!'));
      toast.error('Thêm vai trò thất bại!');
    }
  } catch (error) {
    yield put(addContractMemberFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteContractMemberSaga(action) {
  try {
    const response = yield call(deleteContractMember, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteContractMemberSuccess());
      toast.success('Xóa vai trò thành công!');
      yield put(
        searchContractMemberRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteContractMemberFail('Xóa vai trò thất bại'));
      toast.error('Xóa vai trò thất bại');
    }
  } catch (error) {
    yield put(deleteContractMemberFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateContractMemberSaga(action) {
  try {
    const response = yield call(updateContractMember, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateContractMemberSuccess(response?.data));
      toast.success('Cập nhật vai trò thành công!');
      yield put(
        searchContractMemberRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(updateContractMemberFail('Cập nhật vai trò thất bại'));
      toast.error('Cập nhật vai trò thất bại!');
    }
  } catch (error) {
    yield put(updateContractMemberFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* contractMemberSaga() {
  yield takeEvery(ALL_CONTRACT_MEMBER_REQUEST, getAllContractMemberSaga);
  yield takeEvery(ADD_CONTRACT_MEMBER_REQUEST, addContractMemberSaga);
  yield takeEvery(DELETE_CONTRACT_MEMBER_REQUEST, deleteContractMemberSaga);
  yield takeEvery(UPDATE_CONTRACT_MEMBER_REQUEST, updateContractMemberSaga);
  yield takeEvery(SEARCH_CONTRACT_MEMBER_REQUEST, searchContractMemberSaga);
}
