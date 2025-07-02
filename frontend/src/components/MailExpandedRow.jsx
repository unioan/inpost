import { useEffect } from 'react';

function MailExpandedRow({ row, messageList, table, makeMessageSeen }) {
  useEffect(() => {
    if (!messageList[row.id]?.rest.seen) {
      table.options.meta.seenRow(row.id);
      makeMessageSeen(messageList[row.id]?.rest.id);
    }
  }, []);

  return (
    <tr>
      <td colSpan={row.getVisibleCells().length}>
        <iframe
          className='py-4 px-12 bg-gray-100 w-full h-[600px]'
          srcDoc={messageList[row.id]?.rest.html[0]}
        />
      </td>
    </tr>
  );
}

export default MailExpandedRow;
