<?php
include_once "connect_data.php";
include_once "leasingClass.php";

class leasingModel extends leasingClass{

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

    
}
?>