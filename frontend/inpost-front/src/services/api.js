import axios from 'axios';

const api = axios.create({
 baseURL: 'http://localhost:3000',
 withCredentials: true,
});

export async function loginUser(credentials) {
 const res = await api.post('/users/login', credentials);
 return res.data;
}

export async function checkAuthentication() {
 const res = await api.get('/users/login-status');
 return res;
}

export async function fetchMailboxes(userId) {
 const res = await api.get(`/boxes/${userId}`);
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

export default api;