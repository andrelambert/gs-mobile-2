import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import MyCoursesScreen from './src/screens/MyCoursesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AboutScreen from './src/screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#020617',
          borderTopColor: '#111827',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Discover" component={DiscoverScreen} options={{ title: 'Descobrir' }} />
      <Tab.Screen name="MyCourses" component={MyCoursesScreen} options={{ title: 'Meus Cursos' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Meu Perfil' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#4f46e5" />
        <Text style={styles.loadingText}>Carregando SkillBridge...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabsNavigator} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '500',
  },
});

