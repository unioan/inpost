import { fetchMailboxes, createNewMailbox } from "../services/api"
import { useState } from "react"

export const useFetchMailboxes = (userId) => {
 const [currentMailbox, setCurrentMailbox] = useState({})
 const [inactiveMailboxes, setInactiveMailboxes] = useState([])
 const [activeMailboxes, setActiveMailboxes] = useState([])
 const [isMailboxesLoading, setMailboxesLoading] = useState(false)

 const getMailboxes = async () => {
  setMailboxesLoading(true)
  const data = await fetchMailboxes(userId)
  setMailboxesLoading(false)
  setActiveMailboxes(data.activeMailboxes)
  setInactiveMailboxes(data.inactiveMailboxes)
  return { activeMailboxes: data.activeMailboxes, inactiveMailboxes: data.inactiveMailboxes }
 }

 const createMailbox = async (userId, login) => {
  const { mailbox } = await createNewMailbox(userId, login);
  console.log('DEBUG inside useFetchMailboxes:', mailbox)
  setActiveMailboxes((prev) => ([
   mailbox, ...prev])
  )
  return mailbox
 }

 const selectMailbox = (mailbox) => {
  setCurrentMailbox(mailbox)
 }

 return [
  currentMailbox,
  inactiveMailboxes,
  activeMailboxes,
  isMailboxesLoading,
  getMailboxes,
  selectMailbox,
  createMailbox
 ]
}
