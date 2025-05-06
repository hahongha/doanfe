import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addRoleFail,
  addRoleSuccess,
  deleteRoleFail,
  deleteRoleSuccess,
  getAllRoleFail,
  getAllRoleSuccess,
  searchRoleFail,
  searchRoleRequest,
  searchRoleSuccess,
  updateRoleFail,
  updateRoleSuccess
} from 'redux/actions/RoleAction';
import {
  ADD_ROLE_REQUEST,
  ALL_ROLE_REQUEST,
  DELETE_ROLE_REQUEST,
  SEARCH_ROLE_REQUEST,
  UPDATE_ROLE_REQUEST
} from '../constaints/RoleConstaints';
import { addRole, deleteRole, getAllRole, searchRole, updateRole } from '../api/RoleApi';

function* getAllRoleSaga() {
  try {
    const response = yield call(getAllRole);
    if (response?.data.code === '200') {
      yield put(getAllRoleSuccess(response?.data));
    } else {
      yield put(getAllRoleFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllRoleFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchRoleSaga(action) {
  try {
    const response = yield call(searchRole, action.payload);
    if (response?.data.code === '200') {
      yield put(searchRoleSuccess(response?.data));
    } else {
      yield put(searchRoleFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchRoleFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addRoleSaga(action) {
  try {
    const response = yield call(addRole, action.payload);
    if (response?.data?.code === '200') {
      yield put(addRoleSuccess(response?.data));
      toast.success('Thêm vai trò thành công!');
      yield put(
        searchRoleRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(addRoleFail('Thêm vai trò thất bại!'));
      toast.error('Thêm vai trò thất bại!');
    }
  } catch (error) {
    yield put(addRoleFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteRoleSaga(action) {
  try {
    const response = yield call(deleteRole, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteRoleSuccess());
      toast.success('Xóa vai trò thành công!');
      yield put(
        searchRoleRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deleteRoleFail('Xóa vai trò thất bại'));
      toast.error('Xóa vai trò thất bại');
    }
  } catch (error) {
    yield put(deleteRoleFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateRoleSaga(action) {
  try {
    const response = yield call(updateRole, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateRoleSuccess(response?.data));
      toast.success('Cập nhật vai trò thành công!');
      yield put(
        searchRoleRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(updateRoleFail('Cập nhật vai trò thất bại'));
      toast.error('Cập nhật vai trò thất bại!');
    }
  } catch (error) {
    yield put(updateRoleFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* roleSaga() {
  yield takeEvery(ALL_ROLE_REQUEST, getAllRoleSaga);
  yield takeEvery(ADD_ROLE_REQUEST, addRoleSaga);
  yield takeEvery(DELETE_ROLE_REQUEST, deleteRoleSaga);
  yield takeEvery(UPDATE_ROLE_REQUEST, updateRoleSaga);
  yield takeEvery(SEARCH_ROLE_REQUEST, searchRoleSaga);
}
