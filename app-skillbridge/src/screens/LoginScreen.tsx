import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type LoginScreenProps = {
  onAuthenticated: () => void;
  onSignupRequested: () => void;
};

export default function LoginScreen({ onAuthenticated, onSignupRequested }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
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

    return isValid;
  }

  function mapFirebaseError(error: any): string {
    const code: string | undefined = error?.code;
    if (!code) return 'Invalid credentials.';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid credentials.';
      case 'auth/invalid-email':
        return 'The email address is invalid.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later.';
      default:
        return 'Invalid credentials.';
    }
  }

  async function handleLogin() {
    setAuthError('');
    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
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
          <Text style={styles.title}>Log in</Text>
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
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, isDisabled && styles.buttonDisabled]} disabled={isDisabled} onPress={handleLogin}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={onSignupRequested}>
              <Text style={styles.linkText}>Create an account</Text>
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
    backgroundColor: '#2563eb',
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


