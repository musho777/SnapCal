import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../themes';
import { Header } from './components/Header';
import { FireIcon } from '../../assets/Icons';
import { CaloriesCard } from '../../components/cards/CaloriesCard';
import { HealthScoreBar } from './components/HealthScoreBar';
import { RecipeInfo } from './components/RecipeInfo';
import { Ingredients } from './components/Ingredients';
import { CookingSteps } from './components/CookingSteps';
import { calculateHealthScore } from '../../utils/healthScore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  getSingleDeash,
  addDishToMeal,
} from '../../features/explore/exploreAction';
import {
  selectSingleData,
  selectSingleLoading,
  selectAddToMealLoading,
} from '../../features/explore/exploreSlice';
import Loading from '../../components/loading/Loading';
import AddToMealModal from '../../components/addToMealModal/AddToMealModal';
import AlertModal from '../../components/alertModal/AlertModal';
import { Plus } from 'lucide-react-native';
import { getMainPlanRange } from '../../features/mealPlan/mealPlanAction';
import {
  saveDish,
  unSaveDish,
} from '../../features/savedDishes/savedDishesAction';

const RecipeScreen = ({ route }) => {
  const dispatch = useDispatch();
  const singleData = useSelector(selectSingleData);
  const loading = useSelector(selectSingleLoading);
  const addToMealLoading = useSelector(selectAddToMealLoading);
  const recipeId = route?.params?.recipeId;
  const [save, setSaved] = useState();
  const insets = useSafeAreaInsets();

  const [showModal, setShowModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });
  const healthScoreData = calculateHealthScore({
    carbs_g: +singleData.carbs_g,
    protein_g: +singleData.protein_g,
    fat_g: +singleData.fats_g,
  });

  const onToggleSave = () => {
    setSaved(!save);
    if (singleData.is_saved) {
      dispatch(unSaveDish({ id: singleData.id }));
    } else {
      dispatch(saveDish({ id: singleData.id }));
    }
  };

  useEffect(() => {
    dispatch(getSingleDeash({ id: recipeId }));
  }, [dispatch, recipeId]);

  useEffect(() => {
    setSaved(singleData.is_saved);
  }, [singleData.is_saved]);

  const handleAddToMeal = async data => {
    try {
      await dispatch(addDishToMeal(data)).unwrap();
      dispatch(getMainPlanRange({}));
      setShowModal(false);
      setAlertModal({
        visible: true,
        type: 'success',
        title: 'Success',
        message: 'Recipe added to your meal successfully!',
      });
    } catch (error) {
      setAlertModal({
        visible: true,
        type: 'error',
        title: 'Error',
        message: error || 'Failed to add recipe to meal. Please try again.',
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={localStyles.container}>
      <Header isSaved={save} onToggleSave={onToggleSave} />
      <View style={localStyles.imageContainer}>
        <Image
          style={localStyles.img}
          source={
            singleData.image_url
              ? {
                  uri: `https://snapcal-back-production.up.railway.app${singleData.image_url}`,
                }
              : require('../../assets/greekYogurt.png')
          }
        />
      </View>
      <ScrollView
        style={localStyles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={localStyles.spacer} />
        <View style={localStyles.details}>
          <View style={localStyles.titleWrapper}>
            <Text style={styles.title}>{singleData?.name}</Text>
            <Text style={styles.caption}>{singleData?.average_rating}</Text>
          </View>
          <View style={localStyles.kcal}>
            <Text style={styles.captionPrimary}>
              Total {singleData?.calories} Kcal
            </Text>
            <FireIcon />
          </View>
          <View style={localStyles.row}>
            <CaloriesCard type="Carbs" data={+singleData.carbs_g} />
            <CaloriesCard type="Protein" data={+singleData.protein_g} />
            <CaloriesCard type="Fat" data={+singleData.fats_g} />
          </View>
          <HealthScoreBar score={healthScoreData.score} />

          <RecipeInfo
            description={singleData?.description}
            prepTime={singleData?.prep_time_minutes}
            cookTime={singleData?.cook_time_minutes}
            servings={singleData?.servings}
          />

          {singleData?.ingredients?.length > 0 && (
            <Ingredients ingredients={singleData?.ingredients} />
          )}

          {singleData?.cooking_steps?.length > 0 && (
            <CookingSteps
              steps={singleData?.cooking_steps}
              cookTime={singleData?.cook_time_minutes}
            />
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[localStyles.fab, { bottom: Math.max(insets.bottom + 5, 25) }]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Plus name="add" size={20} color="#FFFFFF" />
        <Text style={localStyles.fabText}>Add to Meal</Text>
      </TouchableOpacity>

      <AddToMealModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddToMeal}
        dishId={singleData?.id}
        loading={addToMealLoading}
      />

      <AlertModal
        visible={alertModal.visible}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        onClose={() => setAlertModal({ ...alertModal, visible: false })}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
    objectFit: 'contain',
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
    paddingBottom: 80,
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
  fab: {
    position: 'absolute',
    bottom: 25,
    left: '50%',
    alignItems: 'center',
    transform: [{ translateX: -75 }],
    flexDirection: 'row',
    zIndex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    gap: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RecipeScreen;
