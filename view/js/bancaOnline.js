
$(document).ready(init);

function init() {
    option();
    hideAllTables();
    $("#tableMovimientosCuenta").show();
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
    $("#tableMovimientosCuenta").hide();
    $("#tableLeasing").hide();
}

function showOption(event) {
    preventClick(event);
    hideAllTables();
    $("#table"+event.currentTarget.id+"").show();
}


