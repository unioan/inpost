import { formatTime } from '../utils';
import { FaRegClipboard, FaClipboardCheck } from 'react-icons/fa6';

function MailboxCell({
  type,
  isMailboxesLoading,
  mailbox,
  handleMailboxSelection,
  handleCopy,
  handleMouseMoveAway,
  isSelected,
}) {
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
            <div className='font-light flex pt-1'>
              <div
                className={`flex items-center gap-1 group hover:bg-slate-50 p-1 rounded-lg`}
                onClick={(e) => {handleCopy(e, mailbox.mailboxAddress);}}
                onMouseLeave={handleMouseMoveAway}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   console.log('DEBUG mailname CLICKED');
                // }}
              >
                <span>{mailbox.mailboxAddress}</span>
                {isSelected ? (
                  <FaClipboardCheck className='inline opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                ) : (
                  <FaRegClipboard className='inline opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                )}
              </div>
              <div className='flex-1 shrink-0'></div>
            </div>
            <div className='mb-2 pl-1'>
              <span className='text-xs font-light'>
                {type == 'active' ? 'until ' : 'expired '}
              </span>
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
