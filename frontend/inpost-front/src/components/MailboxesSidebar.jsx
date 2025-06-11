import { formatTime } from '../utils';
import { useState } from 'react';
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
  const [isCopySelected, setIsCopySelected] = useState(false);

  const handleCopy = async (e, mailbox) => {
    e.stopPropagation();
    console.log(currentMailbox);
    await navigator.clipboard.writeText(mailbox);
    setIsCopySelected(true);
    console.log(
      'DEBUG mailname CLICKED, NEw location - MailboxesSidebar',
      `\nmailboxis is,`,
      mailbox
    );
  };

  const handleMouseMoveAway = (e) => {
    setIsCopySelected(false);
  };

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
      <table className='ml-4 table-fixed w-full'>
        <tbody>
          {isMailboxesLoading
            ? Array.from({ length: 1 }).map((_, i) => {
                return (
                  <MailboxCell
                    key={i}
                    isMailboxesLoading={isMailboxesLoading}
                  />
                );
              })
            : activeMailboxes.map((mailbox) => {
                return (
                  <MailboxCell
                    key={mailbox._id}
                    type='active'
                    mailbox={mailbox}
                    isMailboxesLoading={isMailboxesLoading}
                    handleMailboxSelection={handleMailboxSelection}
                    handleCopy={handleCopy}
                    isCopySelected={isCopySelected}
                    isSelected={mailbox._id === currentMailbox._id}
                    handleMouseMoveAway={handleMouseMoveAway}
                  />
                );
              })}
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
                    type='inactive'
                    mailbox={mailbox}
                    isMailboxesLoading={isMailboxesLoading}
                    handleMailboxSelection={handleMailboxSelection}
                    handleCopy={handleCopy}
                    isCopySelected={isCopySelected}
                    isSelected={mailbox._id === currentMailbox._id}
                    handleMouseMoveAway={handleMouseMoveAway}
                  />
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default MailboxesSidebar;
