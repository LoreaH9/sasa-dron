<?php
include_once "connectData.php";
include_once "cuentaCorrienteClass.php";

class cuentaCorrienteModel extends cuentaCorrienteClass{

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

        $sql = "SELECT * from cuenta_corriente";

        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newCuenta_corriente=new cuentaCorrienteModel();

            $newCuenta_corriente->id=$row['id'];
            $newCuenta_corriente->saldo=$row['saldo'];
            $newCuenta_corriente->caduca=$row['caduca'];

            array_push($list, $newCuenta_corriente);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }

    public function update() {
        $this->OpenConnect();
        
        $id = $this -> id;
        $saldo = $this -> saldo;
        
        $sql ="update cuenta_corriente
             set saldo = saldo + $saldo
             where id = $id";
        
        $this -> link -> query($sql);
        
        if($this->link->affected_rows == 1) {
            return "Ingreso realizado";
        }
        else {
            return "Ingreso no realizado, compruebe los datos";
        }
        
        $this -> CloseConnect();
    }
}
?>