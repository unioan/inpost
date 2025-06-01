import { formatTime } from '../utils';
import SelectedMailboxCell from './SelectedMailboxCell';
import MailboxCell from './MailboxCell';

function MailboxesSidebar({
  currentMailbox,
  activeMailboxes,
  inactiveMailboxes,
  handleMailboxSelection,
  isMailboxesLoading,
}) {
  return (
    <div className='table-fixed w-105 h-screen overflow-y-auto'>
      <SelectedMailboxCell
        isMailboxesLoading={isMailboxesLoading}
        currentMailbox={currentMailbox}
      />

      {/* Выводим информацию вне таблицы */}
      <div className='border-b-[0.1px] flex justify-between py-1'>
        <p className='ml-4 font-medium text-xs'>active mailboxes:</p>
        <p className='mr-4 font-medium text-xs'>
          {isMailboxesLoading || activeMailboxes.length}
        </p>
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
        <p className='mr-4 font-medium text-xs'>
          {isMailboxesLoading || inactiveMailboxes.length}
        </p>
      </div>
      <table className='ml-4 table-fixed w-full'>
        <tbody>
          {isMailboxesLoading
            ? Array.from({ length: 5 }).map((_, i) => {
                return (
                  <MailboxCell
                    key={i}
                    isMailboxesLoading={isMailboxesLoading}
                  />
                );
              })
            : inactiveMailboxes.map((mailbox) => {
                return (
                  <MailboxCell
                    key={mailbox._id}
                    mailbox={mailbox}
                    isMailboxesLoading={isMailboxesLoading}
                    handleMailboxSelection={handleMailboxSelection}
                  />
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default MailboxesSidebar;
