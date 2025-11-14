/**
 * Formata data no padrão DD/MM/AAAA
 * Remove caracteres não numéricos e adiciona as barras automaticamente
 */
export const formatDate = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 8 dígitos
  const limited = numbers.slice(0, 8);
  
  // Adiciona as barras
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 4) {
    return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  } else {
    return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
  }
};

/**
 * Formata CEP no padrão 00000-000
 * Remove caracteres não numéricos e adiciona o hífen automaticamente
 */
export const formatCEP = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 8 dígitos
  const limited = numbers.slice(0, 8);
  
  // Adiciona o hífen
  if (limited.length <= 5) {
    return limited;
  } else {
    return `${limited.slice(0, 5)}-${limited.slice(5)}`;
  }
};

/**
 * Remove formatação da data (DD/MM/AAAA -> DDMMAAAA)
 */
export const unformatDate = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Remove formatação do CEP (00000-000 -> 00000000)
 */
export const unformatCEP = (value: string): string => {
  return value.replace(/\D/g, '');
};

