import produce from 'immer'
import {
	ADD_SEARCH,
	MOVE_SEARCH_TO_TOP_AND_MAKE_REQUEST,
	REMOVE_REQUEST,
} from './actionTypes'

const initial_value = {
	makeRequest: false,
	items: [
		{
			city: 'Iporá',
			state: 'GO',
			country: 'Brazil',
			lat: -16.4407981,
			lng: -51.1181188,
		},
	],
}

const searchReducer = (state = initial_value, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ADD_SEARCH: {
				draft.items.unshift(action.payload)
				draft.makeRequest = true

				if (draft.items.length > 3) {
					draft.items.pop()
				}

				break
			}
			case REMOVE_REQUEST: {
				draft.makeRequest = false
				break
			}
			case MOVE_SEARCH_TO_TOP_AND_MAKE_REQUEST: {
				const item = draft.items.splice(action.payload.index, 1)[0]
				draft.items.unshift(item)
				draft.makeRequest = true
				break
			}
		}
	})
}

export default searchReducer
