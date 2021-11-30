<?php
include_once ("../model/cuentaCorrienteModel.php");
include_once ("../model/movimientoModel.php");

$data = json_decode(file_get_contents("php://input"), true);

$importe = $data['importe'];
$cuenta = $data['cuenta'];
$concepto = $data['concepto'];

$response = array();

$cuentaCorriente = new cuentaCorrienteModel();
$movimiento = new movimientoModel();
 
if(isset($importe)) {
    $cuentaCorriente->id = $cuenta;
    $movimiento->idCorriente = $cuenta;

    if(isset($cuenta)) {
        $cuentaCorriente->saldo = $importe;
        $movimiento->importe = $importe;
    }
    if(isset($concepto)) {
        $movimiento->concepto = $concepto;
    }
     
    $response['error'] = $cuentaCorriente -> update();
    $movimiento -> insert();
}
else {
    $response['error'] = "No se realizo el ingreso, compruebe los datos";
}
echo json_encode($response);
?>