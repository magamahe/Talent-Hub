// main.js
import { obtenerPerfiles, login } from './api.js';
import { renderizarPerfiles, mostrarLoader, ocultarLoader, setupTheme } from './ui.js';
import { aplicarFiltros, limpiarFiltros, registrarEventosFiltros } from './filtros.js';
import { abrirModalNuevo, abrirModalEditar, borrarPerfil } from './crud.js';

const getEl = (id) => document.getElementById(id);

// ... imports ...

document.addEventListener('DOMContentLoaded', async () => {
    // 1. CARGAR PERFILES PRIMERO (Prioridad absoluta)
    // Lo ponemos al principio para que no dependa de nada más
    let perfiles = [];
    let isLogged = !!localStorage.getItem('token');

    async function cargarPerfilesInicial() {
        try {
            mostrarLoader();
            const data = await obtenerPerfiles();
            perfiles = data; 
            actualizarVista();
        } catch (error) {
            console.error("Error crítico al cargar perfiles:", error);
        } finally {
            ocultarLoader();
        }
    }

    function actualizarVista() {
        const perfilesFiltrados = aplicarFiltros(perfiles);
        // Pasamos el estado isLogged para decidir si mostramos botones de CRUD
        renderizarPerfiles(
            perfilesFiltrados,
            perfil => isLogged && abrirModalEditar(perfil, cargarPerfilesInicial),
            id => isLogged && borrarPerfil(id, cargarPerfilesInicial)
        );
    }

    // 2. CONFIGURAR TEMA (Dark mode por defecto)
    const temaGuardado = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('bg-gray-900', temaGuardado === 'dark');
    document.body.classList.toggle('text-gray-100', temaGuardado === 'dark');

    // 3. VERIFICAR INTERFAZ ADMIN
    function verificarAutenticacion() {
        const token = localStorage.getItem('token');
        isLogged = !!token;
        document.getElementById('addProfileBtn')?.classList.toggle('hidden', !isLogged);
        document.getElementById('logoutBtn')?.classList.toggle('hidden', !isLogged);
        document.getElementById('openLoginBtn')?.classList.toggle('hidden', isLogged);
    }

    // 4. REGISTRO DE EVENTOS SEGURO (Usando Optional Chaining)
    // El login se procesa solo cuando se hace click, no al cargar
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
                await cargarPerfilesInicial(); // Recarga para mostrar botones de admin
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    });

    // Inicialización
    verificarAutenticacion();
    registrarEventosFiltros(actualizarVista);
    await cargarPerfilesInicial(); 
});