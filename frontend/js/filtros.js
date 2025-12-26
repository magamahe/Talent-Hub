// filtros.js

export function aplicarFiltros(perfiles) {
    if (!perfiles) return [];

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('seniorityFilter'); 

    // Si alguno no existe, retornamos perfiles sin filtrar para evitar errores
    if (!searchInput || !categoryFilter || !levelFilter) return perfiles;

    const texto = searchInput.value.toLowerCase();
    const categoria = categoryFilter.value;
    const nivel = levelFilter.value;

    return perfiles.filter(perfil => {
        const nombre = (perfil.name || '').toLowerCase();
        const titulo = (perfil.title || '').toLowerCase();

        const coincideTexto = nombre.includes(texto) || titulo.includes(texto);
        const coincideCategoria = categoria === '' || (perfil.category?.name === categoria);
        const coincideNivel = nivel === '' || (perfil.level?.name === nivel);

        return coincideTexto && coincideCategoria && coincideNivel;
    });
}

// ESTA ES LA FUNCIÓN QUE FALTABA Y CAUSABA EL SYNTAX ERROR
export function limpiarFiltros() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('seniorityFilter');

    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (levelFilter) levelFilter.value = '';
}

// ESTA FUNCIÓN ES NECESARIA PARA QUE EL BUSCADOR REACCIONE AL ESCRIBIR
export function registrarEventosFiltros(callback) {
    document.getElementById('searchInput')?.addEventListener('input', callback);
    document.getElementById('categoryFilter')?.addEventListener('change', callback);
    document.getElementById('seniorityFilter')?.addEventListener('change', callback);
}