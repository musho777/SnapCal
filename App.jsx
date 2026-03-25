import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './src/navigation/mainNavigation';
import { DraggableAIButton } from './src/common-ui/uIButton';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { navigationRef } from './src/api/navigationService';
import { requestNotificationPermission } from './src/permissions/notificationPermissions';
import notificationService from './src/services/notificationService/notificationService';
import { sendFCMToken } from './src/features/auth/authActions';

function App() {
  const handleAIButtonPress = () => {};

  useEffect(() => {
    const initializeNotifications = async () => {
      const hasPermission = await requestNotificationPermission();
      if (hasPermission) {
        await notificationService.initialize(newToken => {
          store.dispatch(sendFCMToken({ fcmToken: newToken }));
        });
      }
    };
    initializeNotifications();
    return () => {
      notificationService.cleanup();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <NavigationContainer ref={navigationRef}>
            <View style={styles.container}>
              <Provider store={store}>
                <MainNavigation />
              </Provider>
            </View>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
