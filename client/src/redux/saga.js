import { all } from 'redux-saga/effects';
import { saga as transactionSaga } from '../ducks/transaction';

export default function * () {
  yield all([
    transactionSaga(),
  ])
}
