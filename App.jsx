import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'

export default function App() {
	const [errorMessage, setErrorMessage] = useState('')

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

				alert(`${latitude} / ${longitude}`)
			} catch (error) {}
		}
		load()
	}, [])

	return (
		<View style={styles.container}>
			<Text>Hello world!</Text>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
