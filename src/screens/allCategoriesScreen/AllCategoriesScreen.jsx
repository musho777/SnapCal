import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { ScreenHeader } from '../../components/headers/ScreenHeader';
import { Card } from './components/Card';
import { styles } from '../../themes';

const { width: screenWidth } = Dimensions.get('window');

const AllCategoriesScreen = ({ navigation }) => {
  const categoriesData = [
    {
      title: 'Vegan',
      image: require('../../assets/apple.png'),
    },
    {
      title: 'Carb',
      image: require('../../assets/carb.png'),
    },
    {
      title: 'Protein',
      image: require('../../assets/protein.png'),
    },
    {
      title: 'Snack',
      image: require('../../assets/snack.png'),
    },
    {
      title: 'Drink',
      image: require('../../assets/drink.png'),
    },
    {
      title: 'Vegan',
      image: require('../../assets/apple.png'),
    },
    {
      title: 'Vegan',
      image: require('../../assets/apple.png'),
    },
  ];

  const handleCategoryPress = categoryTitle => {
    navigation.navigate('Category', { category: categoryTitle });
  };

  return (
    <View style={styles.page}>
      <ScreenHeader title="All Categories" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyled.scrollContent}
      >
        <View style={localStyled.gridContainer}>
          {categoriesData.map((category, index) => (
            <Card
              key={index}
              width={(screenWidth - 30) / 2}
              data={category}
              onPress={() => handleCategoryPress(category.title)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const localStyled = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default AllCategoriesScreen;
