let rolePermissions = {};

async function loadPermissions() {
    try {
        const response = await fetch('/roles-config.txt');
        const text = await response.text();
        
        let currentRole = '';
        const lines = text.split('\n');
        
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('[') && line.endsWith(']')) {
                currentRole = line.slice(1, -1);
                rolePermissions[currentRole] = [];
            } else if (line && currentRole) {
                rolePermissions[currentRole].push(line);
            }
        }
    } catch (error) {
        console.error('Error loading permissions:', error);
    }
}

function hasAccess(pagePath, userRole) {
    const allowedPages = rolePermissions[userRole] || [];
    return allowedPages.some(allowed => pagePath.includes(allowed));
}

async function checkAccess() {
    await loadPermissions();
    
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
        window.location.href = '/login.html';
        return false;
    }
    
    const currentPath = window.location.pathname;
    
    if (!hasAccess(currentPath, userRole)) {
        window.location.href = '/unauthorized.html';
        return false;
    }
    return true;
}

async function buildMenu() {
    await loadPermissions();
    const userRole = localStorage.getItem('userRole');
    const allowed = rolePermissions[userRole] || [];
    
    const menuLinks = allowed.map(page => {
        let pageName = page.split('/').pop().replace('.html', '');
        pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        return `<a href="/${page}">${pageName}</a>`;
    }).join('');
    
    const menuDiv = document.getElementById('menu');
    if (menuDiv) {
        menuDiv.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:5px;">${menuLinks}</div>
            <div style="display:flex; align-items:center; gap:15px;">
                <span style="color:#fff; font-size:14px;">👤 ${localStorage.getItem('userEmail')} (${userRole})</span>
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

window.checkAccess = checkAccess;
window.buildMenu = buildMenu;
window.hasAccess = hasAccess;
window.logout = logout;