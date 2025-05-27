import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from '@tanstack/react-table';
import { useState, useEffect, useRef } from 'react';
import { parseISO, format, previousDay } from 'date-fns';
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

const mailbox = [
  {
    id: '1',
    email: 'alice@example.com',
    subject: 'Meeting Reminder bdbdbdfbfbdbdfbfdbdfbdb',
    content: 'Just a reminder about the meeting tomorrow at 10am.',
    date: '2025-05-21T08:15:00+00:00',
    seen: false,
    hasAttachments: false,
  },
  {
    id: '2',
    email: 'bob@example.com',
    subject: 'Invoice Attached',
    content: "Please find the invoice attached for last month's services.",
    date: '2025-05-20T13:45:22+00:00',
    seen: false,
    hasAttachments: true,
  },
  {
    id: '3',
    email: 'carol@example.org',
    subject: 'Vacation Request',
    content: 'I would like to request vacation time for next week.',
    date: '2025-05-19T10:30:12+00:00',
    seen: false,
    hasAttachments: false,
  },
  {
    id: '4',
    email: 'dave@company.com',
    subject: 'System Downtime',
    content: 'The system will be undergoing maintenance tonight.',
    date: '2025-05-18T22:05:44+00:00',
    seen: true,
    hasAttachments: false,
  },
  {
    id: '5',
    email: 'emma@domain.net',
    subject: 'Feedback Request',
    content: 'We’d love your feedback on our new service update.',
    date: '2025-05-17T14:23:11+00:00',
    seen: false,
    hasAttachments: false,
  },
  {
    id: '6',
    email: 'frank@corp.org',
    subject: 'Weekly Report',
    content:
      'Attached is the weekly report. Let me know if you have questions.',
    date: '2025-05-16T09:10:30+00:00',
    seen: true,
    hasAttachments: true,
  },
  {
    id: '7',
    email: 'grace@example.com',
    subject: 'Happy Birthday!',
    content: 'Wishing you a fantastic birthday filled with joy!',
    date: '2025-05-15T18:55:00+00:00',
    seen: true,
    hasAttachments: false,
  },
  {
    id: '8',
    email: 'hank@bizmail.com',
    subject: 'Follow-up Needed',
    content:
      'Following up on our last conversation. Can you send the document?',
    date: '2025-05-14T11:25:33+00:00',
    seen: false,
    hasAttachments: false,
  },
  {
    id: '9',
    email: 'irene@startup.io',
    subject: 'Launch Plan',
    content: 'Here is the final draft of the launch plan. Feedback welcome.',
    date: '2025-05-13T07:50:15+00:00',
    seen: true,
    hasAttachments: true,
  },
  {
    id: '10',
    email: 'jack@webmail.co',
    subject: 'New Opportunity',
    content: 'We have an exciting opportunity you might be interested in.',
    date: '2025-05-12T15:40:55+00:00',
    seen: false,
    hasAttachments: false,
  },
];

function IndeterminateCheckbox({ indeterminate, className = '', ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return (
    <input
      type='checkbox'
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

function Newtable() {
  const [data, setData] = useState(mailbox);
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});
  const [messgeList, setMessageList] = useState({});
  const [loadingList, setLoadingList] = useState({});

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
      accessorKey: 'date',
      header: 'Date',
      cell: (props) => {
        const content = props.getValue();
        const date = parseISO(content);
        const formatted = format(date, 'd MMM H:mm');
        return <p>{formatted}</p>;
      },
      size: 80,
    },
    {
      accessorKey: 'email',
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
      size: 250,
    },
    {
      id: 'actions',
      cell: ({ row, table }) => {
        const addExpended = () => {
          if (expanded[row.id]) {
            // extended
            if (loadingList[row.id]) {
              // грузится
              return;
            } else {
              // уже загружено, появился шеврон - закрыть раскрытый row
              setExpanded((prev) => {
                const updated = { ...prev };
                delete updated[row.id];
                return updated;
              });
              return;
            }
          } else {
            // NONextended
            setExpanded((prev) => ({ ...prev, [row.id]: true }));
            // нет сообщения
            if (!messgeList[row.id]) {
              // включить загрузку
              setLoadingList((prev) => ({ ...prev, [row.id]: true }));
              setTimeout(() => {
                // сохранить message
                setMessageList((prev) => ({
                  ...prev,
                  [row.id]: { content: 'opanki' },
                }));
                // убрать из загрузки
                setLoadingList((prev) => {
                  const updated = { ...prev };
                  delete updated[row.id];
                  return updated;
                });
              }, 5000);
              return;
            }
            // есть сообщение
            return;
          }
        };

        return (
          <div className='flex flex-row-reverse gap-10 p-2 items-center'>
            <div className='flex flex-row-reverse items-center gap-3'>
              {loadingList[row.id] ? (
                <LuLoader className='text-lg animate-spin' />
              ) : expanded[row.id] ? (
                <LuChevronUp
                  className='text-lg font-semibold'
                  onClick={addExpended}
                />
              ) : (
                <div className='relative group'>
                  <LuChevronDown
                    onClick={addExpended}
                    className='text-lg font-semibold'
                  />
                  <span className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap'>
                    Open message
                  </span>
                </div>
              )}
              <div className='relative group'>
                <LuExternalLink className='text-lg' />
                <span className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap'>
                  Open in separate tab
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
                    setMessageList((prev) => {
                      const updated = { ...prev };
                      delete updated[row.id];
                      return updated;
                    });
                    setExpanded((prev) => {
                      const updated = { ...prev };
                      delete updated[row.id];
                      return updated;
                    });
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
      size: 120,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: (row) => true,
    getRowId: (row) => row.id,
    state: {
      expanded,
      rowSelection,
    },
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    defaultColumn: {
      size: 0,
    },
    meta: {
      removeRow: (rowId) => {
        setData((old) => old.filter((row) => row.id != rowId));
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
    <>
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
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              {row.getIsExpanded() && messgeList[row.id]?.content && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    <div className='py-4 px-12 bg-gray-100'>
                      Expanded content for: {row.original.content}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Newtable;
