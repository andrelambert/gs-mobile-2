import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import UserHeader from '../components/UserHeader';

export default function AboutScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
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

      <Text style={styles.sectionTitle}>Nossa Metodologia</Text>
      <Text style={styles.paragraph}>
        Cada trilha do SkillBridge é cuidadosamente estruturada seguindo princípios de aprendizagem
        ativa e progressiva. Começamos com fundamentos sólidos, avançamos para aplicações práticas
        e culminamos em projetos reais que você pode incluir em seu portfólio.
      </Text>

      <Text style={styles.sectionTitle}>Áreas de Conhecimento</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.listItemBold}>• Tecnologia:</Text> Desenvolvimento web, mobile, cloud computing, DevOps e infraestrutura.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.listItemBold}>• Dados e IA:</Text> Análise de dados, machine learning, ciência de dados e visualização.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.listItemBold}>• Design:</Text> UX/UI, design thinking, prototipagem e pesquisa com usuários.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.listItemBold}>• Gestão:</Text> Metodologias ágeis, liderança, gestão de projetos e produtos.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.listItemBold}>• Soft Skills:</Text> Comunicação, trabalho em equipe, resolução de problemas e criatividade.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Certificação e Reconhecimento</Text>
      <Text style={styles.paragraph}>
        Ao concluir uma trilha, você recebe um certificado digital que comprova suas novas
        competências. Nossos certificados são reconhecidos por empresas parceiras e podem ser
        compartilhados em seu LinkedIn e portfólio profissional.
      </Text>

      <Text style={styles.sectionTitle}>Comunidade SkillBridge</Text>
      <Text style={styles.paragraph}>
        Mais do que uma plataforma de cursos, somos uma comunidade de profissionais em constante
        evolução. Participe de fóruns de discussão, conecte-se com outros alunos, compartilhe seus
        projetos e aprenda com a experiência de quem já trilhou o caminho que você está começando.
      </Text>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>SkillBridge em Números</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Trilhas Disponíveis</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Horas de Conteúdo</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100+</Text>
            <Text style={styles.statLabel}>Projetos Práticos</Text>
          </View>
        </View>
      </View>

      <Text style={styles.footerText}>
        Versão 1.0.0 • Desenvolvido com 💜 para profissionais que querem evoluir
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
    marginBottom: 8,
  },
  listItemBold: {
    fontWeight: '600',
    color: '#e5e7eb',
  },
  statsBox: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4f46e5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});


