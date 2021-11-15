<?php
    class cuenta_corrienteClass{
        public $id;
        public $saldo;
        public $caduca;

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
    }
?>