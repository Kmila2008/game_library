const API_BASE = 'http://localhost:5001/api';

const api = {
  // GET 
  get: async (url) => {
    const res = await fetch(`${API_BASE}${url}`);
    if (!res.ok) throw new Error('Error en GET');
    return res.json();
  },

  // POST 
  post: async (url, data) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error en POST');
    return res.json();
  },

  // PUT 
  put: async (url, data) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error en PUT');
    return res.json();
  },

  // DELETE
  delete: async (url) => {
    const res = await fetch(`${API_BASE}${url}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error en DELETE');
    return res.json();
  }
};

export default api;