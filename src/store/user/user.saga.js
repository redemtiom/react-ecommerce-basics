import { takeLatest, all, call, put } from 'redux-saga/effects'

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signinWithGooglePopup
} from '../../utils/firebase/firebase.utils'

import { sigInSuccess, signInFailed } from './user.action'

import { USER_ACTION_TYPES } from './user.types'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        )
        yield put(sigInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() { 
    try {
        const signIn = yield call(signinWithGooglePopup)
    } catch (error) {
        signInFailed(error)
    }
}

export function* isUserAutheticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) return
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAutheticated)
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(signInWithGoogle)
    ])
}
