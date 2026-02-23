import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditProfileCard = ({ userName, userEmail, onNameChange }) => {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSave = () => {
    onNameChange(tempName);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempName(userName);
    setEditing(false);
  };

  return (
    <View style={localStyles.container}>
      <View style={localStyles.content}>
        {/* Avatar */}
        <View style={localStyles.avatarContainer}>
          <View style={localStyles.avatar}>
            <Text style={localStyles.avatarText}>{getInitials(userName)}</Text>
          </View>
          <TouchableOpacity style={localStyles.editAvatarButton}>
            <Text style={localStyles.editAvatarIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Name & Email */}
        <View style={localStyles.infoContainer}>
          {editing ? (
            <TextInput
              style={localStyles.nameInput}
              value={tempName}
              onChangeText={setTempName}
              autoFocus
              selectTextOnFocus
            />
          ) : (
            <Text style={localStyles.nameText}>{userName}</Text>
          )}
          <Text style={localStyles.emailText}>{userEmail}</Text>
        </View>

        {/* Edit/Save Button */}
        {editing ? (
          <View style={localStyles.buttonRow}>
            <TouchableOpacity
              style={localStyles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={localStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.saveButton}
              onPress={handleSave}
            >
              <Text style={localStyles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={localStyles.editButton}
            onPress={() => setEditing(true)}
          >
            <Text style={localStyles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarIcon: {
    fontSize: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 2,
  },
  nameInput: {
    fontSize: 15,
    fontWeight: '700',
    color: '#272727',
    borderBottomWidth: 2,
    borderBottomColor: '#272727',
    paddingVertical: 2,
    marginBottom: 2,
  },
  emailText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 6,
  },
  editButton: {
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#272727',
  },
  saveButton: {
    backgroundColor: '#272727',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
});

export default EditProfileCard;
