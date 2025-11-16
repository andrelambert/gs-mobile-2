import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  BookOpen,
  Video,
  FileText,
  Award,
  Users,
  Clock,
  Star,
  CheckCircle2,
  Play,
  FileQuestion,
  Briefcase,
  ArrowLeft,
} from 'lucide-react-native';
import { getTrilhaDetalhada } from '../services/trilhaService';
import { TrilhaDetalhada, ModuloConteudo } from '../types/TrilhaDetalhada';
import UserHeader from '../components/UserHeader';
import { useAuth } from '../contexts/AuthContext';
import { addInscricao, checkInscricao } from '../services/inscricaoService';

export default function CourseDetailScreen({ route, navigation }: any) {
  const { trilhaId } = route.params;
  const { user } = useAuth();
  const [trilha, setTrilha] = useState<TrilhaDetalhada | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    loadTrilhaDetalhada();
  }, [trilhaId]);

  useEffect(() => {
    checkEnrollment();
  }, [user, trilhaId]);

  const loadTrilhaDetalhada = async () => {
    try {
      setLoading(true);
      const data = await getTrilhaDetalhada(trilhaId);
      setTrilha(data);
    } catch (error) {
      console.error('Erro ao carregar trilha:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do curso.');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!user) {
      setIsEnrolled(false);
      return;
    }
    try {
      const enrolled = await checkInscricao(user.uid, trilhaId);
      setIsEnrolled(enrolled);
    } catch (error) {
      console.error('Erro ao verificar inscrição:', error);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      Alert.alert('Login necessário', 'Faça login para se inscrever neste curso.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Fazer Login', onPress: () => navigation.navigate('Auth') },
      ]);
      return;
    }

    try {
      setEnrolling(true);
      await addInscricao(user.uid, trilhaId);
      setIsEnrolled(true);
      Alert.alert('Sucesso!', 'Você foi inscrito no curso com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível se inscrever no curso.');
    } finally {
      setEnrolling(false);
    }
  };

  const getIconForContentType = (tipo: ModuloConteudo['tipo']) => {
    const iconProps = { size: 16, color: '#9ca3af' };
    switch (tipo) {
      case 'video':
        return <Video {...iconProps} />;
      case 'texto':
        return <FileText {...iconProps} />;
      case 'exercicio':
        return <FileQuestion {...iconProps} />;
      case 'quiz':
        return <CheckCircle2 {...iconProps} />;
      case 'projeto':
        return <Briefcase {...iconProps} />;
      default:
        return <BookOpen {...iconProps} />;
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Carregando curso...</Text>
      </View>
    );
  }

  if (!trilha) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Curso não encontrado</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de voltar fixo */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={22} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header com imagem */}
        <Image source={{ uri: trilha.imageUrl }} style={styles.headerImage} />

        {/* Informações principais */}
        <View style={styles.mainInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{trilha.category}</Text>
          </View>
          <Text style={styles.title}>{trilha.title}</Text>
          <Text style={styles.description}>{trilha.description}</Text>

          {/* Estatísticas */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.statText}>
                {trilha.avaliacaoMedia.toFixed(1)} ({trilha.numeroAvaliacoes})
              </Text>
            </View>
            <View style={styles.statItem}>
              <Users size={16} color="#9ca3af" />
              <Text style={styles.statText}>{trilha.numeroAlunos.toLocaleString()} alunos</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={16} color="#9ca3af" />
              <Text style={styles.statText}>{trilha.totalHoras}h</Text>
            </View>
          </View>
        </View>

        {/* Botão de inscrição */}
        {!isEnrolled && (
          <TouchableOpacity
            style={[styles.enrollButton, enrolling && styles.enrollButtonDisabled]}
            onPress={handleEnroll}
            disabled={enrolling}
          >
            {enrolling ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Play size={20} color="#fff" />
                <Text style={styles.enrollButtonText}>Inscrever-se no Curso</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {isEnrolled && (
          <View style={styles.enrolledBadge}>
            <CheckCircle2 size={20} color="#22c55e" />
            <Text style={styles.enrolledText}>Você está inscrito neste curso</Text>
          </View>
        )}

        {/* Descrição detalhada */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o curso</Text>
          <Text style={styles.sectionText}>{trilha.descricaoDetalhada}</Text>
        </View>

        {/* O que você vai aprender */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que você vai aprender</Text>
          {trilha.objetivos.map((objetivo, index) => (
            <View key={index} style={styles.listItem}>
              <CheckCircle2 size={18} color="#22c55e" />
              <Text style={styles.listItemText}>{objetivo}</Text>
            </View>
          ))}
        </View>

        {/* Pré-requisitos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pré-requisitos</Text>
          {trilha.prerequisitos.map((prereq, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listItemText}>{prereq}</Text>
            </View>
          ))}
        </View>

        {/* Recursos do curso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Este curso inclui</Text>
          <View style={styles.resourcesGrid}>
            <View style={styles.resourceItem}>
              <Video size={20} color="#4f46e5" />
              <Text style={styles.resourceText}>{trilha.totalVideos} vídeos</Text>
            </View>
            <View style={styles.resourceItem}>
              <FileQuestion size={20} color="#4f46e5" />
              <Text style={styles.resourceText}>{trilha.totalExercicios} exercícios</Text>
            </View>
            <View style={styles.resourceItem}>
              <Briefcase size={20} color="#4f46e5" />
              <Text style={styles.resourceText}>{trilha.totalProjetos} projetos</Text>
            </View>
            <View style={styles.resourceItem}>
              <Clock size={20} color="#4f46e5" />
              <Text style={styles.resourceText}>{trilha.totalHoras} horas</Text>
            </View>
            {trilha.temCertificado && (
              <View style={styles.resourceItem}>
                <Award size={20} color="#4f46e5" />
                <Text style={styles.resourceText}>Certificado</Text>
              </View>
            )}
            {trilha.temTextosComplementares && (
              <View style={styles.resourceItem}>
                <FileText size={20} color="#4f46e5" />
                <Text style={styles.resourceText}>Textos complementares</Text>
              </View>
            )}
          </View>
        </View>

        {/* Instrutor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instrutor</Text>
          <View style={styles.instructorCard}>
            <View style={styles.instructorAvatar}>
              <Users size={24} color="#9ca3af" />
            </View>
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{trilha.instrutor.nome}</Text>
              <Text style={styles.instructorSpecialty}>{trilha.instrutor.especialidade}</Text>
              <Text style={styles.instructorBio}>{trilha.instrutor.bio}</Text>
            </View>
          </View>
        </View>

        {/* Conteúdo programático */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conteúdo do curso</Text>
          <Text style={styles.sectionSubtitle}>
            {trilha.modulos.length} módulos • {trilha.totalVideos} aulas
          </Text>

          {trilha.modulos.map((modulo, moduloIndex) => (
            <View key={modulo.id} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleNumber}>Módulo {moduloIndex + 1}</Text>
                <Text style={styles.moduleTitle}>{modulo.titulo}</Text>
                <Text style={styles.moduleDescription}>{modulo.descricao}</Text>
              </View>

              <View style={styles.moduleContent}>
                {modulo.conteudos.map((conteudo) => (
                  <View key={conteudo.id} style={styles.contentItem}>
                    {getIconForContentType(conteudo.tipo)}
                    <Text style={styles.contentTitle}>{conteudo.titulo}</Text>
                    {conteudo.duracao && (
                      <Text style={styles.contentDuration}>{conteudo.duracao}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Informações adicionais */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Última atualização: {new Date(trilha.ultimaAtualizacao).toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.footerText}>Nível: {trilha.level}</Text>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#9ca3af',
  },
  errorText: {
    fontSize: 18,
    color: '#f9fafb',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  headerImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#1f2937',
  },
  mainInfo: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#9ca3af',
    lineHeight: 22,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  enrollButtonDisabled: {
    opacity: 0.6,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  enrolledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#065f46',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  enrolledText: {
    color: '#22c55e',
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9ca3af',
    marginTop: 7,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resourceText: {
    fontSize: 13,
    color: '#d1d5db',
  },
  instructorCard: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  instructorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  instructorSpecialty: {
    fontSize: 13,
    color: '#4f46e5',
    marginBottom: 6,
  },
  instructorBio: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 18,
  },
  moduleCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  moduleHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  moduleNumber: {
    fontSize: 12,
    color: '#4f46e5',
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 13,
    color: '#9ca3af',
  },
  moduleContent: {
    padding: 16,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contentTitle: {
    flex: 1,
    fontSize: 14,
    color: '#d1d5db',
  },
  contentDuration: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  footerText: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
});

