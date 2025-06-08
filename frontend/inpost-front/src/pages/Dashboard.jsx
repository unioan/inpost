import { useEffect, useRef } from 'react';
import { useFetchMessages } from '../hooks/useFetchMessages';
import { useFetchMailboxes } from '../hooks/useFetchMailbox';
import { useParams } from 'react-router-dom';
import Newtable from '../components/Newtable';
import MailboxesSidebar from '../components/MailboxesSidebar';
import { ImExit } from 'react-icons/im';
import { FaCirclePlus } from 'react-icons/fa6';

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

  // без этого при нажатии кнопки обновить страницу, список сообщений рендерится два раза
  const isMounted = useRef(false);

  useEffect(() => {
    (async () => {
      const { activeMailboxes, inactiveMailboxes } = await getMailboxes();
      const autoselectedMailbox = activeMailboxes[0] || inactiveMailboxes[0];
      selectMailbox(autoselectedMailbox);
      if (!isMounted.current) {
        isMounted.current = true;
        await refetchMessages(autoselectedMailbox?._id);
      }
    })();
  }, []);

  const handleMailboxSelection = async (mailbox) => {
    console.log(mailbox);
    selectMailbox(mailbox);
    await refetchMessages(mailbox._id);
  };

  const handleMailboxCreation = async () => {};

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
        <div className='h-15.5 flex flex justify-between items-center'>
          <div className='flex items-center text-[16px] hover:text-[#C2E812] transition-colors cursor-pointer'>
            <FaCirclePlus />
            <button
              className='px-2 py-2 rounded-xl cursor-pointer'
              onClick={handleMailboxCreation}
            >
              New Mailbox
            </button>
          </div>

          <div className='flex items-center text-[16px] hover:text-[#C2E812] transition-colors cursor-pointer'>
            <button
              className='px-2 py-2 rounded-xl cursor-pointer'
              onClick={handleMailboxCreation}
            >
              Log out
            </button>
            <ImExit/>
          </div>
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
