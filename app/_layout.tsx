import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View className='flex-1 bg-background'>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false, animation:'ios' }} />
        <Stack.Screen name="ChatScreen" options={{ headerShown: false, animation: 'ios' }} />
      </Stack>
    </View>
  );
}
