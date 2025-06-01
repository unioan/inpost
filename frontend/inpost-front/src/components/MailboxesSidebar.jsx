import { parseISO, format } from 'date-fns';
import { formatTime } from '../utils';

function MailboxesSidebar({
  currentMailbox,
  activeMailboxes,
  inactiveMailboxes,
  handleMailboxSelection,
}) {
  return (
    <div className='table-fixed w-105 h-screen overflow-y-auto'>
      <div className='h-18 flex-1 bg-blue-500 flex flex-col justify-center'>
        <p className='ml-4 truncate whitespace-nowrap overflow-hidden'>
          {currentMailbox.mailboxAddress}
        </p>
        <p className='ml-4 text-[10px]'>
          <span>inactive</span> since {formatTime(currentMailbox.expiresAt)}
        </p>
      </div>

      {/* Выводим информацию вне таблицы */}
      <div className='border-b-[0.1px] flex justify-between py-1'>
        <p className='ml-4 font-medium text-xs'>active mailboxes:</p>
        <p className='mr-4 font-medium text-xs'>{activeMailboxes.length}</p>
      </div>

      <table className='ml-4'>
        <tbody>
          {activeMailboxes.map((mailbox) => (
            <tr key={mailbox._id} className='text-sm cursor-pointer'>
              <td
                onClick={() => {
                  handleMailboxSelection(mailbox);
                }}
              >
                <p className='font-light'>{mailbox.mailboxAddress}</p>
                <div className='mb-3'>
                  <span className='text-xs font-light'>until </span>
                  <span className='text-xs font-medium text-black/40'>
                    {formatTime(mailbox.expiresAt)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='border-b-[0.1px] flex justify-between py-1'>
        <p className='ml-4 font-medium text-xs'>inactive mailboxes:</p>
        <p className='mr-4 font-medium text-xs'>{inactiveMailboxes.length}</p>
      </div>

      <table className='ml-4'>
        <tbody>
          {inactiveMailboxes.map((mailbox) => {
            return (
              <tr key={mailbox._id} className='text-sm cursor-pointer'>
                <td
                  onClick={() => {
                    handleMailboxSelection(mailbox);
                  }}
                >
                  <p className='font-light'>{mailbox.mailboxAddress}</p>
                  <div className='mb-3'>
                    <span className='text-xs font-light'>expired </span>
                    <span className='text-xs font-medium text-black/40'>
                      {formatTime(mailbox.expiresAt)}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MailboxesSidebar;
