import { useEffect } from 'react';
import { useFetchMessages } from '../hooks/useFetchMessages';
import { useFetchMailboxes } from '../hooks/useFetchMailbox';
import Newtable from '../components/Newtable';
import { useParams } from 'react-router-dom';

function Dashboard() {
  const userId = '681f25f604b58c8834e2a794';
  const [messages, refetchMessages, removeMessage] = useFetchMessages();
  const [
    currentMailbox,
    inactiveMailboxes,
    activeMailboxes,
    getMailboxes,
    selectMailbox,
  ] = useFetchMailboxes(userId);

  useEffect(() => {
    (async () => {
      const { activeMailboxes, inactiveMailboxes } = await getMailboxes();
      const autoselectedMailbox = activeMailboxes[0] || inactiveMailboxes[0];
      selectMailbox(autoselectedMailbox);
      await refetchMessages(autoselectedMailbox?._id);
    })();
  }, []);

  return (
    <>
      <Newtable
        messages={messages}
        removeMessage={removeMessage}
        mailboxId={currentMailbox?._id}
      />
    </>
  );
}

export default Dashboard;
