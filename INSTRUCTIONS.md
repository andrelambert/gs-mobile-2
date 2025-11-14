# **SkillBridge — Instructions.md**

## **Nome do Projeto**
**SkillBridge — Plataforma de Upskilling e Reskilling**

---

## **Descrição Geral do Aplicativo**

O **SkillBridge** é uma plataforma de aprendizado focada em **requalificar profissionais** para novas carreiras, especialmente em um mercado impactado por inteligência artificial.  
O aplicativo permitirá que usuários explorem trilhas de aprendizado (cursos), inscrevam-se nelas e acompanhem seu progresso.

O projeto já parte de um template funcional contendo:
- Configuração completa do **Firebase**
- Sistema de **autenticação (email/senha)**
- Conexão com o **Firestore**
- Estrutura inicial de navegação e telas

Esse template possui uma tabela chamada **`products`**, que **não será usada**.  
Neste projeto, substituiremos esse caso de uso por novas coleções e funcionalidades relacionadas a trilhas de aprendizado.

---

## **Objetivo Principal**

Criar um aplicativo móvel React Native + Expo que:

- Utilize os recursos do Firebase já configurados  
- Implemente um CRUD completo sobre trilhas e inscrições  
- Possua navegação tab bar inferior com cinco telas  
- Traga uma experiência visual consistente e organizada  

---

# **📁 Estrutura de Dados (Firestore)**

As seguintes coleções devem ser usadas:

---

## **1. users**
Já existente via Firebase Authentication.

Além do email/senha, o perfil do usuário terá os seguintes campos adicionais:

- `name`
- `birthday`  
- `bio`
- `zipcode` (CEP)
- `address`

---

## **2. trilhas**
Representa cada curso/trilha disponível na plataforma.

Campos:
- `id` (gerado automaticamente)
- `title`
- `description`
- `category`
- `duration`
- `level` (iniciante, intermediário ou avançado)
- `imageUrl`

O app deve conter **15 trilhas fictícias**, que podem ser salvas via seed, arquivo estático ou criadas diretamente no Firestore.

---

## **3. inscricoes**
Relaciona usuário → trilha.

Campos:
- `id`
- `userId`
- `trilhaId`
- `createdAt`

Operações permitidas:
- Criar inscrição (usuário adiciona curso)
- Listar inscrições
- Remover inscrição (cancelar curso)

---

# **📱 Telas do Aplicativo (5 telas)**

O app deve usar **tab navigation (tabs na parte inferior)** com cinco telas:

---

## **1. Home (Tela Inicial)**
- Tela geral de boas-vindas  
- Links rápidos para Trilhas, Meus Cursos e Perfil  
- Destaques das trilhas  

---

## **2. Descobrir (Explorar Trilhas)**
- Lista completa das trilhas  
- Cada card deve mostrar título, imagem e descrição resumida  
- Botão “Adicionar aos meus cursos”

---

## **3. Meus Cursos**
- Exibe somente trilhas em que o usuário está inscrito  
- Buscar dados em *inscricoes* filtrando por `userId`  
- Permitir “Remover inscrição”

---

## **4. Meu Perfil**
- Exibe informações do usuário  
- Permite editar:
  - nome  
  - bio  
  - aniversário  
  - CEP  
  - endereço  
- Salvar no Firestore

---

## **5. Sobre o SkillBridge**
- Texto explicando a missão da plataforma  
- Benefícios de upskilling e reskilling  
- Visão de futuro

---

# **🧭 Navegação**

Usar **React Navigation** ou **Expo Router**, com:

- **Tab Navigator (bottom-tabs)** contendo as 5 telas acima  
- Rotas internas com Stack opcional para telas extras (ex: detalhes da trilha)

---

# **📌 Requisitos Acadêmicos Adaptados**

## **1. Telas e Navegação — 10 pontos**
- Mínimo de cinco telas (listadas acima)  
- Navegação fluida  
- Abas inferiores (tab bar)  
- Boas práticas de acessibilidade  

---

## **2. CRUD com Firebase (Auth + Firestore) usando o SDK oficial — 40 pontos**

### **Requisitos:**
- Implementar CRUD com Firestore:
  - Trilhas (somente leitura) (Estão no arquivo CURSOS.md)
  - Inscrições (criar, listar, deletar)
  - Perfil do usuário (update)
- Usar **exclusivamente o SDK do Firebase**  
- Dados **sempre remotos**, nunca apenas locais  
- Feedback visual:
  - loaders  
  - alerts  
  - mensagens de erro  

---

### **Avaliação:**
- Uso correto das funções `addDoc`, `getDocs`, `updateDoc`, `deleteDoc`
- Tratamento de erros com `try/catch`
- Feedback visual adequado
- Estrutura de coleções clara e semântica
- Organização com serviços, ex: `/services/firebaseService.js`
- Uso adequado de hooks e estado

---

## **3. Estilização com identidade visual personalizada — 10 pontos**
- Temática “tecnologia + IA + educação”  
- Cores, fontes e imagens consistentes  
- Criatividade visual  
- Componentes bem organizados e responsivos  

---

## **4. Arquitetura do Código — 20 pontos**
- Boa organização de pastas  
- Separação entre componentes, telas, serviços e estilos  
- Nomeação clara  
- Código limpo, indentado e fácil de ler  
- Uso de ESLint/Prettier ou equivalente  
- Evitar dependências desnecessárias  

---

# **Funcionalidades Essenciais**
- Login/Logout com Firebase Auth  
- Listagem de trilhas  
- Inscrição do usuário em trilhas  
- Cancelamento de inscrição  
- Edição de perfil  
- Persistência total via Firestore  
- Navegação por abas  
- Interface moderna e uniforme  

---

# **Nota para a IA**

O projeto fornecido já inclui:
- Configuração do Firebase  
- Autenticação  
- Firestore  
- Estruturas de navegação  

A IA deve manter toda a configuração existente e **remover apenas os elementos relacionados a `products`**, substituindo-os por:
- Trilhas  
- Inscrições  
- Perfil do usuário  

---