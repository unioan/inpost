import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { parseISO, format } from 'date-fns';
import {
  LuExternalLink,
  LuChevronDown,
  LuPaperclip,
  LuLoader,
  LuChevronUp,
} from 'react-icons/lu';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import React from 'react';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { useExpandMessage } from '../hooks/useExpandMessage';

function Newtable({ messages, removeMessage, mailboxId }) {
  const [rowSelection, setRowSelection] = useState({});
  const [
    expanded,
    messageList,
    loadingList,
    toggleExpandMessage,
    deleteExpandMessage,
  ] = useExpandMessage();

  const columns = [
    {
      id: 'select',
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
      size: 20,
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: (props) => {
        const content = props.getValue();
        const date = parseISO(content);
        const formatted = format(date, 'd MMM H:mm');
        return <p>{formatted}</p>;
      },
      size: 110,
    },
    {
      accessorFn: (row) => row.from?.address,
      header: 'Email',
      cell: (props) => {
        const content = props.getValue();
        return <p>{content}</p>;
      },
      size: 150,
    },
    {
      accessorKey: 'subject',
      header: 'Title',
      cell: (props) => {
        const content = props.getValue();
        return <p>{content}</p>;
      },
      size: 450,
    },
    {
      id: 'actions',
      cell: ({ row, table }) => {
        const handleToggleExpand = () => {
          toggleExpandMessage(row.id, mailboxId);
        };

        return (
          <div className='flex flex-row-reverse gap-10 p-2 items-center'>
            <div className='flex flex-row-reverse items-center gap-3'>
              {loadingList[row.id] ? (
                <LuLoader className='text-lg animate-spin' />
              ) : expanded[row.id] ? (
                <LuChevronUp
                  className='text-lg font-semibold'
                  onClick={handleToggleExpand}
                />
              ) : (
                <div className='relative group'>
                  <LuChevronDown
                    onClick={handleToggleExpand}
                    className='text-lg font-semibold'
                  />
                  <span className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap'>
                    Open
                  </span>
                </div>
              )}
              <div className='relative group'>
                <LuExternalLink className='text-lg' />
                <span className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap'>
                  Separate tab
                </span>
              </div>
            </div>
            <div className='flex flex-row-reverse gap-3'>
              <div className='relative group'>
                <LuPaperclip
                  className='text-lg'
                  style={{
                    visibility: row.original.hasAttachments
                      ? 'visible'
                      : 'hidden',
                  }}
                />
                <span className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap'>
                  Has attachments
                </span>
              </div>
              <VscCircleLargeFilled
                className='text-lg'
                style={{
                  color: '#02a9ea',
                  visibility: row.original.seen ? 'hidden' : 'visible',
                }}
              />
              {row.getIsSelected() && (
                <RiDeleteBin7Fill
                  onClick={() => {
                    deleteExpandMessage(row.id);
                    table.options.meta.removeRow(row.id);
                  }}
                  className='text-red-600 text-lg'
                >
                  Delete
                </RiDeleteBin7Fill>
              )}
            </div>
          </div>
        );
      },
      size: 170,
    },
  ];

  const table = useReactTable({
    data: messages,
    columns,
    getRowCanExpand: (row) => true,
    getRowId: (row) => row.id,
    state: {
      expanded,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    defaultColumn: {
      size: 0,
    },
    meta: {
      removeRow: (rowId) => {
        removeMessage(rowId);
        setRowSelection((prev) => {
          const updated = { ...prev };
          delete updated[rowId];
          return updated;
        });
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className='h-screen w-full overflow-y-auto px-2'>
      <table className='w-full table-fixed'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='text-left'
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr className='border-b-[0.1px] border-black'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ maxWidth: cell.column.getSize(),position: 'relative', overflow: 'visible' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {/* Вот здесь дисплеить */}
              {row.getIsExpanded() && messageList[row.id]?.content && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    <div className='py-4 px-12 bg-gray-100'>
                      Expanded content for: {messageList[row.id]?.content}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Newtable;
