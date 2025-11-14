import axios from 'axios';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
  erro?: boolean; // Retornado quando o CEP não é encontrado
}

const VIACEP_BASE_URL = 'https://viacep.com.br/ws';

/**
 * Busca informações de endereço a partir de um CEP
 * @param cep - CEP com 8 dígitos (apenas números)
 * @returns Dados do endereço ou null se não encontrado
 */
export const getAddressByCep = async (cep: string): Promise<ViaCepResponse | null> => {
  try {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, '');

    // Valida se tem 8 dígitos
    if (cleanCep.length !== 8) {
      throw new Error('CEP deve conter 8 dígitos');
    }

    // Faz a requisição
    const response = await axios.get<ViaCepResponse>(
      `${VIACEP_BASE_URL}/${cleanCep}/json/`,
      {
        timeout: 10000, // 10 segundos de timeout
      }
    );

    // Verifica se o CEP foi encontrado
    if (response.data.erro) {
      return null;
    }

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('CEP inválido');
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tempo de consulta excedido. Verifique sua conexão.');
    }

    throw new Error('Erro ao consultar CEP. Tente novamente.');
  }
};

/**
 * Valida se um CEP está no formato correto (8 dígitos)
 * @param cep - CEP a ser validado
 * @returns true se válido, false caso contrário
 */
export const isValidCep = (cep: string): boolean => {
  const cleanCep = cep.replace(/\D/g, '');
  return cleanCep.length === 8;
};

