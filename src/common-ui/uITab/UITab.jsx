import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UITab = ({
  label,
  isActive = false,
  badge,
  onPress,
  style,
  activeStyle,
  inactiveStyle,
  textStyle,
  activeTextStyle,
  inactiveTextStyle,
  badgeStyle,
  activeBadgeStyle,
  inactiveBadgeStyle,
  badgeTextStyle,
  activeBadgeTextStyle,
  inactiveBadgeTextStyle,
}) => {
  const showBadge = badge !== undefined && badge !== null && badge > 0;

  return (
    <TouchableOpacity
      style={[
        styles.pill,
        style,
        isActive
          ? [styles.pillActive, activeStyle]
          : [styles.pillInactive, inactiveStyle],
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.pillContent}>
        <Text
          style={[
            styles.pillText,
            textStyle,
            isActive
              ? [styles.pillTextActive, activeTextStyle]
              : [styles.pillTextInactive, inactiveTextStyle],
          ]}
        >
          {label}
        </Text>
        {showBadge && (
          <View
            style={[
              styles.pillBadge,
              badgeStyle,
              isActive
                ? [styles.pillBadgeActive, activeBadgeStyle]
                : [styles.pillBadgeInactive, inactiveBadgeStyle],
            ]}
          >
            <Text
              style={[
                styles.pillBadgeText,
                badgeTextStyle,
                isActive
                  ? [styles.pillBadgeTextActive, activeBadgeTextStyle]
                  : [styles.pillBadgeTextInactive, inactiveBadgeTextStyle],
              ]}
            >
              {badge}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 8,
  },
  pillActive: {
    borderColor: '#1A1A1A',
    backgroundColor: '#1A1A1A',
  },
  pillInactive: {
    borderColor: '#EEEEEE',
    backgroundColor: '#fff',
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pillTextActive: {
    color: '#fff',
  },
  pillTextInactive: {
    color: '#555',
  },
  pillBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillBadgeActive: {
    backgroundColor: '#fff',
  },
  pillBadgeInactive: {
    backgroundColor: '#1A1A1A',
  },
  pillBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  pillBadgeTextActive: {
    color: '#1A1A1A',
  },
  pillBadgeTextInactive: {
    color: '#fff',
  },
});

export default UITab;
