import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import UserHeader from '../components/UserHeader';

export default function AboutScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <UserHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Sobre o SkillBridge</Text>
        <Text style={styles.subtitle}>Uma ponte entre o hoje e o futuro da sua carreira</Text>

        <View style={styles.divider} />

        <Text style={styles.paragraph}>
        O SkillBridge nasceu com a missão de apoiar profissionais em processos de upskilling e
        reskilling em um mundo transformado pela inteligência artificial. Em vez de substituir
        pessoas, acreditamos que a tecnologia deve ampliar o potencial humano.
      </Text>

      <Text style={styles.sectionTitle}>Por que focar em trilhas de aprendizado?</Text>
      <Text style={styles.paragraph}>
        Trilhas estruturadas ajudam você a conectar conteúdos em uma jornada coerente, com foco em
        resultados concretos: uma nova profissão, uma promoção ou simplesmente mais segurança no
        dia a dia de trabalho.
      </Text>

      <Text style={styles.sectionTitle}>Benefícios de upskilling e reskilling</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Aumentar sua empregabilidade em áreas em alta demanda.</Text>
        <Text style={styles.listItem}>
          • Reduzir o medo da automação entendendo como a IA pode trabalhar ao seu lado.
        </Text>
        <Text style={styles.listItem}>
          • Construir uma base sólida em tecnologia, dados, design, gestão e soft skills.
        </Text>
        <Text style={styles.listItem}>
          • Criar um plano contínuo de desenvolvimento, em vez de aprender de forma fragmentada.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Visão de futuro</Text>
      <Text style={styles.paragraph}>
        Enxergamos um futuro em que cada pessoa tem acesso a trilhas personalizadas, combinando
        análise de dados, IA generativa e curadoria humana. O SkillBridge é um primeiro passo
        nessa direção: uma plataforma simples, porém totalmente integrada ao ecossistema Firebase e
        pronta para evoluir com novas funcionalidades.
      </Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#1f2937',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e5e7eb',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 20,
  },
  list: {
    marginTop: 4,
  },
  listItem: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 20,
  },
});


