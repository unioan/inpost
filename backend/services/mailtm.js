const axios = require('axios');

const BASE_URL = 'https://api.mail.tm';

async function getDomain() {
 const response = await axios.get(`${BASE_URL}/domains`);
 const domain = response.data['hydra:member'][0].domain
 console.log('DEBUG: domain', domain)
 return domain;
}

async function createAccount(credentials) {
 const response = await axios.post(`${BASE_URL}/accounts`, { ...credentials });
 return response;
}

async function getToken(credentials) {
 const response = await axios.post(`${BASE_URL}/token`, { ...credentials });
 return response.data.token;
}

async function getMessages(token) {
 const response = await axios.get(`${BASE_URL}/messages`, {
  headers: { Authorization: `Bearer ${token}` },
 });
 return response.data;
}

module.exports = {
 getDomain,
 createAccount,
 getToken,
 getMessages,
};