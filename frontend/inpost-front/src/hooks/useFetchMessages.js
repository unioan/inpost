import { useState } from "react";
import { fetchMessages } from "../services/api";

export const useFetchMessages = () => {
 const [messages, setMessages] = useState([])

 // перередерить список сообщений дргого ящика
 const refetchMessages = async (newMailboxId) => {
  const messages = await fetchMessages(newMailboxId)
  setMessages(messages['hydra:member'])
 }

 const removeMessage = (rowId) => {
  setMessages((prev) => {
   const updated = prev.filter((row) => row.id != rowId)
   return updated
  })
 }

 return [messages, refetchMessages, removeMessage]
}