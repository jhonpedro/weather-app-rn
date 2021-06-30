import React from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Dimensions,
	View,
} from 'react-native'

import colors from '../colors/constants'

function Button({ label, children, ...rest }) {
	return (
		<TouchableOpacity style={styles.button} {...rest}>
			<View style={styles.container}>
				<Text style={styles.label}>
					{label}
					{children && (
						<Text style={{ marginLeft: label ? 5 : 0 }}>{children}</Text>
					)}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	button: {
		paddingVertical: 15,
		paddingHorizontal: 30,
		backgroundColor: colors.PRIMARY,
		borderRadius: 10,
		width: width * 0.35,
	},
	container: {
		alignItems: 'center',
	},
	label: {
		color: '#FFF',
		fontSize: 18,
	},
})

export default Button
