import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../../themes';
import { Header } from './components/Header';
import { FireIcon } from '../../assets/Icons';
import { CaloriesCard } from '../../components/cards/CaloriesCard';
import { HealthScoreBar } from '../recipeScreen/components/HealthScoreBar';
import { FoodItemsList } from './components/FoodItemsList';
import { calculateHealthScore } from '../../utils/healthScore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  analyzeFoodFromImage,
  askFoodQuestion,
} from '../../features/foodScan/foodScanAction';
import {
  selectAnalyzeLoading,
  selectQuestionLoading,
  selectCurrentScan,
  selectCurrentImage,
  selectQuestionAnswer,
  selectError,
  setCurrentImage,
  clearQuestionAnswer,
  addToScanHistory,
} from '../../features/foodScan/foodScanSlice';
import Loading from '../../components/loading/Loading';
import { launchImageLibrary } from 'react-native-image-picker';
import { Send, Plus } from 'lucide-react-native';
import AddToMealModal from '../../components/addToMealModal/AddToMealModal';
import AlertModal from '../../components/alertModal/AlertModal';
import { addDishToMeal } from '../../features/explore/exploreAction';
import { selectAddToMealLoading } from '../../features/explore/exploreSlice';
import { getMainPlanRange } from '../../features/mealPlan/mealPlanAction';

const FoodScanScreen = ({ route }) => {
  const dispatch = useDispatch();
  const analyzeLoading = useSelector(selectAnalyzeLoading);
  const questionLoading = useSelector(selectQuestionLoading);
  const currentScan = useSelector(selectCurrentScan);
  const currentImage = useSelector(selectCurrentImage);
  const questionAnswer = useSelector(selectQuestionAnswer);
  const error = useSelector(selectError);
  const addToMealLoading = useSelector(selectAddToMealLoading);

  const [question, setQuestion] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

  const imageFromRoute = route?.params?.imageUri;
  const imageBase64 = route?.params?.base64;

  useEffect(() => {
    if (imageFromRoute && imageBase64) {
      dispatch(setCurrentImage({ uri: imageFromRoute, base64: imageBase64 }));
      handleAnalyze(imageBase64);
    }
  }, [imageFromRoute, imageBase64]);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: true,
    });

    if (!result.didCancel && result.assets?.[0]) {
      const asset = result.assets[0];
      dispatch(
        setCurrentImage({
          uri: asset.uri,
          base64: asset.base64,
          type: asset.type,
        }),
      );
      handleAnalyze(asset.base64, asset.type);
    }
  };

  const handleAnalyze = async (base64Image, mediaType = 'image/jpeg') => {
    try {
      await dispatch(analyzeFoodFromImage({ base64Image, mediaType })).unwrap();
    } catch (err) {
      setAlertModal({
        visible: true,
        type: 'error',
        title: 'Analysis Failed',
        message: err || 'Failed to analyze food image. Please try again.',
      });
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !currentImage?.base64) {
      return;
    }

    try {
      await dispatch(
        askFoodQuestion({
          base64Image: currentImage.base64,
          question: question.trim(),
          mediaType: currentImage.type || 'image/jpeg',
        }),
      ).unwrap();
      setQuestion('');
    } catch (err) {
      setAlertModal({
        visible: true,
        type: 'error',
        title: 'Question Failed',
        message: err || 'Failed to get answer. Please try again.',
      });
    }
  };

  const handleSaveToHistory = () => {
    if (currentScan && currentImage) {
      dispatch(
        addToScanHistory({
          scan: currentScan,
          imageUri: currentImage.uri,
        }),
      );
      setAlertModal({
        visible: true,
        type: 'success',
        title: 'Saved',
        message: 'Scan saved to history!',
      });
    }
  };

  const handleAddToMeal = async data => {
    try {
      // Create a custom dish entry from the scan data
      const dishData = {
        ...data,
        name: currentScan?.foodItems?.[0]?.name || 'Scanned Food',
        calories: currentScan?.totalCalories,
        carbs_g: currentScan?.totalCarbs,
        protein_g: currentScan?.totalProtein,
        fats_g: currentScan?.totalFat,
      };

      await dispatch(addDishToMeal(dishData)).unwrap();
      dispatch(getMainPlanRange({}));
      setShowModal(false);
      setAlertModal({
        visible: true,
        type: 'success',
        title: 'Success',
        message: 'Food added to your meal successfully!',
      });
    } catch (error) {
      setAlertModal({
        visible: true,
        type: 'error',
        title: 'Error',
        message: error || 'Failed to add food to meal. Please try again.',
      });
    }
  };

  const healthScoreData = currentScan
    ? calculateHealthScore({
        carbs_g: currentScan.totalCarbs || 0,
        protein_g: currentScan.totalProtein || 0,
        fat_g: currentScan.totalFat || 0,
      })
    : { score: 0 };

  if (analyzeLoading) {
    return <Loading />;
  }

  if (!currentImage) {
    return (
      <View style={localStyles.emptyContainer}>
        <Header />
        <View style={localStyles.emptyContent}>
          <Text style={styles.title}>Scan Your Food</Text>
          <Text style={styles.body}>
            Take or upload a photo of your food to get instant nutritional
            information powered by AI.
          </Text>
          <TouchableOpacity
            style={localStyles.uploadButton}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            <Plus size={24} color="#FFFFFF" />
            <Text style={localStyles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={localStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header onNewScan={pickImage} />
      <View style={localStyles.imageContainer}>
        <Image style={localStyles.img} source={{ uri: currentImage.uri }} />
      </View>
      <ScrollView
        style={localStyles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={localStyles.spacer} />
        <View style={localStyles.details}>
          {error && (
            <View style={localStyles.errorContainer}>
              <Text style={localStyles.errorText}>{error}</Text>
            </View>
          )}

          {currentScan && (
            <>
              <View style={localStyles.titleWrapper}>
                <Text style={styles.title}>
                  {currentScan.foodItems && currentScan.foodItems.length > 0
                    ? currentScan.foodItems[0].name
                    : 'Food Analysis'}
                </Text>
                <TouchableOpacity onPress={handleSaveToHistory}>
                  <Text style={styles.captionPrimary}>Save</Text>
                </TouchableOpacity>
              </View>

              <View style={localStyles.kcal}>
                <Text style={styles.captionPrimary}>
                  Total {Math.round(currentScan.totalCalories)} Kcal
                </Text>
                <FireIcon />
              </View>

              <View style={localStyles.row}>
                <CaloriesCard
                  type="Carbs"
                  data={Math.round(currentScan.totalCarbs)}
                />
                <CaloriesCard
                  type="Protein"
                  data={Math.round(currentScan.totalProtein)}
                />
                <CaloriesCard
                  type="Fat"
                  data={Math.round(currentScan.totalFat)}
                />
              </View>

              <HealthScoreBar score={healthScoreData.score} />

              {currentScan.foodItems?.length > 0 && (
                <FoodItemsList items={currentScan.foodItems} />
              )}

              {currentScan.notes && (
                <View style={localStyles.notesContainer}>
                  <Text style={styles.subtitle}>Notes</Text>
                  <Text style={styles.body}>{currentScan.notes}</Text>
                </View>
              )}

              <View style={localStyles.questionSection}>
                <Text style={styles.subtitle}>Ask About This Food</Text>
                <View style={localStyles.questionInputContainer}>
                  <TextInput
                    style={localStyles.questionInput}
                    placeholder="e.g., Is this healthy for weight loss?"
                    value={question}
                    onChangeText={setQuestion}
                    multiline
                  />
                  <TouchableOpacity
                    style={[
                      localStyles.sendButton,
                      questionLoading && localStyles.sendButtonDisabled,
                    ]}
                    onPress={handleAskQuestion}
                    disabled={questionLoading || !question.trim()}
                  >
                    <Send size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {questionAnswer && (
                  <View style={localStyles.answerContainer}>
                    <Text style={styles.body}>{questionAnswer}</Text>
                    <TouchableOpacity
                      onPress={() => dispatch(clearQuestionAnswer())}
                    >
                      <Text style={styles.captionPrimary}>Clear</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {currentScan && (
        <TouchableOpacity
          style={localStyles.fab}
          onPress={() => setShowModal(true)}
          activeOpacity={0.8}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={localStyles.fabText}>Add to Meal</Text>
        </TouchableOpacity>
      )}

      <AddToMealModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddToMeal}
        loading={addToMealLoading}
      />

      <AlertModal
        visible={alertModal.visible}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        onClose={() => setAlertModal({ ...alertModal, visible: false })}
      />
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  emptyContainer: {
    flex: 1,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    gap: 10,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 450,
    paddingTop: 50,
    alignItems: 'center',
    zIndex: 0,
  },
  img: {
    width: 300,
    height: 300,
    objectFit: 'contain',
    borderRadius: 20,
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
    paddingBottom: 120,
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
  notesContainer: {
    backgroundColor: '#FEF3C7',
    padding: 15,
    borderRadius: 15,
    gap: 8,
  },
  questionSection: {
    gap: 10,
    marginTop: 10,
  },
  questionInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  questionInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 50,
    maxHeight: 120,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    backgroundColor: '#10B981',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  answerContainer: {
    backgroundColor: '#DBEAFE',
    padding: 15,
    borderRadius: 15,
    gap: 8,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 15,
    borderRadius: 15,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
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

export default FoodScanScreen;
