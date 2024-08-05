export class Usuario {
    constructor(nombre, correo, contrasenia) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasenia = contrasenia;
    }

    registro() {
        const datosUsuario = {
            nombre: this.nombre,
            correo: this.correo,
            contrasenia: this.contrasenia
        };
        console.error(JSON.stringify(datosUsuario));

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
                window.location.href = "./focos.html";
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            alert('Error al registrar el usuario');
            console.error('Error:', error);
        });
    }

    async login() {
        try {
            const response = await fetch('http://localhost/haskutani/archivos_conexion/Usuario/endpointRead.php');
            const usuarios = await response.json();//Otra forma de hacer la solicitu sin promesas
            
            let usuarioEncontrado = false;

            usuarios.forEach(usuario => {
                if (usuario.correo === this.correo && usuario.contrasenia === this.contrasenia) {
                    usuarioEncontrado = usuario;
                }
            });

            if (usuarioEncontrado) {
                this.nombre=usuarioEncontrado.nombre;
                this.correo=usuarioEncontrado.correo;
                this.contrasenia=usuarioEncontrado.contrasenia;
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            alert('Error al iniciar sesión');
            return ;
        }
    }
}