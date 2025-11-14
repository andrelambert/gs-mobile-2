
# SkillBridge — Plataforma de Upskilling e Reskilling

> Aplicativo React Native + Expo focado em trilhas de aprendizado para upskilling e reskilling de profissionais, usando Firebase Authentication e Firestore.

---

## 🎯 Visão Geral

O **SkillBridge** ajuda profissionais a se requalificarem em áreas como tecnologia, dados, IA e soft skills.  
O app é uma plataforma de trilhas de aprendizado, onde o usuário:

- Explora trilhas (cursos) cadastradas no Firestore  
- Se inscreve nelas e acompanha seus cursos em uma aba dedicada  
- Mantém um perfil com informações pessoais básicas  
- Navega por uma **tab bar inferior com 5 telas** principais

---

## 🔍 Principais Funcionalidades

- **Autenticação com Firebase Auth**
  - Login e cadastro por e-mail/senha  
  - Persistência de sessão usando AsyncStorage  

- **Trilhas (coleção `trilhas`)**
  - Leitura de todas as trilhas a partir do Firestore  
  - 15 trilhas fictícias baseadas em `CURSOS.md` (seed via script)  

- **Inscrições (coleção `inscricoes`)**
  - Criar inscrição: usuário adiciona trilha em "Meus Cursos"  
  - Listar inscrições filtrando por `userId`  
  - Remover inscrição (cancelar curso)  

- **Perfil do Usuário (coleção `users`)**
  - Campos extras associados ao UID do Firebase Auth:  
    - `name`, `birthday`, `bio`, `zipcode`, `address`  
  - Tela de edição de perfil com salvamento no Firestore  

- **Navegação**
  - **Bottom Tab Navigator** com 5 telas:
    - Home  
    - Descobrir (trilhas)  
    - Meus Cursos  
    - Meu Perfil  
    - Sobre o SkillBridge  

- **UX e Feedback Visual**
  - Loaders (`ActivityIndicator`) em operações assíncronas  
  - `Alert.alert` para erros, confirmações e mensagens de sucesso  
  - Layout moderno com tema **tecnologia + IA + educação**

---

## 📱 Telas do Aplicativo

### 1. Home (`HomeScreen.tsx`)
- Tela inicial de boas-vindas  
- Cards com atalhos para **Descobrir**, **Meus Cursos** e **Meu Perfil**  
- Destaques de trilhas recomendadas para quem quer migrar de área  

### 2. Descobrir (`DiscoverScreen.tsx`)
- Lista todas as trilhas da coleção `trilhas`  
- Cada card mostra título, categoria, nível, duração e descrição resumida  
- Botão **“Adicionar aos meus cursos”** que cria um documento em `inscricoes`  
- Bloqueia o botão e informa quando o usuário já está inscrito na trilha  

### 3. Meus Cursos (`MyCoursesScreen.tsx`)
- Lista apenas as trilhas em que o usuário autenticado está inscrito  
- Faz join entre `inscricoes` (filtrando por `userId`) e `trilhas`  
- Exibe data de inscrição, categoria e duração  
- Botão **“Remover inscrição”** com confirmação, removendo doc em `inscricoes`  

### 4. Meu Perfil (`ProfileScreen.tsx`)
- Mostra o e-mail do usuário logado e os campos adicionais do perfil  
- Permite editar:
  - Nome  
  - Bio  
  - Data de nascimento  
  - CEP  
  - Endereço  
- Salva os dados na coleção `users` com o id = `uid` do Firebase Auth  
- Inclui botão **“Sair”** que faz logout via `AuthContext`  

### 5. Sobre o SkillBridge (`AboutScreen.tsx`)
- Explica a missão da plataforma  
- Lista benefícios de upskilling e reskilling  
- Traz uma visão de futuro da integração entre pessoas e IA  

### Tela de Autenticação (`AuthScreen.tsx`)
- Tela combinada de login/cadastro  
- Valida e-mail e senha, exibe mensagens de erro amigáveis  
- Alterna entre modo “Sign In” e “Sign Up”  
- É exibida antes da navegação por abas para usuários não autenticados  

> Observação: algumas telas antigas relacionadas a `products` foram mantidas apenas como legado e **não fazem parte** do fluxo do SkillBridge.

---

## 🔧 Stack Técnica

- **Framework**: React Native com Expo (~54.0.18)  
- **Linguagem**: TypeScript (~5.9.x)  
- **Navegação**: React Navigation v6
  - `@react-navigation/bottom-tabs` (tab bar inferior)  
  - `@react-navigation/stack` (stack para auth)  
- **Backend**: Firebase Firestore  
- **Autenticação**: Firebase Auth (email/senha) com `initializeAuth` + `AsyncStorage`  
- **Gerência de Estado de Auth**: Context API (`AuthContext`)  

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)  
- Expo CLI (`npm install -g expo-cli`)  
- Conta Firebase e projeto configurado (já incluso neste template)  

### Passo a passo

1. **Entrar na pasta do app**
   ```bash
   cd app-skillbridge
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Configurar Firebase (se necessário)**
   - O arquivo `src/firebaseConfig.ts` já está configurado com o projeto  
     `fiap-mobile-8ca1d`.  
   - Confira as regras do Firestore em `FIRESTORE_SETUP.md` e `firestore.rules`.  

4. **Rodar o aplicativo**
   ```bash
   npm start
   # ou
   expo start
   ```

---

## 🗃️ Modelo de Dados (Firestore)

### Coleção `users`

- Criada automaticamente pelo Firebase Authentication (e-mail/senha).  
- Documento de perfil adicional em `users/{uid}` contendo:
  - `name: string`  
  - `birthday: string` (formato `YYYY-MM-DD`)  
  - `bio: string`  
  - `zipcode: string`  
  - `address: string`  

### Coleção `trilhas`

- Representa cada trilha/curso disponível na plataforma.  
- Campos:
  - `title: string`  
  - `description: string`  
  - `category: string`  
  - `duration: string` (ex.: "12 horas")  
  - `level: 'iniciante' | 'intermediário' | 'avançado'`  
  - `imageUrl: string`  

### Coleção `inscricoes`

- Relaciona usuário → trilha.  
- Campos:
  - `userId: string` (UID do Firebase Auth)  
  - `trilhaId: string` (id do documento em `trilhas`)  
  - `createdAt: Timestamp` (serverTimestamp)  

---

## 📁 Estrutura do Projeto (atualizada)

```bash
app-skillbridge/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx            # Contexto de autenticação (Firebase Auth)
│   ├── screens/
│   │   ├── HomeScreen.tsx            # Tela inicial (Home)
│   │   ├── DiscoverScreen.tsx        # Lista de trilhas (Descobrir)
│   │   ├── MyCoursesScreen.tsx       # Trilhas em que o usuário está inscrito
│   │   ├── ProfileScreen.tsx         # Edição de perfil do usuário
│   │   ├── AboutScreen.tsx           # Tela "Sobre o SkillBridge"
│   │   ├── AuthScreen.tsx            # Tela de login/cadastro
│   │   ├── LoginScreen.tsx           # Telas legadas (não usadas na navegação principal)
│   │   ├── SignupScreen.tsx
│   │   └── SuccessScreen.tsx
│   ├── services/
│   │   ├── trilhaService.ts          # Leitura de trilhas (Firestore)
│   │   ├── inscricaoService.ts       # CRUD de inscrições
│   │   ├── userProfileService.ts     # Leitura/atualização de perfil do usuário
│   │   └── productService.ts         # Serviço legado (não usado no SkillBridge)
│   ├── types/
│   │   ├── Trilha.ts                 # Tipos de trilhas
│   │   ├── Inscricao.ts              # Tipos de inscrições
│   │   ├── UserProfile.ts            # Tipos de perfil de usuário
│   │   └── Product.ts                # Tipos legados
│   ├── scripts/
│   │   ├── initializeTrilhas.ts      # Seed das 15 trilhas fictícias
│   │   └── initializeData.ts         # Script legado (Nintendo)
│   └── firebaseConfig.ts             # Configuração do Firebase (app, auth, db)
├── App.tsx                           # Navegação raiz (Auth + Bottom Tabs)
└── package.json                      # Dependências e scripts
```

---

## 🔒 Regras de Segurança (exemplo)

As regras exatas devem ser ajustadas conforme o ambiente, mas um exemplo simples seria:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leituras públicas das trilhas
    match /trilhas/{trilhaId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Inscrições: apenas o próprio usuário pode criar, listar e remover
    match /inscricoes/{inscricaoId} {
      allow read, write: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }

    // Perfil: o usuário só pode ler/editar o próprio documento
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

Veja `FIRESTORE_SETUP.md` para instruções detalhadas de deploy de regras.

---

## 🧪 Comportamento de Autenticação

1. **Usuário não autenticado**
   - É redirecionado para a tela de autenticação (`AuthScreen`)  
   - Só vê a navegação em abas após fazer login/cadastro  

2. **Usuário autenticado**
   - Acessa todas as 5 abas (Home, Descobrir, Meus Cursos, Meu Perfil, Sobre)  
   - Pode criar/remover inscrições e atualizar o perfil  

3. **Persistência da sessão**
   - O `AuthContext` escuta `onAuthStateChanged` do Firebase  
   - A sessão permanece entre reinicializações do app (via `AsyncStorage`)  

---

## ✅ Cobertura dos Requisitos do Projeto

- **Telas e Navegação**
  - 5 telas principais em bottom tab navigation  
  - Navegação fluida entre Home, Descobrir, Meus Cursos, Meu Perfil e Sobre  

- **CRUD com Firebase**
  - Trilhas: leitura de todos os documentos em `trilhas`  
  - Inscrições: criar (`addDoc`), listar (`getDocs` com `where`), deletar (`deleteDoc`)  
  - Perfil do usuário: leitura e `updateDoc` / `setDoc` dos campos adicionais  

- **Estilização**
  - Tema inspirado em tecnologia + IA + educação (cores escuras, acentos em roxo/verde/azul)  

- **Arquitetura**
  - Separação clara entre telas, serviços, tipos e contexto de autenticação  
  - Código organizado em pastas (`screens`, `services`, `types`, `contexts`, `scripts`)  

Este README reflete o estado atual do projeto, já adaptado de um sistema de produtos Nintendo para a plataforma **SkillBridge** de trilhas de aprendizado.
