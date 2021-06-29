import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './src/routes'

export default function App() {
	return (
		<RootSiblingParent>
			<NavigationContainer>
				<Routes />
				<StatusBar style='auto' />
			</NavigationContainer>
		</RootSiblingParent>
	)
}
