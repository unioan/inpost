import { useState } from "react";
import api from "../services/api";

const useFetchMessages = (mailboxId) => {
 const [messages, setMesssages] = useState([])

 const refetchMessages = async () => {
  const refetchedMessages = await api.fetchMessages(mailboxId)
  setMesssages(() => ({ refetchMessages }))
 }

 return [messages, refetchMessages]
}

export default useFetchMessages