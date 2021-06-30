import { put, call, takeLatest } from 'redux-saga/effects'
import { OPENCAGE_API_KEY } from '@env'
import { ADD_SEARCH, ADD_SEARCH_REQUEST } from './actionTypes'

function* fetchCity(action) {
	try {
		const requestURL = new URL('https://api.opencagedata.com/geocode/v1/json')

		requestURL.searchParams.append(q, action.payload.query)
		requestURL.searchParams.append(key, OPENCAGE_API_KEY)

		const response = yield call(fetch(requestURL.toString()))

		// no result
		if (response.result.length === 0) {
			yield action.payload.callbackFailure()
			return
		}

		yield put({ type: ADD_SEARCH, payload: { ...response.result[0] } })
	} catch (error) {
		yield action.payload.callbackFailure()
	} finally {
		if (action.payload.callbackFinally) {
			action.payload.callbackFinally()
		}
	}
}

function* searchSaga() {
	yield takeLatest(ADD_SEARCH_REQUEST, fetchCity)
}

export default searchSaga