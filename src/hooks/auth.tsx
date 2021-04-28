import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Usuario {
  id: string;
  cpf_cnpj: string;
  foto: string;
  nome_razao_social: string;
  apelido_nome_fantasia: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  estado_id: number;
  cidade_id: number;
  email: string;
  telefone: string;
  usuario_ativo: boolean;
  foto_usuario?: string;
  codigo_integracao?: string;
}

interface LoginCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  usuario: Usuario;
  signIn(credentials: LoginCredentials): Promise<void>;
  signOut(): void;
  updateUsuario(usuario: Usuario): void;
}

interface AuthState {
  token: string;
  usuario: Usuario;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Estabelecimento:token');
    const usuario = localStorage.getItem('@Estabelecimento:usuario');

    if (token && usuario) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, usuario: JSON.parse(usuario) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('/sessao', {
      email,
      senha,
    });

    const { token, usuario } = response.data;

    localStorage.setItem('@Estabelecimento:token', token);
    localStorage.setItem('@Estabelecimento:usuario', JSON.stringify(usuario));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Estabelecimento:token');
    localStorage.removeItem('@Estabelecimento:usuario');

    setData({} as AuthState);
  }, []);

  const updateUsuario = useCallback(
    (usuario: Usuario) => {
      setData({
        token: data.token,
        usuario,
      });

      localStorage.setItem('@Estabelecimento:usuario', JSON.stringify(usuario));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ usuario: data.usuario, signIn, signOut, updateUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
