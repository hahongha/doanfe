import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import authoritySaga from './authoritySaga';
import roleSaga from './roleSaga';
import roomTypeSaga from './roomTypeSaga';
import roomSaga from './roomSaga';
import renterSaga from './renterSaga';
import contractSaga from './contractSaga';
import contractMemberSaga from './contractMemberSaga';
import serviceSaga from './serviceSaga';
import imageSaga from './imageSaga';
import authSaga from './authSaga';
import EWSaga from './EWSaga';
import roomServiceSaga from './roomServiceSaga';
import roomReturnSaga from './roomReturnSaga';
import billSaga from './billSaga';
import StaffSaga from './staffSaga';
import paymentSaga from './paymentSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    serviceSaga(),
    userSaga(),
    authoritySaga(),
    roleSaga(),
    roomTypeSaga(),
    roomSaga(),
    renterSaga(),
    contractSaga(),
    contractMemberSaga(),
    imageSaga(),
    EWSaga(),
    roomServiceSaga(),
    roomReturnSaga(),
    billSaga(),
    StaffSaga(),
    paymentSaga(),
  ]);
}
