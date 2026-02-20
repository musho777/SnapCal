import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../themes/index';
import { NotificationIcon } from '../../../assets/Icons';
export const Header = () => {
  return (
    <View style={localStyles.header}>
      <View style={localStyles.headerInfo}>
        <Image
          style={localStyles.avatar}
          source={require('../../../assets/avatar.png')}
        />
        <View>
          <Text style={styles.caption}>Hello</Text>
          <Text style={styles.h5}>Musho Poghosyan</Text>
        </View>
      </View>
      <TouchableOpacity style={localStyles.notificationWrapper}>
        <NotificationIcon />
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
  },
  notificationWrapper: {
    width: 40,
    height: 40,
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
});
