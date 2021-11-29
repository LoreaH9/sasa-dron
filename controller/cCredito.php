<?php
include_once '../model/cuentaCreditoModel.php';

$cuentaCredito = new cuentaCreditoModel();

$list = array();
$list = $cuentaCredito -> setList();

$response = array();
$response['list'] = $list;
$response['error'] = "not error";

echo json_encode($response);

unset($cuentaCredito);
unset($list);
?>