import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

interface MenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function useMenu(): MenuContextType {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
}

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const value: MenuContextType = useMemo(
    () => ({
      isMenuOpen,
      setIsMenuOpen,
    }),
    [isMenuOpen],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
