async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

// PERFIL
export const obtenerPerfiles = () => fetchJson('/api/perfiles');

// AUTH
export const login = (email, password) =>
  fetchJson('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

// CRUD
export const crearPerfil = (perfil) =>
  fetchJson('/api/perfiles', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(perfil)
  });

export const actualizarPerfil = (id, perfil) =>
  fetchJson(`/api/perfiles/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(perfil)
  });

export const eliminarPerfil = (id) =>
  fetchJson(`/api/perfiles/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

// CATEGORÍAS / LEVELS
export const obtenerCategorias = () => fetchJson('/api/categories');
export const obtenerLevels = () => fetchJson('/api/levels');

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}
