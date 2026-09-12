import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/src/components/error-boundary';
import { colors } from '@/src/theme';

export default function RootLayout() {
  // Prewarm the Feather asset too, avoiding missing icons in Expo Go on Android.
  const [loaded, error] = useFonts({
    ...Feather.font,
    HankenRegular: require('../assets/fonts/HankenGrotesk-Regular.ttf'),
    HankenMedium: require('../assets/fonts/HankenGrotesk-Medium.ttf'),
    HankenSemibold: require('../assets/fonts/HankenGrotesk-SemiBold.ttf'),
    HankenBold: require('../assets/fonts/HankenGrotesk-Bold.ttf'),
    IBMPlexMono: require('../assets/fonts/IBMPlexMono-Medium.ttf'),
  });
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ErrorBoundary>
        {loaded || error ? <Slot /> : <View style={styles.loading} testID="font-loading"><ActivityIndicator color={colors.brandPrimary} /></View>}
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({ loading: { flex: 1, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' } });