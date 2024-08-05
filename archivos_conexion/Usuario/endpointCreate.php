<?php
    //endpoint de creación de usuarios
    require "DBManager.php";

    $db = new DBManager();


    // Obtener los datos JSON enviados
    $data = json_decode(file_get_contents('php://input'), true);


    if (isset($data["nombre"])) {
        $nombre = $data["nombre"];
    }
    if (isset($data['correo'])) {
        $correo = $data['correo'];
    }
    if (isset($data["contrasenia"])) {
        $contrasenia = $data["contrasenia"];
    }

    // Verificar si el correo ya existe
    $link = $db->open();
    $checkEmail = $link->prepare("SELECT * FROM Usuario WHERE correo = ?");
    $checkEmail->bind_param("s", $correo);
    $checkEmail->execute();
    $result = $checkEmail->get_result();
    $checkEmail->close();

    if ($result->num_rows > 0) {
        $response = ["status" => "error", "message" => "Este correo ya está registrado."];
    } else {
        $result = $db->add($nombre, $correo, $contrasenia);
        $response = ["status" => "success", "message" => $result];
    }

    echo json_encode($response);
?>