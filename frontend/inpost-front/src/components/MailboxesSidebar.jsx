function MailboxesSidebar({
  currentMailbox,
  activeMailboxes,
  inactiveMailboxes,
  className
}) {
  return (
    <>
      <table className={className}>
        <tbody>
          {console.log(
            'DEBUG MailboxesSidebar activeMailboxes:',
            activeMailboxes
          )}
          {console.log(
            'DEBUG MailboxesSidebar inactiveMailboxes:',
            inactiveMailboxes
          )}

          {activeMailboxes.map((mailbox) => (
            <tr key={mailbox._id}>
              <td>Active JEPE</td>
            </tr>
          ))}
          {inactiveMailboxes.map((mailbox) => (
            <tr key={mailbox._id}>
              <td>Inactive JEPE</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MailboxesSidebar;
