<?php
    class movimientoClass{
        public $id;
        public $fecha;
        public $fechaValor;
        public $concepto;
        public $importe;
        public $saldo;
        public $dias;
        public $idUsuario;
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
         * Get the value of fecha
         */ 
        public function getFecha()
        {
                return $this->fecha;
        }

        /**
         * Set the value of fecha
         *
         * @return  self
         */ 
        public function setFecha($fecha)
        {
                $this->fecha = $fecha;

                return $this;
        }

        /**
         * Get the value of fechaValor
         */ 
        public function getFechaValor()
        {
                return $this->fechaValor;
        }

        /**
         * Set the value of fechaValor
         *
         * @return  self
         */ 
        public function setFechaValor($fechaValor)
        {
                $this->fechaValor = $fechaValor;

                return $this;
        }

        /**
         * Get the value of concepto
         */ 
        public function getConcepto()
        {
                return $this->concepto;
        }

        /**
         * Set the value of concepto
         *
         * @return  self
         */ 
        public function setConcepto($concepto)
        {
                $this->concepto = $concepto;

                return $this;
        }

        /**
         * Get the value of importe
         */ 
        public function getImporte()
        {
                return $this->importe;
        }

        /**
         * Set the value of importe
         *
         * @return  self
         */ 
        public function setImporte($importe)
        {
                $this->importe = $importe;

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
         * Get the value of dias
         */ 
        public function getDias()
        {
                return $this->dias;
        }

        /**
         * Set the value of dias
         *
         * @return  self
         */ 
        public function setDias($dias)
        {
                $this->dias = $dias;

                return $this;
        }

        /**
         * Get the value of idUsuario
         */ 
        public function getIdUsuario()
        {
                return $this->idUsuario;
        }

        /**
         * Set the value of idUsuario
         *
         * @return  self
         */ 
        public function setIdUsuario($idUsuario)
        {
                $this->idUsuario = $idUsuario;

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