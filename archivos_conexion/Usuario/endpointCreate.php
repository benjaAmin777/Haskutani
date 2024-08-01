<?php
    //endpoint de creación de usuarios
    require "DBManager.php";

    $db = new DBManager();


    if(isset($_POST["nombre"])){
        $nombre = $_POST["nombre"];
    }
    if(isset($_POST['correo'])){
        $correo = $_POST['correo'];
    }
    if(isset($_POST["contrasenia"])){
        $contrasenia = $_POST["contrasenia"];
    }

    // Verificar si el correo ya existe
    $link = $db->open();
    $checkEmail = $link->prepare("SELECT * FROM Usuario WHERE correo = ?");
    $checkEmail->bind_param("s", $correo);
    $checkEmail->execute();
    $result = $checkEmail->get_result();
    $checkEmail->close();

    if ($result->num_rows > 0) {
        $error = "Este correo ya está registrado.";
        header("Location: ../../registro.html?error=" . urlencode($error));
        exit();
    } else {
        $result = $db -> add($nombre, $correo, $contrasenia);
        header("Location: ../../focos.html");
        echo $result;
    }


?>