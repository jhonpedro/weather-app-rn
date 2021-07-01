import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Dimensions,
	Alert,
} from 'react-native'
import InputAvoidView from '../../components/InputAvoidView'
import { useDispatch } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'

import Button from '../../components/Button'
import { actionAddSearchRequest } from '../../store/reducers/search/actions'
import Loading from '../../components/Loading'
import useInput from '../../hooks/useInput'
import useSearch from '../../store/selectors/useSearch'
import PreviousSearch from '../../components/PreviousSearch'

function Search({ navigation }) {
	const [loading, setLoading] = useState(false)
	const [location, setLocation, locationIsValid] = useInput(
		(location) => location.replace(' ', '').split(',').length === 3
	)
	const searchs = useSearch()
	const dispatch = useDispatch()

	const handleSubmit = () => {
		if (!locationIsValid()) {
			Alert.alert(
				'Oops',
				'You have to type in the input following the format: "City,State,Contry"'
			)
			return
		}

		setLoading(true)
		dispatch(
			actionAddSearchRequest({
				query: location,
				callbackSuccess: () => {
					navigation.navigate('Home')
				},
				callbackFailure: () => {
					Alert.alert('Wow!', 'Something went wrong, please try again!')
				},
				callbackFinally: () => {
					setLoading(false)
				},
			})
		)
	}

	return (
		<View
			style={{
				...styles.container,
				justifyContent: loading ? 'center' : 'flex-start',
			}}
		>
			{loading ? (
				<Loading />
			) : (
				<>
					<InputAvoidView
						placeholder='City,State,Country'
						value={location}
						onChangeText={setLocation}
					/>
					<View style={styles.buttonsContainer}>
						<Button label='Submit' onPress={handleSubmit} />
						<Button>
							<MaterialIcons name='gps-fixed' size={24} color='white' />
						</Button>
					</View>
					<View>
						<Text style={styles.previousSearchesText}>Previous Searches</Text>
						<View>
							{searchs.items.map((item, index) => (
								<PreviousSearch
									key={index}
									city={item.city}
									state={item.state}
									country={item.country}
									indexInSearch={index}
								/>
							))}
						</View>
					</View>
				</>
			)}
		</View>
	)
}

const currentHeight = Dimensions.get('window').width

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: currentHeight * 0.05,
		marginTop: StatusBar.currentHeight,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	previousSearchesText: {
		marginTop: 15,
		fontSize: 25,
		fontWeight: 'bold',
	},
})

export default Search
