import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import loadingAnimation from '../../assets/loading.json';

const Loading = ({ size = 200, text = '' }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={[styles.lottie, { width: size, height: size }]}
      />
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Loading;
