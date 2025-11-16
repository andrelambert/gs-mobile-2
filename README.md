# SkillBridge — Plataforma de Upskilling e Reskilling

> Aplicativo React Native + Expo focado em trilhas de aprendizado para upskilling e reskilling de profissionais, usando Firebase Authentication, Firestore e integração com API externa ViaCEP.

---

## 👥 Equipe

Este projeto foi desenvolvido por:

- **André Lambert** - RM 99148
- **Felipe Cortez** - RM 99750
- **Guilherme Morais** - RM 551981

---

## 🎯 Visão Geral

O **SkillBridge** é uma plataforma mobile que ajuda profissionais a se requalificarem em áreas como tecnologia, dados, IA e soft skills. O aplicativo oferece trilhas de aprendizado estruturadas, permitindo que usuários:

- Explorem **15 trilhas completas** cadastradas no Firestore com informações detalhadas
- Se inscrevam em cursos e acompanhem seu progresso
- Gerenciem seu perfil com informações pessoais e endereço
- Naveguem por uma **interface moderna** com bottom tab navigation (5 telas principais)
- Preencham automaticamente seu endereço através da **integração com API ViaCEP**

---

## 🔍 Principais Funcionalidades

### **Autenticação com Firebase Auth**
- Login e cadastro por e-mail/senha
- Persistência de sessão usando AsyncStorage
- Validação de credenciais com mensagens de erro amigáveis
- Contexto de autenticação global (AuthContext)

### **Trilhas de Aprendizado (coleção `trilhas`)**
- **15 trilhas completas** com informações detalhadas:
  - Descrição completa e objetivos de aprendizado
  - Pré-requisitos e nível (iniciante/intermediário/avançado)
  - Módulos estruturados com conteúdo programático
  - Informações do instrutor
  - Estatísticas (horas, vídeos, exercícios, projetos)
  - Recursos inclusos (certificado, textos, suporte, fórum)
  - Avaliações e número de alunos
- Leitura de todas as trilhas a partir do Firestore
- **Tela de detalhes completa** para cada curso
- **Carrossel de cursos em destaque** na tela inicial

### **Inscrições (coleção `inscricoes`)**
- Criar inscrição: usuário adiciona trilha em "Meus Cursos"
- Listar inscrições filtrando por `userId`
- Remover inscrição (cancelar curso)
- Verificação automática de inscrições existentes

### **Perfil do Usuário (coleção `users`)**
- Campos detalhados associados ao UID do Firebase Auth:
  - Nome e sobrenome
  - Data de nascimento (formato DD/MM/AAAA com máscara)
  - Email (não editável)
  - Bio
  - **Endereço completo com integração ViaCEP:**
    - CEP (formato 00000-000 com máscara)
    - Rua (preenchimento automático via API)
    - Número
    - Complemento
    - Estado (preenchimento automático via API)
    - Cidade (preenchimento automático via API)
- Tela de edição de perfil com salvamento no Firestore
- Validação de alterações (botão salvar habilitado apenas quando há mudanças)

### **Integração com API Externa - ViaCEP**
- **Requisição HTTP com Axios** para consulta de CEP
- Preenchimento automático de endereço ao digitar CEP completo
- Validação de formato de CEP (8 dígitos)
- Tratamento de erros (CEP inválido, não encontrado, timeout)
- Feedback visual durante a consulta (loading indicator)
- **Endpoint utilizado:** `https://viacep.com.br/ws/{cep}/json/`

### **Navegação**
- **Bottom Tab Navigator** com 5 telas:
  1. **Início** - Apresentação, carrossel de cursos em destaque e atalhos
  2. **Descobrir** - Lista todas as trilhas disponíveis
  3. **Meus Cursos** - Trilhas em que o usuário está inscrito
  4. **Meu Perfil** - Edição de informações pessoais (com UserHeader)
  5. **Sobre** - Informações sobre a plataforma
- **Stack Navigator** para navegação entre telas:
  - Tela de autenticação (Login/Cadastro)
  - Tela de detalhes do curso (com botão voltar)

### **UX e Feedback Visual**
- Loaders (`ActivityIndicator`) em operações assíncronas
- `Alert.alert` para erros, confirmações e mensagens de sucesso
- Layout moderno com tema dark (tecnologia + IA + educação)
- Máscaras de input para data e CEP
- Validação de campos em tempo real
- Estados de loading para requisições externas
- Botões desabilitados durante operações
- Navegação fluida com feedback tátil

---

## 📱 Telas do Aplicativo

### 1. **Início (`HomeScreen.tsx`)**
- Apresentação da plataforma SkillBridge
- **Carrossel horizontal** com 5 cursos em destaque
- Cards com atalhos para **Descobrir**, **Meus Cursos** e **Meu Perfil**
- Seção de destaques e recomendações

### 2. **Descobrir (`DiscoverScreen.tsx`)**
- Lista todas as trilhas da coleção `trilhas`
- Cada card mostra: título, categoria, nível, duração e descrição
- Botão **"Adicionar aos meus cursos"** que cria um documento em `inscricoes`
- Bloqueia o botão quando o usuário já está inscrito
- **Clique no card** navega para tela de detalhes

### 3. **Meus Cursos (`MyCoursesScreen.tsx`)**
- Lista apenas as trilhas em que o usuário autenticado está inscrito
- Faz join entre `inscricoes` (filtrando por `userId`) e `trilhas`
- Exibe data de inscrição, categoria e duração
- Botão **"Remover inscrição"** com confirmação
- **Clique no card** navega para tela de detalhes
- Mensagem amigável quando não há cursos

### 4. **Meu Perfil (`ProfileScreen.tsx`)**
- **UserHeader** com status de login e botão sair/entrar
- Exibe o e-mail do usuário logado (não editável)
- Permite editar:
  - Nome e Sobrenome
  - Data de nascimento (DD/MM/AAAA com máscara)
  - Bio
  - **CEP** (00000-000 com máscara e integração ViaCEP)
  - Rua (preenchida automaticamente)
  - Número
  - Complemento
  - Estado (preenchido automaticamente)
  - Cidade (preenchida automaticamente)
- Botão **"Salvar alterações"** habilitado apenas quando há mudanças
- Feedback visual durante consulta de CEP
- Salva os dados na coleção `users` com o id = `uid` do Firebase Auth

### 5. **Sobre (`AboutScreen.tsx`)**
- Missão e visão da plataforma
- Metodologia de ensino
- Áreas de conhecimento (Tecnologia, Dados, Design, Gestão, Soft Skills)
- Certificação e reconhecimento
- Comunidade SkillBridge
- **Box de estatísticas** (15+ trilhas, 50+ horas, 100+ projetos)
- Informações sobre benefícios de upskilling e reskilling
- Footer com versão do app

### 6. **Detalhes do Curso (`CourseDetailScreen.tsx`)**
- **Botão voltar circular** no canto superior esquerdo
- Header com imagem do curso
- Informações principais: título, categoria, avaliação, número de alunos
- Botão de inscrição (ou badge "já inscrito")
- **Sobre o curso**: descrição detalhada
- **O que você vai aprender**: lista de objetivos
- **Pré-requisitos**: requisitos necessários
- **Recursos incluídos**: vídeos, exercícios, projetos, certificado, etc.
- **Informações do instrutor**: nome, bio, especialidade
- **Conteúdo programático**: módulos expandidos com todas as aulas
- Ícones contextuais para cada tipo de conteúdo (vídeo, texto, exercício, quiz, projeto)
- Rodapé com última atualização e nível

### 7. **Autenticação (`AuthScreen.tsx`)**
- Tela combinada de login/cadastro
- Valida e-mail e senha
- Exibe mensagens de erro amigáveis (sem códigos técnicos)
- Alterna entre modo "Sign In" e "Sign Up"
- Navegação automática após sucesso
- Tratamento de erros do Firebase

---

## 🔧 Stack Técnica

### **Frontend**
- **Framework**: React Native com Expo (~54.0.18)
- **Linguagem**: TypeScript (~5.9.x)
- **Navegação**: React Navigation v6
  - `@react-navigation/bottom-tabs` (tab bar inferior)
  - `@react-navigation/stack` (stack para auth e detalhes)
- **Ícones**: Lucide React Native (~0.553.0)

### **Backend e Serviços**
- **Backend**: Firebase Firestore (NoSQL Database)
- **Autenticação**: Firebase Auth (email/senha) com `initializeAuth` + `AsyncStorage`
- **API Externa**: ViaCEP (https://viacep.com.br/)
- **HTTP Client**: Axios (~1.6.0)

### **Gerência de Estado**
- Context API (`AuthContext`) para autenticação global
- React Hooks (useState, useEffect) para estado local

### **Persistência**
- AsyncStorage para persistência de sessão
- Firebase Firestore para dados da aplicação

---

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**

- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Conta Firebase e projeto configurado

### **Passo a passo**

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd gs-mobile-2
   ```

2. **Entre na pasta do app**
   ```bash
   cd app-skillbridge
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Configure o Firebase**
   - O arquivo `src/firebaseConfig.ts` já está configurado com o projeto `fiap-mobile-8ca1d`
   - As regras do Firestore já estão configuradas e publicadas no Firebase

5. **Rode o aplicativo**
   ```bash
   npm start
   # ou
   npx expo start
   ```

7. **Abra no dispositivo**
   - Escaneie o QR code com o app Expo Go (Android/iOS)
   - Ou pressione `a` para Android emulator
   - Ou pressione `i` para iOS simulator

---

## 🗃️ Modelo de Dados (Firestore)

### **Coleção `users`**
Perfil adicional do usuário (complementa Firebase Authentication):

```typescript
{
  id: string,              // UID do Firebase Auth
  name: string,
  lastName: string,
  birthday: string,        // formato DD/MM/AAAA
  bio: string,
  zipcode: string,         // formato 00000-000
  street: string,          // preenchido via ViaCEP
  number: string,
  complement: string,
  state: string,           // preenchido via ViaCEP (UF)
  city: string,            // preenchido via ViaCEP
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### **Coleção `trilhas`**
Representa cada trilha/curso disponível na plataforma:

```typescript
{
  id: string,
  // Campos básicos
  title: string,
  description: string,
  category: string,
  duration: string,
  level: 'iniciante' | 'intermediário' | 'avançado',
  imageUrl: string,
  
  // Campos detalhados
  descricaoDetalhada: string,
  objetivos: string[],
  prerequisitos: string[],
  
  // Estatísticas
  totalHoras: number,
  totalVideos: number,
  totalExercicios: number,
  totalProjetos: number,
  
  // Recursos
  temCertificado: boolean,
  temTextosComplementares: boolean,
  temSuporteInstrutor: boolean,
  temForumDiscussao: boolean,
  
  // Instrutor
  instrutor: {
    nome: string,
    bio: string,
    especialidade: string
  },
  
  // Conteúdo programático
  modulos: [{
    id: string,
    titulo: string,
    descricao: string,
    conteudos: [{
      id: string,
      titulo: string,
      tipo: 'video' | 'texto' | 'exercicio' | 'quiz' | 'projeto',
      duracao?: string
    }]
  }],
  
  // Metadados
  numeroAvaliacoes: number,
  avaliacaoMedia: number,
  numeroAlunos: number,
  ultimaAtualizacao: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### **Coleção `inscricoes`**
Relaciona usuário → trilha:

```typescript
{
  id: string,
  userId: string,          // UID do Firebase Auth
  trilhaId: string,        // ID do documento em trilhas
  createdAt: Timestamp
}
```

---

## 📁 Estrutura do Projeto

```bash
app-skillbridge/
├── src/
│   ├── components/
│   │   └── UserHeader.tsx              # Header com status de login (usado no ProfileScreen)
│   ├── contexts/
│   │   └── AuthContext.tsx             # Contexto de autenticação (Firebase Auth)
│   ├── screens/
│   │   ├── HomeScreen.tsx              # Tela inicial com carrossel
│   │   ├── DiscoverScreen.tsx          # Lista de trilhas (Descobrir)
│   │   ├── MyCoursesScreen.tsx         # Trilhas em que o usuário está inscrito
│   │   ├── ProfileScreen.tsx           # Edição de perfil (com ViaCEP)
│   │   ├── AboutScreen.tsx             # Tela "Sobre o SkillBridge"
│   │   ├── AuthScreen.tsx              # Tela de login/cadastro
│   │   ├── CourseDetailScreen.tsx      # Detalhes completos do curso
│   │   ├── LoginScreen.tsx             # [Legado - não usado]
│   │   ├── SignupScreen.tsx            # [Legado - não usado]
│   │   └── SuccessScreen.tsx           # [Legado - não usado]
│   ├── services/
│   │   ├── trilhaService.ts            # CRUD de trilhas (Firestore)
│   │   ├── inscricaoService.ts         # CRUD de inscrições (Firestore)
│   │   ├── userProfileService.ts       # CRUD de perfil do usuário (Firestore)
│   │   ├── viaCepService.ts            # Integração com API ViaCEP (Axios)
│   │   └── productService.ts           # [Legado - não usado]
│   ├── types/
│   │   ├── Trilha.ts                   # Tipos de trilhas (básico)
│   │   ├── TrilhaDetalhada.ts          # Tipos de trilhas (completo)
│   │   ├── Inscricao.ts                # Tipos de inscrições
│   │   ├── UserProfile.ts              # Tipos de perfil de usuário
│   │   └── Product.ts                  # [Legado - não usado]
│   ├── scripts/
│   │   ├── initializeTrilhas.ts        # [Legado - seed básico]
│   │   └── initializeTrilhasDetalhadas.ts  # Seed das 15 trilhas completas
│   ├── utils/
│   │   └── formatters.ts               # Funções de formatação (data, CEP)
│   └── firebaseConfig.ts               # Configuração do Firebase (app, auth, db)
├── assets/                             # Ícones e imagens do app
├── App.tsx                             # Navegação raiz (Auth + Bottom Tabs + Stack)
├── index.ts                            # Entry point
├── package.json                        # Dependências e scripts
├── tsconfig.json                       # Configuração TypeScript
└── app.json                            # Configuração Expo
```

---

## 🔒 Regras de Segurança (Firestore)

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Trilhas: leitura pública, criação/atualização apenas autenticados
    match /trilhas/{trilhaId} {
      allow read: if true;
      allow create, update: if request.auth != null;
      allow delete: if false;
    }
    
    // Inscrições: apenas o próprio usuário
    match /inscricoes/{inscricaoId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null 
        && resource.data.userId == request.auth.uid;
      allow update: if false;
    }
    
    // Perfil: apenas o próprio usuário
    match /users/{userId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == userId;
    }
  }
}
```

---

## 🌐 Integração com API Externa - ViaCEP

### **Implementação**

O SkillBridge integra-se com a API pública **ViaCEP** para preenchimento automático de endereço.

**Arquivo:** `src/services/viaCepService.ts`

**Tecnologia:** Axios

**Endpoint:** `https://viacep.com.br/ws/{cep}/json/`

### **Funcionalidades**

1. **Validação de CEP**
   ```typescript
   isValidCep(cep: string): boolean
   // Verifica se o CEP tem 8 dígitos
   ```

2. **Consulta de Endereço**
   ```typescript
   getAddressByCep(cep: string): Promise<ViaCepResponse | null>
   // Busca dados do endereço na API ViaCEP
   // Retorna: cep, logradouro, bairro, localidade, uf, etc.
   ```

### **Tratamento de Erros**

- **CEP inválido (formato):** Retorna erro antes da requisição
- **CEP não encontrado:** API retorna `{ erro: true }`
- **Timeout (>10s):** Mensagem de erro amigável
- **Erro de rede:** Tratamento genérico com mensagem ao usuário

### **Fluxo de Uso**

1. Usuário digita CEP no campo (com máscara 00000-000)
2. Ao completar 8 dígitos, valida o formato
3. Faz requisição GET para ViaCEP
4. Exibe loading indicator
5. Preenche automaticamente: Rua, Cidade, Estado
6. Exibe mensagem de sucesso ou erro
7. Usuário completa: Número e Complemento

### **Exemplo de Resposta da API**

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004"
}
```

---

## 🧪 Comportamento de Autenticação

### **Usuário não autenticado**
- Pode navegar livremente pelas telas: Início, Descobrir, Sobre
- Pode visualizar detalhes dos cursos
- Ao tentar se inscrever em um curso: redirecionado para login
- Ao acessar "Meus Cursos": mensagem solicitando login
- Ao acessar "Meu Perfil": mensagem solicitando login

### **Usuário autenticado**
- Acessa todas as 5 abas (Início, Descobrir, Meus Cursos, Meu Perfil, Sobre)
- Pode criar/remover inscrições
- Pode atualizar o perfil
- Vê status "Logado" no UserHeader (tela de perfil)
- Botão de logout disponível

### **Persistência da sessão**
- O `AuthContext` escuta `onAuthStateChanged` do Firebase
- A sessão permanece entre reinicializações do app (via `AsyncStorage`)
- Logout limpa a sessão e redireciona para tela inicial

---

## ✅ Requisitos Atendidos

### **Funcionalidades Obrigatórias**
- ✅ **5 telas** em bottom tab navigation
- ✅ **CRUD completo** com Firebase Firestore:
  - Trilhas: Read (todas as operações de leitura)
  - Inscrições: Create, Read, Delete
  - Perfil: Create, Read, Update
- ✅ **Autenticação** com Firebase Auth (email/senha)
- ✅ **Integração com API externa** (ViaCEP) usando Axios
- ✅ **Navegação** entre telas (Stack + Bottom Tabs)
- ✅ **Estilização** moderna e consistente
- ✅ **TypeScript** em todo o projeto
- ✅ **Tratamento de erros** e feedback ao usuário
- ✅ **Loading states** em operações assíncronas

### **Diferenciais Implementados**
- ✅ Tela de detalhes completa para cada curso
- ✅ Carrossel de cursos em destaque
- ✅ Máscaras de input (data, CEP)
- ✅ Validação de campos em tempo real
- ✅ Preenchimento automático de endereço via API
- ✅ Design system consistente
- ✅ Ícones contextuais (Lucide)
- ✅ Feedback visual em todas as ações
- ✅ 15 trilhas completas com conteúdo rico
- ✅ Arquitetura organizada e escalável

---

## 📚 Trilhas Disponíveis

1. Fundamentos de Python para Análise de Dados
2. Desenvolvimento Web Full Stack com React e Node.js
3. Machine Learning Aplicado
4. Design Thinking e Inovação
5. SQL para Análise de Dados
6. Cloud Computing com AWS
7. UX/UI Design Completo
8. DevOps: CI/CD e Automação
9. Gestão de Projetos Ágeis com Scrum
10. Blockchain e Criptomoedas
11. Power BI para Business Intelligence
12. Comunicação e Liderança
13. Cibersegurança Essencial
14. Excel Avançado para Negócios
15. Marketing Digital e Growth Hacking

Cada trilha inclui:
- 3 módulos com conteúdos variados
- Vídeos, exercícios, quizzes e projetos
- Informações do instrutor
- Objetivos e pré-requisitos
- Estatísticas e avaliações

---

## 🎨 Design e UX

### **Paleta de Cores**
- Background: `#020617` (dark blue)
- Cards: `#111827` (dark gray)
- Borders: `#1f2937` (medium gray)
- Text primary: `#f9fafb` (white)
- Text secondary: `#9ca3af` (light gray)
- Accent: `#4f46e5` (indigo)
- Success: `#22c55e` (green)
- Error: `#ef4444` (red)

### **Tipografia**
- Títulos: 26-32px, weight 700-800
- Subtítulos: 16-18px, weight 600-700
- Body: 13-15px, weight 400-600
- Small: 11-12px, weight 400-500

### **Componentes**
- Cards com bordas arredondadas (12-16px)
- Botões com feedback tátil (activeOpacity)
- Loading states em todas as operações
- Máscaras de input para melhor UX
- Ícones contextuais para melhor compreensão

---

## 🚀 Próximos Passos (Futuras Implementações)

- [ ] Sistema de progresso nas trilhas
- [ ] Vídeos e conteúdo real
- [ ] Sistema de avaliações e comentários
- [ ] Notificações push
- [ ] Gamificação (badges, pontos)
- [ ] Recomendações personalizadas com IA
- [ ] Modo offline
- [ ] Compartilhamento social
- [ ] Certificados digitais

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do curso de Mobile da FIAP.

---

## 🙏 Agradecimentos

- **FIAP** - Pela oportunidade de aprendizado
- **Firebase** - Pela infraestrutura robusta e gratuita
- **ViaCEP** - Pela API pública e gratuita de consulta de CEP
- **Expo** - Pela facilidade no desenvolvimento React Native
- **Lucide** - Pelos ícones modernos e elegantes

---

**Desenvolvido com 💜 pela equipe SkillBridge**

*Versão 1.0.0 - 2025*
