
<?php
    require "DBManager.php";

    $db = new DBManager();

    $result = $db->show();

    if($result) {
        echo json_encode($result);
    } else {
        echo json_encode(["status" => "error", "message" => "No se pudieron obtener los usuarios"]);
    }

?>