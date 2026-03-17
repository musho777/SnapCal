import { DEEP_LINK_SCREENS } from '../../constants/notificationConstants';
import { navigate } from '../../api/navigationService';

export const handleNotificationNavigation = notificationData => {
  try {
    const { type, screen, params } = notificationData;

    if (screen) {
      navigate(screen, params || {});
      return;
    }

    const defaultScreen = DEEP_LINK_SCREENS[type];
    if (defaultScreen) {
      navigate(defaultScreen, { notificationType: type, ...params });
    } else {
      navigate('MainScreen');
    }
  } catch (error) {}
};

export const buildNotificationPayload = (type, data = {}) => {
  return {
    type,
    timestamp: Date.now(),
    ...data,
  };
};
