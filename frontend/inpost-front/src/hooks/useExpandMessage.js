import { useState } from "react";
import { fetchMessage } from "../services/api";

export const useExpandMessage = () => {

 const [expanded, setExpanded] = useState({});
 // загружанное письмо
 const [messagesContent, setMessagesContent] = useState({});
 // загружаемое письмо
 const [loadingList, setLoadingList] = useState({});

 const toggleExpandMessage = async (rowId, mailboxId) => {
  if (expanded[rowId]) {
   // extended
   if (loadingList[rowId]) {
    // грузится
    return;
   } else {
    // уже загружено, появился шеврон - закрыть раскрытый row
    setExpanded((prev) => {
     const updated = { ...prev };
     delete updated[rowId];
     return updated;
    });
    return;
   }
  } else {
   // NONextended
   setExpanded((prev) => ({ ...prev, [rowId]: true }));
   // нет сообщения
   if (!messagesContent[rowId]) {
    // включить загрузку
    setLoadingList((prev) => ({ ...prev, [rowId]: true }));
    const { text } = await fetchMessage(mailboxId, rowId);
    console.log('DEBUG HOOK: ', text);
    // сохранить message
    setMessagesContent((prev) => ({
     ...prev,
     [rowId]: { content: text },
    }));
    // убрать из загрузки
    setLoadingList((prev) => {
     const updated = { ...prev };
     delete updated[rowId];
     return updated;
    });
    return;
   }
   // есть сообщение
   return;
  }
 };

 const deleteExpandMessage = (rowId) => {
  setExpanded((prev) => {
   const updated = { ...prev }
   delete updated[rowId]
   return updated
  })
  setMessagesContent((prev) => {
   const updated = { ...prev }
   delete updated[rowId]
   return updated
  })
 }

 return [expanded, messagesContent, loadingList, toggleExpandMessage, deleteExpandMessage]
}