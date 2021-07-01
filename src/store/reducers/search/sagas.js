import { put, call, takeLatest } from 'redux-saga/effects'
import { OPENCAGE_API_KEY } from '@env'
import { ADD_SEARCH, ADD_SEARCH_REQUEST } from './actionTypes'

function* fetchCity(action) {
	try {
		const requestURL = new URL('https://api.opencagedata.com/geocode/v1/json')

		requestURL.searchParams.append('q', action.payload.query)
		requestURL.searchParams.append('key', OPENCAGE_API_KEY)

		const response = yield call(fetch, requestURL.toString())

		const data = yield response.json()

		const firstResult = data.results[0]

		// no result
		if (firstResult.length === 0) {
			throw new Error()
		}

		const city = firstResult.components.city ?? firstResult.components.town

		yield put({
			type: ADD_SEARCH,
			payload: {
				city,
				state: firstResult.components.state_code,
				country: firstResult.components.country,
				lat: firstResult.geometry.lat,
				lng: firstResult.geometry.lng,
			},
		})

		yield action.payload.callbackSuccess()
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
