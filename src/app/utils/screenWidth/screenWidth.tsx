import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const ScreenWidthContext = createContext<boolean | undefined>(undefined);

export function useScreenWidth(): boolean | undefined {
  const context = useContext(ScreenWidthContext);
  if (context === undefined) {
    throw new Error('useScreenWidth must be used within a ScreenWidthProvider');
  }

  return context;
}

interface ScreenWidthProviderProps {
  children: ReactNode;
  mobileWidth: number;
}

export function ScreenWidthProvider({ children, mobileWidth }: ScreenWidthProviderProps): JSX.Element {
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < mobileWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileWidth]);

  return <ScreenWidthContext.Provider value={isMobile}>{children}</ScreenWidthContext.Provider>;
}
