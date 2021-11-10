
$(document).ready(init);

function init() {
    option();
}

function option() {

    $('#movimientos')
        .off('click')
        .on('click', movimientos);
    $('#leasing')
        .off('click')
        .on('click', leasing);
    $('#prestamos')
        .off('click')
        .on('click', prestamos);
    $('#ingreso')
        .off('click')
        .on('click', ingreso);

}
function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}

function movimientos(event) {
    preventClick(event);
    $("#tableMovimientos").show();
    console.log("m")
}
function leasing(event) {
    preventClick(event);
    console.log("leasing")

    $("#tableMovimientos").hide();
}
function prestamos(event) {
    preventClick(event);
    console.log("prestamos")

    $("#tableMovimientos").hide();
}
function tranferencias(event) {
    preventClick(event);
    console.log("tranferencias")

    $("#tableMovimientos").hide();
}
function ingreso(event) {
    preventClick(event);
    console.log("ingreso")

    $("#tableMovimientos").hide();
}



