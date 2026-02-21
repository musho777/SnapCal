import { Platform, StyleSheet, Text, View } from 'react-native';
import { GoBackIcon, SaveIcon } from '../../../assets/Icons';
import { styles } from '../../../themes';

export const Header = () => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.iconWrapper}>
        <GoBackIcon />
      </View>
      <Text style={styles.h4}>Food Details</Text>
      <View style={localStyles.iconWrapper}>
        <SaveIcon />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#818080',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 3,
    borderRadius: 30,
  },
});
