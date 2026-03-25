// js/auth.js
let navSections = [];

// Configuración de navegación - PODÉS EDITAR ESTO PARA AGREGAR SECCIONES
const navigationConfig = {
    sections: [
        {
            title: "PRINCIPAL",
            items: [
                { name: "Dashboard", icon: "📊", path: "/pages/dashboard.html", roles: ["admin", "gerente", "cajero"] },
                { name: "Comparador", icon: "🔍", path: "/pages/shared/comparator.html", roles: ["admin", "gerente", "cajero"] },
                { name: "Búsqueda", icon: "🔎", path: "/pages/shared/search.html", roles: ["admin", "gerente", "cajero"] }
            ]
        },
        {
            title: "GESTIÓN",
            items: [
                { name: "Agregar Producto", icon: "➕", path: "/pages/gerente/add-product.html", roles: ["admin", "gerente"] },
                { name: "Agregar Proveedor", icon: "🏪", path: "/pages/gerente/add-provider.html", roles: ["admin", "gerente"] },
                { name: "Categorías", icon: "📂", path: "/pages/gerente/categories.html", roles: ["admin", "gerente"] }
            ]
        },
        {
            title: "CAJA",
            items: [
                { name: "Caja", icon: "💰", path: "/pages/cajero/cashier.html", roles: ["admin", "gerente", "cajero"] }
            ]
        },
        {
            title: "ADMINISTRACIÓN",
            items: [
                { name: "Usuarios", icon: "👥", path: "/pages/admin/users.html", roles: ["admin"] },
                { name: "Roles", icon: "🎭", path: "/pages/admin/roles.html", roles: ["admin"] }
            ]
        }
    ]
};

async function buildSidebar() {
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');
    const userName = userEmail ? userEmail.split('@')[0] : 'Usuario';
    const userInitial = userName.charAt(0).toUpperCase();
    
    // Filtrar según rol
    const filteredSections = navigationConfig.sections.map(section => ({
        ...section,
        items: section.items.filter(item => item.roles.includes(userRole))
    })).filter(section => section.items.length > 0);
    
    const sidebarHTML = `
        <div class="sidebar-header">
            <h1>AlmacenDelivery</h1>
            <p>Control de precios</p>
        </div>
        <div class="sidebar-nav">
            ${filteredSections.map(section => `
                <div class="nav-section">
                    <div class="nav-section-title">${section.title}</div>
                    ${section.items.map(item => `
                        <a href="${item.path}" class="nav-item" data-path="${item.path}">
                            <span class="icon">${item.icon}</span>
                            <span>${item.name}</span>
                        </a>
                    `).join('')}
                </div>
            `).join('')}
        </div>
        <div class="sidebar-footer">
            <div class="user-info">
                <div class="user-avatar">${userInitial}</div>
                <div class="user-details">
                    <div class="user-name">${userName}</div>
                    <div class="user-role">${userRole}</div>
                </div>
            </div>
            <button onclick="logout()" class="logout-btn">
                <span>🚪</span> Cerrar Sesión
            </button>
        </div>
    `;
    
    // Insertar sidebar en el DOM
    let sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        // Crear estructura dashboard si no existe
        document.body.innerHTML = `
            <div class="dashboard">
                <div class="sidebar">${sidebarHTML}</div>
                <div class="main-content" id="mainContent">
                    ${document.body.innerHTML}
                </div>
            </div>
        `;
    } else {
        sidebar.innerHTML = sidebarHTML;
    }
    
    // Marcar item activo
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-path') === currentPath) {
            item.classList.add('active');
        }
    });
}

async function checkAccess() {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

async function buildMenu() {
    await buildSidebar();
}

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    window.location.href = '/login.html';
}

window.checkAccess = checkAccess;
window.buildMenu = buildMenu;
window.logout = logout;