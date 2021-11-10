<?php
include_once "usuarioClass.php";
include_once "connect_data.php";
class usuarioModel extends usuarioClass {
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

    public function findUser(){
        $this->OpenConnect();

        $email=$this->email;
        $password=$this->contrasenia;

        $sql= "SELECT * FROM usuario WHERE email='$email' AND contrasenia='$password'";
        $result= $this->link->query($sql);

        $exist=false;

        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $exist=true;
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->admin=$row['admin'];
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $exist;

    }

}