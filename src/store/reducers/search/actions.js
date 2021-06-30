import { ADD_SEARCH, ADD_SEARCH_REQUEST } from './actionTypes'

export const actionAddSearch = (cityData) => ({
	type: ADD_SEARCH,
	payload: cityData,
})

export const actionAddSearchRequest = (payload) => ({
	type: ADD_SEARCH_REQUEST,
	payload,
})
