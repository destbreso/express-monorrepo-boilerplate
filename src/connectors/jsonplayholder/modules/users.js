const fetch = require('node-fetch');
const baseURL = 'https://jsonplaceholder.typicode.com/users';
const debug = require('debug')('connector:jsonplaceholder');

const create = async (item) => {
  debug(`create user`);
  
  const url = baseURL;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-type': 'application/json',
    },
  })
}

const getById = async (id) => { 
  debug(`get user by id ${id}`);
  const userID = id || '';
  const url = `${baseURL}/${id}`;

  const result = await fetch(url)
  return result.json()
}

const search = async (query) => {
  debug(`search users`);
  const url = baseURL;
  const result = await fetch(url)
  return result.json()
}  

const update = async (id, body) => {
  debug(`update user ${id}`);
  const url = `${baseURL}/${id}`;

  const result = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  })
  return result.json()
}

const del = async (id) => {
  debug(`delete user ${id}`);
  const url = `${baseURL}/${id}`;

  const result = await fetch(url, {
    method: 'DELETE',
  })
  return result.json()
}


module.exports = {
  create: async (item) => create(item),
  getById: async (id) => getById(id),
  search: async (query) => search(query),
  update: async (id,updates) => update(id,updates),
  delete: async (id) => del(id)
}