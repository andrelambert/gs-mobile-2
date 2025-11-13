
# Nintendo Product Management System!

A React Native Expo application with Firebase Authentication and Firestore for managing Nintendo video game console products.

## 🎮 Features

- **Product Management**: Full CRUD operations for Nintendo console products
- **Authentication**: Firebase Auth with login/signup functionality
- **Public Viewing**: Anyone can browse products (no authentication required)
- **Protected Actions**: Only authenticated users can add, edit, or delete products
- **Responsive UI**: Clean, modern interface with intuitive navigation
- **Real-time Data**: Firestore integration for live data synchronization
- **Nintendo Themed**: Pre-loaded with Nintendo console templates

## 📱 Screens

### 1. Product List Screen (Home)
- Displays all Nintendo console products
- Shows user authentication status in header
- **Public Access**: Anyone can view products
- **Authenticated Features**: 
  - Add new product button
  - Edit/Delete buttons for each product
  - User info and logout button

### 2. Product Detail Screen
- View individual product details
- **Public Access**: Anyone can view product details
- **Authenticated Features**:
  - Edit product inline
  - Delete product with confirmation
  - Auto-redirect to login if unauthenticated user tries to edit

### 3. Add Product Screen
- Create new products with title and description
- Nintendo console templates for quick setup
- **Authentication Required**: Redirects to login if unauthenticated

### 4. Authentication Screen
- Combined login/signup interface
- Email and password validation
- Error handling with user-friendly messages
- Switch between login and signup modes

## 🔧 Technical Stack

- **Framework**: React Native with Expo (~54.0.18)
- **Navigation**: React Navigation v6 with Stack Navigator
- **Backend**: Firebase Firestore for data storage
- **Authentication**: Firebase Auth with email/password
- **Language**: TypeScript for type safety
- **State Management**: React Context (AuthContext)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g expo-cli`)
- Firebase project setup

### Installation

1. **Clone and Navigate**
   ```bash
   cd app-login
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Firebase configuration is already set up in `src/firebaseConfig.ts`
   - Project: `fiap-mobile-8ca1d`
   - **Deploy Firestore Rules** (see `FIRESTORE_SETUP.md`)

4. **Run the Application**
   ```bash
   npm start
   # or
   expo start
   ```

## 📁 Project Structure

```
app-login/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx          # Authentication state management
│   ├── screens/
│   │   ├── ProductListScreen.tsx    # Home screen with product list
│   │   ├── ProductDetailScreen.tsx  # Individual product view/edit
│   │   ├── AddProductScreen.tsx     # Create new product
│   │   └── AuthScreen.tsx          # Login/Signup combined screen
│   ├── services/
│   │   └── productService.ts       # Firestore CRUD operations
│   ├── types/
│   │   └── Product.ts              # TypeScript interfaces
│   ├── scripts/
│   │   └── initializeData.ts       # Database initialization helper
│   └── firebaseConfig.ts           # Firebase configuration
├── App.tsx                         # Main app with navigation setup
└── package.json                    # Dependencies and scripts
```

## 🔒 Security & Permissions

### Firestore Security Rules
```javascript
// Read access: Open to everyone
allow read: if true;

// Write access: Authenticated users only  
allow create, update, delete: if request.auth != null;
```

### Authentication Flow
1. **Unauthenticated Users**: Can browse and view products
2. **Authentication Required**: For add, edit, delete operations
3. **Auto-Redirect**: Prompts login when authentication needed
4. **Persistent Auth**: Maintains login state across app restarts

## 🎮 Nintendo Console Data

The app includes pre-defined Nintendo console templates:

- Nintendo Switch
- Nintendo Switch OLED  
- Nintendo 3DS
- Nintendo Wii U
- Nintendo Wii
- Nintendo DS Lite

Users can select these templates when creating new products for quick setup.

## 🛠️ Development Features

### Type Safety
- Full TypeScript implementation
- Defined interfaces for Product, requests, and props
- Type-safe Firebase operations

### Error Handling
- Comprehensive Firebase error mapping
- User-friendly error messages
- Graceful fallbacks for network issues

### User Experience
- Loading states for all async operations
- Pull-to-refresh functionality
- Confirmation dialogs for destructive actions
- Keyboard-aware layouts

### Code Organization
- Separation of concerns with services layer
- Reusable contexts for state management
- Clean component architecture

## 📝 Usage Examples

### Adding a New Product
1. Ensure you're logged in (or app will prompt)
2. Tap "Add Product" button on home screen
3. Either fill form manually or tap a Nintendo console template
4. Enter title and description
5. Tap "Create Product"

### Editing a Product
1. Tap any product from the list or tap "Edit" button
2. In detail view, tap "Edit" (login required)
3. Modify title/description
4. Tap "Save" to confirm changes

### Deleting a Product
1. From list: tap "Delete" button next to product
2. From detail: tap "Delete" button in product detail
3. Confirm deletion in dialog (login required)

## 🔧 Configuration

### Firebase Configuration
Update `src/firebaseConfig.ts` with your Firebase project settings:
```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-project-id",
  // ... other config
};
```

### Firestore Rules Deployment
See `FIRESTORE_SETUP.md` for detailed instructions on deploying security rules.

## 🎯 Key Features Implementation

### Authentication State Management
- Context-based auth state sharing
- Automatic navigation based on auth status
- Persistent login across app sessions

### CRUD Operations
- **Create**: Add new products with user attribution
- **Read**: Fetch all products or individual product by ID
- **Update**: Modify existing product data
- **Delete**: Remove products with confirmation

### Navigation System
- Stack-based navigation with React Navigation
- Screen-to-screen parameter passing
- Back navigation handling
- Deep linking support ready

### Data Validation
- Required field validation
- Email format validation
- Password strength requirements
- Form error state management

This system provides a complete, production-ready foundation for a product management application with proper authentication, security, and user experience considerations.
