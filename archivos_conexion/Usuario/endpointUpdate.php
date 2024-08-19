<?php
    require "DBManager.php";

    $db = new DBManager();

    if(isset($_POST['idUsuario'])){
        $id = $_POST['idUsuario'];
    }else{
        die ("Error, el id del usuario es requerido");
    }
    
    if (isset($data["nombre"])) {
        $nombre = $data["nombre"];
    }
    if (isset($data["contrasenia"])) {
        $contrasenia = $data["contrasenia"];
    }
    
    $result = $db -> edit($id, $nombre, $contrasenia);

     echo $result;

    

?>