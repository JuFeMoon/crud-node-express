/*
    FUNCIONALIDADES PENDIENTES:
        -   Sistema de división de elementos en páginas
*/

const botonGuardar = dqs('[name="botonGuardar"]');

//      -- INTERFAZ FILAS --

//  -- BOTON FUNC. ELIMINAR --
const botonEliminar = dqs('[name="botonEliminar"]');

//  -- FUNC. EDITAR --
const botonEditar = dqs('#botonEditar');
const botonGuardarEdicion = dqs('[name="modalEditarGuardar"]');



//      -- BARRA DE HERRAMIENTAS --

//  -- AGREGAR EJEMPLO (OPCION DESPLIEGUE) --
const botonAgregarEjemplo = dqs('#agregarEditarVenta');

//  -- MOSTRAR MODAL FILTRADO --
const botonFiltrar = dqs('[name="botonFiltrar"]');

//  -- CAMPO DE BUSQUEDA POR TEXTO --
const campoBusqueda = dqs('[name="campoBusqueda"]');



//      -- FILTRAR BUSQUEDA --

//  -- CATEGORIA --
let parametroCategoria = dqs('[name="parametroCategoria"]');

//  -- SUCURSAL --
let parametroSucursal = dqs('[name="parametroSucursal"]');

//  -- STOCK --
let parametroStock = dqs('[name="parametroStock"]');

//  -- PRECIOS --
let parametroPrecioMin = dqs('[name="parametroPrecioMin"]');
let parametroPrecioMax = dqs('[name="parametroPrecioMax"]');

//  -- FECHA --
let parametroFecha = dqs('[name="parametroFecha"]');

//  -- HORA --
let parametroHora = dqs('[name="parametroHora"]');
let indexEdicion = null;


//  -- CAMPOS DE EJEMPLO PREDETERMINADO --

const camposEjPred = {
    nombreCliente: 'Cliente',
    nombreProducto: 'Producto',
    Categoria: 'Categoría 1',
    selectSucursal: 'Sucursal',
    precioFinal: '100',
    fecha: '2026-06-04',
    hora: '12:00',
    selectStock: 'disponible'
};

/*
        -- ESTRUCTURAS DE INFORMACION --

ventas [
    venta(i) {
        nombreCliente,
        nombreProducto,
        categoria,
        selectSucursal,
        precioFinal,
        fecha,
        hora,
        selectStock;
    };
];

productos [
    producto(i) {
        nombre,
        categoria,
        precio,
        stock;
    };
];
*/



//  -- ALMACENAMIENTO DE DATOS --

let ventas = [
    // -- (Ejemplo de estructura) --
    // {
    // "nombreCliente": "cliente1",
    // "nombreProducto": "producto",
    // "categoria": "categoria1",
    // "selectSucursal": "sucursal1",
    // "precioFinal": "100",
    // "fecha": "2026-06-04",
    // "hora": "12:00",
    // "selectStock": "disponible"
    // }
];

let auxVentas = localStorage.getItem('ventas');

if (auxVentas){
    ventas = JSON.parse(auxVentas);
    listarVentas();
}



//  -- ABREVIATURAS --

function dqs(query){
    return document.querySelector(query);
}

function dqsAll(query){
    return document.querySelectorAll(query);
}



//  -- ESCUCHA DE EVENTOS --

botonGuardarEdicion.addEventListener("click", guardarEdicion);

campoBusqueda.addEventListener('input', realizarBusqueda);

botonFiltrar.addEventListener('click', (e =>{
    $('#modalFiltrar').modal('show');
}));

botonAgregarEjemplo.addEventListener("click", (e) => {
    // Reset form fields to default values
    dqs('[name="nombreCliente"]').value = 'Cliente';
    dqs('[name="nombreProducto"]').value = 'Producto';
    dqs('[name="selectCategoria"]').value = 'categoria1';
    dqs('[name="selectSucursal"]').value = 'sucursal1';
    dqs('[name="precioFinal"]').value = '100';
    dqs('[name="fecha"]').value = '2026-06-04';
    dqs('[name="hora"]').value = '12:00';
    dqs('[name="selectStock"]').value = 'disponible';
    
    $('#modalAgregarEjemplo').modal('show');
});



//      -- FUNCIONES --

//  -- REALIZAR BUSQUEDA --

function realizarBusqueda(){
    textoBusqueda = campoBusqueda.value;

    listarVentas({ busqueda: campoBusqueda });
}

function obtenerFiltros() {
    return {
        categoria: dqs('[name="selectCategoriaFiltro"]').value,
        sucursal: dqs('[name="selectSucursalFiltro"]').value,
        stock: dqs('[name="selectStockFiltro"]').value,
        precioMin: dqs('[name="parametroPrecioMin"]').value,
        precioMax: dqs('[name="parametroPrecioMax"]').value,
        fecha: dqs('[name="inputFechaFiltro"]').value,
        hora: dqs('[name="inputHoraFiltro"]').value
    };
}

//  -- FUNC. BUSQUEDA --

//  -- ESTRUCTURA DE REFERENCIA --
//
// parametros = {
//     categoria,
//     sucursal,
//     stock,
//     precioMin,
//     precioMax,
//     fecha,
//     hora,
//     busqueda
// }

function listarVentas(filtros = {obtenerFiltros}){
    let tbody = '';

    ventas
        .filter((venta) => {
            // Check text search
            if (filtros.busqueda && !comparaciones.some(valor =>
                String(valor).toLowerCase().includes(filtros.busqueda.toLowerCase())
            )) return false;
            
            // Check categoria
            if (filtros.categoria && venta.categoria !== filtros.categoria) return false;
            
            // Check sucursal
            if (filtros.sucursal && venta.selectSucursal !== filtros.sucursal) return false;
            
            // Check stock
            if (filtros.stock && venta.selectStock !== filtros.stock) return false;
            
            // Check price range
            if (filtros.precioMin && Number(venta.precioFinal) < Number(filtros.precioMin)) return false;
            if (filtros.precioMax && Number(venta.precioFinal) > Number(filtros.precioMax)) return false;
            
            // Check fecha
            if (filtros.fecha && venta.fecha !== filtros.fecha) return false;
            
            // Check hora
            if (filtros.hora && venta.hora !== filtros.hora) return false;
            
            return true;
        })
        .forEach((venta, index) => {
            tbody += `
            <tr data-index="${index}">
                <td>${venta.nombreCliente}</td>
                <td>${venta.nombreProducto}</td>
                <td>${venta.categoria}</td>
                <td>${venta.selectSucursal}</td>
                <td>${venta.precioFinal}</td>
                <td>${venta.fecha}</td>
                <td>${venta.hora}</td>
                <td class="align-middle">
                    <span class="p-2 badge ${venta.selectStock === 'disponible' ? 'badge-success' : 'badge-danger'}">
                        ${venta.selectStock === 'disponible' ? 'Disponible' : 'Agotado'}
                    </span>
                </td>
                <td>
                    <button name="botonEliminarElemento" class="btn btn-danger">Eliminar</button>
                    <button name="botonEditarElemento" class="btn btn-warning">Editar</button>
                </td>
            </tr>
            `;
        });
    
    dqs("table tbody").innerHTML = tbody;

    let filas = dqsAll("table tbody tr");
    let idxAEliminar = null;

    filas.forEach(tr =>{

    //  -   Funcionalidad del boton 'Eliminar' dentro de cada fila individual   -
        const btnEliminarFila = tr.querySelector('[name="botonEliminarElemento"]');
        btnEliminarFila.addEventListener('click', (e) => {
            e.stopPropagation();
            idxAEliminar = Number(tr.dataset.index);
            $('#modalEliminar').modal('show');
        });

        const btnEditarFila = tr.querySelector('button.btn-warning');
        btnEditarFila.addEventListener('click', (e) => {
            e.stopPropagation();

            const idx = Number(tr.dataset.index);
            
            if (Number.isNaN(idx)) return alert('ERROR: Valor de indice no numerico.');
            editarVenta(idx);
        });
    });

    // Listener para confirmar eliminación (solo se añade una vez)
    const btnConfirmarEliminar = dqs('[name="botonConfirmarEliminar"]');
    const btnConfirmarEliminarNuevo = btnConfirmarEliminar.cloneNode(true);
    btnConfirmarEliminar.parentNode.replaceChild(btnConfirmarEliminarNuevo, btnConfirmarEliminar);
    
    dqs('[name="botonConfirmarEliminar"]').addEventListener('click', (e) => {
        if (Number.isNaN(idxAEliminar)) return alert('ERROR: Valor de indice no numerico.');
        
        ventas.splice(idxAEliminar, 1);
        localStorage.setItem('ventas', JSON.stringify(ventas));
        listarVentas();
        $('#modalEliminar').modal('hide');
    });
};

const botonFiltrarAplicar = dqs('[name="botonFiltrarAplicar"]');
botonFiltrarAplicar.addEventListener('click', () => {
    const filtros = obtenerFiltros();
    listarVentas(filtros);
    $('#modalFiltrar').modal('hide');
});

botonGuardar.addEventListener("click", (e) => {
    let formTabla = {
    nombreCliente: dqs('[name="nombreCliente"]').value,
    nombreProducto: dqs('[name="nombreProducto"]').value,
    categoria: dqs('[name="selectCategoria"]').value,
    selectSucursal: dqs('[name="selectSucursal"]').value,
    precioFinal: dqs('[name="precioFinal"]').value,
    fecha: dqs('[name="fecha"]').value,
    hora: dqs('[name="hora"]').value,
    selectStock: dqs('[name="selectStock"]').value
    };
    
    ventas.push(formTabla);
    
    localStorage.setItem("ventas", JSON.stringify(ventas));
    
    $('#modalAgregarEjemplo').modal('hide');

    listarVentas();
});

function editarVenta(index) {
    const venta = ventas[index];
    indexEdicion = index;

    // Populate form fields with venta data
    dqs('#modalEditarEjemplo [name="nombreCliente"]').value = venta.nombreCliente;
    dqs('#modalEditarEjemplo [name="nombreProducto"]').value = venta.nombreProducto;
    dqs('#modalEditarEjemplo [name="selectCategoria"]').value = venta.categoria;
    dqs('#modalEditarEjemplo [name="selectSucursalEditar"]').value = venta.selectSucursal;
    dqs('#modalEditarEjemplo [name="precioFinal"]').value = venta.precioFinal;
    dqs('#modalEditarEjemplo [name="fecha"]').value = venta.fecha;
    dqs('#modalEditarEjemplo [name="hora"]').value = venta.hora;
    dqs('#modalEditarEjemplo [name="selectStock"]').value = venta.selectStock;

    $("#modalEditarEjemplo").modal("show");
}

function guardarEdicion() {
    if (indexEdicion === null || indexEdicion < 0 || indexEdicion >= ventas.length) {
        alert("No se encontró la fila a editar.");
        return;
    }

    ventas[indexEdicion] = {
        nombreCliente: dqs('#modalEditarEjemplo [name="nombreCliente"]').value,
        nombreProducto: dqs('#modalEditarEjemplo [name="nombreProducto"]').value,
        categoria: dqs('#modalEditarEjemplo [name="selectCategoria"]').value,
        selectSucursal: dqs('#modalEditarEjemplo [name="selectSucursalEditar"]').value,
        precioFinal: dqs('#modalEditarEjemplo [name="precioFinal"]').value,
        fecha: dqs('#modalEditarEjemplo [name="fecha"]').value,
        hora: dqs('#modalEditarEjemplo [name="hora"]').value,
        selectStock: dqs('#modalEditarEjemplo [name="selectStock"]').value
    };

    localStorage.setItem("ventas", JSON.stringify(ventas));
    listarVentas();
    $("#modalEditarEjemplo").modal("hide");
    indexEdicion = null;
}