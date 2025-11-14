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
  Alert,
  ScrollView,
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

    if (!trimmedEmail) {
      setEmailError('Digite seu email');
      isValid = false;
    } else if (!/.+@.+\..+/.test(trimmedEmail)) {
      setEmailError('Digite um email válido');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Digite sua senha');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      isValid = false;
    }

    if (isSignup && confirmPassword !== password) {
      setConfirmError('As senhas não coincidem');
      isValid = false;
    }

    return isValid;
  }

  function mapFirebaseError(error: any): string {
    const code: string | undefined = error?.code;
    switch (code) {
      case 'auth/invalid-email':
        return 'O endereço de email é inválido.';
      case 'auth/user-disabled':
        return 'Esta conta foi desabilitada.';
      case 'auth/user-not-found':
        return 'Nenhum usuário encontrado com este email.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/invalid-credential':
        return 'Email ou senha incorretos.';
      case 'auth/email-already-in-use':
        return 'Este email já está cadastrado. Tente fazer login.';
      case 'auth/weak-password':
        return 'Senha muito fraca. Use pelo menos 6 caracteres.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde.';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet.';
      case 'auth/operation-not-allowed':
        return 'Operação não permitida. Contate o suporte.';
      default:
        return error?.message ?? 'Algo deu errado. Tente novamente.';
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
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        console.log('✅ Cadastro bem-sucedido:', userCredential.user.email);
        
        // Mostra mensagem de sucesso e navega de volta
        Alert.alert(
          'Conta criada com sucesso!',
          `Bem-vindo(a) ao SkillBridge, ${userCredential.user.email}!`,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        console.log('✅ Login bem-sucedido:', userCredential.user.email);
        
        // Navega de volta imediatamente após login
        navigation.goBack();
      }
    } catch (err: any) {
      // Mostra apenas a mensagem amigável para o usuário
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    justifyContent: 'center',
    minHeight: 500,
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