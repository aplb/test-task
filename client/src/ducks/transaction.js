import { put, all, take, call, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import api from '../api';

// Constants
const moduleName = 'transaction';
export const FETCH_TRANSACTIONS = `${moduleName}/FETCH_TRANSACTIONS`;
export const FETCH_TRANSACTIONS_PENDING = `${moduleName}/FETCH_TRANSACTIONS_PENDING`;
export const FETCH_TRANSACTIONS_RESOLVED = `${moduleName}/FETCH_TRANSACTIONS_RESOLVED`;
export const FETCH_TRANSACTIONS_REJECTED = `${moduleName}/FETCH_TRANSACTIONS_REJECTED`;
export const GET_TRANSACTION = `${moduleName}/GET_TRANSACTION`;
export const GET_TRANSACTION_PENDING = `${moduleName}/GET_TRANSACTION_PENDING`;
export const GET_TRANSACTION_RESOLVED = `${moduleName}/GET_TRANSACTION_RESOLVED`;
export const GET_TRANSACTION_REJECTED = `${moduleName}/GET_TRANSACTION_REJECTED`;

// Reducer
const initialState = {
  queryResult: null,
  data: {},
  isLoading: false,
  isFinished: false,
  isError: false,
  cached: {},
  lastLoading: null,
};

export default function reducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case FETCH_TRANSACTIONS_PENDING: {
      const newState = { ...state };
      newState.queryResult = [];
      newState.isLoading = true;
      newState.isFinished = false;
      newState.isError = false;
      return newState;
    }
    case FETCH_TRANSACTIONS_RESOLVED: {
      const newState = { ...state };
      newState.queryResult = action.payload;
      newState.isLoading = false;
      newState.isFinished = true;
      return newState;
    }
    case GET_TRANSACTION_PENDING: {
      const newState = { ...state };
      newState.data = null;
      newState.lastLoading = action.payload.id;
      newState.isLoading = true;
      newState.isFinished = true;
      return newState;
    }
    case GET_TRANSACTION_RESOLVED: {
      const newState = { ...state };
      newState.lastLoading = null;
      newState.data = action.payload;
      newState.cached = { ...state.cached };
      newState.cached[action.payload.id] = action.payload;
      newState.isLoading = false;
      newState.isFinished = true;
      return newState;
    }
    case FETCH_TRANSACTIONS_REJECTED:
    case GET_TRANSACTION_REJECTED: {
      const newState = { ...state };
      newState.lastLoading = null;
      newState.isLoading = false;
      newState.isFinished = true;
      newState.isError = action.error;
      return newState;
    }
    default: {
      return state;
    }
  }
}

// Selectors
const stateSelector = state => state.transaction;
export const transactionListSelector = createSelector(
  stateSelector,
  state => state.queryResult || []
);
export const transactionSelector = createSelector(stateSelector, state => state.data);
export const isLoadingSelector = createSelector(stateSelector, state => state.isLoading);
const cachedTransactionsSelector = createSelector(stateSelector, state => state.cached);
export const lastLoadingSelector = createSelector(stateSelector, state => state.lastLoading);
export const getErrorSelector = createSelector(stateSelector, state => state.isError);
export const totalSelector = createSelector(stateSelector, transactionListSelector, (state, list) =>
  list.reduce((acc, tr) => {
    if (tr.type === 'debit') {
      acc += tr.amount;
    } else {
      acc -= tr.amount;
    }
    return acc;
  }, 0)
);

// Action creators
export const fetchTransactions = () => ({
  type: FETCH_TRANSACTIONS,
});

export const getTransaction = id => ({
  type: GET_TRANSACTION,
  payload: { id },
});

// Sagas

function* fetchTransactionsSaga() {
  while (true) {
    yield take(FETCH_TRANSACTIONS);
    yield put({
      type: FETCH_TRANSACTIONS_PENDING,
    });

    try {
      const callResult = yield call([api, api.fetchTransactions]);

      if (!callResult.success) {
        yield put({
          type: FETCH_TRANSACTIONS_REJECTED,
          error: callResult.message,
        });
      } else {
        const { result } = callResult;

        yield put({
          type: FETCH_TRANSACTIONS_RESOLVED,
          payload: result,
        });
      }
    } catch (err) {
      yield put({
        type: FETCH_TRANSACTIONS_REJECTED,
        error: err,
      });
    }
  }
}

function* getTransactionSaga() {
  while (true) {
    const { payload } = yield take(GET_TRANSACTION);
    yield put({
      type: GET_TRANSACTION_PENDING,
      payload: { id: payload.id },
    });

    try {
      const cached = yield select(cachedTransactionsSelector);
      let result;
      let callResult;

      if (cached[payload.id]) {
        result = cached[payload.id];

        yield put({
          type: GET_TRANSACTION_RESOLVED,
          payload: result,
        });
      } else {
        callResult = yield call([api, api.getTransaction], payload.id);

        if (!callResult.success) {
          yield put({
            type: GET_TRANSACTION_REJECTED,
            error: callResult.message,
          });
        } else {
          result = callResult.result;

          yield put({
            type: GET_TRANSACTION_RESOLVED,
            payload: result,
          });
        }
      }
    } catch (err) {
      yield put({
        type: GET_TRANSACTION_REJECTED,
        error: err,
      });
    }
  }
}

export function* saga() {
  yield all([fetchTransactionsSaga(), getTransactionSaga()]);
}
