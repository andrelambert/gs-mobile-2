# 🔥 Configuração do Firebase - SkillBridge

## ⚠️ PROBLEMA IDENTIFICADO

Você está recebendo o erro `FirebaseError: Missing or insufficient permissions` porque:

1. **As regras do Firestore estão desatualizadas** - ainda bloqueiam acesso às coleções `trilhas`, `inscricoes` e `users`
2. **Não há dados no banco** - a coleção `trilhas` está vazia

---

## ✅ SOLUÇÃO (Passo a Passo)

### **1. Atualizar as Regras do Firestore**

Você precisa fazer deploy das novas regras no Firebase Console:

#### **Opção A: Via Firebase Console (Recomendado)**

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto: **fiap-mobile-8ca1d**
3. No menu lateral, clique em **Firestore Database**
4. Clique na aba **Regras** (Rules)
5. **Substitua** todo o conteúdo por:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Trilhas collection - Read-only for everyone
    match /trilhas/{trilhaId} {
      allow read: if true;
      allow write: if false; // Trilhas são somente leitura (seed/admin apenas)
    }
    
    // Inscricoes collection - Authenticated users only
    match /inscricoes/{inscricaoId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
      allow update: if false; // Inscrições não são atualizadas, apenas criadas/deletadas
    }
    
    // Users collection - User profile data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Legacy products collection (não usado, mas mantido por compatibilidade)
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Deny access to all other collections by default
    match /{document=**} {
      allow read, write: if false;
    } 
  }
}
```

6. Clique em **Publicar** (Publish)
7. Aguarde a confirmação de deploy

#### **Opção B: Via Firebase CLI**

Se você tem o Firebase CLI instalado:

```bash
cd "/Users/andre/Documents/FIAP/GS 2 semestre/Mobile/gs-mobile-2"
firebase deploy --only firestore:rules
```

---

### **2. Popular o Banco com as 15 Trilhas**

Depois de atualizar as regras, você precisa adicionar as trilhas ao Firestore.

#### **Método 1: Usando o Botão no App (Mais Fácil)**

1. **Reinicie o app** após fazer deploy das regras
2. **⚠️ IMPORTANTE: Faça login ou crie uma conta primeiro** (necessário para criar trilhas no Firestore)
3. Vá para a aba **Home**
4. Role até o final da tela
5. Clique no botão verde: **🌱 Inicializar Trilhas no Firestore**
6. Aguarde a confirmação: "15 trilhas foram adicionadas ao Firestore!"
7. Vá para a aba **Descobrir** - as trilhas devem aparecer

#### **Método 2: Via Console do Firebase (Manual)**

Se preferir adicionar manualmente:

1. Acesse o Firebase Console → **Firestore Database**
2. Clique em **Iniciar coleção** (Start collection)
3. Nome da coleção: `trilhas`
4. Adicione os documentos com os campos:
   - `title` (string)
   - `description` (string)
   - `category` (string)
   - `duration` (string)
   - `level` (string): "iniciante", "intermediário" ou "avançado"
   - `imageUrl` (string)

*(Use os dados do arquivo `CURSOS.md` como referência)*

---

## 🎯 Verificação

Após seguir os passos acima:

### **No Firebase Console:**
- ✅ Regras publicadas com sucesso
- ✅ Coleção `trilhas` criada com 15 documentos
- ✅ Cada trilha tem os campos: title, description, category, duration, level, imageUrl

### **No App:**
- ✅ Aba "Descobrir" mostra as 15 trilhas
- ✅ Sem erro de permissão
- ✅ Consegue adicionar trilhas aos cursos (após login)
- ✅ "Meus Cursos" mostra trilhas inscritas
- ✅ "Meu Perfil" permite editar dados

---

## 📊 Estrutura das Coleções no Firestore

Após a configuração, você terá:

```
Firestore Database
├── trilhas/
│   ├── [auto-id-1]
│   │   ├── title: "Fundamentos de Inteligência Artificial"
│   │   ├── description: "Aprenda os conceitos..."
│   │   ├── category: "Tecnologia"
│   │   ├── duration: "12 horas"
│   │   ├── level: "iniciante"
│   │   └── imageUrl: "https://placehold.co/600x400"
│   ├── [auto-id-2]
│   └── ... (15 trilhas no total)
│
├── inscricoes/
│   └── (criadas quando usuário se inscreve)
│
└── users/
    └── (criados quando usuário edita perfil)
```

---

## 🔒 Regras de Segurança Explicadas

- **trilhas**: Qualquer pessoa pode ler, ninguém pode escrever (somente via seed/admin)
- **inscricoes**: Apenas usuários autenticados podem criar/deletar suas próprias inscrições
- **users**: Cada usuário só pode ler/escrever seu próprio perfil
- **products**: Legado, mantido por compatibilidade

---

## ❓ Troubleshooting

### Erro persiste após deploy das regras?
- Aguarde 1-2 minutos para propagação
- Limpe o cache do app (force quit e reabra)
- Verifique se as regras foram realmente publicadas no Console

### Botão de seed não funciona?
- Verifique se as regras permitem leitura em `trilhas`
- Veja o console do app para erros específicos
- Tente adicionar manualmente pelo Firebase Console

### Trilhas não aparecem na aba Descobrir?
- Confirme que a coleção `trilhas` existe no Firestore
- Verifique se há documentos na coleção
- Recarregue a tela (pull to refresh)

---

## 🚀 Próximos Passos

Após configurar:

1. ✅ Teste criar uma conta
2. ✅ Navegue pelas trilhas em "Descobrir"
3. ✅ Adicione trilhas aos seus cursos
4. ✅ Veja em "Meus Cursos"
5. ✅ Edite seu perfil em "Meu Perfil"
6. ✅ **REMOVA** o botão de seed da HomeScreen antes de entregar o projeto

---

**Nota:** O botão "🌱 Inicializar Trilhas" é apenas para desenvolvimento. Remova-o antes da entrega final!

