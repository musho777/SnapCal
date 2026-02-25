import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import UIInput from '../../../common-ui/uIInput/UIInput';
import AuthOutlet from '../AuthOutlet';
import { UIButton } from '../../../common-ui/uIButton';

const LoginScreen = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  return (
    <AuthOutlet>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Animated.View entering={FadeInUp.delay(100)} style={styles.section}>
            <UIInput
              label="Email"
              variant="meal"
              placeholder="you@example.com"
              keyboardType="numeric"
              containerStyle={[
                styles.inputContainer,
                focusedInput === 'email' && styles.inputWrapperActiveColor,
              ]}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
            <UIInput
              label="Password"
              variant="meal"
              placeholder="Your Password"
              keyboardType="decimal-pad"
              containerStyle={[
                styles.inputContainer,
                focusedInput === 'password' && styles.inputWrapperActiveColor,
              ]}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
            <UIButton title={'Sign in '} />
          </Animated.View>
        </View>
      </ScrollView>
    </AuthOutlet>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
  },
  container: {
    gap: 20,
  },
  section: {
    gap: 8,
  },
  inputWrapperActiveColor: {
    borderColor: '#FFD4B3',
  },
  inputContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    paddingRight: 60,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
});

export default LoginScreen;
