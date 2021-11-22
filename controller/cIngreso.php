<?php
include_once '../model/cuentaCorrienteModel.php';
include_once '../model/cuentaCreditoModel.php';

$cuentaCorriente = new cuentaCorrienteModel();
$cuentaCredito = new cuentaCreditoModel();

$list1 = array();
$list2 = array();
$list1 = $cuentaCorriente -> setList();
$list2 = $cuentaCredito -> setList();

$response = array();
$response['list1'] = $list1;
$response['list2'] = $list2;
$response['error'] = "not error";

echo json_encode($response);

unset($cuentaCorriente);
unset($cuentaCredito);
unset($list1);
unset($list2);
?>