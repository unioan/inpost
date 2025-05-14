const axios = require('axios');
const AppError = require('../error/AppError')

const BASE_URL = 'https://api.mail.tm';

async function getDomain() {
  let error
  try {
    const response = await axios.get(`${BASE_URL}/domains`);
    const domain = response.data['hydra:member'][0].domain
    if (!domain) {
      return {
        domain,
        errorGetDomain: new AppError('mailtm', 500, `No domains available, mail.tm returned: ${domain} (no domain)`)
      }
    }
    return { domain, errorGetDomain: null }
  } catch (err) {
    return {
      domain: null,
      errorGetDomain: new AppError('mailtm', err.response.status, `${err.response.data.detail}`)
    }
  }

}

async function createAccount(credentials) {
  try {
    const result = await axios.post(`${BASE_URL}/accounts`, { ...credentials });
    return { mailtmAccount: result.data, errorCreateAccount: null };
  } catch (err) {
    return {
      mailtmAccount: null,
      errorCreateAccount: new AppError('mailtm', err.response.status, `${err.response.data.detail}`)
    }
  }
}

async function getToken(credentials) {
  try {
    const response = await axios.post(`${BASE_URL}/token`, { ...credentials });
    return { token: response.data.token, errorGetToken: null }
  } catch (err) {
    return {
      token: null,
      errorGetToken: new AppError('mailtm', err.response.status, `${err.response.data.detail}`)
    }
  }
}

async function getMessages(token) {
  const response = await axios.get(`${BASE_URL}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function getMessage(token, messageId) {
  const response = await axios.get(`${BASE_URL}/messages/${messageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

module.exports = {
  getDomain,
  createAccount,
  getToken,
  getMessages,
  getMessage
};