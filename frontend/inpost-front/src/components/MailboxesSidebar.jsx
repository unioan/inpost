function MailboxesSidebar({
  currentMailbox,
  activeMailboxes,
  inactiveMailboxes,
}) {
  return (
    <div className='table-fixed w-105 h-screen overflow-y-auto'>
      <div className='bg-red-500 h-18 flex items-center gap-3 pl-2'>
        <div className='h-12 w-12 bg-orange-500 rounded-full flex-shrink-0'></div>
        <div className='h-12 flex-1 bg-blue-500 flex flex-col justify-center'>
          <p className='truncate whitespace-nowrap overflow-hidden text-[12px] mb-[4px]'>
            92790306_jepejccdslj@chefalicious.com
          </p>
          <p className='text-[10px]'>
            <span>inactive</span> since 27 May 20:58
          </p>
        </div>
      </div>

      {/* Выводим информацию вне таблицы */}
      <div className='bg-neutral-200 border-b-[0.1px] flex justify-between'>
        <p className='ml-4'>active mailboxes:</p>
        <p className='mr-4'>{activeMailboxes.length}</p>
      </div>

      <table className='ml-4'>
        <tbody>
          {activeMailboxes.map((mailbox) => (
            <tr key={mailbox._id}>
              <td>Active JEPE</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='bg-neutral-200 border-b-[0.1px] flex justify-between'>
        <p className='ml-4'>inactive mailboxes:</p>
        <p className='mr-4'>{inactiveMailboxes.length}</p>
      </div>

      <table className='ml-4'>
        <tbody>
          {inactiveMailboxes.map((mailbox) => (
            <tr key={mailbox._id}>
              <td>Inactive JEPE</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MailboxesSidebar;
