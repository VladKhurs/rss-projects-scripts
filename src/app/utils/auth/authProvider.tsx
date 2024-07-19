import { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { ReactNode, createContext, useMemo, useState } from 'react';
import AuthService, { AuthResponse } from './authService';

const authService = new AuthService();
await authService.init();

interface AuthProviderValue {
  user: Customer | null;
  login: (credentials: UserAuthOptions) => Promise<AuthResponse>;
  register: (credentials: CustomerDraft) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  setUser: (user: Customer | null) => void;
}

const AuthContext = createContext<AuthProviderValue>({
  user: authService.user,
  login: () => Promise.resolve({ success: false, message: '' }),
  register: () => Promise.resolve({ success: false, message: '' }),
  logout: () => Promise.resolve(),
  setUser: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [customer, setCustomer] = useState<Customer | null>(authService.user);

  /**
   * осуществляет процесс аутентификации с сервером, если удачно то сохраняет полученные данные в
   * localStorage и возвращает полученные параметры
   * @param credentials ({username, password})
   * @returns { success: boolean; data: Customer | message: string}
   */
  const login = async (credentials: UserAuthOptions): Promise<AuthResponse> => {
    const result = await authService.login(credentials);
    console.log('AuthProvider', { result });

    if (result.success) {
      setCustomer(result.data);
      localStorage.removeItem('uniqpref_935104_anonymous_session_id');
      localStorage.removeItem('uniqpref_935104_refresh_token');
    }

    return result;
  };

  const register = async (customerDraft: CustomerDraft): Promise<AuthResponse> => {
    const result: AuthResponse = await authService.register(customerDraft);
    if (result.success) {
      setCustomer(result.data);
    }

    return result;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setCustomer(null);
  };

  const setUser = (user: Customer | null): void => {
    setCustomer(user);
  };

  const value: AuthProviderValue = useMemo(
    () => ({
      user: customer,
      login,
      register,
      logout,
      setUser,
    }),
    [customer],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
