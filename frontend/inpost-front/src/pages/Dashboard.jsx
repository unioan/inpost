import { useEffect, useRef, useState } from 'react';
import { useFetchMessages } from '../hooks/useFetchMessages';
import { useFetchMailboxes } from '../hooks/useFetchMailbox';
import Newtable from '../components/Newtable';
import MailboxesSidebar from '../components/MailboxesSidebar';
import { ImExit } from 'react-icons/im';
import { FaCirclePlus, FaCircleExclamation } from 'react-icons/fa6';
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
  const [createMailboxError, setCreateMailboxError] = useState(null);
  const timeoutRef = useRef(null);

  // без этого при нажатии кнопки обновить страницу, список сообщений рендерится два раза
  const isMounted = useRef(false);
  useEffect(() => {
    (async () => {
      const { activeMailboxes, inactiveMailboxes } = await getMailboxes();
      const autoselectedMailbox = activeMailboxes[0] || inactiveMailboxes[0];
      autoselectedMailbox && selectMailbox(autoselectedMailbox);
      if (!isMounted.current && autoselectedMailbox) {
        isMounted.current = true;
        await refetchMessages(autoselectedMailbox?._id);
      }
    })();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMailboxSelection = async (mailbox) => {
    selectMailbox(mailbox);
    await refetchMessages(mailbox._id);
  };

  const handleMailboxCreation = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setCreatingMailbox(true);
    try {
      const mailbox = await createMailbox();
      selectMailbox(mailbox);
      setCreatingMailbox(false);
      await refetchMessages(mailbox._id);
    } catch (error) {
      setCreatingMailbox(false);
      const { type, code, message } = error.response.data;
      if (type === 'app' && code === 403) {
        setCreateMailboxError({ type, code, message });
        timeoutRef.current = setTimeout(() => {
          setCreateMailboxError(null);
          timeoutRef.current = null;
        }, 5000);
      } else if (type === 'app' && code === 429) {
        console.log(
          'DEBUG handleMailboxCreation to many requests',
          type,
          code,
          message
        );
      }
    }
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
          {createMailboxError ? (
            <div className='flex items-center gap-2'>
              <FaCircleExclamation className='text-red-500' />
              <div>{createMailboxError.message}</div>
            </div>
          ) : (
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
          )}
          <div
            className='flex items-center text-[16px] hover:text-[#C2E812] transition-colors cursor-pointer'
            onClick={handleLogout}
          >
            <button className='px-2 py-2 rounded-xl cursor-pointer'>
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
