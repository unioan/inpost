import { useState } from "react";
import { fetchMessages } from "../services/api";

export const useFetchMessages = () => {
 const [messages, setMessages] = useState([])
 const [isMessagesLoading, setMessagesLoading] = useState(false)

 // перередерить список сообщений дргого ящика
 const refetchMessages = async (newMailboxId) => {
  setMessagesLoading(true)
  const messages = await fetchMessages(newMailboxId)
  setMessagesLoading(false)
  setMessages(messages['hydra:member'])
 }

 const removeMessage = (rowId) => {
  setMessages((prev) => {
   const updated = prev.filter((row) => row.id != rowId)
   return updated
  })
 }

 const markMessageSeen = (rowId) => {
  setMessages((prev) =>
   prev.map((row) =>
    row.id === rowId ? { ...row, seen: true } : row
   )
  );
 };

 return [messages, isMessagesLoading, refetchMessages, removeMessage, markMessageSeen]
}