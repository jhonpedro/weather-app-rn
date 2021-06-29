import React, { useState } from 'react'
import { ActivityIndicator, StatusBar, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'

import colors from '../../colors/constants'
import useWeather from '../../hooks/useWeather'
import UnitsPicker from '../../components/UnitsPicker'
import ReloadIcon from '../../components/ReloadIcon'
import WeatherDetails from '../../components/WeatherDetails'
import WeatherInfo from '../../components/WeatherInfo'

const { PRIMARY } = colors

function Home() {
	const [currentUnitSystem, setCurrentUnitSystem] = useState('metric')
	const [weather, loading, reload] = useWeather({
		callback: async () => {
			const { status } = await Location.requestForegroundPermissionsAsync()

			if (status !== Location.PermissionStatus.GRANTED) {
				Toast.show(
					'You need to provide permissions in settings to the app work!'
				)
				return false
			}

			return Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			})
		},
		currentUnitSystem,
	})

	const handleSetCurrentUnitSystem = (newMetric) => {
		setCurrentUnitSystem(newMetric)
	}

	if (!loading) {
		return (
			<View style={styles.container}>
				<UnitsPicker
					unitSystem={currentUnitSystem}
					setUnitSystem={handleSetCurrentUnitSystem}
				/>
				<ReloadIcon load={reload} />
				<WeatherInfo currentWeather={weather} unitSystem={currentUnitSystem} />
				<WeatherDetails
					currentWeather={weather}
					unitSystem={currentUnitSystem}
				/>
				<StatusBar style='auto' />
			</View>
		)
	}

	return (
		<View style={styles.loadingContainer}>
			<ActivityIndicator size='large' color={PRIMARY} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1faee',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
	},
})

export default Home
