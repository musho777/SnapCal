import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import { styles } from '../../themes';

import { Header } from './components/Header';
import { ProAccessBanner } from './components/ProAccessBanner';
import { Category } from './components/Category';
import { WaterTracker } from './components/WaterTracker';
import { FoodCard } from '../../components/cards/FoodCard';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import {
  loadWaterIntake,
  saveWaterIntake,
  checkAndResetWaterData,
} from '../../utils/waterStorage';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBarHeight } from '../../hooks';
import { getNotifications } from '../../features/notifications/notificationsAction';
import {
  getCategoryForHome,
  getDishesRecommended,
} from '../../features/home/homeAction';
import {
  selectCategoryData,
  selectedRecommendedData,
  selectedRecommendedLoading,
} from '../../features/home/homeSlice';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectedRecommendedData);
  const categories = useSelector(selectCategoryData);

  const loading = useSelector(selectedRecommendedLoading);
  const [waterIntake, setWaterIntake] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const tabBarHeight = useTabBarHeight();

  const handleShowRecipients = recipeId => {
    navigation.navigate('Recipient', { recipeId });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const wasReset = await checkAndResetWaterData();
    if (wasReset) {
      setWaterIntake(0);
    } else {
      const savedWater = await loadWaterIntake();
      setWaterIntake(savedWater);
    }
    dispatch(getDishesRecommended({ limit: 10 }));
    dispatch(getNotifications({ limit: 10, offset: 0 }));
    dispatch(getCategoryForHome({ limit: 10, offset: 0 }));
    setRefreshing(false);
  }, [dispatch]);

  const onWaterChange = e => {
    setWaterIntake(e);
    saveWaterIntake(e);
  };

  useEffect(() => {
    dispatch(getCategoryForHome({ limit: 10, offset: 0 }));
    dispatch(getDishesRecommended({ limit: 10 }));
    const loadWater = async () => {
      const savedWater = await loadWaterIntake();
      setWaterIntake(savedWater);
    };
    loadWater();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getNotifications({ limit: 10, offset: 0 }));
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={[
        localStyles.contentContainerStyle,
        { paddingBottom: tabBarHeight + 20 },
      ]}
      style={[styles.page, localStyles.page]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <ProAccessBanner />
      <WaterTracker waterIntake={waterIntake} onWaterChange={onWaterChange} />
      <Category data={categories} navigation={navigation} />

      {loading ? (
        <View style={localStyles.loadingWrapper}>
          <Loading size={100} />
        </View>
      ) : (
        <View style={localStyles.gap10}>
          <Text style={styles.title}>Suggestion for You</Text>
          {data?.length === 0 ? (
            <View style={localStyles.emptyState}>
              <Text style={localStyles.emptyStateText}>
                No suggestions available at the moment
              </Text>
            </View>
          ) : (
            <ScrollView
              style={localStyles.paddingLeft}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {data?.map((elm, i) => {
                return (
                  <View
                    style={[
                      localStyles.recipeCardWrapper,
                      i === data.length - 1 && localStyles.marginLeft,
                    ]}
                    key={i}
                  >
                    <FoodCard
                      item={elm}
                      flex={false}
                      isSaved={elm.is_saved || false}
                      onRecipePress={() => handleShowRecipients(elm.id)}
                    />
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  recipeCardWrapper: {
    marginRight: 15,
    paddingBottom: 10,
    width: 175,
  },
  contentContainerStyle: {
    gap: 20,
  },
  paddingLeft: {
    paddingLeft: 5,
  },
  marginLeft: {
    marginLeft: 0,
  },
  loadingWrapper: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  gap10: {
    gap: 15,
  },
});

export default MainScreen;
