import React from 'react';

import {TransactionsListScreen} from './js/TransactionsListScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransactionsDetails} from './js/TransactionDetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SearchScreen} from './js/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="List" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListScreen" component={TransactionsListScreen} />
      <Stack.Screen name="DetailsScreen" component={TransactionsDetails} />
    </Stack.Navigator>
  );
}

export default App;
