import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User as UserIcon, LogOut, LogIn } from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';

interface UserHeaderProps {
  navigation: any;
}

export default function UserHeader({ navigation }: UserHeaderProps) {
  const { user, logout } = useAuth();

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigation.navigate('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <UserIcon color="#9ca3af" size={24} />
        </View>
        <View style={styles.userInfo}>
          {user ? (
            <>
              <Text style={styles.statusText}>Logado</Text>
              <Text style={styles.emailText} numberOfLines={1}>
                {user.email}
              </Text>
            </>
          ) : (
            <Text style={styles.statusText}>Não autenticado</Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity style={styles.actionButton} onPress={handleAuthAction}>
        {user ? (
          <>
            <LogOut color="#ef4444" size={18} />
            <Text style={styles.logoutText}>Sair</Text>
          </>
        ) : (
          <>
            <LogIn color="#22c55e" size={18} />
            <Text style={styles.loginText}>Entrar</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#374151',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  emailText: {
    fontSize: 13,
    color: '#f9fafb',
    fontWeight: '600',
    marginTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1f2937',
    gap: 6,
  },
  logoutText: {
    fontSize: 13,
    color: '#ef4444',
    fontWeight: '600',
  },
  loginText: {
    fontSize: 13,
    color: '#22c55e',
    fontWeight: '600',
  },
});

