import { useState, useEffect, useRef } from 'react';
import { checkAuthentication } from './services/api';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    (async () => {
      try {
        const result = await checkAuthentication();
        console.log('DEBUG: isAuthenticated', result);
        SetIsAuthenticated(result);
        setLoading(false);
        if (result) {
          navigate('/dashboard');
        }
      } catch (error) {
        const { code } = error.response.data;
        if (code == 401) {
          SetIsAuthenticated(false);
          setLoading(false);
        }
      }
    })();
  }, [navigate]);

  if (loading) {
    return <div></div>;
  }

  return <Landing />;
}

export default App;
