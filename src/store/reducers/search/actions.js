import {
	ADD_SEARCH,
	ADD_SEARCH_REQUEST,
	MOVE_SEARCH_TO_TOP_AND_MAKE_REQUEST,
	REMOVE_REQUEST,
} from './actionTypes'

export const actionAddSearch = (cityData) => ({
	type: ADD_SEARCH,
	payload: cityData,
})

export const actionAddSearchRequest = (payload) => ({
	type: ADD_SEARCH_REQUEST,
	payload,
})

export const actionRemoveRequest = () => ({
	type: REMOVE_REQUEST,
})

export const actionMoveSearchToTopAndMakeRequest = (searchIndex) => {
	return {
		type: MOVE_SEARCH_TO_TOP_AND_MAKE_REQUEST,
		payload: {
			index: searchIndex,
		},
	}
}
