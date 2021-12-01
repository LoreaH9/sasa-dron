<?php
include_once ("../model/cuentaCorrienteModel.php");
include_once ("../model/cuentaCreditoModel.php");
include_once ("../model/movimientoModel.php");

$data = json_decode(file_get_contents("php://input"), true);

$importe = $data['importe'];
$cCorriente = $data['cCorriente'];
$cCredito = $data['cCredito'];
$concepto = $data['concepto'];
$cCorriente2 = $data['cCorriente2'];
$cCredito2 = $data['cCredito2'];
$desde = $data['desde'];
$a = $data['a'];

$response = array();

$cuentaCorriente = new cuentaCorrienteModel();
$cuentaCredito = new cuentaCreditoModel();
$movimiento = new movimientoModel();
 
if(isset($importe) && isset($desde) && isset($a)) {
    $response['error'] = "Transferencia realizada";
    if($desde == 1) {
        $cuentaCorriente->id = $cCorriente;
        $cuentaCorriente->saldo = $importe;
        $cuentaCorriente -> retirada();
        
        $movimiento->idCorriente = $cCorriente;
        $movimiento->importe = $importe;
        $movimiento->concepto = $concepto;
        $movimiento -> retiradaCorriente();
        
    }
    else if($desde == 2){
        $cuentaCredito->id = $cCredito;
        $cuentaCredito->saldo = $importe;
        $cuentaCredito -> retirada();
        
        $movimiento->idCredito = $cCredito;
        $movimiento->importe = $importe;
        $movimiento->concepto = $concepto;
        $movimiento -> retiradaCredito();
    }

    if($a == 1 && $desde == 1) {
        $cuentaCredito->id = $cCredito2;
        $cuentaCredito->saldo = $importe;
        $cuentaCredito -> ingreso();
        
        $movimiento->idCredito = $cCredito2;
        $movimiento->importe = $importe;
        $movimiento->concepto = $concepto;
        $movimiento -> insertCredito();
    }
    else if($a == 1 && $desde == 2){
        $cuentaCorriente->id = $cCorriente2;
        $cuentaCorriente->saldo = $importe;
        $cuentaCorriente -> update();
        
        $movimiento->idCorriente = $cCorriente2;
        $movimiento->importe = $importe;
        $movimiento->concepto = $concepto;
        $movimiento -> insert();
    }
}
else {
    $response['error'] = "No se realizo la transferencia, compruebe los datos";
}
echo json_encode($response);
?>