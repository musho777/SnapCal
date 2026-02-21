import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GoBackIcon, SaveIcon } from '../../../assets/Icons';
import { styles } from '../../../themes';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
  const navigation = useNavigation();
  const handelGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={localStyles.container}>
      <TouchableOpacity onPress={handelGoBack} style={localStyles.iconWrapper}>
        <GoBackIcon />
      </TouchableOpacity>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 50,
    zIndex: 10,
    position: 'relative',
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
