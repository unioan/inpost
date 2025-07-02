function MailboxTableHeader({ type, isMailboxesLoading, mailboxes }) {
  return (
    <div className='border-b-[0.1px] flex justify-between py-1'>
      <p className='ml-4 font-medium text-xs'>{type} mailboxes:</p>
      <p className='mr-4 font-medium text-xs'>
        {isMailboxesLoading || mailboxes.length}
      </p>
    </div>
  );
}

export default MailboxTableHeader;
