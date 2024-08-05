import { Usuario } from './Usuario.js';

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const correo = document.getElementById('correo').value;
        const contrasenia = document.getElementById('contrasenia').value;

        const usuario = new Usuario(null, correo, contrasenia);
        usuario.login();
    });