// ============================
// Filtros para perfiles
// ============================

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const levelFilter = document.getElementById('levelFilter'); // renombramos seniority a level

export function aplicarFiltros(perfiles) {
  if (!perfiles) return [];

  const texto = searchInput.value.toLowerCase();
  const categoria = categoryFilter.value;
  const nivel = levelFilter.value;

  return perfiles.filter(perfil => {
    const nombre = perfil.name?.toLowerCase() || '';
    const titulo = perfil.title?.toLowerCase() || '';

    const coincideTexto = nombre.includes(texto) || titulo.includes(texto);
    const coincideCategoria = categoria === '' || (perfil.category?.name === categoria);
    const coincideNivel = nivel === '' || (perfil.level?.name === nivel);

    return coincideTexto && coincideCategoria && coincideNivel;
  });
}

export function limpiarFiltros() {
  searchInput.value = '';
  categoryFilter.value = '';
  levelFilter.value = '';
}

export function registrarEventosFiltros(callback) {
  searchInput?.addEventListener('input', callback);
  categoryFilter?.addEventListener('change', callback);
  levelFilter?.addEventListener('change', callback);
}
