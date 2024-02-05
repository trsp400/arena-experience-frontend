import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: any; // substitua any pelo tipo de dados do seu usuário
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Aqui você chamaria sua API de autenticação e, em seguida, salvaria o token JWT no estado/localStorage.
  };

  const logout = () => {
    // Aqui você limparia o token JWT do estado/localStorage e redirecionaria para a página de login.
  };

  // Efeito para verificar se o usuário está logado quando o componente monta
  useEffect(() => {
    // Verificar token no localStorage e validar o token com a API
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
