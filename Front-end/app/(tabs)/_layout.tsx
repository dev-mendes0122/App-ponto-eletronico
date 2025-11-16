import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../../src/hooks/useAuth';

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  // Loading enquanto verifica autenticação
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 10, color: '#7f8c8d' }}>Verificando autenticação...</Text>
      </View>
    );
  }

  // ✅ CORREÇÃO: Se NÃO estiver autenticado, mostrar APENAS a tela de login
  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1 }}>
        {/* Força a renderização apenas da tela de login */}
        <Tabs
          screenOptions={{
            tabBarStyle: { display: 'none' }, // ❌ Esconde completamente a tab bar
            headerShown: false,
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="ponto" options={{ href: null }} />
          <Tabs.Screen name="cartao" options={{ href: null }} />
          <Tabs.Screen name="solicitacoes" options={{ href: null }} />
          <Tabs.Screen name="perfil" options={{ href: null }} />
        </Tabs>
      </View>
    );
  }

  // ✅ Se estiver autenticado, mostrar TODAS as tabs normalmente
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#95a5a6',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ecf0f1',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {/* Tela de Login - NÃO mostrada quando autenticado */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'log-in' : 'log-in-outline'} 
              color={color} 
              size={24} 
            />
          ),
          // ❌ Não mostrar na tab bar quando autenticado
          tabBarButton: () => null,
        }}
      />

      {/* Telas Protegidas - SÓ mostradas quando autenticado */}
      <Tabs.Screen
        name="ponto"
        options={{
          title: 'Ponto',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'time' : 'time-outline'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cartao"
        options={{
          title: 'Cartão',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'calendar' : 'calendar-outline'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="solicitacoes"
        options={{
          title: 'Solicitações',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'document-text' : 'document-text-outline'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
    </Tabs>
  );
}