import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useState } from 'react';

const UISelect = ({
  placeholder = 'Select...',
  value,
  onValueChange,
  options = [],
  label = null,
  variant = 'default',
  style,
  containerStyle,
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const variantStyles =
    variant === 'meal'
      ? {
          container: localStyles.mealContainer,
          containerFocused: localStyles.mealContainerFocused,
          text: localStyles.mealText,
        }
      : {
          container: localStyles.container,
          containerFocused: localStyles.containerFocused,
          text: localStyles.text,
        };

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = optionValue => {
    onValueChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <View style={style}>
      {label && <Text style={localStyles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={() => {
          if (!disabled) {
            setIsOpen(true);
            setIsFocused(true);
          }
        }}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          variantStyles.container,
          isFocused && variantStyles.containerFocused,
          containerStyle,
        ]}
        {...props}
      >
        <Text
          style={[
            variantStyles.text,
            !selectedOption && localStyles.placeholderText,
          ]}
        >
          {displayText}
        </Text>
        <Text style={localStyles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsOpen(false);
          setIsFocused(false);
        }}
      >
        <TouchableOpacity
          style={localStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setIsOpen(false);
            setIsFocused(false);
          }}
        >
          <View style={localStyles.modalContent}>
            <View style={localStyles.modalHeader}>
              <Text style={localStyles.modalTitle}>
                {label || 'Select Option'}
              </Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={item => item.value.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    localStyles.option,
                    item.value === value && localStyles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      localStyles.optionText,
                      item.value === value && localStyles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Text style={localStyles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default UISelect;

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
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  mealContainerFocused: {
    borderColor: '#272727',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  mealText: {
    flex: 1,
    fontSize: 14,
    color: '#272727',
  },
  placeholderText: {
    color: '#999',
  },
  arrow: {
    fontSize: 10,
    color: '#999',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '80%',
    maxHeight: '60%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedOption: {
    backgroundColor: '#F5F5F5',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: '600',
    color: '#272727',
  },
  checkmark: {
    fontSize: 18,
    color: '#272727',
    fontWeight: '700',
  },
});
