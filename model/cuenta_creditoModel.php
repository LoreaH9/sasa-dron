<?php
include_once "connect_data.php";
include_once "cuenta_creditoClass.php";

class cuenta_creditoModel extends cuenta_creditoClass{

    private $link;
    public function OpenConnect(){
        $cd=new connect_data();
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

        $sql = "select * from cuenta_credito";

        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newCuenta_credito=new cuenta_creditoModel();

            $newCuenta_credito->id=$row['id'];
            $newCuenta_credito->saldo=$row['saldo'];
            $newCuenta_credito->caduca=$row['caduca'];
            $newCuenta_credito->descu_pacta=$row['descu_pacta'];
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