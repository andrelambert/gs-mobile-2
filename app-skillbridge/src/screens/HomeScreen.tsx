import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { getAllTrilhas } from '../services/trilhaService';
import { Trilha } from '../types/Trilha';

export default function HomeScreen({ navigation }: any) {
  const [featuredCourses, setFeaturedCourses] = useState<Trilha[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const featuredTitles = [
    'Blockchain e Criptomoedas',
    'Cibersegurança Essencial',
    'Cloud Computing com AWS',
    'Comunicação e Liderança',
    'Desenvolvimento Web Full Stack com React e Node.js'
  ];

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    try {
      const allTrilhas = await getAllTrilhas();
      const featured = allTrilhas.filter(trilha => 
        featuredTitles.includes(trilha.title)
      );
      setFeaturedCourses(featured);
    } catch (error) {
      console.error('Erro ao carregar cursos em destaque:', error);
    } finally {
      setLoadingCourses(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>SkillBridge</Text>
        <Text style={styles.subtitle}>Upskilling e Reskilling para o futuro com IA</Text>
        <Text style={styles.description}>
          Conecte sua experiência atual com as habilidades mais demandadas do mercado de tecnologia,
          dados e inovação.
        </Text>

        <View style={styles.divider} />

        {/* Carrossel de cursos em destaque */}
        <View style={styles.featuredSection}>
          <Text style={styles.featuredTitle}>Cursos em Destaque</Text>
          {loadingCourses ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#4f46e5" />
            </View>
          ) : (
            <FlatList
              horizontal
              data={featuredCourses}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContent}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.featuredCard}
                  onPress={() => navigation.navigate('CourseDetail', { trilhaId: item.id })}
                  activeOpacity={0.8}
                >
                  <View style={styles.featuredCardHeader}>
                    <Text style={styles.featuredCardCategory}>{item.category}</Text>
                    <Text style={styles.featuredCardLevel}>{item.level}</Text>
                  </View>
                  <Text style={styles.featuredCardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.featuredCardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.featuredCardDuration}>{item.duration}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

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
  featuredSection: {
    marginBottom: 24,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 16,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  carouselContent: {
    paddingRight: 20,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  featuredCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredCardCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22c55e',
  },
  featuredCardLevel: {
    fontSize: 11,
    color: '#a5b4fc',
    backgroundColor: '#312e81',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    textTransform: 'capitalize',
  },
  featuredCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 8,
    lineHeight: 22,
  },
  featuredCardDescription: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 12,
    lineHeight: 18,
  },
  featuredCardDuration: {
    fontSize: 12,
    color: '#6b7280',
  },
});


