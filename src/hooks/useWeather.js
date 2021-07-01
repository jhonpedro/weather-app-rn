import { useEffect, useState } from 'react'
import { WHEATHER_API_KEY } from '@env'
import { apiResponse } from '../services/apiResponse'
import { useDispatch } from 'react-redux'
import { actionRemoveRequest } from '../store/reducers/search/actions'
import useSearch from '../store/selectors/useSearch'

const initial_value = apiResponse

const useWeather = ({ callback, currentUnitSystem }) => {
	const searchs = useSearch()
	const [loading, setLoading] = useState(true)
	const [weather, setWeather] = useState(initial_value)
	const [reexecute, setReexecute] = useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		setLoading(true)
		callback().then((locationData) => {
			if (!locationData) {
				return
			}

			const { latitude, longitude } = searchs.makeRequest
				? { latitude: searchs.items[0].lat, longitude: searchs.items[0].lng }
				: locationData.coords

			const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WHEATHER_API_KEY}&units=${currentUnitSystem}`

			fetch(requestURL)
				.then((response) => response.json())
				.then((data) => setWeather(data))
				.finally(() => {
					setLoading(false)
					dispatch(actionRemoveRequest())
				})
		})
	}, [searchs.items, reexecute, currentUnitSystem])

	const reload = () => {
		setReexecute((prevState) => prevState + 1)
	}

	return [weather, loading, reload]
}

export default useWeather
