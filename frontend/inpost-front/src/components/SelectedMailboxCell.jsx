import { formatTime } from '../utils';
import { FaRegClipboard, FaClipboardCheck } from 'react-icons/fa6';

function SelectedMailboxCell({
  isMailboxesLoading,
  currentMailbox,
  handleCopy,
  handleMouseMoveAway,
  isCopySelected,
}) {
  return (
    <>
      {isMailboxesLoading ? (
        <div className='h-18 flex-1 flex flex-col justify-center px-4 animate-pulse'>
          <div className='h-4 bg-stone-200 rounded w-2/3 mb-2'></div>
          <div className='h-3 bg-stone-200 rounded w-1/3'></div>
        </div>
      ) : (
        <div className='h-18 rounded-b-xl flex-1 bg-[#C2E812] flex flex-col justify-center'>
          <div
            className={`flex items-center `}
            onClick={(e) => {
              handleCopy(e, currentMailbox.mailboxAddress);
            }}
            onMouseLeave={handleMouseMoveAway}
          >
            <p className='group hover:bg-slate-50/75 ml-2 truncate whitespace-nowrap overflow-hidden flex items-center px-2 rounded-lg cursor-pointer gap-1'>
              {currentMailbox.mailboxAddress || 'No mailboxes created'}
              {isCopySelected ? (
                <FaClipboardCheck className='inline opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              ) : (
                <FaRegClipboard className='inline opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              )}
            </p>
          </div>
          <p className={`ml-4 text-[10px] ${currentMailbox || 'hidden'}`}>
            <span>inactive</span> since {formatTime(currentMailbox.expiresAt)}
          </p>
        </div>
      )}
    </>
  );
}

export default SelectedMailboxCell;
