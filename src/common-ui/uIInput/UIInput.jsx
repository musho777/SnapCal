import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SearchIcon } from '../../assets/Icons';

const UIInput = ({
  placeholder = 'Enter text...',
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  showSearchIcon = false,
  icon = null,
  label = null,
  variant = 'default',
  style,
  containerStyle,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const variantStyles =
    variant === 'meal'
      ? {
          container: localStyles.mealContainer,
          containerFocused: localStyles.mealContainerFocused,
          input: localStyles.mealInput,
        }
      : {
          container: localStyles.container,
          containerFocused: localStyles.containerFocused,
          input: localStyles.input,
        };

  return (
    <View style={style}>
      {label && <Text style={localStyles.label}>{label}</Text>}
      <View
        style={[
          variantStyles.container,
          isFocused && variantStyles.containerFocused,
          multiline && variant === 'meal' && localStyles.mealMultiline,
          containerStyle,
        ]}
      >
        {showSearchIcon && (
          <View style={localStyles.iconContainer}>
            <SearchIcon />
          </View>
        )}
        {icon && !showSearchIcon && (
          <Text style={localStyles.iconText}>{icon}</Text>
        )}
        <TextInput
          style={[
            variantStyles.input,
            (showSearchIcon || icon) && localStyles.inputWithIcon,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
};

export default UIInput;

const localStyles = StyleSheet.create({
  label: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
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
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  mealContainerFocused: {
    borderColor: '#272727',
  },
  mealMultiline: {
    minHeight: 110,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 5,
    opacity: 0.6,
  },
  iconText: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
    margin: 0,
  },
  mealInput: {
    flex: 1,
    fontSize: 14,
    color: '#272727',
    padding: 0,
    margin: 0,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
});
