
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
    $("#botonLeasing").on('click', calcularLeasing);
    $("#botonPrestamo").on('click', calcularPrestamo);
}

function calcularPrestamo() {
    var table = "<thead>" +
    "<tr>" +
    "<th scope='col'>#</th>" +
    "<th scope='col'>Urtekoa</th>" +
    "<th scope='col'>Interes Kuota</th>" +
    "<th scope='col'>Amortizazio kuota</th>" +
    "<th scope='col'>Amortizazio kapitala</th>" +
    "<th scope='col'>Zorra</th>" +
    "</tr>" +
    "</thead>";

    var iva = 0.21;
    var importe = $("#prestamoImporte").val();
    var interes = ($("#prestamoInteres").val()/100)/12;
    console.log(interes);
    var plazo = parseFloat($("#prestamoPlazo").val());

    var a = Math.pow((1+interes), -(plazo));
        a = 1 - a;
        a = a/interes;
        a = importe/a;

    var b = 0;

    for(let i = 1; i <= plazo; i++) {
        b = b + (a-(importe*interes));

        table += "<tbody>" +
        "<tr class='table-danger'>" +
        "<th scope='row'>" + i + "</th>" +
        "<td>" + a.toFixed(3) + "</td>" +
        "<td>" + (importe*interes).toFixed(3) + "</td>" +
        "<td>" + (a-(importe*interes)).toFixed(3) + "</td>" +
        "<td>" + b.toFixed(3) + "</td>" +
        "<td>" + (importe-(a-(importe*interes))).toFixed(3) + "</td>" +
        "</tr>" +
        "</tbody>";

        importe = (importe-(a-(importe*interes)));
    }
    
    $("#prestamosTable").html(table)
}

function calcularLeasing() {
    var table = "<thead>" +
    "<tr>" +
    "<th scope='col'>#</th>" +
    "<th scope='col'>Kuota</th>" +
    "<th scope='col'>BEZ-a</th>" +
    "<th scope='col'>Kuota garbia</th>" +
    "<th scope='col'>Interesak</th>" +
    "<th scope='col'>Amortizazioa</th>" +
    "<th scope='col'>Zorra</th>" +
    "</tr>" +
    "</thead>";

    var iva = 0.21;
    var importe = $("#leasingImporte").val();
    var interes = ($("#leasingInteres").val()/100)/12;
    console.log(interes);
    var plazo = parseFloat($("#leasingPlazo").val());

    var a = Math.pow((1+interes), -(plazo));
        a = 1 - a;
        a = a * (1+interes);
        a = a/interes;
        a = importe/a;

    for(let i = 1; i <= plazo; i++) {
        table += "<tbody>" +
        "<tr class='table-danger'>" +
        "<th scope='row'>" + i + "</th>" +
        "<td>" + a.toFixed(3) + "</td>" +
        "<td>" + (a*iva).toFixed(3) + "</td>" +
        "<td>" + (a+(a*iva)).toFixed(3) + "</td>" +
        "<td>" + (importe*interes).toFixed(3) + "</td>" +
        "<td>" + (a-(importe*interes)).toFixed(3) + "</td>" +
        "<td>" + (importe-(a-(importe*interes))).toFixed(3) + "</td>" +
        "</tr>" +
        "</tbody>";

        importe = (importe-(a-(importe*interes)));
    }
    
    $("#leasingTable").html(table)
}