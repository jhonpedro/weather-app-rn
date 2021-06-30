import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

import Routes from './src/routes'
import store from './src/store'

export default function App() {
	return (
		<RootSiblingParent>
			<Provider store={store}>
				<NavigationContainer>
					<Routes />
					<StatusBar style='auto' />
				</NavigationContainer>
			</Provider>
		</RootSiblingParent>
	)
}
