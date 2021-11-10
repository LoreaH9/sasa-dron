
$(document).ready(init);

function init() {
    option();
    hideAllTables();
    $("#movimientosCuentaCredito").show();
}

function option() {

    $('#movimientosCuentaCredito')
        .off('click')
        .on('click', movimientosCuentaCredito);
    $('#movimientosCuentaCorriente')
        .off('click')
        .on('click', movimientosCuentaCorriente);
    $('#leasing')
        .off('click')
        .on('click', leasing);
    $('#prestamos')
        .off('click')
        .on('click', prestamos);
    $('#movimientos')
        .off('click')
        .on('click', movimientos);

}

function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}

//Oculta todas las tablas
function hideAllTables() {
    $("#tablePrestamos").hide();
    $("#tableMovimientosCuentaCredito").hide();
    $("#tableLeasing").hide();
    $("#tableMovimientosCuentaCorriente").hide();

}

function movimientosCuentaCorriente(event) {
    preventClick(event);
    hideAllTables();
    $("#tableMovimientosCuentaCorriente").show();

}
function movimientosCuentaCredito(event) {
    preventClick(event);
    hideAllTables();
    $("#tableMovimientosCuentaCredito").show();
}
function leasing(event) {
    preventClick(event);
    hideAllTables();
    $("#tableLeasing").show();

}
function prestamos(event) {
    preventClick(event);
    console.log("prestamos")
    hideAllTables();
    $("#tablePrestamos").show();

}

function movimientos(event) {
    preventClick(event);
    hideAllTables();

}



