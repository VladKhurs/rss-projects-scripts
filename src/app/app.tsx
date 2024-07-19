import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/appRouter/appRouter';
import { AuthProvider } from './utils/auth/authProvider';
import { ScreenWidthProvider } from './utils/screenWidth/screenWidth';
import { mobileWidth } from './const/settings';
import { MenuProvider } from './utils/mobileMenu/mobileMenu';
import './styles.app.scss';

export default function App() {
  return (
    <MenuProvider>
      <ScreenWidthProvider mobileWidth={mobileWidth}>
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </ScreenWidthProvider>
    </MenuProvider>
  );
}
