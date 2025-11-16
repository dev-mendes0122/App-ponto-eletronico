import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CartaoPontoScreen() {
  const [dataSelecionada, setDataSelecionada] = useState({
    mes: 10, // Outubro
    ano: 2025
  });

  // Dados mockados - serão substituídos pela API
  const dadosCartao = [
    {
      data: '2025-10-01',
      diaSemana: 'Quarta',
      registros: [
        { tipo: 'E', hora: '07:00' },
        { tipo: 'S', hora: '12:00' },
        { tipo: 'E', hora: '13:00' },
        { tipo: 'S', hora: '17:00' },
      ]
    },
    {
      data: '2025-10-02',
      diaSemana: 'Quinta', 
      registros: [
        { tipo: 'E', hora: '07:05' },
        { tipo: 'S', hora: '12:01' },
        { tipo: 'E', hora: '13:02' },
        { tipo: 'S', hora: '17:05' },
      ]
    },
    {
      data: '2025-10-03',
      diaSemana: 'Sexta',
      registros: [
        { tipo: 'E', hora: '07:02' },
        { tipo: 'S', hora: '12:00' },
        { tipo: 'E', hora: '13:01' },
        { tipo: 'S', hora: '17:02' },
      ]
    }
  ];

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const mudarMes = (incremento: number) => {
    setDataSelecionada(prev => {
      let novoMes = prev.mes + incremento;
      let novoAno = prev.ano;
      
      if (novoMes > 12) {
        novoMes = 1;
        novoAno++;
      } else if (novoMes < 1) {
        novoMes = 12;
        novoAno--;
      }
      
      return { mes: novoMes, ano: novoAno };
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Padronizado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcome}>Vinicius Balduin</Text>
            <Text style={styles.title}>Cartão do Ponto</Text>
          </View>
        </View>
      </View>

      {/* Filtro por Data */}
      <View style={styles.filtroContainer}>
        <TouchableOpacity onPress={() => mudarMes(-1)} style={styles.botaoFiltro}>
          <Ionicons name="chevron-back" size={24} color="#3498db" />
        </TouchableOpacity>
        
        <View style={styles.periodoContainer}>
          <Text style={styles.periodoTexto}>
            Período de 01/{dataSelecionada.mes.toString().padStart(2, '0')}/{dataSelecionada.ano} a 31/{dataSelecionada.mes.toString().padStart(2, '0')}/{dataSelecionada.ano}
          </Text>
          <Text style={styles.mesTexto}>
            {meses[dataSelecionada.mes - 1]} de {dataSelecionada.ano}
          </Text>
        </View>
        
        <TouchableOpacity onPress={() => mudarMes(1)} style={styles.botaoFiltro}>
          <Ionicons name="chevron-forward" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Lista de Dias */}
      <ScrollView style={styles.listaContainer}>
        {dadosCartao.map((dia, index) => (
          <View key={index} style={styles.diaContainer}>
            {/* Cabeçalho do Dia */}
            <View style={styles.diaHeader}>
              <View style={styles.diaInfo}>
                <Text style={styles.diaSemana}>{dia.diaSemana}</Text>
                <Text style={styles.diaData}>
                  {new Date(dia.data).getDate().toString().padStart(2, '0')}/
                  {(new Date(dia.data).getMonth() + 1).toString().padStart(2, '0')}
                </Text>
              </View>
            </View>

            {/* Registros do Dia */}
            <View style={styles.registrosContainer}>
              <View style={styles.registroLinha}>
                <Text style={styles.registroTipo}>E</Text>
                <Text style={styles.registroHora}>{dia.registros[0]?.hora || '--:--'}</Text>
              </View>
              <View style={styles.registroLinha}>
                <Text style={styles.registroTipo}>S</Text>
                <Text style={styles.registroHora}>{dia.registros[1]?.hora || '--:--'}</Text>
              </View>
              <View style={styles.registroLinha}>
                <Text style={styles.registroTipo}>E</Text>
                <Text style={styles.registroHora}>{dia.registros[2]?.hora || '--:--'}</Text>
              </View>
              <View style={styles.registroLinha}>
                <Text style={styles.registroTipo}>S</Text>
                <Text style={styles.registroHora}>{dia.registros[3]?.hora || '--:--'}</Text>
              </View>
            </View>

            {/* Linha Divisória */}
            {index < dadosCartao.length - 1 && (
              <View style={styles.divisor} />
            )}
          </View>
        ))}
        
        {/* Espaço extra no final */}
        <View style={styles.espacoFinal} />
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
  filtroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoFiltro: {
    padding: 10,
  },
  periodoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  periodoTexto: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 5,
  },
  mesTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  listaContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  diaContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  diaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  diaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diaSemana: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginRight: 10,
  },
  diaData: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  registrosContainer: {
    padding: 15,
    paddingTop: 0,
  },
  registroLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  registroTipo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    width: 20,
  },
  registroHora: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  divisor: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginHorizontal: 15,
  },
  espacoFinal: {
    height: 20,
  },
});