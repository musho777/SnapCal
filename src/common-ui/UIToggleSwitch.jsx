import React from 'react';
import { Switch } from 'react-native';

export const UIToggleSwitch = ({ value, onToggle }) => {
  return (
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#E5E7EB', true: '#272727' }}
      thumbColor='#fff'
      ios_backgroundColor='#E5E7EB'
    />
  );
};
