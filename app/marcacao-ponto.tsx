import { Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../src/hooks/useAuth';
import { funcionarioAPI, pontoAPI } from '../src/services/api';

// Tipo para os registros
interface Registro {
  id: number;
  tipo: string;
  data: string;
  hora: string;
  recibo: string;
}

interface Funcionario {
  nome: string;
  chapa: string;
  funcao: string;
}

export default function MarcacaoPontoScreen() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [registrando, setRegistrando] = useState(false);
  const [ultimoRegistro, setUltimoRegistro] = useState<string | null>(null);
  const [registrosHoje, setRegistrosHoje] = useState<Registro[]>([]);
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);

  // ✅ CORREÇÃO: useEffect DEVE vir antes de qualquer return condicional
  useEffect(() => {
    if (isAuthenticated) {
      carregarDadosIniciais();
    }
  }, [isAuthenticated]);

  const carregarDadosIniciais = async () => {
    try {
      setLoading(true);
      
      // Carregar dados do funcionário
      const responseFuncionario = await funcionarioAPI.getDados();
      setFuncionario(responseFuncionario.data);
      
      // Carregar registros de hoje
      const responseRegistros = await pontoAPI.getRegistrosHoje();
      setRegistrosHoje(responseRegistros.data);
      
      // Carregar último registro
      const responseUltimo = await pontoAPI.getUltimoRegistro();
      if (responseUltimo.data) {
        const data = new Date(responseUltimo.data.data);
        setUltimoRegistro(
          `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}`
        );
      }
      
    } catch (error: any) {
      console.log('❌ Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  const registrarPonto = async () => {
    setRegistrando(true);
    
    try {
      // Determinar o próximo tipo de ponto baseado nos registros atuais
      const quantidadeRegistros = registrosHoje.length;
      let tipo = 'E';
      
      if (quantidadeRegistros === 0) tipo = 'E';
      else if (quantidadeRegistros === 1) tipo = 'S';
      else if (quantidadeRegistros === 2) tipo = 'E';
      else if (quantidadeRegistros === 3) tipo = 'S';
      else tipo = 'E'; // Se tiver mais de 4, volta para entrada
      
      const label = tipo === 'E' ? 'Entrada' : 'Saída';
      
      console.log(`📤 Registrando ponto: ${tipo} (${label})`);
      
      // Registrar ponto na API
      const response = await pontoAPI.registrarPonto({ tipo });
      
      console.log('✅ Ponto registrado:', response.data);
      
      // Atualizar dados locais
      await carregarDadosIniciais();
      
      // Mostrar confirmação
      Alert.alert(
        'Ponto Registrado!',
        `${label} registrada com sucesso\nRecibo: ${response.data.recibo}`,
        [{ text: 'OK' }]
      );

    } catch (error: any) {
      console.log('❌ Erro ao registrar ponto:', error);
      
      if (error.response?.status === 401) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        router.replace('/(tabs)');
      } else {
        Alert.alert('Erro', error.response?.data?.detail || 'Não foi possível registrar o ponto');
      }
    } finally {
      setRegistrando(false);
    }
  };

  const getProximoTipoPonto = () => {
    const quantidadeRegistros = registrosHoje.length;
    
    if (quantidadeRegistros === 0) return { tipo: 'E', label: 'Entrada' };
    if (quantidadeRegistros === 1) return { tipo: 'S', label: 'Saída' };
    if (quantidadeRegistros === 2) return { tipo: 'E', label: 'Entrada' };
    if (quantidadeRegistros === 3) return { tipo: 'S', label: 'Saída' };
    
    return { tipo: 'E', label: 'Entrada' };
  };

  // ✅ CORREÇÃO: Verificação de autenticação DEPOIS dos Hooks
  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Verificando autenticação...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const proximoTipo = getProximoTipoPonto();

  // Tipos de ponto esperados
  const tiposPonto = [
    { tipo: 'E', label: 'Entrada', horario: '07:00' },
    { tipo: 'S', label: 'Saída', horario: '12:00' },
    { tipo: 'E', label: 'Entrada', horario: '13:00' },
    { tipo: 'S', label: 'Saída', horario: '17:00' }
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Carregando...</Text>
          <Text style={styles.title}>Marcação do Ponto</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcome}>{funcionario?.nome || 'Funcionário'}</Text>
            <Text style={styles.title}>Marcação do Ponto</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Seção: Meu Ponto */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>MEU PONTO</Text>
          <View style={styles.relogioContainer}>
            <Text style={styles.relogio}>
              {new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit' 
              })}
            </Text>
            <Text style={styles.data}>
              {new Date().toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>

        {/* Botão Principal de Registrar Ponto */}
        <TouchableOpacity
          style={[
            styles.botaoRegistrar,
            (registrando || loading) && styles.botaoRegistrarDisabled
          ]}
          onPress={registrarPonto}
          disabled={registrando || loading}
        >
          {registrando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="time" size={32} color="#fff" />
              <Text style={styles.botaoRegistrarTexto}>
                Registrar {proximoTipo.label}
              </Text>
              <Text style={styles.botaoRegistrarSubtitulo}>
                {registrosHoje.length}/4 registros hoje
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Registros do Dia */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>REGISTROS DE HOJE</Text>
          <View style={styles.registrosContainer}>
            {tiposPonto.map((item, index) => {
              const registro = registrosHoje[index];
              return (
                <View key={index} style={styles.registroLinha}>
                  <Text style={styles.registroTipo}>{item.tipo}</Text>
                  <Text style={styles.registroHorario}>
                    {registro ? 
                      new Date(registro.data).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      }) : 
                      item.horario
                    }
                  </Text>
                  <View style={[
                    styles.statusIndicator,
                    registro ? styles.registrado : styles.pendente
                  ]} />
                  {registro && (
                    <Text style={styles.reciboPequeno}>{registro.recibo}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Último Registro */}
        {ultimoRegistro && (
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>ÚLTIMO REGISTRO</Text>
            <View style={styles.ultimoRegistroContainer}>
              <Text style={styles.ultimoRegistroTexto}>{ultimoRegistro}</Text>
            </View>
          </View>
        )}

        {/* Informações Adicionais */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTexto}>
            • Certifique-se de estar na empresa ao registrar{'\n'}
            • Horário contratual: 07:00 às 16:00{'\n'}
            • Intervalo: 12:00 às 13:00
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
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    paddingTop: 60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  secao: {
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
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 15,
    textAlign: 'center',
  },
  relogioContainer: {
    alignItems: 'center',
  },
  relogio: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  data: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  botaoRegistrar: {
    backgroundColor: '#27ae60',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoRegistrarDisabled: {
    backgroundColor: '#95a5a6',
  },
  botaoRegistrarTexto: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  botaoRegistrarSubtitulo: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  registrosContainer: {},
  registroLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  registroTipo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    width: 30,
  },
  registroHorario: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  registrado: {
    backgroundColor: '#27ae60',
  },
  pendente: {
    backgroundColor: '#bdc3c7',
  },
  reciboPequeno: {
    fontSize: 10,
    color: '#7f8c8d',
    fontFamily: 'monospace',
  },
  ultimoRegistroContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  ultimoRegistroTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  infoContainer: {
    backgroundColor: '#fff8e1',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  infoTexto: {
    fontSize: 12,
    color: '#8d6e63',
    lineHeight: 18,
  },
});