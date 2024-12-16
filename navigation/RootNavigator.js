import React from 'react';
import { Platform } from 'react-native';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';

export default function RootNavigator() {
  return Platform.OS === 'ios' ? <TabNavigator /> : <DrawerNavigator />;
}
