import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const EditProfileCard = ({ userName, onNameChange }) => {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

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
        </View>

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

  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#272727',
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
