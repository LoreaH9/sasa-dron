<?php
include_once "connect_data.php";
include_once "movimientoClass.php";

class movimientoModel extends movimientoClass{

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

        $sql = "SELECT * from movimiento";
        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newMovimiento=new movimientoModel();

            $newMovimiento->id=$row['id'];
            $newMovimiento->fecha=$row['fecha'];
            $newMovimiento->fechaValor=$row['fechaValor'];
            $newMovimiento->concepto=$row['concepto'];
            $newMovimiento->importe=$row['importe'];
            $newMovimiento->saldo=$row['saldo'];
            $newMovimiento->dias=$row['dias'];
            $newMovimiento->idUsuario=$row['idUsuario'];
            $newMovimiento->idCredito=$row['idCredito'];
            $newMovimiento->idCorriente=$row['idCorriente'];
            
            array_push($list, $newMovimiento);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
}
?>