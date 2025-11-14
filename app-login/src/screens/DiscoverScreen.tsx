import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getAllTrilhas } from '../services/trilhaService';
import { createInscricao, getInscricoesByUser } from '../services/inscricaoService';
import { Trilha } from '../types/Trilha';
import { Inscricao } from '../types/Inscricao';
import UserHeader from '../components/UserHeader';

export default function DiscoverScreen({ navigation }: any) {
  const { user } = useAuth();
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [trilhasResponse, inscricoesResponse] = await Promise.all([
        getAllTrilhas(),
        user ? getInscricoesByUser(user.uid) : Promise.resolve<Inscricao[]>([]),
      ]);
      setTrilhas(trilhasResponse);
      setInscricoes(inscricoesResponse);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as trilhas.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const isInscrito = (trilhaId: string) =>
    inscricoes.some((inscricao) => inscricao.trilhaId === trilhaId);

  const handleAddToMyCourses = async (trilha: Trilha) => {
    if (!user) {
      Alert.alert(
        'Autenticação necessária', 
        'Faça login para se inscrever na trilha.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Fazer Login', onPress: () => (navigation as any).navigate('Auth') }
        ]
      );
      return;
    }
    if (isInscrito(trilha.id)) {
      Alert.alert('Você já está inscrito(a)', 'Essa trilha já está em Meus Cursos.');
      return;
    }

    try {
      setSaving(trilha.id);
      await createInscricao({ userId: user.uid, trilhaId: trilha.id });
      Alert.alert('Inscrição realizada', 'A trilha foi adicionada em Meus Cursos.');
      const updated = await getInscricoesByUser(user.uid);
      setInscricoes(updated);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível se inscrever na trilha.');
    } finally {
      setSaving(null);
    }
  };

  const renderItem = ({ item }: { item: Trilha }) => {
    const inscrito = isInscrito(item.id);
    const isSaving = saving === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.trilhaTitle}>{item.title}</Text>
          <Text style={styles.levelBadge}>{item.level}</Text>
        </View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.footerRow}>
          <Text style={styles.duration}>{item.duration}</Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              inscrito && styles.actionButtonDisabled,
            ]}
            disabled={inscrito || isSaving}
            onPress={() => handleAddToMyCourses(item)}
          >
            {isSaving ? (
              <ActivityIndicator color="#f9fafb" />
            ) : (
              <Text style={styles.actionButtonText}>
                {inscrito ? 'Já inscrito' : 'Adicionar aos meus cursos'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#4f46e5" />
        <Text style={styles.loadingText}>Carregando trilhas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Descobrir trilhas</Text>
        <Text style={styles.headerSubtitle}>
          Explore todas as trilhas de upskilling e reskilling da plataforma.
        </Text>
        <View style={styles.divider} />
      </View>
      <FlatList
        data={trilhas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
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
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#e5e7eb',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  trilhaTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#f9fafb',
    marginRight: 8,
  },
  levelBadge: {
    fontSize: 11,
    textTransform: 'capitalize',
    color: '#a5b4fc',
    backgroundColor: '#312e81',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  category: {
    fontSize: 12,
    color: '#a3e635',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  duration: {
    fontSize: 12,
    color: '#e5e7eb',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4f46e5',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#1f2937',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f9fafb',
  },
});


