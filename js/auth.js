// js/auth.js - VERSIÓN SIMPLIFICADA (sin verificación de permisos)
async function buildMenu() {
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');
    
    // Menú básico para todos
    const menuLinks = `
        <a href="/pages/shared/comparator.html">Comparador</a>
        <a href="/pages/shared/search.html">Buscar</a>
        <a href="/pages/gerente/add-product.html">AgregarProducto</a>
        <a href="/pages/gerente/add-provider.html">AgregarProveedor</a>
        <a href="/pages/gerente/categories.html">Categorias</a>
        <a href="/pages/cajero/cashier.html">Caja</a>
        <a href="/pages/admin/users.html">Usuarios</a>
        <a href="/pages/admin/roles.html">Roles</a>
    `;
    
    const menuDiv = document.getElementById('menu');
    if (menuDiv) {
        menuDiv.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:5px;">${menuLinks}</div>
            <div style="display:flex; align-items:center; gap:15px;">
                <span style="color:#fff; font-size:14px;">👤 ${userEmail} (${userRole})</span>
                <a href="#" onclick="logout()" class="logout-btn" style="background:#dc3545; padding:8px 15px; border-radius:8px;">🚪 Cerrar Sesión</a>
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    window.location.href = '/login.html';
}

// Función vacía para no bloquear
async function checkAccess() {
    return true;
}

window.checkAccess = checkAccess;
window.buildMenu = buildMenu;
window.logout = logout;