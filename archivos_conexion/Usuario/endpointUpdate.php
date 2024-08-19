<?php
    require "DBManager.php";

    $db = new DBManager();

    if(isset($_POST['id'])){
        $id = $_POST['id'];
    }else{
        die ("Error, el id del usuario es requerido");
    }

    $strikes = isset($_POST['strikes']) ? $_POST['strikes'] : null;
    $activo = isset($_POST['activo']) ? $_POST['activo'] : null;
    if($activo == "true"){
        $activoEntero = 1;
    }
    else{
        $activoEntero = 0;
    }
    
    $result = $db -> edit($id, $strikes, $activoEntero);

     echo $result;

    

?>