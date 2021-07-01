import produce from 'immer'
import { ADD_SEARCH, REMOVE_REQUEST } from './actionTypes'

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
		}
	})
}

export default searchReducer
