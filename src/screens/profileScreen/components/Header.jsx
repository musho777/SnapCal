import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UITabBar } from '../../../common-ui/UITabBar';

const Header = ({
  userName,
  userEmail,
  savedCount,
  myRecipesCount,
  activeTab,
  onTabChange,
}) => {
  const getInitials = name => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <View style={localStyles.container}>
      <View style={localStyles.userRow}>
        <View style={localStyles.avatarContainer}>
          <View style={localStyles.avatar}>
            <Text style={localStyles.avatarText}>{getInitials(userName)}</Text>
          </View>
          <View style={localStyles.onlineDot} />
        </View>

        <View style={localStyles.userInfo}>
          <Text style={localStyles.userName}>{userName}</Text>
          <Text style={localStyles.userEmail}>{userEmail}</Text>
          <View style={localStyles.badgeRow}>
            <View style={localStyles.badgePrimary}>
              <Text style={localStyles.badgePrimaryText}>Free Plan</Text>
            </View>
            <View style={localStyles.badgeUpgrade}>
              <Text style={localStyles.badgeUpgradeText}>⭐ Upgrade</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={localStyles.statsRow}>
        <TouchableOpacity style={localStyles.statBox}>
          <Text style={localStyles.statEmoji}>❤️</Text>
          <Text style={localStyles.statValue}>{savedCount}</Text>
          <Text style={localStyles.statLabel}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.statBox}>
          <Text style={localStyles.statEmoji}>📖</Text>
          <Text style={localStyles.statValue}>{myRecipesCount}</Text>
          <Text style={localStyles.statLabel}>My Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.statBox}>
          <Text style={localStyles.statEmoji}>🔥</Text>
          <Text style={localStyles.statValue}>5 days</Text>
          <Text style={localStyles.statLabel}>Streak</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <UITabBar
        tabs={['Saved', 'My Recipes', 'Settings']}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#272727',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  badgePrimary: {
    backgroundColor: '#272727',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgePrimaryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  badgeUpgrade: {
    backgroundColor: '#FFF8E7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeUpgradeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F59E0B',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#272727',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    color: '#9CA3AF',
  },
});

export default Header;
