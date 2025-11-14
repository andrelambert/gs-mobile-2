import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getInscricoesByUser, deleteInscricao } from '../services/inscricaoService';
import { getAllTrilhas } from '../services/trilhaService';
import { Inscricao } from '../types/Inscricao';
import { Trilha } from '../types/Trilha';

interface EnrichedInscricao extends Inscricao {
  trilha?: Trilha;
}

export default function MyCoursesScreen({ navigation }: any) {
  const { user } = useAuth();
  const [items, setItems] = useState<EnrichedInscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const loadData = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      setLoading(true);
      const [inscricoes, trilhas] = await Promise.all([
        getInscricoesByUser(user.uid),
        getAllTrilhas(),
      ]);

      const trilhaMap = new Map(trilhas.map((t) => [t.id, t]));
      const enriched: EnrichedInscricao[] = inscricoes.map((inscricao) => ({
        ...inscricao,
        trilha: trilhaMap.get(inscricao.trilhaId),
      }));

      setItems(enriched);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar seus cursos.');
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

  const handleRemove = (inscricao: EnrichedInscricao) => {
    Alert.alert(
      'Remover inscrição',
      `Deseja realmente remover a trilha "${
        inscricao.trilha?.title ?? 'Sem título'
      }" dos seus cursos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              setRemoving(inscricao.id);
              await deleteInscricao(inscricao.id);
              await loadData();
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Não foi possível remover a inscrição.');
            } finally {
              setRemoving(null);
            }
          },
        },
      ],
    );
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.centerTitle}>Você não está autenticado</Text>
        <Text style={styles.centerText}>
          Faça login para visualizar e gerenciar as trilhas em que está inscrito.
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
        <Text style={styles.centerText}>Carregando seus cursos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus cursos</Text>
        <Text style={styles.headerSubtitle}>
          Aqui você encontra todas as trilhas em que está inscrito.
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          items.length === 0 ? styles.emptyListContent : styles.listContent
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titleText}>
              {item.trilha?.title ?? 'Trilha removida'}
            </Text>
            <Text style={styles.metaText}>
              {item.trilha?.category ?? 'Categoria desconhecida'} •{' '}
              {item.trilha?.duration ?? 'Duração não informada'}
            </Text>
            <Text style={styles.createdAtText}>
              Início em {item.createdAt.toLocaleDateString()}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemove(item)}
              disabled={removing === item.id}
            >
              {removing === item.id ? (
                <ActivityIndicator color="#fee2e2" />
              ) : (
                <Text style={styles.removeButtonText}>Remover inscrição</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Você ainda não tem cursos</Text>
            <Text style={styles.emptyText}>
              Explore a aba Descobrir para se inscrever nas trilhas que mais combinam com você.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
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
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
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
  card: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  createdAtText: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 12,
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#7f1d1d',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#fee2e2',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '600',
  },
});


