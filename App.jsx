import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { WHEATHER_API_KEY } from '@env'
import * as Location from 'expo-location'
import { RootSiblingParent } from 'react-native-root-siblings'
import Toast from 'react-native-root-toast'
import WeatherInfo from './src/components/WeatherInfo'
import UnitsPicker from './src/components/UnitsPicker'
import colors from './src/colors/constants'

const { PRIMARY } = colors

export default function App() {
	const [errorMessage, setErrorMessage] = useState('')
	const [weather, setWeather] = useState(null)
	const [currentUnitSystem, setCurrentUnitSystem] = useState('metric')

	useEffect(() => {
		async function load() {
			setWeather(null)
			setErrorMessage(null)
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

				const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WHEATHER_API_KEY}&units=${currentUnitSystem}`

				const response = await fetch(requestURL)

				setWeather(await response.json())
			} catch (error) {
				Toast.show(error.message, {
					duration: Toast.durations.LONG,
				})
			}
		}
		load()
	}, [currentUnitSystem])

	const handleSetCurrentUnitSystem = (newMetric) => {
		setCurrentUnitSystem(newMetric)
	}

	if (weather) {
		return (
			<View style={styles.container}>
				<UnitsPicker
					unitSystem={currentUnitSystem}
					setUnitSystem={handleSetCurrentUnitSystem}
				/>
				<WeatherInfo currentWeather={weather} unitSystem={currentUnitSystem} />
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
					<ActivityIndicator size='large' color={PRIMARY} />
				)}
			</View>
			<StatusBar style='auto' />
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
