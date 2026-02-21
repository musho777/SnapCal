import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../themes';
import { Header } from './components/Header';
import { FireIcon } from '../../assets/Icons';
import { CaloriesCard } from '../../components/cards/CaloriesCard';
import { HealthScoreBar } from './components/HealthScoreBar';
import { RecipeInfo } from './components/RecipeInfo';
import { Ingredients } from './components/Ingredients';
import { CookingSteps } from './components/CookingSteps';
import { calculateHealthScore } from '../../utils/healthScore';
import recipesData from '../../data/recipes.json';

const imageMap = {
  'chicken.png': require('../../assets/chicken.png'),
  'snack.png': require('../../assets/snack.png'),
  'grilledSalmon.png': require('../../assets/grilledSalmon.png'),
  'pancakes.png': require('../../assets/pancakes.png'),
  'greekYogurt.png': require('../../assets/greekYogurt.png'),
  'steak.png': require('../../assets/steak.png'),
  'apple.png': require('../../assets/apple.png'),
  'drink.png': require('../../assets/drink.png'),
  'carb.png': require('../../assets/carb.png'),
  'protein.png': require('../../assets/protein.png'),
};

const getImageSource = imagePath => {
  const filename = imagePath.split('/').pop();
  return imageMap[filename] || imageMap['snack.png'];
};

const RecipeScreen = ({ route }) => {
  const recipeId = route?.params?.recipeId || 1;
  const recipe =
    recipesData.recipes.find(r => r.id === recipeId) || recipesData.recipes[0];

  const data = recipe.macros;
  const recipeInfo = recipe.recipeInfo;
  const ingredients = recipe.ingredients;
  const cookingSteps = recipe.cookingSteps;

  const healthScoreData = calculateHealthScore(data);

  return (
    <View style={localStyles.container}>
      <Header />
      <View style={localStyles.imageContainer}>
        <Image style={localStyles.img} source={getImageSource(recipe.image)} />
      </View>
      <ScrollView
        style={localStyles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={localStyles.spacer} />
        <View style={localStyles.details}>
          <View style={localStyles.titleWrapper}>
            <Text style={styles.title}>{recipe.name}</Text>
            <Text style={styles.caption}>{recipe.rating}</Text>
          </View>
          <View style={localStyles.kcal}>
            <Text style={styles.captionPrimary}>
              Total {recipe.totalCalories} Kcal
            </Text>
            <FireIcon />
          </View>
          <View style={localStyles.row}>
            {data.map((elm, i) => {
              return <CaloriesCard key={i} data={elm} />;
            })}
          </View>
          <HealthScoreBar score={healthScoreData.score} />

          <RecipeInfo
            description={recipeInfo.description}
            prepTime={recipeInfo.prepTime}
            cookTime={recipeInfo.cookTime}
            servings={recipeInfo.servings}
          />

          <Ingredients ingredients={ingredients} />

          <CookingSteps steps={cookingSteps} />
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 450,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    zIndex: 0,
  },
  img: {
    width: 300,
    height: 300,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  spacer: {
    height: 300,
  },
  details: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 30,
    minHeight: 300,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#F9FAFB',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 5,
    gap: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kcal: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecipeScreen;
