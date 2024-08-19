export class Usuario {
    constructor(idUsuario, nombre, correo, contrasenia, fecha_registro) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.fecha_registro = fecha_registro;
    }

    registro() {
        const datosUsuario = {
            nombre: this.nombre,
            correo: this.correo,
            contrasenia: this.contrasenia
        };

        fetch('http://localhost/haskutani/archivos_conexion/Usuario/endpointCreate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert('Registro exitoso');
                window.location.href = "./login.html";
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            alert('Error al registrar el usuario');
            console.error('Error:', error);
        });
    }


    update() {
        const datosUsuario = {
            idUsuario: this.idUsuario,
            nombre: this.nombre,
            contrasenia: this.contrasenia
        };

        fetch('http://localhost/haskutani/archivos_conexion/Usuario/endpointUpdate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert('Registro exitoso');
                window.location.href = "./login.html";
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            alert('Error al registrar el usuario');
            console.error('Error:', error);
        });
    }

    
}
