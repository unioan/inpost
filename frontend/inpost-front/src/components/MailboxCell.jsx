import { formatTime } from '../utils';

function MailboxCell({ isMailboxesLoading, mailbox, handleMailboxSelection }) {
  return (
    <>
      <tr className='text-sm cursor-pointer'>
        {isMailboxesLoading ? (
          <td className='h-16'>
            <div className='flex-1 flex flex-col justify-center animate-pulse'>
              <div className='h-4 bg-stone-200 rounded w-[75%] mb-2'></div>
              <div className='h-3 bg-stone-200 rounded w-[50%]'></div>
            </div>
          </td>
        ) : (
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
        )}
      </tr>
    </>
  );
}

export default MailboxCell;
