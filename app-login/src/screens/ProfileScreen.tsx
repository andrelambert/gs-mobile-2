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
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userProfileService';
import { UserProfile } from '../types/UserProfile';
import UserHeader from '../components/UserHeader';

export default function ProfileScreen({ navigation }: any) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [birthday, setBirthday] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');

  // Estados originais para detectar alterações
  const [originalName, setOriginalName] = useState('');
  const [originalBio, setOriginalBio] = useState('');
  const [originalBirthday, setOriginalBirthday] = useState('');
  const [originalZipcode, setOriginalZipcode] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');

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
        
        // Salvar valores originais
        setOriginalName(data.name);
        setOriginalBio(data.bio);
        setOriginalBirthday(data.birthday);
        setOriginalZipcode(data.zipcode);
        setOriginalAddress(data.address);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar seu perfil.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  // Verifica se houve alterações
  const hasChanges = 
    name !== originalName ||
    bio !== originalBio ||
    birthday !== originalBirthday ||
    zipcode !== originalZipcode ||
    address !== originalAddress;

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
      
      // Atualizar valores originais após salvar
      setOriginalName(name);
      setOriginalBio(bio);
      setOriginalBirthday(birthday);
      setOriginalZipcode(zipcode);
      setOriginalAddress(address);
      
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
          Suas informações de perfil são vinculadas à sua conta autenticada.
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.loginButtonText}>Fazer Login</Text>
        </TouchableOpacity>
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
    <SafeAreaView style={styles.container}>
      <UserHeader navigation={navigation} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.headerTitle}>Meu perfil</Text>
          <Text style={styles.headerSubtitle}>
            Atualize seus dados pessoais usados para personalizar a experiência no SkillBridge.
          </Text>

          <View style={styles.divider} />

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

        <TouchableOpacity
          style={[
            styles.saveButton, 
            (!hasChanges || saving) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!hasChanges || saving}
        >
          {saving ? (
            <ActivityIndicator color="#f9fafb" />
          ) : (
            <Text style={styles.saveButtonText}>
              {hasChanges ? 'Salvar alterações' : 'Nenhuma alteração'}
            </Text>
          )}
        </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#1f2937',
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
  saveButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    minHeight: 50,
  },
  saveButtonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '600',
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
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '600',
  },
});


