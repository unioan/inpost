import { fetchMailboxes } from "../services/api"
import { useState } from "react"

export const useFetchMailboxes = (userId) => {
 const [currentMailbox, setCurrentMailbox] = useState({})
 const [inactiveMailboxes, setInactiveMailboxes] = useState([])
 const [activeMailboxes, setActiveMailboxes] = useState([])

 const getMailboxes = async () => {
  const data = await fetchMailboxes(userId)
  setActiveMailboxes(data.activeMailboxes)
  setInactiveMailboxes(data.inactiveMailboxes)
  return { activeMailboxes: data.activeMailboxes, inactiveMailboxes: data.inactiveMailboxes }
 }

 const selectMailbox = (mailbox) => {
  setCurrentMailbox(mailbox)
 }

 return [
  currentMailbox,
  inactiveMailboxes,
  activeMailboxes,
  getMailboxes,
  selectMailbox
 ]
}
