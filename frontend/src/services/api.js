import axios from 'axios';
import.meta.env.VITE_DOMAIN_URL

const api = axios.create({
 baseURL: `${import.meta.env.VITE_DOMAIN_URL}`,
 withCredentials: true,
});

export async function signup(credentials) {
 const res = await api.post('/users/register', credentials);
 return res.data;
}

export async function loginUser(credentials) {
 const res = await api.post('/users/login', credentials);
 return res.data;
}

export async function logout() {
 const res = await api.post('/users/logout');
 return res.data;
}

export async function checkAuthentication() {
 const res = await api.get('/users/login-status');
 return res;
}

export async function createNewMailbox() {
 const res = await api.post('/boxes');
 return res.data;
}

export async function fetchMailboxes() {
 const res = await api.get(`/boxes`);
 return res.data;
}

export async function fetchMessages(mailboxId) {
 const res = await api.get(`/messages/${mailboxId}`);
 return res.data;
}

export async function fetchMessage(mailboxId, messageId) {
 const res = await api.get(`/messages/${mailboxId}/${messageId}`);
 return res.data;
}

export async function patchMessageSeen(mailboxId, messageId) {
 const res = await api.patch(`/messages/${mailboxId}/${messageId}`);
 return res.data;
}

export async function deleteMessage(mailboxId, messageId) {
 console.log('DEBUG deleteMessage API call', mailboxId, messageId)
 const res = await api.delete(`/messages/${mailboxId}/${messageId}`);
 return res.data;
}

export async function getAttachmentsList(mailboxId, messageId) {
 const res = await api.get(`/messages/attachments/${mailboxId}/${messageId}`);
 return res.data;
}

export async function getAttachment(mailboxId, messageId, attachmentId) {
 const response = await api.get(`/messages/attachments/${mailboxId}/${messageId}/${attachmentId}`, {
  responseType: 'blob', 
 });
 return response;
}

export default api;