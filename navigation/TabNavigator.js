import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Planets from '../screens/Planets';
import Films from '../screens/Films';
import Spaceships from '../screens/Spaceships';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Planets" component={Planets} />
      <Tab.Screen name="Films" component={Films} />
      <Tab.Screen name="Spaceships" component={Spaceships} />
    </Tab.Navigator> 
  );
}
