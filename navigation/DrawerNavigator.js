import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Planets from '../screens/Planets';
import Films from '../screens/Films';
import Spaceships from '../screens/Spaceships';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Planets" component={Planets} />
      <Drawer.Screen name="Films" component={Films} />
      <Drawer.Screen name="Spaceships" component={Spaceships} />
    </Drawer.Navigator>
  );
}
