import { useEffect } from 'react';
import { useFetchMessages } from '../hooks/useFetchMessages';
import Newtable from '../components/Newtable'

function Dashboard({ mailboxId }) {
  const [messages, refetchMessages, removeMessage] = useFetchMessages();

  useEffect(() => {
    (async () => {
      await refetchMessages(mailboxId);
    })();
  }, []);
  return (
    <>
      <Newtable
        messages={messages}
        removeMessage={removeMessage}
        mailboxId={mailboxId}
      />
    </>
  );
}

export default Dashboard;
