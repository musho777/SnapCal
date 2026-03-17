import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params = undefined) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
