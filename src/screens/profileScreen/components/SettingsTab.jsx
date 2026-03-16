import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { UIOptionRow } from '../../../common-ui/UIOptionRow';
import { useNavigation } from '@react-navigation/native';
import WeightModal from '../../../components/weightModal';
import HeightModal from '../../../components/heightModal';
import AlertModal from '../../../components/alertModal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserMeasurements,
  deleteFCMToken,
} from '../../../features/auth/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  removeAccessToken,
  removeRefreshToken,
} from '../../../api/TokenService';
import { getPreferences } from '../../../features/notifications/notificationsAction';
import { selectPreference } from '../../../features/notifications/notificationsSlice';

const SettingsTab = ({
  darkMode,
  setDarkMode,
  notifWater,
  setNotifWater,
  language,
  setLanguage,
  weight,
  setWeight,
  height,
  setHeight,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [notifMeals, setNotifMeals] = useState(true);
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const notificationPreference = useSelector(selectPreference);
  const { measurementsLoading } = useSelector(state => state.auth);
  console.log(notificationPreference, 'notificationPreference');
  const handleLogout = async () => {
    dispatch(deleteFCMToken());

    await removeAccessToken();
    await removeRefreshToken();
    await AsyncStorage.removeItem('onboardingCompleted');

    navigation.navigate('LoginScreen');
  };

  const handleOpenWeightModal = () => {
    setWeightModalVisible(true);
  };

  const handleSaveWeight = async newWeight => {
    try {
      await dispatch(updateUserMeasurements({ weight_kg: newWeight })).unwrap();
      setWeight(newWeight);
    } catch (error) {
      setAlertMessage(error || 'Failed to update weight');
      setAlertVisible(true);
    }
  };

  const handleOpenHeightModal = () => {
    setHeightModalVisible(true);
  };

  const handleSaveHeight = async newHeight => {
    try {
      await dispatch(updateUserMeasurements({ height_cm: newHeight })).unwrap();
      setHeight(newHeight);
    } catch (error) {
      setAlertMessage(error || 'Failed to update height');
      setAlertVisible(true);
    }
  };

  useEffect(() => {
    dispatch(getPreferences());
  }, []);

  return (
    <ScrollView
      style={localStyles.container}
      contentContainerStyle={localStyles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Notifications Section */}
      <View style={localStyles.section}>
        <Text style={localStyles.sectionLabel}>NOTIFICATIONS</Text>
        <View style={localStyles.card}>
          <UIOptionRow
            icon="🍽️"
            label="Meal Reminders"
            type="toggle"
            value={notifMeals}
            onValueChange={setNotifMeals}
          />
          <UIOptionRow
            icon="💧"
            label="Water Reminders"
            type="toggle"
            value={notifWater}
            onValueChange={setNotifWater}
          />
        </View>
      </View>

      {/* Physical Data Section */}
      <View style={localStyles.section}>
        <Text style={localStyles.sectionLabel}>PHYSICAL DATA</Text>
        <View style={localStyles.card}>
          <UIOptionRow
            icon="📊"
            label="Weight Progress"
            type="arrow"
            onPress={() => navigation.navigate('WeightProgress')}
          />
          <UIOptionRow
            icon="⚖️"
            label="Weight"
            type="arrow"
            value={`${weight} kg`}
            onPress={handleOpenWeightModal}
          />
          <UIOptionRow
            icon="📏"
            label="Height"
            type="arrow"
            value={`${height} cm`}
            onPress={handleOpenHeightModal}
          />
        </View>
      </View>

      {/* Appearance Section */}
      <View style={localStyles.section}>
        <Text style={localStyles.sectionLabel}>APPEARANCE</Text>
        <View style={localStyles.card}>
          <UIOptionRow
            icon="🌙"
            label="Dark Mode"
            type="toggle"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <UIOptionRow
            icon="🌐"
            label="Language"
            type="select"
            value={language}
            onValueChange={setLanguage}
            options={['English', 'հայ']}
          />
        </View>
      </View>

      {/* Log Out */}
      <View style={localStyles.section}>
        <View style={localStyles.card}>
          <UIOptionRow
            icon="🚪"
            label="Log Out"
            type="danger"
            isDanger={true}
            onPress={handleLogout}
          />
        </View>
      </View>

      <WeightModal
        visible={weightModalVisible}
        current={weight}
        height={height}
        onSave={handleSaveWeight}
        onClose={() => setWeightModalVisible(false)}
        loading={measurementsLoading}
      />

      <HeightModal
        visible={heightModalVisible}
        current={height}
        onSave={handleSaveHeight}
        onClose={() => setHeightModalVisible(false)}
        loading={measurementsLoading}
      />

      <AlertModal
        visible={alertVisible}
        type="error"
        title="Error"
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default SettingsTab;
