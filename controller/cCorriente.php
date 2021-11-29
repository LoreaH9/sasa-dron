<?php
include_once '../model/cuentaCorrienteModel.php';

$cuentaCorriente = new cuentaCorrienteModel();

$list = array();
$list = $cuentaCorriente -> setList();

$response = array();
$response['list'] = $list;
$response['error'] = "not error";

echo json_encode($response);

unset($cuentaCorriente);
unset($list);
?>