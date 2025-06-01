import { formatTime } from '../utils';
import SelectedMailboxCell from './SelectedMailboxCell';
import MailboxCell from './MailboxCell';
import MailboxTableHeader from './MailboxTableHeader';

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

      <MailboxTableHeader
        type='active'
        isMailboxesLoading={isMailboxesLoading}
        mailboxes={activeMailboxes}
      />
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

      <MailboxTableHeader
        type='inactive'
        isMailboxesLoading={isMailboxesLoading}
        mailboxes={inactiveMailboxes}
      />
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
