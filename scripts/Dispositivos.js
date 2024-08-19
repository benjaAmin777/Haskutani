import { Usuario } from './clases/Usuario.js';

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el objeto usuario de localStorage
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON) {
        // Parsear el JSON a un objeto plano
        const usuarioObj = JSON.parse(usuarioJSON);
        const user =  new Usuario (usuarioObj.idUsuario, usuarioObj.nombre, usuarioObj.correo, usuarioObj.contrasenia, usuarioObj.fecha_registro);
        console.log(user);
    } else {
        alert('No hay información del usuario');
        // Redirigir al usuario de vuelta a la página de inicio de sesión si no hay información del usuario
        window.location.href = './index.html';
    }


});