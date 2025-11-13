import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { getAllProducts, deleteProduct, createProduct } from './src/services/productService';

const Stack = createStackNavigator();

// Product List Screen
function ProductListScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const initializeWithSampleData = async () => {
    try {
      setInitializing(true);
      console.log('Initializing with sample data...');
      
      // Add sample products to Firestore
      const sampleProducts = [
        {
          title: "Sample Gaming Console",
          description: "A sample gaming console for demonstration purposes."
        },
        {
          title: "Sample Game",
          description: "A sample game title for your collection."
        }
      ];
      
      for (const product of sampleProducts) {
        await createProduct({
          title: product.title,
          description: product.description,
        }, user?.uid);
      }
      
      Alert.alert('Success', 'Sample data added successfully!');
      loadProducts(); // Reload products after initialization
    } catch (error) {
      console.error('Error initializing data:', error);
      Alert.alert('Error', 'Failed to initialize sample data. Please try again.');
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDeleteProduct = async (product: any) => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please log in to delete products');
      return;
    }

    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(product.id);
              Alert.alert('Success', 'Product deleted successfully');
              loadProducts(); // Reload products after deletion
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleEditProduct = (item: any) => {
    if (user) {
      navigation.navigate('ProductDetail', { productId: item.id, editMode: true });
    } else {
      Alert.alert(
        'Login Required',
        'You need to sign in to edit products.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('Auth') }
        ]
      );
    }
  };

  const handleDeleteProductWithAuth = (item: any) => {
    if (user) {
      handleDeleteProduct(item);
    } else {
      Alert.alert(
        'Login Required',
        'You need to sign in to delete products.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('Auth') }
        ]
      );
    }
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </TouchableOpacity>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditProduct(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteProductWithAuth(item)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#2563eb" />
        <Text style={styles.text}>Loading Videogames...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Videogames Page</Text>
        {user ? (
          <View style={styles.userInfo}>
            <Text style={styles.userText}>Welcome, {user.email}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loggedOutInfo}>
            <Text style={styles.loggedOutText}>
              You are logged out. To be able to add, edit and delete products, please{' '}
              <Text 
                style={styles.loginLink}
                onPress={() => navigation.navigate('Auth')}
              >
                login
              </Text>
            </Text>
          </View>
        )}
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        style={styles.list}
        refreshing={loading}
        onRefresh={loadProducts}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No videogames found</Text>
            {user ? (
              <View style={styles.emptyActions}>
                <TouchableOpacity 
                  style={[styles.button, initializing && styles.buttonDisabled]}
                  onPress={initializeWithSampleData}
                  disabled={initializing}
                >
                  {initializing ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>🎮 Add Sample Products</Text>
                  )}
                </TouchableOpacity>
                <Text style={styles.emptySubtext}>
                  Or create your own products with the + button below
                </Text>
              </View>
            ) : (
              <Text style={styles.emptySubtext}>
                Log in to add videogame products
              </Text>
            )}
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          if (user) {
            navigation.navigate('AddProduct');
          } else {
            Alert.alert(
              'Login Required',
              'You need to sign in to add products.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Login', onPress: () => navigation.navigate('Auth') }
              ]
            );
          }
        }}
      >
        <Text style={styles.buttonText}>+ Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

// Product Detail Screen
function ProductDetailScreen({ route, navigation }: any) {
  const { productId, editMode = false } = route.params;
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(editMode);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const { getProductById, updateProduct, deleteProduct } = require('./src/services/productService');

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const fetchedProduct = await getProductById(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setTitle(fetchedProduct.title);
        setDescription(fetchedProduct.description);
      } else {
        Alert.alert('Error', 'Product not found', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'Failed to load product', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Description is required');
      return;
    }

    setSaving(true);
    try {
      await updateProduct(productId, {
        title: title.trim(),
        description: description.trim(),
      });
      Alert.alert('Success', 'Product updated successfully');
      setIsEditMode(false);
      loadProduct(); // Reload to get updated data
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product?.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(productId);
              Alert.alert('Success', 'Product deleted successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#2563eb" />
        <Text style={styles.text}>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Product not found</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.authContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.authContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Products</Text>
        </TouchableOpacity>

        {isEditMode ? (
          <>
            <Text style={styles.authTitle}>Edit Product</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.realTextInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter product title"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.realTextInput, { height: 100, textAlignVertical: 'top' }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter product description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.verticalButtons}>
              <TouchableOpacity
                style={[styles.primaryButton, saving && styles.buttonDisabled]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                  setTitle(product.title);
                  setDescription(product.description);
                  setIsEditMode(false);
                }}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.authTitle}>{product.title}</Text>
            <Text style={styles.authSubtitle}>{product.description}</Text>
            
            <View style={styles.verticalButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  if (user) {
                    setIsEditMode(true);
                  } else {
                    Alert.alert(
                      'Login Required',
                      'You need to sign in to edit products.',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Login', onPress: () => navigation.navigate('Auth') }
                      ]
                    );
                  }
                }}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.dangerButton}
                onPress={() => {
                  if (user) {
                    handleDelete();
                  } else {
                    Alert.alert(
                      'Login Required',
                      'You need to sign in to delete products.',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Login', onPress: () => navigation.navigate('Auth') }
                      ]
                    );
                  }
                }}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Add Product Screen
function AddProductScreen({ navigation }: any) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please log in to add products', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  }, [user, navigation]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Description is required');
      return;
    }

    setSaving(true);
    try {
      await createProduct({
        title: title.trim(),
        description: description.trim(),
      }, user?.uid);
      
      Alert.alert('Success', 'Product created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error creating product:', error);
      Alert.alert('Error', 'Failed to create product. Please try again.');
    } finally {
      setSaving(false);
    }
  };


  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Authentication Required</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.authContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.authContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.authTitle}>Add New Product</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.realTextInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter product title"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.realTextInput, { height: 100, textAlignVertical: 'top' }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter product description"
            multiline
            numberOfLines={4}
          />
        </View>


        <View style={styles.verticalButtons}>
          <TouchableOpacity
            style={[styles.primaryButton, saving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Add</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Real Firebase Auth Screen
function AuthScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', confirm: '', auth: '' });

  const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
  const { auth } = require('./src/firebaseConfig');

  const validateInputs = () => {
    const newErrors = { email: '', password: '', confirm: '', auth: '' };
    let isValid = true;

    if (!email.trim() || !/.+@.+\..+/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (isSignup && confirmPassword !== password) {
      newErrors.confirm = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAuth = async () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    setErrors({ email: '', password: '', confirm: '', auth: '' });

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.code === 'auth/invalid-credential' 
        ? 'Invalid email or password'
        : error.code === 'auth/email-already-in-use'
        ? 'Email is already registered. Try logging in.'
        : 'Authentication failed. Please try again.';
      
      setErrors({ ...errors, auth: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.authContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.authContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.authTitle}>
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </Text>
        <Text style={styles.authSubtitle}>
          {isSignup ? 'Sign up to manage Nintendo products' : 'Sign in to your account'}
        </Text>

        {errors.auth ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errors.auth}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.realTextInput, errors.email && styles.inputError]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({...errors, email: ''});
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[styles.realTextInput, errors.password && styles.inputError]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({...errors, password: ''});
            }}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        {isSignup && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={[styles.realTextInput, errors.confirm && styles.inputError]}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirm) setErrors({...errors, confirm: ''});
              }}
              placeholder="Confirm your password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.confirm ? <Text style={styles.errorText}>{errors.confirm}</Text> : null}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.authButton, isLoading && styles.buttonDisabled]}
          onPress={handleAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignup ? 'Create Account' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={() => {
            setIsSignup(!isSignup);
            setErrors({ email: '', password: '', confirm: '', auth: '' });
          }}>
            <Text style={styles.switchLink}>
              {isSignup ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function AppNavigator() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  info: {
    fontSize: 14,
    color: '#16a34a',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  userText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  loggedOutInfo: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0ea5e9',
  },
  loggedOutText: {
    fontSize: 14,
    color: '#0369a1',
    textAlign: 'center',
    lineHeight: 20,
  },
  loginLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  list: {
    flex: 1,
    paddingTop: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  verticalButtons: {
    marginTop: 32,
    marginBottom: 20,
    gap: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
  },
  editButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: '#16a34a',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Auth Screen Styles
  authContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  authContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    minHeight: 48,
    justifyContent: 'center',
  },
  textInputText: {
    fontSize: 16,
    color: '#333',
  },
  realTextInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    minHeight: 48,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorBanner: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    marginTop: 4,
  },
  authButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 4,
  },
  switchText: {
    color: '#666',
    fontSize: 14,
  },
  switchLink: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  // Additional styles for Firestore integration
  productDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  emptyActions: {
    alignItems: 'center',
    width: '100%',
  },
  productInfo: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    flex: 1,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
