import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../themes';
import { GoBackIcon } from '../../assets/Icons';

export const ScreenHeader = () => {
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
      <View style={localStyles.emptyView} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  iconWrapper: {
    width: 45,
    height: 45,
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
  emptyView: {
    width: 45,
    height: 45,
  },
});
