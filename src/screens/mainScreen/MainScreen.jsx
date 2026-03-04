import { ScrollView, StyleSheet, View } from 'react-native';
import { styles } from '../../themes';

import { Header } from './components/Header';
import { ProAccessBanner } from './components/ProAccessBanner';
import { Category } from './components/Category';
import { FoodCard } from '../../components/cards/FoodCard';
import { useEffect } from 'react';
import { getDeash } from '../../features/explore/exploreAction';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, selectLoading } from '../../features/explore/exploreSlice';
import Loading from '../../components/loading/Loading';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);

  const handleShowRecipients = recipeId => {
    navigation.navigate('Recipient', { recipeId });
  };

  useEffect(() => {
    dispatch(getDeash({}));
  }, [dispatch]);

  return (
    <View style={styles.page}>
      <Header />
      <ProAccessBanner />
      <Category navigation={navigation} />
      {loading ? (
        <View style={localStyled.loadingWrapper}>
          <Loading size={100} />
        </View>
      ) : (
        <ScrollView
          style={localStyled.paddingLeft}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {data?.dishes?.map((elm, i) => {
            return (
              <View
                style={[
                  localStyled.recipeCardWrapper,
                  i === data.dishes.length - 1 && localStyled.marginLeft,
                ]}
                key={i}
              >
                <FoodCard
                  item={elm}
                  flex={false}
                  isSaved={false}
                  onToggleSave={() => {}}
                  onRecipePress={() => handleShowRecipients(elm.id)}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const localStyled = StyleSheet.create({
  recipeCardWrapper: {
    marginRight: 15,
    paddingBottom: 10,
    width: 175,
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
});

export default MainScreen;
