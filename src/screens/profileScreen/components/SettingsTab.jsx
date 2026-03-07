import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import EditProfileCard from './EditProfileCard';
import { UIOptionRow } from '../../../common-ui/UIOptionRow';
import { useNavigation } from '@react-navigation/native';
import WeightModal from '../../../components/weightModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserMeasurements } from '../../../features/auth/authActions';

const SettingsTab = ({
  userName,
  userEmail,
  onNameChange,
  darkMode,
  setDarkMode,
  notifMeals,
  setNotifMeals,
  notifWater,
  setNotifWater,
  notifTips,
  setNotifTips,

  heightUnit,
  setHeightUnit,
  language,
  setLanguage,
  weight,
  setWeight,
  height,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const { measurementsLoading } = useSelector(state => state.auth);

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const handleChangePassword = () => {};

  const handleOpenWeightModal = () => {
    setWeightModalVisible(true);
  };

  const handleSaveWeight = async newWeight => {
    try {
      await dispatch(updateUserMeasurements({ weight_kg: newWeight })).unwrap();
      setWeight(newWeight);
      setWeightModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error || 'Failed to update weight');
    }
  };

  return (
    <ScrollView
      style={localStyles.container}
      contentContainerStyle={localStyles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <EditProfileCard
        userName={userName}
        userEmail={userEmail}
        onNameChange={onNameChange}
      />

      {/* Security Section */}
      <View style={localStyles.section}>
        <Text style={localStyles.sectionLabel}>SECURITY</Text>
        <View style={localStyles.card}>
          <UIOptionRow
            icon="🔒"
            label="Change Password"
            type="arrow"
            onPress={handleChangePassword}
          />
        </View>
      </View>

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
          <UIOptionRow
            icon="💡"
            label="Nutrition Tips"
            type="toggle"
            value={notifTips}
            onValueChange={setNotifTips}
          />
        </View>
      </View>

      {/* Units Section */}
      <View style={localStyles.section}>
        <Text style={localStyles.sectionLabel}>UNITS</Text>
        <View style={localStyles.card}>
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
            type="select"
            value={heightUnit}
            onValueChange={setHeightUnit}
            options={['cm', 'ft']}
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
