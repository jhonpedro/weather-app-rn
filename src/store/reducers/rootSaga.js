import { all } from 'redux-saga/effects'
import searchSaga from './search/sagas'

function* rootSaga() {
	yield all([searchSaga()])
}

export default rootSaga
