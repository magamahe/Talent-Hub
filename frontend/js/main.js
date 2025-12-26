// main.js
import { obtenerPerfiles, login, obtenerCategorias, obtenerLevels } from './api.js';
import { renderizarPerfiles, mostrarLoader, ocultarLoader, setupTheme } from './ui.js';
import { aplicarFiltros, limpiarFiltros, registrarEventosFiltros } from './filtros.js';
import { abrirModalNuevo, abrirModalEditar, borrarPerfil } from './crud.js';

document.addEventListener('DOMContentLoaded', async () => {
    let perfiles = [];
    let isLogged = !!localStorage.getItem('token');
    let categorias = [];
    let niveles = [];

    // --- 1. CONFIGURACIÓN DE TEMA (Dark Mode por defecto) ---
    const temaGuardado = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('bg-gray-900', temaGuardado === 'dark');
    document.body.classList.toggle('text-gray-100', temaGuardado === 'dark');

    // --- 2. FUNCIONES DE CARGA Y VISTA ---
    async function cargarPerfilesInicial() {
        try {
            mostrarLoader();
            perfiles = await obtenerPerfiles();
            actualizarVista();
        } catch (error) {
            console.error("Error al cargar perfiles:", error);
        } finally {
            ocultarLoader();
        }
    }

    function actualizarVista() {
        try {
            const perfilesFiltrados = aplicarFiltros(perfiles);
            renderizarPerfiles(
                perfilesFiltrados,
                perfil => isLogged && abrirModalEditar(perfil, cargarPerfilesInicial),
                id => isLogged && borrarPerfil(id, cargarPerfilesInicial)
            );
        } catch (e) {
            console.warn("Filtros fallidos, renderizando base:", e);
            renderizarPerfiles(perfiles);
        }
    }

    function verificarAutenticacion() {
        const token = localStorage.getItem('token');
        isLogged = !!token;
        document.getElementById('addProfileBtn')?.classList.toggle('hidden', !isLogged);
        document.getElementById('logoutBtn')?.classList.toggle('hidden', !isLogged);
        document.getElementById('openLoginBtn')?.classList.toggle('hidden', isLogged);
    }

    // --- 3. CARGAR CATEGORÍAS Y NIVELES ---
    async function cargarOpciones() {
        try {
            categorias = await obtenerCategorias();
            niveles = await obtenerLevels();

            const categorySelect = document.getElementById('categoryInput');
            const senioritySelect = document.getElementById('seniorityInput');

            if (categorySelect) {
                categorySelect.innerHTML = '<option value="">Seleccione...</option>' +
                    categorias.map(cat => `<option value="${cat._id}">${cat.name}</option>`).join('');
            }
            if (senioritySelect) {
                senioritySelect.innerHTML = '<option value="">Seleccione...</option>' +
                    niveles.map(niv => `<option value="${niv._id}">${niv.name}</option>`).join('');
            }
        } catch (err) {
            console.error("Error al cargar categorías o niveles:", err);
        }
    }

    // --- 4. EVENTOS LOGIN ---
    document.getElementById('openLoginBtn')?.addEventListener('click', () => {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    });

    document.getElementById('doLogin')?.addEventListener('click', async () => {
        const email = document.getElementById('loginEmail')?.value;
        const pass = document.getElementById('loginPass')?.value;

        if (!email || !pass) return alert("Completa los campos");

        try {
            const data = await login(email, pass);
            if (data.token) {
                localStorage.setItem('token', data.token);
                verificarAutenticacion();
                document.getElementById('loginModal')?.classList.add('hidden');
                await cargarPerfilesInicial();
            } else {
                alert(data.msg || "Credenciales incorrectas");
            }
        } catch (err) {
            alert("Error en el servidor");
        }
    });

    // --- 5. BOTÓN SALIR ---
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        isLogged = false;
        verificarAutenticacion();
        actualizarVista();
    });

    // --- 6. BOTÓN NUEVO PERFIL ---
    document.getElementById('addProfileBtn')?.addEventListener('click', () => {
        abrirModalNuevo(cargarPerfilesInicial);
    });

    // --- 7. BOTÓN LIMPIAR FILTROS ---
    document.getElementById('clearFilters')?.addEventListener('click', () => {
        limpiarFiltros();
        actualizarVista();
    });

    // --- 8. INICIALIZACIÓN ---
    verificarAutenticacion();
    registrarEventosFiltros(actualizarVista);
    await cargarOpciones();
    await cargarPerfilesInicial();
    setupTheme();
});
