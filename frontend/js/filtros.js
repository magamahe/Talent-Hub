// ============================
// Filtros para perfiles corregidos
// ============================

// Eliminamos las constantes globales que causan el error de 'null' al inicio

export function aplicarFiltros(perfiles) {
  if (!perfiles) return [];

  // Obtenemos los elementos dentro de la función para asegurar que existen
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const levelFilter = document.getElementById('levelFilter');

  // Usamos el operador ?. y valores por defecto por si el HTML cambia
  const texto = searchInput?.value.toLowerCase() || '';
  const categoria = categoryFilter?.value || '';
  const nivel = levelFilter?.value || '';

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
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const levelFilter = document.getElementById('levelFilter');

  if (searchInput) searchInput.value = '';
  if (categoryFilter) categoryFilter.value = '';
  if (levelFilter) levelFilter.value = '';
}

export function registrarEventosFiltros(callback) {
  // Aquí usamos el encadenamiento opcional para evitar errores si no existen los elementos
  document.getElementById('searchInput')?.addEventListener('input', callback);
  document.getElementById('categoryFilter')?.addEventListener('change', callback);
  document.getElementById('levelFilter')?.addEventListener('change', callback);
}