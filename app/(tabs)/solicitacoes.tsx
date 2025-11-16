import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SolicitacoesScreen() {
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<string>('');

  const tiposSolicitacao = [
    { id: 'inclusao', label: 'Solicitar Inclusão', icon: 'add-circle-outline' },
    { id: 'exclusao', label: 'Solicitar Exclusão', icon: 'remove-circle-outline' },
    { id: 'abono', label: 'Solicitar Abono', icon: 'calendar-outline' },
    { id: 'ferias', label: 'Solicitar Férias', icon: 'airplane-outline' },
    { id: 'banco_horas', label: 'Ajuste Banco de Horas', icon: 'time-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Padronizado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcome}>Vinicius Balduin</Text>
            <Text style={styles.title}>Solicitações</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Seção Escolha da Ação */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>ESCOLHA A AÇÃO</Text>
          
          {tiposSolicitacao.map((solicitacao) => (
            <TouchableOpacity
              key={solicitacao.id}
              style={[
                styles.solicitacaoItem,
                solicitacaoSelecionada === solicitacao.id && styles.solicitacaoSelecionada
              ]}
              onPress={() => setSolicitacaoSelecionada(solicitacao.id)}
            >
              <View style={styles.solicitacaoContent}>
                <Ionicons 
                  name={solicitacao.icon as any} 
                  size={24} 
                  color={solicitacaoSelecionada === solicitacao.id ? '#3498db' : '#7f8c8d'} 
                />
                <Text style={[
                  styles.solicitacaoTexto,
                  solicitacaoSelecionada === solicitacao.id && styles.solicitacaoTextoSelecionado
                ]}>
                  {solicitacao.label}
                </Text>
              </View>
              
              {solicitacaoSelecionada === solicitacao.id && (
                <Ionicons name="checkmark-circle" size={24} color="#3498db" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Solicitações Recentes */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>SOLICITAÇÕES RECENTES</Text>
          
          <View style={styles.historicoContainer}>
            <View style={styles.historicoItem}>
              <View style={styles.historicoInfo}>
                <Text style={styles.historicoTipo}>Férias</Text>
                <Text style={styles.historicoData}>15/10/2025</Text>
              </View>
              <View style={[styles.status, styles.pendente]}>
                <Text style={styles.statusTexto}>Pendente</Text>
              </View>
            </View>

            <View style={styles.historicoItem}>
              <View style={styles.historicoInfo}>
                <Text style={styles.historicoTipo}>Banco de Horas</Text>
                <Text style={styles.historicoData}>10/10/2025</Text>
              </View>
              <View style={[styles.status, styles.aprovado]}>
                <Text style={styles.statusTexto}>Aprovado</Text>
              </View>
            </View>

            <View style={styles.historicoItem}>
              <View style={styles.historicoInfo}>
                <Text style={styles.historicoTipo}>Inclusão de Ponto</Text>
                <Text style={styles.historicoData}>05/10/2025</Text>
              </View>
              <View style={[styles.status, styles.rejeitado]}>
                <Text style={styles.statusTexto}>Rejeitado</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Botão de Ação */}
        {solicitacaoSelecionada && (
          <TouchableOpacity style={styles.botaoContinuar}>
            <Text style={styles.botaoContinuarTexto}>Continuar Solicitação</Text>
          </TouchableOpacity>
        )}
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
  solicitacaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  solicitacaoSelecionada: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  solicitacaoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  solicitacaoTexto: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 15,
  },
  solicitacaoTextoSelecionado: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  historicoContainer: {
    // Container do histórico
  },
  historicoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  historicoInfo: {
    flex: 1,
  },
  historicoTipo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  historicoData: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendente: {
    backgroundColor: '#fff3cd',
  },
  aprovado: {
    backgroundColor: '#d1edff',
  },
  rejeitado: {
    backgroundColor: '#f8d7da',
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  botaoContinuar: {
    backgroundColor: '#3498db',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoContinuarTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});