import { StyleSheet, Text, View } from 'react-native';
import { CarbsIcon, FatIcon, ProteinIcon } from '../../assets/Icons';
import { styles } from '../../themes';

export const CaloriesCard = ({ data, themes = 'light' }) => {
  const getBackgroundStyle = () => {
    if (data.type === 'Protein') return localStyled.proteinBg;
    if (data.type === 'Fat') return localStyled.fatBg;
    return null;
  };

  return (
    <View
      style={[
        localStyled.container,
        themes === 'light'
          ? localStyled.lightContainer
          : localStyled.darkContainer,
      ]}
    >
      <View style={styles.alignEnd}>
        <View style={[localStyled.iconWrapper, getBackgroundStyle()]}>
          {data.type === 'Carbs' && <CarbsIcon />}
          {data.type === 'Protein' && <ProteinIcon />}
          {data.type === 'Fat' && <FatIcon />}
        </View>
      </View>

      <View>
        <Text style={styles.title}>{data?.weight}G</Text>
        <Text style={styles.small}>{data?.type}</Text>
      </View>
    </View>
  );
};

const localStyled = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    width: '32%',
    paddingHorizontal: 20,
    paddingRight: 10,
    paddingTop: 10,
    height: 130,
    paddingBottom: 20,
    gap: 10,
    elevation: 1,
    borderRadius: 20,
    justifyContent: 'space-between',
  },

  lightContainer: {
    backgroundColor: '#ffffff',
  },

  darkContainer: {
    backgroundColor: '#F5F5F5',
  },

  iconWrapper: {
    backgroundColor: '#1cca09',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  proteinBg: {
    backgroundColor: '#14a0fe',
  },

  fatBg: {
    backgroundColor: '#fdd40c',
  },
});
