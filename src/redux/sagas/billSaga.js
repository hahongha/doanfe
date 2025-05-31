import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addBill, deleteBill, getAllBill, getBillById, searchBill, updateBill } from '../api/BillApi';
import {
  addBillFail,
  addBillSuccess,
  deleteBillFail,
  deleteBillSuccess,
  getAllBillFail,
  getAllBillSuccess,
  getBillFail,
  getBillSuccess,
  searchBillFail,
  searchBillRequest,
  searchBillSuccess,
  updateBillFail,
  updateBillSuccess
} from '../actions/BillAction';
import {
  ADD_BILL_REQUEST,
  ALL_BILL_REQUEST,
  DELETE_BILL_REQUEST,
  GET_BILL_REQUEST,
  SEARCH_BILL_REQUEST,
  UPDATE_BILL_REQUEST
} from '../constaints/billConstaints';
function* getAllBillSaga() {
  try {
    const response = yield call(getAllBill);
    if (response?.data.code === '200') {
      yield put(getAllBillSuccess(response?.data));
    } else {
      yield put(getAllBillFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllBillFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchBillSaga(action) {
  try {
    const response = yield call(searchBill, action.payload);
    if (response?.data.code === '200') {
      yield put(searchBillSuccess(response?.data));
    } else {
      yield put(searchBillFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchBillFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addBillSaga(action) {
  try {
    const response = yield call(addBill, action.payload);
    if (response?.data?.code === '200') {
      yield put(addBillSuccess(response?.data));
      toast.success('Thêm hóa đơn thành công!');
    } else {
      yield put(addBillFail('Thêm hóa đơn thất bại!'));
      toast.error('Thêm hóa đơn thất bại!');
    }
  } catch (error) {
    yield put(addBillFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* getBillByIdSaga(action) {
  try {
    const response = yield call(getBillById, action.payload);
    if (response?.data?.code === '200') {
      yield put(getBillSuccess(response?.data));
    } else {
      yield put(getBillFail('Lấy hóa đơn thất bại!'));
      toast.error('Lấy hóa đơn thất bại!');
    }
  } catch (error) {
    yield put(getBillFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deleteBillSaga(action) {
  try {
    const response = yield call(deleteBill, action.payload);
    if (response?.data?.code === '200') {
      yield put(deleteBillSuccess());
      toast.success('Xóa hóa đơn thành công!');
    } else {
      yield put(deleteBillFail('Xóa hóa đơn thất bại'));
      toast.error('Xóa hóa đơn thất bại');
    }
  } catch (error) {
    yield put(deleteBillFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updateBillSaga(action) {
  try {
    const response = yield call(updateBill, action.payload);
    if (response?.data?.code === '200') {
      yield put(updateBillSuccess(response?.data));
      toast.success('Cập nhật hóa đơn thành công!');
    } else {
      yield put(updateBillFail('Cập nhật hóa đơn thất bại'));
      toast.error('Cập nhật hóa đơn thất bại!');
    }
  } catch (error) {
    yield put(updateBillFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* billSaga() {
  yield takeEvery(ALL_BILL_REQUEST, getAllBillSaga);
  yield takeEvery(ADD_BILL_REQUEST, addBillSaga);
  yield takeEvery(DELETE_BILL_REQUEST, deleteBillSaga);
  yield takeEvery(UPDATE_BILL_REQUEST, updateBillSaga);
  yield takeEvery(SEARCH_BILL_REQUEST, searchBillSaga);
  yield takeEvery(GET_BILL_REQUEST, getBillByIdSaga);
}
