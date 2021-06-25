import { rosybrown } from 'color-name'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import colors from '../colors/constants'

const { PRIMARY, SECONDARY } = colors

function WeatherInfo({ currentWeather, unitSystem }) {
	const {
		sys: { country },
		main: { temp },
		weather: [details],
		name,
	} = currentWeather

	const { icon, main, description } = details
	const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`

	const unitSystemToDisplay = unitSystem === 'metric' ? '°C' : '°F'

	return (
		<View style={styles.info}>
			<Text>
				{name} - {country}
			</Text>
			<Image style={styles.icon} source={{ uri: iconURL }} />
			<View style={styles.tempContainer}>
				<Text style={styles.textPrimary}>{temp}</Text>
				<Text style={styles.textMetric}>{unitSystemToDisplay}</Text>
			</View>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.texSecondary}>{main}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	info: {
		alignItems: 'center',
	},
	tempContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		width: 100,
		height: 100,
	},
	description: {
		textTransform: 'capitalize',
	},
	textPrimary: {
		fontSize: 40,
		color: PRIMARY,
	},
	textMetric: {
		fontSize: 20,
		marginLeft: 5,
		color: PRIMARY,
	},
	texSecondary: {
		fontSize: 20,
		color: SECONDARY,
		fontWeight: '500',
		marginTop: 10,
	},
})

export default WeatherInfo
