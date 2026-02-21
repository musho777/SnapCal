import { TextInput, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SearchIcon } from '../../assets/Icons';

const UIInput = ({
  placeholder = 'Enter text...',
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  showSearchIcon = false,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[localStyles.container, isFocused && localStyles.containerFocused]}
    >
      {showSearchIcon && (
        <View style={localStyles.iconContainer}>
          <SearchIcon />
        </View>
      )}
      <TextInput
        style={[
          localStyles.input,
          showSearchIcon && localStyles.inputWithIcon,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

export default UIInput;

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  containerFocused: {
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 5,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
    margin: 0,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
});
