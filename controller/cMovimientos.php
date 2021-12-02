<?php 

include_once ('../model/movimientoModel.php');

$data=json_decode(file_get_contents("php://input"),true);

$movimiento = new movimientoModel();

$response = array();
$response["list"]=$movimiento->setList();
$response["error"]="no error";

echo json_encode($response);
?>