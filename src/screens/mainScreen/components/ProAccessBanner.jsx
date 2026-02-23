import { Image, StyleSheet, View, Text } from 'react-native';
import { styles } from '../../../themes';
import { UIButton } from '../../../common-ui/uIButton';

export const ProAccessBanner = () => {
  return (
    <View style={localStyles.container}>
      <Image
        style={localStyles.fon}
        source={require('../../../assets/pearFon.jpg')}
      />
      <View style={localStyles.overlay} />
      <View style={localStyles.content}>
        <Text style={styles.whiteTitle}>Upgrade to Pro</Text>
        <Text style={styles.caption}>Get unlimited access to all features</Text>
        <View style={[styles.alignStart, styles.mt5]}>
          <UIButton title={'Upgrade now'} />
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    height: 170,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
  },
  fon: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
