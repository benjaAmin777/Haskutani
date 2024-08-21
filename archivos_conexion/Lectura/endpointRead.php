
<?php
    require "DBManager.php";

    $db = new DBManager();

    $data = json_decode(file_get_contents('php://input'), true);

    $result = $db->show();

    if($result) {
        echo json_encode($result);
    } else {
        echo json_encode(["status" => "error", "message" => "No se pudieron obtener las lecturas"]);
    }

?>