import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>Sobre o SkillBridge</Text>
      <Text style={styles.title}>Uma ponte entre o hoje e o futuro da sua carreira</Text>

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
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1d4ed81a',
    color: '#60a5fa',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 16,
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


