import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface AuthScreenProps {
  navigation: any;
}

export default function AuthScreen({ navigation }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmError, setConfirmError] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  function validateInputs(): boolean {
    let isValid = true;
    const trimmedEmail = email.trim();

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setConfirmError('');

    if (!/.+@.+\..+/.test(trimmedEmail)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isSignup && confirmPassword !== password) {
      setConfirmError('Passwords do not match');
      isValid = false;
    }

    return isValid;
  }

  function mapFirebaseError(error: any): string {
    const code: string | undefined = error?.code;
    switch (code) {
      case 'auth/invalid-email':
        return 'The email address is invalid.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid credentials.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try logging in.';
      case 'auth/weak-password':
        return 'Password is too weak (min 6 characters).';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later.';
      default:
        return error?.message ?? 'Something went wrong. Please try again.';
    }
  }

  async function handleAuth() {
    setAuthError('');
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      // Navigation will be handled automatically by the auth state change
    } catch (err: any) {
      setAuthError(mapFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  }

  const clearErrors = () => {
    if (emailError) setEmailError('');
    if (passwordError) setPasswordError('');
    if (confirmError) setConfirmError('');
    if (authError) setAuthError('');
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setConfirmPassword('');
    clearErrors();
  };

  const isDisabled = isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>
                {isSignup ? 'Criar Conta' : 'Bem-vindo(a) de volta'}
              </Text>
              <Text style={styles.subtitle}>
                {isSignup 
                  ? 'Crie sua conta para se inscrever em trilhas e personalizar seu perfil' 
                  : 'Entre para acessar suas trilhas e perfil'
                }
              </Text>

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
                  clearErrors();
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.input, emailError && styles.inputError]}
              />
              {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

              <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearErrors();
                }}
                secureTextEntry
                style={[styles.input, passwordError && styles.inputError]}
              />
              {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

              {isSignup && (
                <>
                  <TextInput
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (confirmError) setConfirmError('');
                      if (authError) setAuthError('');
                    }}
                    secureTextEntry
                    style={[styles.input, confirmError && styles.inputError]}
                  />
                  {!!confirmError && <Text style={styles.errorText}>{confirmError}</Text>}
                </>
              )}

              <TouchableOpacity
                style={[styles.authButton, isDisabled && styles.buttonDisabled]}
                disabled={isDisabled}
                onPress={handleAuth}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.authButtonText}>
                    {isSignup ? 'Criar Conta' : 'Entrar'}
                  </Text>
                )}
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>
                  {isSignup ? 'Já tem uma conta?' : "Não tem uma conta?"}
                </Text>
                <TouchableOpacity onPress={toggleAuthMode}>
                  <Text style={styles.switchLink}>
                    {isSignup ? 'Entrar' : 'Criar Conta'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
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
  inputError: {
    borderColor: '#ef4444',
  },
  errorBanner: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorBannerText: {
    color: '#b91c1c',
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: '#b91c1c',
    marginTop: -8,
    marginBottom: 12,
    fontSize: 12,
  },
  authButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 4,
  },
  switchText: {
    color: '#666',
    fontSize: 14,
  },
  switchLink: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 14,
  },
});