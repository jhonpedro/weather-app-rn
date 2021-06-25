import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { StatusBar } from 'react-native'
import colors from '../colors/constants'

const { PRIMARY } = colors

function UnitsPicker({ unitSystem, setUnitSystem }) {
	return (
		<View style={styles.pickerContainer}>
			<Text>Wich one is your unit system?</Text>
			<Picker
				style={{ width: 'auto', height: 50 }}
				mode='dropdown'
				selectedValue={unitSystem}
				onValueChange={setUnitSystem}
				itemStyle={{
					color: PRIMARY,
					fontSize: 20,
					textAlign: 'center',
					justifyContent: 'center',
				}}
			>
				<Picker.Item label='C°' value='metric' />
				<Picker.Item label='F°' value='imperial' />
			</Picker>
		</View>
	)
}

const styles = StyleSheet.create({
	pickerContainer: {
		justifyContent: 'center',
		position: 'absolute',
		...Platform.select({
			ios: {
				top: 0,
			},
			android: {
				top: StatusBar.currentHeight,
			},
		}),
	},
})

export default UnitsPicker
