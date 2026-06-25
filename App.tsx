import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FoodLogProvider } from './src/hooks/FoodLogContext';
import { DailyGoalsProvider } from './src/hooks/DailyGoalsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <DailyGoalsProvider>
        <FoodLogProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </FoodLogProvider>
      </DailyGoalsProvider>
    </SafeAreaProvider>
  );
}
