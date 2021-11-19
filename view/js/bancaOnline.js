
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
	$("#tableMovimientos").hide();
}

function showOption(event) {
    preventClick(event);
    hideAllTables();
    $("#table"+event.currentTarget.id+"").show();
	$("#MovimientosCuentaCredito").click(tableMovimientosList());
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
		movimientos.add("acreedor");//hartzekoduna
		movimientos.add("deudor");//zorduna
		
		var newRow = "";
		for(let k=0; k<movimientos.length; k++){
//		newRow +="<tr class='table-danger'>"+"<td>"+movimientos[k].id+"</td>"
//							+"<td>"+movimientos[k].fecha+"</td>"
//							+"<td>"+movimientos[k].fechaValor+"</td>"
//							+"<td>"+movimientos[k].concepto+"</td>"
//							+"<td>"+movimientos[k].importe+"</td>"
//							+"<td>"+movimientos[k].saldo+"</td>"
//							+"<td>"+movimientos[k].dias+"</td>"
//							+"<td>"+movimientos[k].idUsuario+"</td>"
//							+"<td>"+movimientos[k].idCredito+"</td>"
//							+"<td>"+movimientos[k].idCorriente+"</td>"
//						+"</tr>"
		if(k>0 && movimientos[k].saldo > movimientos[(k-1)].saldo){
			movimientos[k].acreedor = movimientos[k].saldo - movimientos[(k-1)].saldo;
		}

		newRow +="<tr class='table-danger'>"+"<td>"+movimientos[k].id+"</td>"
							+"<td>"+movimientos[k].fecha+"</td>"
							+"<td>"+movimientos[k].fechaValor+"</td>"
							+"<td>"+movimientos[k].concepto+"</td>"
							+"<td>"+movimientos[k].importe+"</td>"
							+"<td>"+movimientos[k].acreedor+"</td>"//a�adir artzekoduna
							+"<td>"+movimientos[k].saldo+"</td>"
							+"<td>"+movimientos[k].dias+"</td>"
							+"<td>"+movimientos[k].importe+"</td>"//zorduna
							//artzekoduna
							//gaineratikoa
//							+"<td>"+movimientos[k].idUsuario+"</td>"
//							+"<td>"+movimientos[k].idCredito+"</td>"
//							+"<td>"+movimientos[k].idCorriente+"</td>"
						+"</tr>"
		}
		$("#tableMovCreBody").html(newRow);
	}).catch(error => console.error('Error status:', error));	   
}


