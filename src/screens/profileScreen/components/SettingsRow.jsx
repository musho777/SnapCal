import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ToggleSwitch from './ToggleSwitch';

const SettingsRow = ({
  icon,
  label,
  type = 'arrow',
  value,
  onValueChange,
  options = [],
  isDanger = false,
  onPress,
}) => {
  const renderRightContent = () => {
    switch (type) {
      case 'toggle':
        return <ToggleSwitch value={value} onToggle={onValueChange} />;

      case 'select':
        return (
          <View style={localStyles.selectRow}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  localStyles.pill,
                  value === option && localStyles.pillActive,
                ]}
                onPress={() => onValueChange(option)}
              >
                <Text
                  style={[
                    localStyles.pillText,
                    value === option && localStyles.pillTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'arrow':
      case 'danger':
        return (
          <Text
            style={[localStyles.arrow, isDanger && localStyles.arrowDanger]}
          >
            ›
          </Text>
        );

      default:
        return null;
    }
  };

  const RowContent = (
    <>
      <View style={localStyles.leftContent}>
        <View
          style={[
            localStyles.iconContainer,
            isDanger && localStyles.iconContainerDanger,
          ]}
        >
          <Text style={localStyles.icon}>{icon}</Text>
        </View>
        <Text style={[localStyles.label, isDanger && localStyles.labelDanger]}>
          {label}
        </Text>
      </View>
      {renderRightContent()}
    </>
  );

  if (type === 'arrow' || type === 'danger') {
    return (
      <TouchableOpacity
        style={localStyles.container}
        onPress={onPress}
        activeOpacity={0.6}
      >
        {RowContent}
      </TouchableOpacity>
    );
  }

  return <View style={localStyles.container}>{RowContent}</View>;
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F8FA',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerDanger: {
    backgroundColor: '#FFF0F0',
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#272727',
  },
  labelDanger: {
    color: '#EF4444',
  },
  selectRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    borderColor: '#E5E7EB',
  },
  pillActive: {
    backgroundColor: '#272727',
    borderColor: '#272727',
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  pillTextActive: {
    color: '#fff',
  },
  arrow: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  arrowDanger: {
    color: '#EF4444',
  },
});

export default SettingsRow;
