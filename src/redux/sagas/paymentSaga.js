import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { addPayment, deletePayment, getAllPayment, searchPayment, updatePayment } from '../api/paymentApi';
import {
  addPaymentFail,
  addPaymentSuccess,
  deletePaymentFail,
  deletePaymentSuccess,
  getAllPaymentFail,
  getAllPaymentSuccess,
  searchPaymentFail,
  searchPaymentRequest,
  searchPaymentSuccess,
  updatePaymentFail,
  updatePaymentSuccess
} from '../actions/paymentAction';
import {
  ADD_PAYMENT_REQUEST,
  ALL_PAYMENT_REQUEST,
  DELETE_PAYMENT_REQUEST,
  SEARCH_PAYMENT_REQUEST,
  UPDATE_PAYMENT_REQUEST
} from '../constaints/paymentConstaints';
function* getAllPaymentSaga() {
  try {
    const response = yield call(getAllPayment);
    if (response?.data.code === '200') {
      yield put(getAllPaymentSuccess(response?.data));
    } else {
      yield put(getAllPaymentFail(response?.data?.message));
    }
  } catch (error) {
    yield put(getAllPaymentFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* searchPaymentSaga(action) {
  try {
    const response = yield call(searchPayment, action.payload);
    if (response?.data.code === '200') {
      yield put(searchPaymentSuccess(response?.data));
    } else {
      yield put(searchPaymentFail(response?.data?.message));
    }
  } catch (error) {
    yield put(searchPaymentFail('Có lỗi xảy ra khi gọi API'));
  }
}

function* addPaymentSaga(action) {
  try {
    const response = yield call(addPayment, action.payload);
    if (response?.data?.code === '200') {
      yield put(addPaymentSuccess(response?.data));
      toast.success('Thêm thanh toán thành công!');
    } else {
      yield put(addPaymentFail('Thêm thanh toán thất bại!'));
      toast.error('Thêm thanh toán thất bại!');
    }
  } catch (error) {
    yield put(addPaymentFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* deletePaymentSaga(action) {
  try {
    const response = yield call(deletePayment, action.payload);
    if (response?.data?.code === '200') {
      yield put(deletePaymentSuccess());
      toast.success('Xóa thanh toán thành công!');
      yield put(
        searchPaymentRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(deletePaymentFail('Xóa thanh toán thất bại'));
      toast.error('Xóa thanh toán thất bại');
    }
  } catch (error) {
    yield put(deletePaymentFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

function* updatePaymentSaga(action) {
  try {
    const response = yield call(updatePayment, action.payload);
    if (response?.data?.code === '200') {
      yield put(updatePaymentSuccess(response?.data));
      toast.success('Cập nhật thanh toán thành công!');
      yield put(
        searchPaymentRequest({
          page: 0,
          size: 5,
          value: `%%`
        })
      );
    } else {
      yield put(updatePaymentFail('Cập nhật thanh toán thất bại'));
      toast.error('Cập nhật thanh toán thất bại!');
    }
  } catch (error) {
    yield put(updatePaymentFail('Có lỗi xảy ra khi gọi API'));
    toast.error('Có lỗi xảy ra khi gọi API');
  }
}

export default function* paymentSaga() {
  yield takeEvery(ALL_PAYMENT_REQUEST, getAllPaymentSaga);
  yield takeEvery(ADD_PAYMENT_REQUEST, addPaymentSaga);
  yield takeEvery(DELETE_PAYMENT_REQUEST, deletePaymentSaga);
  yield takeEvery(UPDATE_PAYMENT_REQUEST, updatePaymentSaga);
  yield takeEvery(SEARCH_PAYMENT_REQUEST, searchPaymentSaga);
}
