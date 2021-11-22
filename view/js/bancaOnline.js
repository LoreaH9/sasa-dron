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
    $("#tableIngreso").hide();
}

function showOption(event) {
    preventClick(event);
    hideAllTables();
    $("#table"+event.currentTarget.id+"").show();
    $("#botonLeasing").on('click', calcularLeasing);
    $("#botonPrestamo").on('click', calcularPrestamo);
    showCuentas();
}

function showCuentas() {
    var url = "controller/cIngreso.php";

	fetch(url, {
	  method: 'GET', 
	})
	.then(res => res.json()).then(result => {
		console.log(result.list);
		
		var cuentasCorrientes = result.list1;
        var cuentasCredito = result.list2;
		var newRow = "<option value='0'>Seleccione una cuenta...</option>";
   		
   		for(let i = 0; i < cuentasCorrientes.length; i++) {
			newRow += "<option value='" + cuentasCorrientes[i].id + "'>" + cuentasCorrientes[i].id + "Cuenta corriente</option>";
		}
        for(let i = 0; i < cuentasCredito.length; i++) {
			newRow += "<option value='" + cuentasCredito[i].id + "'>" + cuentasCredito[i].id + "Cuenta credito</option>";
		}
		 
		document.getElementById("cmbCuentas").innerHTML = newRow;  	
	})
	.catch(error => console.error('Error status:', error));	
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