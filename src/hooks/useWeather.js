import { useEffect, useState } from 'react'
import { WHEATHER_API_KEY } from '@env'
import { apiResponse } from '../services/apiResponse'

const initial_value = apiResponse

const useWeather = ({ callback, currentUnitSystem }) => {
	const [loading, setLoading] = useState(true)
	const [weather, setWeather] = useState(initial_value)
	const [reexecute, setReexecute] = useState(0)

	useEffect(() => {
		setLoading(true)
		callback().then((locationData) => {
			if (!locationData) {
				return
			}

			const { latitude, longitude } = locationData.coords

			const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WHEATHER_API_KEY}&units=${currentUnitSystem}`

			fetch(requestURL)
				.then((response) => response.json())
				.then((data) => setWeather(data))
				.finally(() => setLoading(false))
		})
	}, [reexecute, currentUnitSystem])

	const reload = () => {
		setReexecute((prevState) => prevState + 1)
	}

	return [weather, loading, reload]
}

export default useWeather
