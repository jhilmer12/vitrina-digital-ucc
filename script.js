// Datos iniciales
let emprendedores = [
    {
        id: 1,
        nombre: "Moda Étnica Colombia",
        categoria: "moda",
        descripcion: "Ropa y accesorios hechos por comunidades indígenas, tejidos tradicionales y diseños únicos.",
        precio: "$50.000 - $200.000",
        contacto: "https://wa.me/573001234567",
        imagen: "https://via.placeholder.com/300x200/3498DB/white?text=Moda+Étnica",
        imagenesExtra: [],
        sitioWeb: "https://www.instagram.com/modaetnica"
    },
    {
        id: 2,
        nombre: "Sabores de mi Tierra",
        categoria: "comida",
        descripcion: "Comida típica colombiana a domicilio. Bandeja paisa, ajiaco, lechona y más.",
        precio: "$15.000 - $45.000",
        contacto: "https://wa.me/573007654321",
        imagen: "https://via.placeholder.com/300x200/27AE60/white?text=Sabores+Tierra",
        imagenesExtra: [],
        sitioWeb: "https://www.instagram.com/saboresdetierra"
    },
    {
        id: 3,
        nombre: "Tech Solutions UCC",
        categoria: "tecnologia",
        descripcion: "Desarrollo de software, páginas web, apps móviles y consultoría tecnológica.",
        precio: "Cotizar",
        contacto: "mailto:tech@ucc.edu.co",
        imagen: "https://via.placeholder.com/300x200/34495E/white?text=Tech+Solutions",
        imagenesExtra: [],
        sitioWeb: "https://techsolutions.com"
    },
    {
        id: 4,
        nombre: "Arte y Café",
        categoria: "arte",
        descripcion: "Galería de arte, café cultural, talleres de pintura y exposiciones mensuales.",
        precio: "$10.000 - $300.000",
        contacto: "https://www.instagram.com/arteycafe",
        imagen: "https://via.placeholder.com/300x200/E74C3C/white?text=Arte+y+Café",
        imagenesExtra: [],
        sitioWeb: "https://arteycafe.com"
    },
    {
        id: 5,
        nombre: "Consultoría Legal Express",
        categoria: "servicios",
        descripcion: "Asesoría legal para emprendedores, constitución de empresas y propiedad intelectual.",
        precio: "$80.000 - $500.000",
        contacto: "https://wa.me/573009876543",
        imagen: "https://via.placeholder.com/300x200/F39C12/white?text=Consultoría+Legal",
        imagenesExtra: [],
        sitioWeb: "https://consultorialegal.com"
    }
];

let oportunidades = [
    {
        id: 1,
        titulo: "Fondo Emprender SENA",
        tipo: "financiacion",
        descripcion: "Hasta $150 millones para tu emprendimiento. Convocatoria abierta para proyectos innovadores.",
        fechaCierre: "2025-05-30",
        link: "https://www.fondoemprender.com"
    },
    {
        id: 2,
        titulo: "Feria Universitaria de Emprendimiento UCC",
        tipo: "feria",
        descripcion: "Espacio para mostrar tus productos a toda la comunidad universitaria. Stands gratuitos.",
        fechaCierre: "2025-04-20",
        link: "https://www.ucc.edu.co/feria"
    }
];

let visitasTotales = localStorage.getItem('visitasTotales') ? parseInt(localStorage.getItem('visitasTotales')) : 0;

// Cargar datos guardados
function cargarDatos() {
    const guardadoEmprendedores = localStorage.getItem('emprendedores');
    if (guardadoEmprendedores) {
        emprendedores = JSON.parse(guardadoEmprendedores);
    }
    
    const guardadoOportunidades = localStorage.getItem('oportunidades');
    if (guardadoOportunidades) {
        oportunidades = JSON.parse(guardadoOportunidades);
    }
    
    renderizarVitrinas();
    actualizarListaAdmin();
    actualizarListaOportunidades();
    actualizarEstadisticas();
}

// Guardar datos
function guardarDatos() {
    localStorage.setItem('emprendedores', JSON.stringify(emprendedores));
    localStorage.setItem('oportunidades', JSON.stringify(oportunidades));
    localStorage.setItem('visitasTotales', visitasTotales);
}

// Contar visita
function registrarVisita() {
    visitasTotales++;
    guardarDatos();
    actualizarEstadisticas();
}

// Renderizar vitrinas
let filtroActual = 'all';
let busquedaActual = '';

function renderizarVitrinas() {
    const grid = document.getElementById('vitrinasGrid');
    let filtrados = emprendedores;
    
    if (filtroActual !== 'all') {
        filtrados = filtrados.filter(e => e.categoria === filtroActual);
    }
    
    if (busquedaActual) {
        filtrados = filtrados.filter(e => 
            e.nombre.toLowerCase().includes(busquedaActual) || 
            e.descripcion.toLowerCase().includes(busquedaActual)
        );
    }
    
    if (filtrados.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No hay emprendimientos que coincidan con tu búsqueda</p>';
        return;
    }
    
    grid.innerHTML = filtrados.map(emp => `
        <div class="vitrina-card" data-id="${emp.id}">
            <img src="${emp.imagen}" alt="${emp.nombre}" class="vitrina-imagen" onerror="this.src='https://via.placeholder.com/300x200/95A5A6/white?text=Sin+imagen'">
            <div class="vitrina-info">
                <span class="vitrina-categoria">${getCategoriaEmoji(emp.categoria)} ${emp.categoria}</span>
                <h3>${emp.nombre}</h3>
                <p class="vitrina-descripcion">${emp.descripcion.substring(0, 80)}...</p>
                ${emp.precio ? `<p class="vitrina-precio">💰 ${emp.precio}</p>` : ''}
                <div class="vitrina-botones">
                    <a href="${emp.contacto}" target="_blank" class="vitrina-contacto">📞 Contactar</a>
                    ${emp.sitioWeb ? `<a href="${emp.sitioWeb}" target="_blank" class="vitrina-web">🌐 Ver más</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoriaEmoji(categoria) {
    const emojis = {
        'moda': '👗',
        'comida': '🍔',
        'tecnologia': '💻',
        'arte': '🎨',
        'servicios': '📋'
    };
    return emojis[categoria] || '🏪';
}

// Actualizar panel admin
function actualizarListaAdmin() {
    const lista = document.getElementById('listaEmprendedores');
    lista.innerHTML = emprendedores.map(emp => `
        <div class="admin-item">
            <div class="admin-item-info">
                <strong>${emp.nombre}</strong> - ${emp.categoria} - ${emp.precio || 'Sin precio'}
            </div>
            <div class="admin-item-buttons">
                <button class="edit-btn" onclick="editarEmprendedor(${emp.id})">✏️ Editar</button>
                <button class="delete-btn" onclick="eliminarEmprendedor(${emp.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

function actualizarListaOportunidades() {
    const lista = document.getElementById('listaOportunidades');
    if (oportunidades.length === 0) {
        lista.innerHTML = '<p>No hay oportunidades activas. Agrega una usando el formulario.</p>';
        return;
    }
    
    lista.innerHTML = oportunidades.map(op => `
        <div class="oportunidad-card">
            <span class="tipo">${getTipoEmoji(op.tipo)} ${op.tipo}</span>
            <h4>${op.titulo}</h4>
            <p>${op.descripcion}</p>
            ${op.fechaCierre ? `<p>📅 Cierre: ${op.fechaCierre}</p>` : ''}
            ${op.link ? `<a href="${op.link}" target="_blank" class="vitrina-contacto" style="display:inline-block; margin-top:10px;">🔗 Ver convocatoria</a>` : ''}
            <button class="delete-oportunidad" onclick="eliminarOportunidad(${op.id})">🗑️ Eliminar</button>
        </div>
    `).join('');
}

function getTipoEmoji(tipo) {
    const emojis = {
        'convocatoria': '📢',
        'feria': '🎪',
        'financiacion': '💰',
        'capacitacion': '📚'
    };
    return emojis[tipo] || '🎯';
}

function actualizarEstadisticas() {
    document.getElementById('totalEmprendedores').textContent = emprendedores.length;
    document.getElementById('totalVisitas').textContent = visitasTotales;
    document.getElementById('totalOportunidades').textContent = oportunidades.length;
}

// Agregar emprendedor
function agregarEmprendedor(event) {
    event.preventDefault();
    const nuevoId = emprendedores.length > 0 ? Math.max(...emprendedores.map(e => e.id)) + 1 : 1;
    
    const imagenesExtraStr = document.getElementById('imagenesExtra').value;
    const imagenesExtra = imagenesExtraStr ? imagenesExtraStr.split(',').map(s => s.trim()) : [];
    
    const nuevoEmp = {
        id: nuevoId,
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        precio: document.getElementById('precio').value,
        contacto: document.getElementById('contacto').value,
        imagen: document.getElementById('imagen').value || 'https://via.placeholder.com/300x200/95A5A6/white?text=Nuevo+emprendimiento',
        imagenesExtra: imagenesExtra,
        sitioWeb: document.getElementById('sitioWeb').value
    };
    
    emprendedores.push(nuevoEmp);
    guardarDatos();
    renderizarVitrinas();
    actualizarListaAdmin();
    actualizarEstadisticas();
    document.getElementById('emprendedorForm').reset();
    alert('✅ Emprendedor agregado exitosamente');
}

function eliminarEmprendedor(id) {
    if (confirm('¿Estás seguro de eliminar este emprendimiento?')) {
        emprendedores = emprendedores.filter(e => e.id !== id);
        guardarDatos();
        renderizarVitrinas();
        actualizarListaAdmin();
        actualizarEstadisticas();
    }
}

function editarEmprendedor(id) {
    const emp = emprendedores.find(e => e.id === id);
    if (emp) {
        document.getElementById('nombre').value = emp.nombre;
        document.getElementById('categoria').value = emp.categoria;
        document.getElementById('descripcion').value = emp.descripcion;
        document.getElementById('precio').value = emp.precio || '';
        document.getElementById('contacto').value = emp.contacto;
        document.getElementById('imagen').value = emp.imagen;
        document.getElementById('imagenesExtra').value = emp.imagenesExtra.join(', ');
        document.getElementById('sitioWeb').value = emp.sitioWeb || '';
        
        // Eliminar el viejo y agregar como nuevo (edición simple)
        emprendedores = emprendedores.filter(e => e.id !== id);
        guardarDatos();
        
        // Scroll al formulario
        document.getElementById('emprendedorForm').scrollIntoView({ behavior: 'smooth' });
    }
}

// Oportunidades
function agregarOportunidad(event) {
    event.preventDefault();
    const nuevoId = oportunidades.length > 0 ? Math.max(...oportunidades.map(o => o.id)) + 1 : 1;
    
    const nuevaOp = {
        id: nuevoId,
        titulo: document.getElementById('tituloOportunidad').value,
        tipo: document.getElementById('tipoOportunidad').value,
        descripcion: document.getElementById('descripcionOportunidad').value,
        fechaCierre: document.getElementById('fechaCierre').value,
        link: document.getElementById('linkOportunidad').value
    };
    
    oportunidades.push(nuevaOp);
    guardarDatos();
    actualizarListaOportunidades();
    actualizarEstadisticas();
    document.getElementById('oportunidadForm').reset();
    alert('✅ Oportunidad agregada exitosamente');
}

function eliminarOportunidad(id) {
    if (confirm('¿Eliminar esta oportunidad?')) {
        oportunidades = oportunidades.filter(o => o.id !== id);
        guardarDatos();
        actualizarListaOportunidades();
        actualizarEstadisticas();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    registrarVisita(); // Registrar visita a la página
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroActual = btn.dataset.filter;
            renderizarVitrinas();
        });
    });
    
    // Búsqueda
    document.getElementById('searchInput').addEventListener('input', (e) => {
        busquedaActual = e.target.value.toLowerCase();
        renderizarVitrinas();
    });
    
    // Panel Admin con pestañas
    const adminBtn = document.getElementById('adminLoginBtn');
    const adminPanel = document.getElementById('adminPanel');
    const closeAdminBtn = document.getElementById('closeAdminBtn');
    
    adminBtn.addEventListener('click', () => {
        adminPanel.classList.remove('hidden');
    });
    
    closeAdminBtn.addEventListener('click', () => {
        adminPanel.classList.add('hidden');
    });
    
    adminPanel.addEventListener('click', (e) => {
        if (e.target === adminPanel) {
            adminPanel.classList.add('hidden');
        }
    });
    
    // Pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
        });
    });
    
    // Formularios
    document.getElementById('emprendedorForm').addEventListener('submit', agregarEmprendedor);
    document.getElementById('oportunidadForm').addEventListener('submit', agregarOportunidad);
    
    // Reset visitas
    document.getElementById('resetVisitasBtn')?.addEventListener('click', () => {
        if (confirm('¿Reiniciar contador de visitas?')) {
            visitasTotales = 0;
            guardarDatos();
            actualizarEstadisticas();
        }
    });
});

// Añadir estilos para nuevos elementos
const style = document.createElement('style');
style.textContent = `
    .vitrina-precio {
        font-size: 14px;
        color: #27AE60;
        font-weight: bold;
        margin: 8px 0;
    }
    
    .vitrina-botones {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
    
    .vitrina-web {
        display: inline-block;
        padding: 8px 16px;
        background: #3498DB;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 14px;
        transition: background 0.3s;
    }
    
    .vitrina-web:hover {
        background: #2980B9;
    }
    
    .admin-item {
        background: #ecf0f1;
        padding: 12px;
        margin: 8px 0;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .edit-btn {
        background: #F39C12;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 5px;
    }
    
    .edit-btn:hover {
        background: #E67E22;
    }
`;
document.head.appendChild(style);