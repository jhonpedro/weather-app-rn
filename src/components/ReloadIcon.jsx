import React from 'react'
import { View, Text, Platform, StyleSheet, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../colors/constants'

const { PRIMARY } = colors

export default function ReloadIcon({ load }) {
	const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
	return (
		<View style={styles.reloadIconContainer}>
			<Ionicons
				onPress={load}
				name={reloadIconName}
				size={24}
				color={PRIMARY}
			/>
			<Text style={styles.text}>Reload</Text>
		</View>
	)
}

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
	reloadIconContainer: {
		alignItems: 'center',
		position: 'absolute',
		top: height / 2 + 20,
		right: 20,
	},
	text: {
		color: PRIMARY,
	},
})
