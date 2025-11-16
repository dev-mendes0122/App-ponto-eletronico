import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function PerfilScreen() {
  // Dados do funcionário
  const funcionario = {
    nome: 'VINICIUS BALDUIN RIBEIRO',
    chapa: '53-045083',
    secao: '',
    funcao: 'PROMOTOR DE VENDAS',
    horarioContratual: '220HS - SEG/TER/QUI/SEX/SAB - 07:00 AS 16:00 - 01:00 DE INTERVALO - QUA 07:00 AS 11:00'
  };

  return (
    <View style={styles.container}>
      {/* Header Padronizado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcome}>Vinicius Balduin</Text>
            <Text style={styles.title}>Perfil</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Seção Dados Pessoais */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>DADOS PESSOAIS</Text>
          
          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Nome:</Text>
            <Text style={styles.campoValor}>{funcionario.nome}</Text>
          </View>

          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Chapa:</Text>
            <Text style={styles.campoValor}>{funcionario.chapa}</Text>
          </View>

          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Seção:</Text>
            <Text style={styles.campoValor}>{funcionario.secao || 'Não informada'}</Text>
          </View>

          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Função:</Text>
            <Text style={styles.campoValor}>{funcionario.funcao}</Text>
          </View>
        </View>

        {/* Seção Horário Contratual */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>HORÁRIO CONTRATUAL</Text>
          <View style={styles.horarioContainer}>
            <Text style={styles.horarioTexto}>{funcionario.horarioContratual}</Text>
          </View>
        </View>

        {/* Seção Informações de Contato */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>INFORMAÇÕES DE CONTATO</Text>
          
          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Email:</Text>
            <Text style={styles.campoValor}>vinicius.balduin@empresa.com</Text>
          </View>

          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Telefone:</Text>
            <Text style={styles.campoValor}>(11) 99999-9999</Text>
          </View>

          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Data de Admissão:</Text>
            <Text style={styles.campoValor}>15/03/2020</Text>
          </View>
        </View>

        {/* Seção Situação */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>SITUAÇÃO</Text>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, styles.ativo]} />
            <Text style={styles.statusTexto}>Ativo</Text>
          </View>

          <View style={styles.campoContainer}>
            <Text style={styles.campoLabel}>Último Acesso:</Text>
            <Text style={styles.campoValor}>Hoje às 08:15</Text>
          </View>
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
  campoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  campoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    width: '30%',
  },
  campoValor: {
    fontSize: 14,
    color: '#2c3e50',
    width: '68%',
    textAlign: 'right',
  },
  horarioContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  horarioTexto: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  ativo: {
    backgroundColor: '#27ae60',
  },
  statusTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});