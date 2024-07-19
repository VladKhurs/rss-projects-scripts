import { Link } from 'react-router-dom';
import { commonRoutes, privateRoutes, publicRoutes } from '../../router/router';
import useAuth from '../../hooks/useAuth';

// TODO: временное меню
export default function TempMenu(): JSX.Element {
  const routes = [...privateRoutes, ...publicRoutes, ...commonRoutes];
  const { user, logout } = useAuth();
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', fontSize: '1.2rem' }}>
      {routes
        .filter((item) => item.path !== '/error404')
        .map((item) => (
          <div key={item.path}>
            <Link to={item.path}>{item.desc}</Link>
          </div>
        ))}
      {user && (
        <button type="button" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}
