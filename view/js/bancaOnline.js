
$(document).ready(init);

function init() {
    option();
    hideAllTables();
	tableMovimientosList();
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
    $("#tableMovimientosCuenta").hide();
    $("#tableLeasing").hide();
    $("#tableMovimientosCuentaCredito").hide();
	$("#tableMovimientos").hide();
}

function showOption(event) {
    preventClick(event);
    hideAllTables();
    $("#table"+event.currentTarget.id+"").show();
	console.log("Boton clicado: " + event.currentTarget.id);
}

function tableMovimientosList(){
	console.log("Llega a movList");
	var url ="controller/cMovimientos.php";
	fetch(url, {
	  method: 'POST', // or 'POST'
	  //body: JSON.stringify(data), // data can be `string` or {object}!
	  //headers:{'Content-Type': 'application/json'}  //input data	  
	}).then(res => res.json()).then(result => {
		console.log(result);
		
		var movimientos = result.list;
		movimientos[0]["acreedor"];//hartzekoduna
		movimientos[0]["deudor"];//zorduna
		movimientos[0]["movAcreedor"];//segunda columna hartzekoduna
		movimientos[0]["movDeudor"];//segunda columna zorduna
		movimientos[0]["resto"];//gaineratikoa
		console.log(movimientos);
		var newRow = "";
		for(let k=0; k<movimientos.length; k++){
//		if(k>0 && parseInt(movimientos[k].saldo) > parseInt(movimientos[(k-1)].saldo)){
//			console.log(movimientos[k].id + ": Se suma saldo");
//			movimientos[k].acreedor = (parseInt(movimientos[k].saldo) - parseInt(movimientos[(k-1)].saldo))+".000";
//			movimientos[k].deudor = "";
//		} else if (k>0 && parseInt(movimientos[k].saldo) < parseInt(movimientos[(k-1)].saldo)){
//			console.log(movimientos[k].id + ": Se resta saldo");
//			movimientos[k].deudor = (parseInt(movimientos[(k-1)].saldo) - parseInt(movimientos[k].saldo))+".000";
//			movimientos[k].acreedor = "";
//		} else {
//			console.log(movimientos[k].id + ": Se mantiene el saldo")
//			movimientos[k].deudor = "";
//			movimientos[k].acreedor = "";
//		}

		if(movimientos[k].importe.includes("-")){ 			//Se resta saldo
			console.log(movimientos[k].id + ": Se resta saldo");
		
			movimientos[k].deudor = movimientos[k].importe;
			movimientos[k].acreedor = "";
			movimientos[k].movDeudor = movimientos[k].saldo+"x"+movimientos[k].dias
			movimientos[k].movAcreedor = "";
		} else if (!movimientos[k].importe.includes("-")){	//Se suma saldo
			console.log(movimientos[k].id + ": Se suma saldo");
		
			movimientos[k].acreedor = movimientos[k].importe;
			movimientos[k].deudor = "";
			movimientos[k].movAcreedor = movimientos[k].saldo+"x"+movimientos[k].dias
			movimientos[k].movDeudor = "";
		} else { 											//Se mantiene saldo
			console.log(movimientos[k].id + ": Se mantiene saldo");
		
			movimientos[k].acreedor = "";
			movimientos[k].deudor = "";
		}
		
		if (parseInt(movimientos[k].saldo) < -40000){
			movimientos[k].resto = parseInt(movimientos[k].saldo) - (-40000);
			movimientos[k].resto *= -1; //Convierte numeros negativos en positivos
		} else {
			movimientos[k].resto = "";
		}
		
		if (parseInt(movimientos[k].saldo) < 0){
			movimientos[k].saldo += " Z"
			newRow +="<tr class='table-danger'>"+"<th scope='row'>"+movimientos[k].id+"</th>"	
		} else {
			movimientos[k].saldo += " H"
			newRow +="<tr class='table'>"+"<th scope='row'>"+movimientos[k].id+"</td>"
		}
			newRow +=
							 "<td>"+movimientos[k].fecha+"</td>"
							+"<td>"+movimientos[k].fechaValor+"</td>"
							+"<td>"+movimientos[k].concepto+"</td>"
							+"<td>"+movimientos[k].deudor+"</td>"//zorduna
							+"<td>"+movimientos[k].acreedor+"</td>"//artzekoduna
							+"<td>"+movimientos[k].saldo+"</td>"
							+"<td>"+movimientos[k].dias+"</td>"
							+"<td>"+movimientos[k].movDeudor+"</td>"//zorduna, saldo y dias
							+"<td>"+movimientos[k].movAcreedor+"</td>"//artzekoduna, saldo y dias
							+"<td>"+movimientos[k].resto+"</td>"//gaineratikoa, si el saldo es negativo, por cuanto
						+"</tr>"
		}
		$("#tableMovCreBody").html(newRow);
	}).catch(error => console.error('Error status:', error));	   
}


