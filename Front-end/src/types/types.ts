export interface Funcionario {
    nome: string;
    chapa: string;
    funcao: string;
    horarioContratual: string;
    seção: string;
  }
  
  export interface RegistroPonto {
    id: number;
    data: string;
    hora: string;
    tipo: 'E' | 'S';
    localizacao?: string;
    recibo: string;
  }
  
  export interface CartaoPonto {
    data: string;
    diaSemana: string;
    registros: RegistroPonto[];
  }