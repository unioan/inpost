import { useEffect } from 'react';
import { useFetchMessages } from '../hooks/useFetchMessages';
import { useFetchMailboxes } from '../hooks/useFetchMailbox';
import { useParams } from 'react-router-dom';
import Newtable from '../components/Newtable';
import MailboxesSidebar from '../components/MailboxesSidebar';

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

  const handleMailboxSelection = async (mailbox) => {
    console.log(mailbox)
    selectMailbox(mailbox);
    await refetchMessages(mailbox._id);
  };

  return (
    <div className='flex gap-5 h-screen overflow-y-auto mr-5'>
      <MailboxesSidebar
        {...{
          currentMailbox,
          activeMailboxes,
          inactiveMailboxes,
          handleMailboxSelection,
        }}
      />
      <Newtable
        messages={messages}
        removeMessage={removeMessage}
        mailboxId={currentMailbox?._id}
      />
    </div>
  );
}

export default Dashboard;
