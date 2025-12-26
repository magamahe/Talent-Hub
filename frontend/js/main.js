// main.js
import { obtenerPerfiles, login } from './api.js';
import { renderizarPerfiles, mostrarLoader, ocultarLoader, setupTheme } from './ui.js';
import { aplicarFiltros, limpiarFiltros, registrarEventosFiltros } from './filtros.js';
import { abrirModalNuevo, abrirModalEditar, borrarPerfil } from './crud.js';

const getEl = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', async () => {
    // =====================
    // ELEMENTOS DEL DOM
    // =====================
    const addProfileBtn = getEl('addProfileBtn');
    const clearFiltersBtn = getEl('clearFilters');
    const openLoginBtn = getEl('openLoginBtn');
    const logoutBtn = getEl('logoutBtn');
    const loginModal = getEl('loginModal');
    const doLoginBtn = getEl('doLogin');
    const themeToggle = getEl('themeToggle');
    const themeIcon = getEl('themeIcon');

    let perfiles = [];

    // =====================
    // FUNCIONES AUX
    // =====================
    function verificarAutenticacion() {
        const token = localStorage.getItem('token');
        addProfileBtn?.classList.toggle('hidden', !token);
        logoutBtn?.classList.toggle('hidden', !token);
        openLoginBtn?.classList.toggle('hidden', !!token);
    }

    async function cargarPerfiles() {
        try {
            mostrarLoader();
            perfiles = await obtenerPerfiles();
            actualizarVista();
        } catch (error) {
            console.error("Error al obtener perfiles:", error.message);
        } finally {
            ocultarLoader();
        }
    }

    function actualizarVista() {
        const perfilesFiltrados = aplicarFiltros(perfiles);
        renderizarPerfiles(
            perfilesFiltrados,
            perfil => abrirModalEditar(perfil, cargarPerfiles),
            id => borrarPerfil(id, cargarPerfiles)
        );
    }

    // =====================
    // EVENTOS LOGIN
    // =====================
    openLoginBtn?.addEventListener('click', () => {
        if (loginModal) loginModal.classList.remove('hidden'), loginModal.classList.add('flex');
    });

    getEl('closeLogin')?.addEventListener('click', () => {
        if (loginModal) loginModal.classList.add('hidden'), loginModal.classList.remove('flex');
    });

    doLoginBtn?.addEventListener('click', async () => {
        const emailInput = getEl('loginEmail');
        const passInput = getEl('loginPass');

        if (!emailInput || !passInput) return alert('Formulario de login no encontrado');

        const email = emailInput.value;
        const pass = passInput.value;

        try {
            const data = await login(email, pass);
            if (data.token) {
                localStorage.setItem('token', data.token);
                verificarAutenticacion();
                loginModal?.classList.add('hidden');
                await cargarPerfiles();
            } else {
                alert(data.msg || 'Error al iniciar sesión');
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    });

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('token');
        location.reload();
    });

    // =====================
    // EVENTOS PERFILES Y FILTROS
    // =====================
    addProfileBtn?.addEventListener('click', () => abrirModalNuevo(cargarPerfiles));

    clearFiltersBtn?.addEventListener('click', () => {
        limpiarFiltros();
        actualizarVista();
    });

    registrarEventosFiltros(actualizarVista);

    // =====================
    // TOGGLE TEMA CLARO/OSCURO
    // =====================
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('bg-gray-900');
            document.body.classList.toggle('bg-gray-100');
            document.body.classList.toggle('text-gray-100');
            document.body.classList.toggle('text-gray-900');

            const isDark = document.body.classList.contains('bg-gray-900');
            themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    // =====================
    // INICIO
    // =====================
    setupTheme();
    verificarAutenticacion();
    await cargarPerfiles();
});
