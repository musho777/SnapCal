import { StyleSheet } from 'react-native';
import flex from './flex';
import margin from './margin';
import padding from './padding';
import gap from './gap';
import common from './common';
import typography from './typography';

export const styles = StyleSheet.create({
  ...flex,
  ...margin,
  ...padding,
  ...gap,
  ...common,
  ...typography,
});
