import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function RequireAuth({ children }) {
  const location = useLocation();
  const { userId } = useAuth();
  const auth = false;

  if (!userId) return <Navigate to='/auth' state={{ from: location }} />;

  return <>{children}</>;
}

export { RequireAuth };
