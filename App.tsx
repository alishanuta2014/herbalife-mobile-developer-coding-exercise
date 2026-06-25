import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FoodLogProvider } from './src/hooks/FoodLogContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <FoodLogProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </FoodLogProvider>
    </SafeAreaProvider>
  );
}
