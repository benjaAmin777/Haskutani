import { Usuario } from './clases/Usuario.js';

// Asegúrate de que el DOM esté completamente cargado antes de intentar acceder a los elementos
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const correo = document.getElementById('correo').value;
        const contrasenia = document.getElementById('contrasenia').value;

        try {
            const response = await fetch('http://localhost/haskutani/archivos_conexion/Usuario/endpointRead.php');
            const usuariosData = await response.json(); // Obtener la lista de usuarios como JSON

            // Crear un array de instancias de la clase Usuario
            const usuarios = usuariosData.map(data => new Usuario(data.idUsuario, data.nombre, data.correo, data.contrasenia, data.fecha_registro));

            // Buscar el usuario con `find()` para obtener el objeto directamente
            const user = usuarios.find(usuario => usuario.correo === correo && usuario.contrasenia === contrasenia);

            if (user) {
                window.location.href = "./focos.html";
                sessionStorage.setItem('usuario', JSON.stringify(user));
            } else {
                alert('Correo o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            alert('Error al iniciar sesión');
        }
    });
});
