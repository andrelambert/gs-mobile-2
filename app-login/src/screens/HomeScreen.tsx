import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import UserHeader from '../components/UserHeader';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>SkillBridge</Text>
        <Text style={styles.subtitle}>Upskilling e Reskilling para o futuro com IA</Text>
        <Text style={styles.description}>
          Conecte sua experiência atual com as habilidades mais demandadas do mercado de tecnologia,
          dados e inovação.
        </Text>

        <View style={styles.divider} />

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f9fafb',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#1f2937',
    marginBottom: 20,
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
});


