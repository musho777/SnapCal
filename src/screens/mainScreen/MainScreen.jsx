import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../themes/index';
const MainScreen = () => {
  return (
    <View style={styles.page}>
      <View style={localStyles.header}>
        <View style={localStyles.headerInfo}>
          <Image
            style={localStyles.avatar}
            source={require('../../assets/avatar.png')}
          />
          <View>
            <Text style={styles.caption}>Hello</Text>
            <Text style={styles.h5}>Musho Poghosyan</Text>
          </View>
        </View>
        <View />
      </View>
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
    gap: 10,
    alignItems: 'center',
  },
});

export default MainScreen;
