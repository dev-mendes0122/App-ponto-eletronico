import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { pontoAPI } from '../../src/services/api';

export default function PontoScreen() {
  const [ultimoRegistro, setUltimoRegistro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Menu principal da tela de ponto
  const menuItems = [
    {
      title: 'Marcar',
      subtitle: 'Ponto',
      icon: 'time-outline',
      screen: '/marcacao-ponto',
    },
    {
      title: 'Cartão de',
      subtitle: 'Ponto',
      icon: 'calendar-outline',
      screen: '/(tabs)/cartao',
    },
    {
      title: 'Marcações',
      subtitle: 'Offline',
      icon: 'cloud-offline-outline',
      screen: '/(tabs)/solicitacoes',
    },
  ];

  // Carregar último registro ao abrir a tela
  useEffect(() => {
    carregarUltimoRegistro();
  }, []);

  const carregarUltimoRegistro = async () => {
    try {
      setLoading(true);
      const response = await pontoAPI.getUltimoRegistro();
      
      if (response.data) {
        const data = new Date(response.data.data);
        setUltimoRegistro(
          `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}`
        );
      }
    } catch (error: any) {
      // ❌ ERRO ESPERADO: Se não houver registros ainda, ignora silenciosamente
      if (error.response?.status !== 404) {
        console.log('❌ Erro ao carregar último registro:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Padronizado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcome}>Vinicius Balduin</Text>
            <Text style={styles.title}>Ponto</Text>
          </View>
        </View>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.content}>
        {/* Status do Último Registro */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>ÚLTIMO REGISTRO</Text>
          {loading ? (
            <Text style={styles.statusLoading}>Carregando...</Text>
          ) : ultimoRegistro ? (
            <Text style={styles.statusRegistro}>{ultimoRegistro}</Text>
          ) : (
            <Text style={styles.statusVazio}>Nenhum registro hoje</Text>
          )}
        </View>

        {/* Grid de Menu */}
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.screen as any)}
            >
              <Ionicons name={item.icon as any} size={32} color="#3498db" />
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção de Solicitações */}
        <View style={styles.solicitacoesSection}>
          <Text style={styles.sectionTitle}>Solicitações</Text>
          <View style={styles.solicitacoesList}>
            <Text style={styles.solicitacaoItem}>Férias Pendentes</Text>
            <Text style={styles.solicitacaoItem}>Banco de Horas</Text>
            <Text style={styles.solicitacaoItem}>Ajuste de Ponto</Text>
          </View>
        </View>

        {/* Informações do Dia */}
        <View style={styles.infoDiaContainer}>
          <Text style={styles.infoDiaTitle}>HOJE</Text>
          <Text style={styles.infoDiaText}>
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long',
              year: 'numeric'
            })}
          </Text>
          <Text style={styles.infoDiaHorario}>
            Horário contratual: 07:00 - 16:00
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // Header Padronizado
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    paddingTop: 60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  welcome: {
    color: '#ecf0f1',
    fontSize: 16,
    marginBottom: 2,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 10,
  },
  statusLoading: {
    fontSize: 16,
    color: '#3498db',
    fontStyle: 'italic',
  },
  statusRegistro: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  statusVazio: {
    fontSize: 16,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  solicitacoesSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  solicitacoesList: {
    // Estilos para a lista de solicitações
  },
  solicitacaoItem: {
    fontSize: 14,
    color: '#7f8c8d',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  infoDiaContainer: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  infoDiaTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 5,
  },
  infoDiaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  infoDiaHorario: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});