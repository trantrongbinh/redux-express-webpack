import { put, call } from 'redux-saga/effects';

import * as types from '../constants/actionTypes';

export function* registerSaga(payload) {
    try {
        yield put({ type: types.REGISTER_USER_SUCCESS });
    } catch (error) {
        yield put({ type: types.REGISTER_USER_ERROR, error });
    }
}
