import { formatTime } from '../utils';

function SelectedMailboxCell({ isMailboxesLoading, currentMailbox }) {
  return (
    <>
      {isMailboxesLoading ? (
        <div className='h-18 flex-1 bg-blue-500 flex flex-col justify-center px-4 animate-pulse'>
          <div className='h-4 bg-stone-200 rounded w-2/3 mb-2'></div>
          <div className='h-3 bg-stone-200 rounded w-1/3'></div>
        </div>
      ) : (
        <div className='h-18 flex-1 bg-blue-500 flex flex-col justify-center'>
          <p className='ml-4 truncate whitespace-nowrap overflow-hidden'>
            {currentMailbox.mailboxAddress}
          </p>
          <p className='ml-4 text-[10px]'>
            <span>inactive</span> since {formatTime(currentMailbox.expiresAt)}
          </p>
        </div>
      )}
    </>
  );
}

export default SelectedMailboxCell;
