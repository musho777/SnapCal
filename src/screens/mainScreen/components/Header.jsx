import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../themes/index';
import { NotificationIcon } from '../../../assets/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '../../../features/notifications/notificationsSlice';

export const Header = () => {
  const navigation = useNavigation();
  const notificationsData = useSelector(selectData);
  const unreadCount = notificationsData?.unread_count || 0;
  const [user, setUser] = useState({
    name: '',
    surname: '',
  });

  const getUserData = async () => {
    const response = await AsyncStorage.getItem('user');
    const data = JSON.parse(response);
    setUser({
      name: data.profile.first_name,
      surname: data.profile.last_name,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={localStyles.header}>
      <View style={localStyles.headerInfo}>
        <Image
          style={localStyles.avatar}
          source={require('../../../assets/avatar.png')}
        />
        <View>
          <Text style={styles.caption}>Hello</Text>
          <Text style={styles.h5}>
            {user.name || 'Guest'} {user.surname}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={localStyles.notificationWrapper}
        onPress={() => navigation.navigate('Notifications')}
        activeOpacity={0.7}
      >
        <NotificationIcon />
        {unreadCount > 0 && (
          <View style={localStyles.badge}>
            <Text style={localStyles.badgeText}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    paddingLeft: 5,
  },
  notificationWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
});
