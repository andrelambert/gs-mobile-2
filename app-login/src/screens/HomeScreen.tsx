import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { initializeTrilhas } from '../scripts/initializeTrilhas';
import { getAllTrilhas } from '../services/trilhaService';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const [seeding, setSeeding] = useState(false);

  const handleSeedTrilhas = async () => {
    // Verifica se o usuário está autenticado
    if (!user) {
      Alert.alert(
        'Autenticação necessária',
        'Você precisa estar logado para inicializar as trilhas no Firestore.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Fazer Login', onPress: () => navigation.navigate('Auth') }
        ]
      );
      return;
    }

    try {
      setSeeding(true);
      
      // Verifica se já existem trilhas
      const existing = await getAllTrilhas();
      if (existing.length > 0) {
        Alert.alert(
          'Trilhas já existem',
          `Já existem ${existing.length} trilhas no banco. Deseja adicionar mais 15 trilhas?`,
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Adicionar',
              onPress: async () => {
                await initializeTrilhas();
                Alert.alert('Sucesso', '15 trilhas adicionadas ao Firestore!');
              }
            }
          ]
        );
      } else {
        await initializeTrilhas();
        Alert.alert('Sucesso', '15 trilhas foram adicionadas ao Firestore!');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error?.message || 'Não foi possível adicionar as trilhas.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>SkillBridge</Text>
      <Text style={styles.title}>Upskilling e Reskilling para o futuro com IA</Text>
      <Text style={styles.subtitle}>
        Conecte sua experiência atual com as habilidades mais demandadas do mercado de tecnologia,
        dados e inovação.
      </Text>

      <View style={styles.cardGrid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Discover')}
        >
          <Text style={styles.cardTitle}>Explorar Trilhas</Text>
          <Text style={styles.cardText}>
            Descubra trilhas curadas em IA, dados, programação, soft skills e mais.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('MyCourses')}
        >
          <Text style={styles.cardTitle}>Meus Cursos</Text>
          <Text style={styles.cardText}>
            Acompanhe as trilhas em que você está inscrito e veja seu progresso.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.cardTitle}>Meu Perfil</Text>
          <Text style={styles.cardText}>
            Atualize seu nome, bio, endereço e detalhes que personalizam sua jornada.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.highlight}>
        <Text style={styles.highlightTitle}>Destaques para você</Text>
        <Text style={styles.highlightText}>
          Comece pela trilha de Fundamentos de Inteligência Artificial e complemente com
          Transição de Carreira para Análise de Dados. Ideal para quem quer migrar de área.
        </Text>
      </View>

      {/* Botão temporário para popular o banco - REMOVER EM PRODUÇÃO */}
      <TouchableOpacity
        style={[styles.seedButton, seeding && styles.seedButtonDisabled]}
        onPress={handleSeedTrilhas}
        disabled={seeding}
      >
        {seeding ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.seedButtonText}>🌱 Inicializar Trilhas no Firestore</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {user
            ? `Logado como ${user.email}`
            : 'Crie sua conta ou faça login para salvar suas trilhas favoritas.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#22c55e1a',
    color: '#22c55e',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 24,
  },
  cardGrid: {
    gap: 12,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  highlight: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  highlightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  seedButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  seedButtonDisabled: {
    opacity: 0.6,
  },
  seedButtonText: {
    color: '#f9fafb',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#111827',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
  },
});


