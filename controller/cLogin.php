<?php

$data=json_decode(file_get_contents("php://input"),true);

$email=$data['email'];
$password=$data['password'];

$response=array();

