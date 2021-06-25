import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WHEATHER_API_KEY } from '@env'
import * as Location from 'expo-location'
import { RootSiblingParent } from 'react-native-root-siblings'
import Toast from 'react-native-root-toast'
import WeatherInfo from './src/components/WeatherInfo'

export default function App() {
	const [errorMessage, setErrorMessage] = useState('')
	const [weather, setWeather] = useState(null)

	useEffect(() => {
		async function load() {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync()

				if (status !== Location.PermissionStatus.GRANTED) {
					setErrorMessage('You need to grant permission for your location!')
					return
				}

				const location = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Low,
				})

				const { latitude, longitude } = location.coords

				const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WHEATHER_API_KEY}&units=metric`

				const response = await fetch(requestURL)

				setWeather(await response.json())
			} catch (error) {
				Toast.show(error.message, {
					duration: Toast.durations.LONG,
				})
			}
		}
		load()
	}, [])

	if (weather) {
		return (
			<View style={styles.container}>
				<WeatherInfo currentWeather={weather} />
				<StatusBar style='auto' />
			</View>
		)
	}

	return (
		<RootSiblingParent>
			<View style={styles.container}>
				{errorMessage ? (
					<Text>Oops, something gonne wrong!</Text>
				) : (
					<Text>Loading...</Text>
				)}
			</View>
		</RootSiblingParent>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1faee',
		alignItems: 'center',
		justifyContent: 'center',
	},

	loading: {
		flex: 1,
	},
})
