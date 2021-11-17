
$(document).ready(init);

function init() {
    option();
    hideAllTables();
    $("#tableMovimientosCuentaCredito").show();
}

function option() {
    $('.opcion')
    .off('click')
    .on('click', showOption);
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

function showOption(event) {
    preventClick(event);
    hideAllTables();
    $("#table"+event.currentTarget.id+"").show();
}


