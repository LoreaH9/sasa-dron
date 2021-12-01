$(document).ready(init);
var desde;
var a;

function init() {
    option();
    hideAllTables();
    $("#tableMovimientosCuentaCredito").show();
    $(".num").keypress(function(event) {
        if(event.charCode < 48 || event.charCode > 57){
            event.preventDefault();
        }
    });

    $('#radioCorriente').click(function() {
        $("select").hide();
        $("#cmbCuentasCorriente").show();

        desde = 1;
    });
    $('#radioCredito').click(function() {
        $("select").hide();
        $("#cmbCuentasCredito").show();

        desde = 2;
    });
    $('#radioMiCuenta').click(function() {
        if(desde == 2){
            $("#cmbCuentasCorriente2").show();
            $("#cmbCuentasCredito2").hide();
            $("#transOtraCuenta").hide();
        }
        else{
            $("#cmbCuentasCredito2").show();
            $("#cmbCuentasCorriente2").hide();
            $("#transOtraCuenta").hide();
        }

        a = 1;
    });
    $('#radioOtraCuenta').click(function() {
        $("#transOtraCuenta").show();
        $("#cmbCuentasCredito2").hide();
        $("#cmbCuentasCorriente2").hide();

        a = 2;
    });
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
    $("#tableTransferencia").hide();
    $("#cmbCuentasCorriente").hide();
    $("#cmbCuentasCredito").hide();
    $("#cmbCuentasCorriente2").hide();
    $("#cmbCuentasCredito2").hide();
    $("#transOtraCuenta").hide();
}

function showOption(event) {
    desde = null;
    a = null;
    preventClick(event);
    hideAllTables();
    $("#table"+event.currentTarget.id+"").show();
    $("#botonLeasing").on('click', calcularLeasing);
    $("#botonPrestamo").on('click', calcularPrestamo);
    $("#botonIngreso").on('click', ingreso);
    $("#botonTransferencia").on('click', transferencia);
    showCuentasCorrientes();
    showCuentasCredito();
    $("#radioCorriente").prop("checked", false);
    $("#radioCredito").prop("checked", false);
    $("#radioMiCuenta").prop("checked", false);
    $("#radioOtraCuenta").prop("checked", false);
}

function transferencia() {
    var importe = $("#tranferenciaImporte").val();
	var corriente = $("#cmbCuentasCorriente").val();
    var credito = $("#cmbCuentasCredito").val();
	var concepto = $("#tranferenciaConcepto").val();
    var corriente2 = $("#cmbCuentasCorriente2").val();
    var credito2 = $("#cmbCuentasCredito2").val();

	var url = "controller/cTransferencia.php";
	
	var data = {'importe': importe, 'cCorriente': corriente, 
    'cCredito': credito, 'concepto': concepto,
    'cCorriente2': corriente2, 'cCredito2': credito2, 
    'desde': desde, 'a': a};

	fetch(url, {
	  method: 'POST', 
	  body: JSON.stringify(data),
	  headers:{'Content-Type': 'application/json'}
	  })
	  
	.then(res => res.json()).then(result => {
			console.log(result.error);
			alert(result.error);
	})
	.catch(error => console.error('Error status:', error));
}

function ingreso() {
    var importe = $("#ingresoImporte").val();
	var cuenta = $("#cmbCuentas").val();
	var concepto = $("#ingresoConcepto").val();

	var url = "controller/cIngreso.php";
	
	var data = {'importe': importe, 'cuenta': cuenta, 'concepto': concepto};

	fetch(url, {
	  method: 'POST', 
	  body: JSON.stringify(data),
	  headers:{'Content-Type': 'application/json'}
	  })
	  
	.then(res => res.json()).then(result => {
			console.log(result.error);
			alert(result.error);
	})
	.catch(error => console.error('Error status:', error));
}


function showCuentasCredito() {
    var url = "controller/cCredito.php";

	fetch(url, {
	  method: 'GET', 
	})
	.then(res => res.json()).then(result => {
		console.log(result.list);
		
		var cuentasCredito = result.list;
		var newRow = "";
   		
   		for(let i = 0; i < cuentasCredito.length; i++) {
			newRow += "<option value='" + cuentasCredito[i].id + "'>Cuenta credito " + cuentasCredito[i].id + "</option>";
		}
		 
		document.getElementById("cmbCuentasCredito").innerHTML = newRow;
        document.getElementById("cmbCuentasCredito2").innerHTML = newRow; 
	})
	.catch(error => console.error('Error status:', error));	
}

function showCuentasCorrientes() {
    var url = "controller/cCorriente.php";

	fetch(url, {
	  method: 'GET', 
	})
	.then(res => res.json()).then(result => {
		console.log(result.list);
		
		var cuentasCorrientes = result.list;
		var newRow = "";
   		
   		for(let i = 0; i < cuentasCorrientes.length; i++) {
			newRow += "<option value='" + cuentasCorrientes[i].id + "'>Cuenta corriente " + cuentasCorrientes[i].id + "</option>";
		}
		 
		document.getElementById("cmbCuentas").innerHTML = newRow;
        document.getElementById("cmbCuentasCorriente").innerHTML = newRow;
        document.getElementById("cmbCuentasCorriente2").innerHTML = newRow;
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
    var plazo = $("#prestamoPlazo").val();

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