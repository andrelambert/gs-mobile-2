import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userProfileService';
import { UserProfile } from '../types/UserProfile';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [birthday, setBirthday] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
        setName(data.name);
        setBio(data.bio);
        setBirthday(data.birthday);
        setZipcode(data.zipcode);
        setAddress(data.address);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar seu perfil.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        name,
        bio,
        birthday,
        zipcode,
        address,
      });
      Alert.alert('Perfil atualizado', 'Suas informações foram salvas com sucesso.');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar seu perfil.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.centerTitle}>Faça login para ver seu perfil</Text>
        <Text style={styles.centerText}>
          Suas informações de perfil são vinculadas à sua conta autenticada no Firebase.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color="#4f46e5" />
        <Text style={styles.centerText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Meu perfil</Text>
        <Text style={styles.headerSubtitle}>
          Atualize seus dados pessoais usados para personalizar a experiência no SkillBridge.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Email</Text>
          <View style={styles.readonlyField}>
            <Text style={styles.readonlyText}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
            placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="Conte um pouco sobre sua trajetória e objetivos de carreira"
            placeholderTextColor="#6b7280"
            multiline
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.section, styles.rowItem]}>
            <Text style={styles.sectionLabel}>Data de nascimento</Text>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={[styles.section, styles.rowItem]}>
            <Text style={styles.sectionLabel}>CEP</Text>
            <TextInput
              style={styles.input}
              value={zipcode}
              onChangeText={setZipcode}
              placeholder="00000-000"
              placeholderTextColor="#6b7280"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Endereço</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Rua, número, complemento, cidade"
            placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={logout}
          >
            <Text style={styles.secondaryButtonText}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, saving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#f9fafb" />
            ) : (
              <Text style={styles.primaryButtonText}>Salvar perfil</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 4,
  },
  readonlyField: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#020617',
  },
  readonlyText: {
    fontSize: 14,
    color: '#e5e7eb',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#020617',
    color: '#f9fafb',
    fontSize: 14,
  },
  textArea: {
    height: 96,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
  },
  primaryButtonText: {
    color: '#f9fafb',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#374151',
  },
  secondaryButtonText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  centerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 8,
    textAlign: 'center',
  },
  centerText: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
});


