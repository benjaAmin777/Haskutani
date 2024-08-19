import { Usuario } from './clases/Usuario.js';

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasenia').value;

    const usuario = new Usuario(null, nombre, correo, contrasenia, null);
    usuario.registro();
});

