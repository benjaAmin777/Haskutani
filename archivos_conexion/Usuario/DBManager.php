<?php

class DBManager {
    private $db;
	private $host;
	private $user;
	private $pass;
    private $port;

    public function __construct() {
        $this->db = "Haskutani_BD";
        $this->host = "localhost";
        $this->user = "root";
        $this->pass = null;
        $this->port = 3306;
    }


    public function open()
    {
        $link = mysqli_connect(
            $this->host, $this->user, $this->pass, $this->db, $this->port
        ) or die('Error al abrir conexion');

        return $link;
    }

    private function close($link)
    {
        mysqli_close($link);
    }

    public function show()//Por defecto p es null, pero si le mando algo p va a valer eso que yo mande
    {
        $link = $this->open();
        $sql = "SELECT * FROM Usuario";
        $query = mysqli_query($link, $sql);

        if (!$query) {
            die('Error en la consulta: ' . mysqli_error($link));
        }

        $usuarios = [];
        while ($row = mysqli_fetch_assoc($query)) {
            $usuarios[] = $row;
        }

        $this->close($link);

        return $usuarios;
    }

    public function add($nombre, $correo, $contrasenia)
    {
        $link = $this->open();

        $sql = "INSERT INTO Usuario(nombre,correo,contrasenia,fecha_registro) VALUES(?,?,?,CURDATE())";

        // Prepara la consulta
		$query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "sss", //Se remplazan con 3 s ya que los tres datos son string
            $nombre, 
            $correo,
            $contrasenia
        );

        // Ejecuta la query
        if (mysqli_stmt_execute($query)) {
            $resultado = "Registro exitoso";
        } else {
            $resultado = "Error al insertar: " . mysqli_error($link);
        }

        $this->close($link);

        return $resultado;

    }

    public function edit($id, $nombre, $contrasenia)
{
    $link = $this->open();

    // Prepara la consulta SQL
    $sql = "UPDATE Usuario SET nombre=?, contrasenia=? WHERE idUsuario=?";

    // Prepara la declaración
    $query = mysqli_prepare($link, $sql);

    if (!$query) {
        die('Error en la preparación de la consulta: ' . mysqli_error($link));
    }

    // Enlaza los parámetros
    // "ssi" - s: string, i: entero
    mysqli_stmt_bind_param($query, "ssi", $nombre, $contrasenia, $id);

    // Ejecuta la consulta
    $resultado = mysqli_stmt_execute($query);

    if (!$resultado) {
        die('Error al ejecutar la consulta: ' . mysqli_stmt_error($query));
    }

    // Cierra la conexión
    $this->close($link);

    return $resultado;
}


}

?>
