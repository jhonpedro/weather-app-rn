import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import colors from '../colors/constants'
import { useDispatch } from 'react-redux'
import { actionMoveSearchToTopAndMakeRequest } from '../store/reducers/search/actions'

function PreviousSearch({ city, state, country, indexInSearch, navigation }) {
	const dispatch = useDispatch()

	const handleGoToSearch = () => {
		dispatch(actionMoveSearchToTopAndMakeRequest(indexInSearch))
		navigation.navigate('Home')
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.info}>
					<Text style={styles.city}>{city}</Text>
					<Text style={styles.stateAndCountry}>
						{state}, {country}
					</Text>
				</View>
				<AntDesign
					name='arrowright'
					size={30}
					color={colors.PRIMARY}
					onPress={handleGoToSearch}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		backgroundColor: '#dbdbdb',
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
	},
	content: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		borderLeftWidth: 3,
		borderColor: colors.PRIMARY,
	},
	info: {
		paddingLeft: 10,
	},
	city: {
		fontSize: 20,
		color: '#000',
		fontWeight: 'bold',
	},
	stateAndCountry: {
		fontSize: 14,
		color: '#000',
	},
})

export default PreviousSearch
