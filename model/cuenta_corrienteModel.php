<?php
include_once "connect_data.php";
include_once "cuenta_corrienteClass.php";

class cuenta_corrienteModel extends cuenta_corrienteClass{

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

        $sql = "SELECT * from cuenta_corriente";

        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newCuenta_corriente=new cuenta_corrienteModel();

            $newCuenta_corriente->id=$row['id'];
            $newCuenta_corriente->saldo=$row['saldo'];
            $newCuenta_corriente->caduca=$row['caduca'];

            array_push($list, $newCuenta_corriente);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
}
?>