import { useEffect } from 'react';
import Newtable from './components/Newtable';
import { useFetchMessages } from './hooks/useFetchMessages';
import { useFetchUser } from './hooks/useFetchUser';

function App() {
  // const userId = '681f25f604b58c8834e2a794';
  const mailboxId = '6835b0f081f1ced143098aed';

  const [userId, setUserId] = useFetchUser({});
  const [messages, refetchMessages, removeMessage] = useFetchMessages();

  useEffect(() => {
    (async () => {
      await setUserId('jepe', '123321');
      await refetchMessages(mailboxId);
    })();
  }, []);

  return (
    <div className='mx-10'>
      JEPE 🤌
      <Newtable
        messages={messages}
        removeMessage={removeMessage}
        mailboxId={mailboxId}
      />
    </div>
  );
}

export default App;
