import produce from 'immer'
import { ADD_SEARCH } from './actionTypes'

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
				draft.items.push(action.payload)
			}
		}
	})
}

export default searchReducer
