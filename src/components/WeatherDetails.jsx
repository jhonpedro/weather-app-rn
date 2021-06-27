import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../colors/constants'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'

function WeatherDetails({ currentWeather, unitSystem }) {
	return (
		<View style={styles.weatherDetailsContainer}>
			<View style={styles.upperBox}>
				<View style={{ ...styles.iconAndText, ...styles.borderRight }}>
					<FontAwesome5
						name='temperature-high'
						size={24}
						color={colors.PRIMARY}
					/>
					<Text style={styles.value}>
						Feels like: {currentWeather.main.feels_like}°
					</Text>
				</View>
				<View style={styles.iconAndText}>
					<Ionicons name='md-water-outline' size={24} color={colors.PRIMARY} />
					<Text style={styles.value}>
						Humidity: {currentWeather.main.humidity}%
					</Text>
				</View>
			</View>
			<View style={styles.lowerBox}>
				<View style={{ ...styles.iconAndText, ...styles.borderRight }}>
					<FontAwesome5 name='wind' size={24} color={colors.PRIMARY} />
					<Text style={styles.value}>
						Speed: {currentWeather.wind.speed}{' '}
						{unitSystem === 'metric' ? 'm/s' : 'mp/h'}{' '}
					</Text>
				</View>
				<View style={styles.iconAndText}>
					<Ionicons
						name='ios-speedometer-outline'
						size={24}
						color={colors.PRIMARY}
					/>
					<Text style={styles.value}>
						Pressure: {currentWeather.main.pressure} hPa
					</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	weatherDetailsContainer: {
		backgroundColor: '#f1faee',
		borderRadius: 10,
		alignSelf: 'stretch',
		marginHorizontal: 10,
		marginBottom: 10,
		borderColor: colors.BORDER,
		borderWidth: 1,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: -1,
		},
		elevation: 5,
	},
	upperBox: {
		flexDirection: 'row',
		borderColor: colors.BORDER,
		borderBottomWidth: 1,
	},
	lowerBox: {
		flexDirection: 'row',
	},
	iconAndText: {
		padding: 20,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	borderRight: {
		borderColor: colors.BORDER,
		borderRightWidth: 1,
	},
	value: {
		fontSize: 13,
	},
})

export default WeatherDetails
