import { useEffect } from 'react';
import { useFetchMessages } from '../hooks/useFetchMessages';
import { useFetchMailboxes } from '../hooks/useFetchMailbox';
import { useParams } from 'react-router-dom';
import Newtable from '../components/Newtable';
import MailboxesSidebar from '../components/MailboxesSidebar';

function Dashboard() {
  const userId = '681f25f604b58c8834e2a794';
  const [messages, isMessagesLoading, refetchMessages, removeMessage] =
    useFetchMessages();
  const [
    currentMailbox,
    inactiveMailboxes,
    activeMailboxes,
    isMailboxesLoading,
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
    console.log(mailbox);
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
          isMailboxesLoading,
        }}
      />
      <div className='h-screen w-full overflow-y-auto px-2'>
        <div className='h-15.5 flex flex-col justify-center items-start'>
          <button className='border px-4 py-2 rounded-lg'>New Mailbox</button>
        </div>
        <Newtable
          messages={messages}
          isMessagesLoading={isMessagesLoading}
          removeMessage={removeMessage}
          mailboxId={currentMailbox?._id}
        />
      </div>
    </div>
  );
}

export default Dashboard;
