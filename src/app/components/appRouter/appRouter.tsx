import { Navigate, Route, Routes } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { commonRoutes, privateRoutes, publicRoutes } from '../../router/router';
import useAuth from '../../hooks/useAuth';
import MainLayout from '../layout/Mainlayout';

function ProtectedRoute({ type, children }: PropsWithChildren<{ type: 'public' | 'private' }>): JSX.Element {
  const { user } = useAuth();
  if (!user && type === 'private') {
    return <Navigate to="/login" />;
  }
  if (user && type === 'public') {
    return <Navigate to="/" />;
  }
  return children as JSX.Element;
}

export default function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute type="private">{route.element}</ProtectedRoute>}
          />
        ))}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute type="public">{route.element}</ProtectedRoute>}
          />
        ))}
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="/error404" />} />
      </Route>
    </Routes>
  );
}
