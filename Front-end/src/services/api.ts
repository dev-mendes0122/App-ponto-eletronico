import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.15.27:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔐 Token adicionado à requisição');
      }
    } catch (error) {
      console.log('❌ Erro ao buscar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função para salvar token
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('✅ Token salvo com sucesso');
  } catch (error) {
    console.log('❌ Erro ao salvar token:', error);
  }
};

// Função para remover token (logout)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('✅ Token removido');
  } catch (error) {
    console.log('❌ Erro ao remover token:', error);
  }
};

export const authAPI = {
  login: (credentials: { login: string; senha: string }) =>
    api.post('/auth/login', credentials),
};

export const pontoAPI = {
  registrarPonto: (dados: { tipo: string; localizacao?: string }) =>
    api.post('/ponto/registrar', dados),
  
  getCartaoPonto: (mes?: number, ano?: number) =>
    api.get(`/ponto/cartao?mes=${mes}&ano=${ano}`),
  
  getUltimoRegistro: () =>
    api.get('/ponto/ultimo-registro'),
  
  getRegistrosHoje: () =>
    api.get('/ponto/registros-hoje'),
};

export const funcionarioAPI = {
  getDados: () => api.get('/funcionario/dados'),
};

export default api;