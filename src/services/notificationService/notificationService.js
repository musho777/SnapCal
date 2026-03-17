import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { handleNotificationNavigation } from './notificationDeepLink';
import { NOTIFICATION_CHANNELS } from '../../constants/notificationConstants';

class NotificationService {
  constructor() {
    this.initialized = false;
    this.fcmToken = null;
    this.unsubscribeTokenRefresh = null;
    this.unsubscribeForeground = null;
  }

  async createNotificationChannels() {
    try {
      // Create default channel
      await notifee.createChannel({
        id: NOTIFICATION_CHANNELS.DEFAULT.id,
        name: NOTIFICATION_CHANNELS.DEFAULT.name,
        importance: AndroidImportance.HIGH,
      });

      // Create meal reminders channel
      await notifee.createChannel({
        id: NOTIFICATION_CHANNELS.MEAL_REMINDERS.id,
        name: NOTIFICATION_CHANNELS.MEAL_REMINDERS.name,
        description: NOTIFICATION_CHANNELS.MEAL_REMINDERS.description,
        importance: AndroidImportance.HIGH,
      });

      // Create water reminders channel
      await notifee.createChannel({
        id: NOTIFICATION_CHANNELS.WATER_REMINDERS.id,
        name: NOTIFICATION_CHANNELS.WATER_REMINDERS.name,
        description: NOTIFICATION_CHANNELS.WATER_REMINDERS.description,
        importance: AndroidImportance.DEFAULT,
      });

      // Create tips channel
      await notifee.createChannel({
        id: NOTIFICATION_CHANNELS.TIPS.id,
        name: NOTIFICATION_CHANNELS.TIPS.name,
        description: NOTIFICATION_CHANNELS.TIPS.description,
        importance: AndroidImportance.DEFAULT,
      });

      // Create goals channel
      await notifee.createChannel({
        id: NOTIFICATION_CHANNELS.GOALS.id,
        name: NOTIFICATION_CHANNELS.GOALS.name,
        description: NOTIFICATION_CHANNELS.GOALS.description,
        importance: AndroidImportance.HIGH,
      });
    } catch (error) {}
  }

  async initializeFCM() {
    try {
      const authStatus = await messaging().hasPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        return null;
      }

      const token = await messaging().getToken();
      this.fcmToken = token;

      // You can send token to your backend here if needed
      // await sendTokenToBackend(token);

      return token;
    } catch (error) {
      return null;
    }
  }

  // Setup FCM token refresh listener
  setupTokenRefreshListener(onTokenCallback) {
    this.unsubscribeTokenRefresh = messaging().onTokenRefresh(
      async newToken => {
        this.fcmToken = newToken;
        if (onTokenCallback) {
          onTokenCallback(newToken);
        }
      },
    );
  }

  setupForegroundHandler() {
    this.unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      try {
        const { notification, data } = remoteMessage;

        const channelId = data?.type
          ? this.getChannelIdForType(data.type)
          : NOTIFICATION_CHANNELS.DEFAULT.id;

        await notifee.displayNotification({
          title: notification?.title,
          body: notification?.body,
          data: data || {},
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
          },
          ios: {
            sound: 'default',
          },
        });
      } catch (error) {}
    });

    return this.unsubscribeForeground;
  }

  getChannelIdForType(type) {
    switch (type) {
      case 'meal_reminder':
        return NOTIFICATION_CHANNELS.MEAL_REMINDERS.id;
      case 'water':
        return NOTIFICATION_CHANNELS.WATER_REMINDERS.id;
      case 'tip':
      case 'ai':
        return NOTIFICATION_CHANNELS.TIPS.id;
      case 'goal':
        return NOTIFICATION_CHANNELS.GOALS.id;
      default:
        return NOTIFICATION_CHANNELS.DEFAULT.id;
    }
  }

  async setupNotificationOpenHandler() {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotificationNavigation(remoteMessage.data || {});
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      handleNotificationNavigation(remoteMessage.data || {});
    });
  }

  setupNotifeeHandlers() {
    notifee.onForegroundEvent(({ type, detail }) => {
      // if (type === notifee.EventType?.PRESS) {
      //   const data = detail.notification?.data || {};
      //   handleNotificationNavigation(data);
      // }
    });

    // Handle background events
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      // if (type === notifee.EventType?.PRESS) {
      //   const data = detail.notification?.data || {};
      //   handleNotificationNavigation(data);
      // }
    });
  }

  // Initialize service
  async initialize(onTokenCallback) {
    if (this.initialized) {
      return;
    }

    try {
      await this.createNotificationChannels();
      this.setupNotifeeHandlers();

      await this.initializeFCM();

      this.setupTokenRefreshListener(onTokenCallback);

      this.setupForegroundHandler();

      this.setupNotificationOpenHandler();

      this.initialized = true;
    } catch (error) {}
  }

  cleanup() {
    if (this.unsubscribeTokenRefresh) {
      this.unsubscribeTokenRefresh();
    }
    if (this.unsubscribeForeground) {
      this.unsubscribeForeground();
    }
  }

  async getToken() {
    if (this.fcmToken) {
      return this.fcmToken;
    }

    return await this.initializeFCM();
  }

  async clearBadge() {
    try {
      await notifee.setBadgeCount(0);
      await notifee.cancelDisplayedNotifications();
    } catch (error) {}
  }
}

export default new NotificationService();
