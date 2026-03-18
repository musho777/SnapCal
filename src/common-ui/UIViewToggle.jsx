import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * UIViewToggle - A reusable toggle component for switching between different views
 *
 * @param {Array} options - Array of option objects with { value, label, icon }
 * @param {string} activeValue - Currently active option value
 * @param {function} onChange - Callback when option changes (receives value)
 * @param {object} colors - Optional custom colors { primary, background, text }
 *
 * @example
 * <UIViewToggle
 *   options={[
 *     { value: 'week', label: 'Week', icon: <CalendarDays /> },
 *     { value: 'month', label: 'Month', icon: <Calendar /> }
 *   ]}
 *   activeValue={viewMode}
 *   onChange={setViewMode}
 * />
 */
const UIViewToggle = ({ options, activeValue, onChange, colors = {} }) => {
  const {
    primary = '#272727',
    background = '#F3F4F6',
    text = '#272727',
    activeText = '#fff',
  } = colors;

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {options.map(option => {
        const isActive = activeValue === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.toggleButton,
              isActive && { backgroundColor: primary },
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
          >
            {option.icon &&
              React.cloneElement(option.icon, {
                size: option.icon.props.size || 16,
                color: isActive ? activeText : text,
                strokeWidth: option.icon.props.strokeWidth || 2.5,
              })}
            <Text
              style={[
                styles.toggleText,
                { color: text },
                isActive && { color: activeText },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default UIViewToggle;
