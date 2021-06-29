import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'

import Home from '../pages/Home/'
import colors from '../colors/constants'
import Search from '../pages/Search'

const TabsScreen = createBottomTabNavigator()

const PossibleIcons = {
	Home: 'home',
	Search: 'search',
}

function Routes() {
	return (
		<TabsScreen.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
					const iconName = PossibleIcons[route.name]

					return <Feather name={iconName} color={color} size={25} />
				},
			})}
			tabBarOptions={{
				activeTintColor: colors.PRIMARY,
				inactiveTintColor: colors.SECONDARY,
				style: {
					paddingBottom: 5,
				},
				showLabel: false,
			}}
		>
			<TabsScreen.Screen name='Home' component={Home} />
			<TabsScreen.Screen name='Search' component={Search} />
		</TabsScreen.Navigator>
	)
}

export default Routes
