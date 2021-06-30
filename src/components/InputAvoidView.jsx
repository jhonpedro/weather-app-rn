import React from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native'

import colors from '../colors/constants'

function InputAvoidView({ placeholder, ...rest }) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Text style={styles.label}>Type your location here:</Text>
			<TextInput style={styles.input} placeholder={placeholder} {...rest} />
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	label: {
		fontSize: 19,
		marginBottom: 10,
	},
	input: {
		padding: 10,
		borderColor: colors.BORDER,
		borderWidth: 1,
		borderRadius: 10,
		fontSize: 16,
	},
})

export default InputAvoidView
