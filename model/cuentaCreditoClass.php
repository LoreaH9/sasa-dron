<?php
    class cuentaCreditoClass{
        public $id;
        public $saldo;
        public $caduca;
        public $descu_pacta;
        public $interes;
        public $idCuenta;

        /**
         * Get the value of id
         */ 
        public function getId()
        {
                return $this->id;
        }

        /**
         * Set the value of id
         *
         * @return  self
         */ 
        public function setId($id)
        {
                $this->id = $id;

                return $this;
        }

        /**
         * Get the value of saldo
         */ 
        public function getSaldo()
        {
                return $this->saldo;
        }

        /**
         * Set the value of saldo
         *
         * @return  self
         */ 
        public function setSaldo($saldo)
        {
                $this->saldo = $saldo;

                return $this;
        }

        /**
         * Get the value of caduca
         */ 
        public function getCaduca()
        {
                return $this->caduca;
        }

        /**
         * Set the value of caduca
         *
         * @return  self
         */ 
        public function setCaduca($caduca)
        {
                $this->caduca = $caduca;

                return $this;
        }

        /**
         * Get the value of descu_pacta
         */ 
        public function getDescu_pacta()
        {
                return $this->descu_pacta;
        }

        /**
         * Set the value of descu_pacta
         *
         * @return  self
         */ 
        public function setDescu_pacta($descu_pacta)
        {
                $this->descu_pacta = $descu_pacta;

                return $this;
        }

        /**
         * Get the value of interes
         */ 
        public function getInteres()
        {
                return $this->interes;
        }

        /**
         * Set the value of interes
         *
         * @return  self
         */ 
        public function setInteres($interes)
        {
                $this->interes = $interes;

                return $this;
        }

        /**
         * Get the value of idCuenta
         */ 
        public function getIdCuenta()
        {
                return $this->idCuenta;
        }

        /**
         * Set the value of idCuenta
         *
         * @return  self
         */ 
        public function setIdCuenta($idCuenta)
        {
                $this->idCuenta = $idCuenta;

                return $this;
        }
    }
?>