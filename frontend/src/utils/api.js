const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001/api';

async function request(path, options){
  const res = await fetch(API_BASE+path, options);
  if (!res.ok) throw new Error('API Error: '+res.status);
  return res.json();
}

export default {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' })
};
