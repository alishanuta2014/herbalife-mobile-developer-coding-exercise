import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FoodSearchScreen from '../screens/FoodSearchScreen';
import DailyLogScreen from '../screens/DailyLogScreen';
import SummaryScreen from '../screens/SummaryScreen';
import { Colors } from '../theme';

export type RootTabParamList = {
  Search: undefined;
  Log: undefined;
  Summary: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<keyof RootTabParamList, { active: IoniconsName; inactive: IoniconsName }> =
  {
    Search: { active: 'search', inactive: 'search-outline' },
    Log: { active: 'list', inactive: 'list-outline' },
    Summary: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  };

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textMuted,
          tabBarStyle: {
            borderTopColor: Colors.border,
          },
          tabBarIcon: ({ focused, color, size }) => {
            const icons = TAB_ICONS[route.name as keyof RootTabParamList];
            return (
              <Ionicons name={focused ? icons.active : icons.inactive} size={size} color={color} />
            );
          },
        })}
      >
        <Tab.Screen name="Search" component={FoodSearchScreen} />
        <Tab.Screen name="Log" component={DailyLogScreen} />
        <Tab.Screen name="Summary" component={SummaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
