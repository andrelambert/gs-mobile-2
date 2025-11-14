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
import { formatDate, formatCEP } from '../utils/formatters';
import { getAddressByCep, isValidCep } from '../services/viaCepService';

export default function ProfileScreen({ navigation }: any) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [birthday, setBirthday] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  // Estados originais para detectar alterações
  const [originalName, setOriginalName] = useState('');
  const [originalLastName, setOriginalLastName] = useState('');
  const [originalBio, setOriginalBio] = useState('');
  const [originalBirthday, setOriginalBirthday] = useState('');
  const [originalZipcode, setOriginalZipcode] = useState('');
  const [originalStreet, setOriginalStreet] = useState('');
  const [originalNumber, setOriginalNumber] = useState('');
  const [originalComplement, setOriginalComplement] = useState('');
  const [originalState, setOriginalState] = useState('');
  const [originalCity, setOriginalCity] = useState('');

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
        setLastName(data.lastName);
        setBio(data.bio);
        setBirthday(data.birthday);
        setZipcode(data.zipcode);
        setStreet(data.street);
        setNumber(data.number);
        setComplement(data.complement);
        setState(data.state);
        setCity(data.city);
        
        // Salvar valores originais
        setOriginalName(data.name);
        setOriginalLastName(data.lastName);
        setOriginalBio(data.bio);
        setOriginalBirthday(data.birthday);
        setOriginalZipcode(data.zipcode);
        setOriginalStreet(data.street);
        setOriginalNumber(data.number);
        setOriginalComplement(data.complement);
        setOriginalState(data.state);
        setOriginalCity(data.city);
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
    lastName !== originalLastName ||
    bio !== originalBio ||
    birthday !== originalBirthday ||
    zipcode !== originalZipcode ||
    street !== originalStreet ||
    number !== originalNumber ||
    complement !== originalComplement ||
    state !== originalState ||
    city !== originalCity;

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        name,
        lastName,
        bio,
        birthday,
        zipcode,
        street,
        number,
        complement,
        state,
        city,
      });
      
      // Atualizar valores originais após salvar
      setOriginalName(name);
      setOriginalLastName(lastName);
      setOriginalBio(bio);
      setOriginalBirthday(birthday);
      setOriginalZipcode(zipcode);
      setOriginalStreet(street);
      setOriginalNumber(number);
      setOriginalComplement(complement);
      setOriginalState(state);
      setOriginalCity(city);
      
      Alert.alert('Perfil atualizado', 'Suas informações foram salvas com sucesso.');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar seu perfil.');
    } finally {
      setSaving(false);
    }
  };

  const handleCepChange = async (text: string) => {
    const formattedCep = formatCEP(text);
    setZipcode(formattedCep);

    // Remove a formatação para validar
    const cleanCep = text.replace(/\D/g, '');

    // Se o CEP tiver 8 dígitos, busca o endereço
    if (cleanCep.length === 8 && isValidCep(cleanCep)) {
      setLoadingCep(true);
      try {
        const address = await getAddressByCep(cleanCep);
        
        if (address) {
          // Preenche os campos automaticamente
          setStreet(address.logradouro || '');
          setCity(address.localidade || '');
          setState(address.uf || '');
          
          // Feedback visual de sucesso
          Alert.alert('CEP encontrado!', 'Endereço preenchido automaticamente.');
        } else {
          Alert.alert('CEP não encontrado', 'Não foi possível encontrar o endereço para este CEP.');
        }
      } catch (error: any) {
        Alert.alert('Erro ao consultar CEP', error.message || 'Tente novamente.');
      } finally {
        setLoadingCep(false);
      }
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

          <View style={styles.row}>
            <View style={[styles.section, styles.rowItem]}>
              <Text style={styles.sectionLabel}>Nome</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
                placeholderTextColor="#6b7280"
              />
            </View>
            <View style={[styles.section, styles.rowItem]}>
              <Text style={styles.sectionLabel}>Sobrenome</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Sobrenome"
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Data de nascimento</Text>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={(text) => setBirthday(formatDate(text))}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Email</Text>
            <View style={styles.readonlyField}>
              <Text style={styles.readonlyText}>{user.email}</Text>
            </View>
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

          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionLabel}>CEP</Text>
              {loadingCep && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#4f46e5" />
                  <Text style={{ fontSize: 12, color: '#4f46e5', marginLeft: 6 }}>
                    Buscando endereço...
                  </Text>
                </View>
              )}
            </View>
            <TextInput
              style={styles.input}
              value={zipcode}
              onChangeText={handleCepChange}
              placeholder="00000-000"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              maxLength={9}
              editable={!loadingCep}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Rua</Text>
            <TextInput
              style={styles.input}
              value={street}
              onChangeText={setStreet}
              placeholder="Nome da rua"
              placeholderTextColor="#6b7280"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.section, styles.rowItem]}>
              <Text style={styles.sectionLabel}>Número</Text>
              <TextInput
                style={styles.input}
                value={number}
                onChangeText={setNumber}
                placeholder="Nº"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.section, styles.rowItem]}>
              <Text style={styles.sectionLabel}>Complemento</Text>
              <TextInput
                style={styles.input}
                value={complement}
                onChangeText={setComplement}
                placeholder="Apto, bloco..."
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.section, styles.rowItem]}>
              <Text style={styles.sectionLabel}>Estado</Text>
              <TextInput
                style={styles.input}
                value={state}
                onChangeText={setState}
                placeholder="UF"
                placeholderTextColor="#6b7280"
                maxLength={2}
                autoCapitalize="characters"
              />
            </View>
            <View style={[styles.section, styles.rowItem]}>
              <Text style={styles.sectionLabel}>Cidade</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="Cidade"
                placeholderTextColor="#6b7280"
              />
            </View>
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
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
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
    borderColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#111827',
  },
  readonlyText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
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


