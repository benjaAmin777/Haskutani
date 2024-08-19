<?php
    require "DBManager.php";

    $db = new DBManager();

    // Leer el cuerpo de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['idUsuario'])) {
        $id = $data['idUsuario'];
    } else {
        die("Error, el id del usuario es requerido");
    }

    $nombre = isset($data['nombre']) ? $data['nombre'] : null;
    $contrasenia = isset($data['contrasenia']) ? $data['contrasenia'] : null;

    // Asumiendo que tu DBManager tiene un método `edit` para actualizar el usuario
    $result = $db->edit($id, $nombre, $contrasenia);
    
    if ($result) {
        $response = ["status" => "success", "message" => "Actualización exitosa"];
    } else {
        $response = ["status" => "error", "message" => "Error al actualizar el usuario"];
    }

    echo json_encode($response);
?>
