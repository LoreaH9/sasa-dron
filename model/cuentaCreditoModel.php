<?php
if ($_SERVER['SERVER_NAME']== "bi.zerbitzaria.net") {
    include_once ("connectDataServ.php");
}
else {
    include_once ("connectData.php");
}
include_once "cuentaCreditoClass.php";

class cuentaCreditoModel extends cuentaCreditoClass{

    private $link;
    public function OpenConnect(){
        $cd=new connectData();
        try{
            $this->link=new mysqli($cd->host,$cd->userbbdd,$cd->passbbdd, $cd->ddbbname);    
        }catch(Exception $e){
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");

    }
    public function CloseConnect()
    {
        mysqli_close ($this->link);
    }

    public function setList()
    {
        $this->OpenConnect();

        $sql = "SELECT * from cuenta_credito";

        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newCuenta_credito=new cuentaCreditoModel();

            $newCuenta_credito->id=$row['id'];
            $newCuenta_credito->saldo=$row['saldo'];
            $newCuenta_credito->caduca=$row['caduca'];
            //$newCuenta_credito->descu_pacta=$row['descu_pacta'];
            $newCuenta_credito->interes=$row['interes'];
            $newCuenta_credito->idCuenta=$row['idCuenta'];

            array_push($list, $newCuenta_credito);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
}
?>