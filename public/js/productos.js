/*
1.  Establecer helpers.
2.  Declarar elementos en variables.
3.  Establecer comportamientos en funciones.
4.  Establecer escucha de eventos, asignando
        sus respectivas funciones para dar
        con un código más legible.
*/

/*
    Establecer valor invisible tipo ID como
        primer atributo, este debe ser
        único (no debería ser en base a la
        cantidad de elementos en sí, sino que
        en base a la cantidad de elementos CREADOS),
        invisible y autoincremental.
*/

    // HELPERS
function dqs(elemento){
    return document.querySelector(elemento);
}

function dqsAll(elemento){
    return document.querySelectorAll(elemento);
}



    // BARRA DE HERRAMIENTAS
const inputBuscarProd = dqs('[name="inputBuscarProd"]');
const btnModalAgregarProd = dqs('[name="btnModalAgregarProd"]');
const btnModalEliminarProd = dqsAll('[name="btnModalEliminarProd"]');
const btnModalFiltrarProd = dqs('[name="btnModalFiltrarProd"]');

    // MODALES
const modalAgregarProd = dqs('#modalAgregarProd')
const modalEliminarProd = dqs('#modalEliminarProd')
const modalEditarProd = dqs('#modalEditarProd')
const modalFiltrarProd = dqs('#modalFiltrarProd')

/*
Ejemplo de contenido:
<tr>
    <td>Lapiz</td>
    <td>Utiles Escolares</td>
    <td>Faber Castell</td>
    <td>EscolAr</td>
    <td>5600</td>
    <td>30</td>
</tr>
*/

    // ELEMENTOS MODAL AGREGAR
let agregarDistribuidorProd = dqs('[name="agregarDistribuidorProd"]');
let agregarCategoriaProd = dqs('[name="agregarCategoriaProd"]');
let agregarNombreProd = dqs('[name="agregarNombreProd"]');
let agregarPrecioProd = dqs('[name="agregarPrecioProd"]');
let agregarMarcaProd = dqs('[name="agregarMarcaProd"]');
let agregarStockProd = dqs('[name="agregarStockProd"]');
let agregarEstadoProd = dqs('[name="agregarEstadoProd"]');
let btnAgregarProd = dqs('[name="btnAgregarProd"]');
let selectPresetAgregar = dqs('[name="selectPresetAgregar"]');

    // ELEMENTOS MODAL ELIMINAR
const btnEliminarProd = dqs('[name="btnEliminarProd"]');

    // ELEMENTOS MODAL EDITAR
let editarDistribuidorProd = dqs('[name="editarDistribuidorProd"]');
let editarCategoriaProd = dqs('[name="editarCategoriaProd"]');
let editarNombreProd = dqs('[name="editarNombreProd"]');
let editarPrecioProd = dqs('[name="editarPrecioProd"]');
let editarMarcaProd = dqs('[name="editarMarcaProd"]');
let editarStockProd = dqs('[name="editarStockProd"]');
let editarEstadoProd = dqs('[name="editarEstadoProd"]');
let btnEditarProd = dqs('[name="btnEditarProd"]');

    // OTROS ELEMENTOS

    // ELEMENTOS MODAL FILTRAR
//    AGREGAR DESPUÉS

    // VARIABLES
let productos = {
    // producto {
        // idProd : ultimoId;
        // distribuidorProd : agregarDistribuidorProd.value,
        // categoriaProd : agregarCategoriaProd.value,
        // nombreProd : agregarNombreProd.value,
        // precioProd : agregarPrecioProd.value,
        // marcaProd : agregarMarcaProd.value,
        // stockProd : agregarStockProd.value
        // estadoProd : agregarEstadoProd.value
    // }
};

let ultimoId = Number(localStorage.getItem('ultimoId')) || 0;
let auxProductos = localStorage.getItem('productos');

if(auxProductos){
    productos = JSON.parse(auxProductos);
    listarProductos();
};

let indexEliminar = null;
let indexEdicion = null;

    // FUNCIONALIDADES DEL SISTEMA

function listarProductos(){
    let tbody = '';

    productos
    .forEach((producto, index) => {
        // Sacar 'data-index' y reemplazar en lógica con
        //      un valor invisible, único e incremental (id).
        tbody += `
            <tr data-index="${index}">
                <td>${producto.nombreProd}</td>
                <td>${producto.categoriaProd}</td>
                <td>${producto.marcaProd}</td>
                <td>${producto.distribuidorProd}</td>
                <td>${producto.precioProd}</td>
                <td>${producto.stockProd}</td>
                <td class="align-middle">
                    <span class="p-2 badge ${producto.estadoProd === 'disponible' ? 'badge-success' : 'badge-danger'}">
                        ${producto.estadoProd === 'disponible' ? 'Disponible' : 'Agotado'}
                    </span>
                </td>
                <td>
                    <button name="btnModalEliminarProd" class="btn btn-danger">Eliminar</button>
                    <button name="btnModalEditarProd" class="btn btn-warning">Editar</button>
                </td>
            </tr>
            `;
    });

    dqs("table tbody").innerHTML = tbody;

    let filas = dqsAll('table tbody tr');

    filas
    .forEach(tr => {

        const btnEliminarFila = tr.querySelector('[name="btnModalEliminarProd"]');

        btnEliminarFila.addEventListener('click', (e) => {
            indexEliminar = Number(tr.dataset.index);
            console.log(indexEliminar);
            $('#modalEliminarProd').modal('show');
        });

        const btnEditarFila = tr.querySelector('[name="btnModalEditarProd"]');
        btnEditarFila.addEventListener('click', (e) => {
            e.stopPropagation();
            indexEdicion = Number(tr.dataset.index);
            $('#modalEditarProd').modal('show');
            editarProducto(indexEdicion);
        })

    })

};

btnEliminarProd.addEventListener('click', (e) => {
        productos.splice(indexEliminar, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        listarProductos();
        $('#modalEliminarProd').modal('hide');
    }); 
// function eliminarProducto(indexEliminar){
//     if (Number.isNaN(indexEliminar)) return alert('ERROR: El indice del elemento a eliminar no es númerico.');

//     $('#modalEliminarProd').modal('show');
    
// };

function guardarCamposAgregar(){
    ultimoId ++;

    camposAgregar = {
        idProd : ultimoId,
        distribuidorProd : agregarDistribuidorProd.value,
        categoriaProd : agregarCategoriaProd.value,
        nombreProd : agregarNombreProd.value,
        precioProd : agregarPrecioProd.value,
        marcaProd : agregarMarcaProd.value,
        stockProd : agregarStockProd.value,
        estadoProd : agregarEstadoProd.value
    };

    productos.push(camposAgregar);

    localStorage.setItem('productos', JSON.stringify(productos));

    localStorage.setItem('ultimoId', JSON.stringify(ultimoId));

    listarProductos();

    agregarDistribuidorProd.value = '';
    agregarCategoriaProd.value = '';
    agregarNombreProd.value = '';
    agregarPrecioProd.value = '';
    agregarEstadoProd.value = '';
    agregarMarcaProd.value = '';
    agregarStockProd.value = '';

    $('#modalAgregarProd').modal('hide');
};

function editarProducto(){
    let producto = productos[indexEdicion];

    editarDistribuidorProd.value = producto.distribuidorProd;
    editarCategoriaProd.value = producto.categoriaProd;
    editarNombreProd.value = producto.nombreProd;
    editarPrecioProd.value = producto.precioProd;
    editarEstadoProd.value = producto.estadoProd;
    editarMarcaProd.value = producto.marcaProd;
    editarStockProd.value = producto.stockProd;

    // listarProductos();

    $('#modalEditarProd').modal('show');

    btnEditarProd.addEventListener('click', (e) => {
        if(indexEdicion == null || indexEdicion < 0 || indexEdicion > productos.length) {
            alert('No se encontro la fila a editar')
            return
        };

        productos[indexEdicion] = {
            distribuidorProd: editarDistribuidorProd.value,
            categoriaProd: editarCategoriaProd.value,
            nombreProd: editarNombreProd.value,
            precioProd: editarPrecioProd.value,
            estadoProd: editarEstadoProd.value,
            marcaProd: editarMarcaProd.value,
            stockProd: editarStockProd.value
        };

        localStorage.setItem('productos', JSON.stringify(productos));
        listarProductos();

        indexEdicion = null;
        editarDistribuidorProd.value = '';
        editarCategoriaProd.value = '';
        editarNombreProd.value = '';
        editarPrecioProd.value = '';
        editarEstadoProd.value = '';
        editarMarcaProd.value = '';
        editarStockProd.value = '';
        
        $('#modalEdicionProd').modal('hide');
    });
};

    // ESCUCHA DE EVENTOS

dqs('[name="botonDashboard"]').addEventListener('click', (e) => {
    window.location.href = "/usuarios/dashboard";
});

btnModalAgregarProd.addEventListener('click', (e) => {
    $('#modalAgregarProd').modal('show');
    let predefinidos = e.shiftKey;
    if(predefinidos){
        agregarDistribuidorProd.value = 'distribuidor';
        agregarCategoriaProd.value = 'categoria';
        agregarEstadoProd.value = 'disponible';
        agregarNombreProd.value = 'producto';
        agregarPrecioProd.value = '100';
        agregarMarcaProd.value = 'marca';
        agregarStockProd.value = '39';
    };
});

btnAgregarProd.addEventListener('click', (guardarCamposAgregar));

// btnModalEliminarProd.addEventListener('click', (e => {
//     $('#modalEliminarProd').modal('show');
// }));

// btnModalEditarProd.addEventListener('click', (e) => {});

btnModalFiltrarProd.addEventListener('click', (e => {
    $('#modalFiltrarProd').modal('show');
}));