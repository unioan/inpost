import { useEffect } from 'react';
import { useFetchUser } from './hooks/useFetchUser';
import Dashboard from './pages/Dashboard';

function App() {
  const [userId, setUserId] = useFetchUser({});

  useEffect(() => {
    (async () => {
      await setUserId('jepe', '123321');
    })();
  }, []);

  return <Dashboard />;
}

export default App;
