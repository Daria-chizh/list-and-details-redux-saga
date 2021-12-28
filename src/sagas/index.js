import { put, spawn, retry, takeLatest } from 'redux-saga/effects';

import { LOAD_SERVICE_DETAILS_REQUEST, LOAD_SERVICES_REQUEST } from "../actions/actionTypes";

import {
  fetchStart, fetchDone, fetchError,
  loadServicesResponse, loadServiceDetailsResponse,
} from "../actions/actionCreators";

import { loadServices, loadServiceDetails } from "../api";

const retryCount = 3;
const retryDelay = 1000;

function* handleLoadServicesRequest() {
  try {
    yield put(fetchStart());
    const data = yield retry(retryCount, retryDelay, loadServices);
    yield put(fetchDone());
    yield put(loadServicesResponse(data));
  } catch (e) {
    yield put(fetchError(e.message));
  }
}

function* handleLoadServiceDetailsRequest(action) {
  try {
    yield put(fetchStart());
    const data = yield retry(retryCount, retryDelay, loadServiceDetails, action.payload.id);
    yield put(fetchDone());
    yield put(loadServiceDetailsResponse(data));
  } catch (e) {
    yield put(fetchError(e.message));
  }
}

function* watchLoadServicesRequest() {
  yield takeLatest(LOAD_SERVICES_REQUEST, handleLoadServicesRequest);
}

function* watchLoadServiceDetailsRequest() {
  yield takeLatest(LOAD_SERVICE_DETAILS_REQUEST, handleLoadServiceDetailsRequest);
}

export default function* saga() {
  yield spawn(watchLoadServicesRequest);
  yield spawn(watchLoadServiceDetailsRequest);
}



