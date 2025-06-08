import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { checkAuthentication } from '../../services/api';
import { useEffect, useState } from 'react';

function RequireAuth({ children }) {
  const location = useLocation();
  const { userId } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await checkAuthentication();

        if (result.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  if (isAuthenticated === null) return null;

  if (isAuthenticated === false) {
    return <Navigate to='/auth' state={{ from: location }} />;
  }

  return <>{children}</>;
}

export { RequireAuth };
