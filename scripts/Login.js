import { Usuario } from './clases/Usuario.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
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
                    localStorage.setItem('usuario', JSON.stringify(user));
                    window.location.href = "./focos.html"; 
                } else {
                    alert('Correo o contraseña incorrectos');
                }
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                alert('Error al iniciar sesión');
            }
        });
    } else {
        console.error('El formulario con ID "loginForm" no se encontró.');
    }
});
