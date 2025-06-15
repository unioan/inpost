import { useEffect, useRef, useState } from 'react';
import { useFetchMessages } from '../hooks/useFetchMessages';
import { useFetchMailboxes } from '../hooks/useFetchMailbox';
import Newtable from '../components/Newtable';
import MailboxesSidebar from '../components/MailboxesSidebar';
import { ImExit } from 'react-icons/im';
import { FaCirclePlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';
import { LuLoader } from 'react-icons/lu';

function Dashboard() {
  const navigate = useNavigate();
  const [
    messages,
    isMessagesLoading,
    refetchMessages,
    removeMessage,
    markMessageSeen,
  ] = useFetchMessages();
  const [
    currentMailbox,
    inactiveMailboxes,
    activeMailboxes,
    isMailboxesLoading,
    getMailboxes,
    selectMailbox,
    createMailbox,
  ] = useFetchMailboxes();
  const [isCreatingMailbox, setCreatingMailbox] = useState(false);

  // без этого при нажатии кнопки обновить страницу, список сообщений рендерится два раза
  const isMounted = useRef(false);
  useEffect(() => {
    (async () => {
      const { activeMailboxes, inactiveMailboxes } = await getMailboxes();
      const autoselectedMailbox = activeMailboxes[0] || inactiveMailboxes[0];
      console.log('DEBUG autoselectedMailbox', autoselectedMailbox);
      autoselectedMailbox && selectMailbox(autoselectedMailbox);
      if (!isMounted.current && autoselectedMailbox) {
        isMounted.current = true;
        await refetchMessages(autoselectedMailbox?._id);
      }
    })();
  }, []);

  const handleMailboxSelection = async (mailbox) => {
    selectMailbox(mailbox);
    await refetchMessages(mailbox._id);
  };

  const handleMailboxCreation = async () => {
    setCreatingMailbox(true);
    const mailbox = await createMailbox();
    setCreatingMailbox(false);
    selectMailbox(mailbox);
    await refetchMessages(mailbox._id);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate('/auth');
    } catch (error) {
      console.log('DEBUG Dashboard:', 'handleLogout error', error);
    }
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
        <div className='h-17.5 flex flex justify-between items-center'>
          <div
            className={`flex items-center text-[16px] cursor-pointer ${
              isCreatingMailbox
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:text-[#C2E812] transition-colors'
            }`}
            onClick={!isCreatingMailbox ? handleMailboxCreation : undefined}
          >
            {isCreatingMailbox ? (
              <LuLoader className='text-lg animate-spin' />
            ) : (
              <FaCirclePlus />
            )}
            <button className={`px-2 py-2 rounded-xl cursor-pointer`}>
              New Mailbox
            </button>
          </div>

          <div className='flex items-center text-[16px] hover:text-[#C2E812] transition-colors cursor-pointer'>
            <button
              className='px-2 py-2 rounded-xl cursor-pointer'
              onClick={handleLogout}
            >
              Log out
            </button>
            <ImExit />
          </div>
        </div>
        <Newtable
          messages={messages}
          isMessagesLoading={isMessagesLoading}
          removeMessage={removeMessage}
          markMessageSeen={markMessageSeen}
          mailboxId={currentMailbox?._id}
        />
      </div>
    </div>
  );
}

export default Dashboard;
