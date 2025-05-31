import { useEffect } from 'react';
import { useFetchUser } from './hooks/useFetchUser';
import Dashboard from './pages/Dashboard';

function App() {
  const mailboxId = '6835b0f081f1ced143098aed';

  const [userId, setUserId] = useFetchUser({});

  useEffect(() => {
    (async () => {
      await setUserId('jepe', '123321');
    })();
  }, []);

  return (
    <div className='mx-10'>
      JEPE 🤌
      <Dashboard {...{ mailboxId }} />
    </div>
  );
}

export default App;
