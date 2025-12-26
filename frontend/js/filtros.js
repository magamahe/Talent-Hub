// filtros.js
export function aplicarFiltros(perfiles) {
    if (!perfiles) return [];

    // Buscamos los elementos justo al momento de filtrar
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');

    // Si no existen, devolvemos los perfiles sin filtrar en lugar de dar error
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

export function registrarEventosFiltros(callback) {
    // Es vital usar los mismos IDs que en el HTML
    document.getElementById('searchInput')?.addEventListener('input', callback);
    document.getElementById('categoryFilter')?.addEventListener('change', callback);
    document.getElementById('levelFilter')?.addEventListener('change', callback);
}