import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../colors/constants'

const Loading = () => (
	<View styles={styles.container}>
		<ActivityIndicator color={colors.PRIMARY} />
	</View>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default Loading
