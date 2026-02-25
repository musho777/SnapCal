import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../themes';

export const UIButton = ({
  title,
  variant = 'dark',
  onPress,
  style,
  textStyle,
}) => {
  const variantStyles = getVariantStyles(variant);

  return (
    <TouchableOpacity
      style={[localStyles.button, variantStyles.container, style]}
      onPress={onPress}
    >
      <Text style={[styles.button, variantStyles.text, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getVariantStyles = variant => {
  switch (variant) {
    case 'secondary':
      return {
        container: {
          backgroundColor: '#E5E5E5',
        },
        text: {
          color: '#000',
        },
      };

    case 'outline':
      return {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#000',
        },
        text: {
          color: '#000',
        },
      };

    case 'danger':
      return {
        container: {
          backgroundColor: '#FF3B30',
        },
        text: {
          color: '#fff',
        },
      };

    case 'dark':
      return {
        container: {
          backgroundColor: '#272727',
        },
        text: {
          color: '#fff',
        },
      };

    case 'card':
      return {
        container: {
          backgroundColor: '#272727',
          paddingVertical: 10,
        },
        text: {
          color: '#fff',
          fontSize: 11,
        },
      };

    case 'primary':
    default:
      return {
        container: {
          backgroundColor: '#007AFF',
        },
        text: {
          color: '#fff',
        },
      };
  }
};

const localStyles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 16,
    alignItems: 'center',
  },
});
