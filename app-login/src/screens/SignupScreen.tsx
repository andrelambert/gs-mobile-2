import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type SignupScreenProps = {
  onAuthenticated: () => void;
  onLoginRequested: () => void;
};

export default function SignupScreen({ onAuthenticated, onLoginRequested }: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmError, setConfirmError] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  function validateInputs(): boolean {
    let isValid = true;
    const trimmedEmail = email.trim();

    if (!/.+@.+\..+/.test(trimmedEmail)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirm !== password) {
      setConfirmError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmError('');
    }

    return isValid;
  }

  function mapFirebaseError(error: any): string {
    const code: string | undefined = error?.code;
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try logging in.';
      case 'auth/invalid-email':
        return 'The email address is invalid.';
      case 'auth/weak-password':
        return 'Password is too weak (min 6 characters).';
      default:
        return error?.message ?? 'Something went wrong. Please try again.';
    }
  }

  async function handleSignup() {
    setAuthError('');
    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      onAuthenticated();
    } catch (err: any) {
      setAuthError(mapFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  }

  const isDisabled = isLoading;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Create account</Text>
          {authError ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{authError}</Text>
            </View>
          ) : null}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
              if (authError) setAuthError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
              if (authError) setAuthError('');
            }}
            secureTextEntry
            style={styles.input}
          />
          {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          <TextInput
            placeholder="Confirm password"
            value={confirm}
            onChangeText={(text) => {
              setConfirm(text);
              if (confirmError) setConfirmError('');
              if (authError) setAuthError('');
            }}
            secureTextEntry
            style={styles.input}
          />
          {!!confirmError && <Text style={styles.errorText}>{confirmError}</Text>}
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, isDisabled && styles.buttonDisabled]} disabled={isDisabled} onPress={handleSignup}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign up</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={onLoginRequested}>
              <Text style={styles.linkText}>Back to login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  buttons: {
    marginTop: 8,
    gap: 12,
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 24,
  },
  link: {
    paddingVertical: 8,
  },
  linkText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  errorBanner: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorBannerText: {
    color: '#b91c1c',
    fontSize: 14,
  },
  errorText: {
    color: '#b91c1c',
    marginTop: -8,
    marginBottom: 8,
  },
});


