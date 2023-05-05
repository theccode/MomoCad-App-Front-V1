import fetch from 'unfetch';

const query = new URLSearchParams({
    clientid: 'string',
    clientsecret: 'string',
    from: 'string',
    to: 'string',
    content: 'string'
  }).toString();

export const getAllMessages = () => fetch('momocad/home/messages');
export const makeRequest = async () => await fetch(`https://devp-sms03726-api.hubtel.com/v1/messages/send?${query}`)