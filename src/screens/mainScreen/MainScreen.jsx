import { View } from 'react-native';
import { styles } from '../../themes';

import { Header } from './components/Header';
import { ProAccessBanner } from './components/ProAccessBanner';

const MainScreen = () => {
  return (
    <View style={styles.page}>
      <Header />
      <ProAccessBanner />
    </View>
  );
};

export default MainScreen;
