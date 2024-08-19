import { Usuario } from './clases/Usuario.js';

let usuarioObj;

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el objeto usuario de sessionStorage
    const usuarioJSON = sessionStorage.getItem('usuario');
    
    if (usuarioJSON) {
        usuarioObj = JSON.parse(usuarioJSON);
        console.log(usuarioObj);

        document.getElementById('user_name').textContent = usuarioObj.nombre;
        document.getElementById('user_email').textContent = usuarioObj.correo;

        const usuario = document.getElementById('user');
        usuario.textContent += ' ' + usuarioObj.nombre;

        const correo = document.getElementById('correo');
        correo.textContent += ' ' + usuarioObj.correo;

        const fecha = document.getElementById('fecha');
        fecha.textContent += ' ' + usuarioObj.fecha_registro;
    } else {
        alert('No hay información del usuario');
        window.location.href = './index.html';
    }

});

document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Cambia const a let para permitir reasignación
    let nombre = document.getElementById('editProfileName').value;
    let contrasenia = document.getElementById('editProfileContra').value;
    let confirm = document.getElementById('editConfirmContra').value;

    if (!nombre) {
        nombre = usuarioObj.nombre;
        alert('Nombre no proporcionado, usando el nombre actual');
    }
    if (!contrasenia) {
        contrasenia = usuarioObj.contrasenia;
        confirm = usuarioObj.contrasenia;
    }
    if (contrasenia !== confirm) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    // Crear un nuevo objeto Usuario y actualizarlo
    const usuario = new Usuario(usuarioObj.idUsuario, nombre, usuarioObj.correo, contrasenia, usuarioObj.fecha_registro);
    usuario.update();
});

const btnMenuPerfil = document.getElementById('perfil');
btnMenuPerfil.addEventListener('click', function() {
    sessionStorage.setItem('usuario', JSON.stringify(usuarioObj));
    window.location.href = './perfil.html';
});

const btnMenuDispositivos = document.getElementById('dispositivos');
btnMenuDispositivos.addEventListener('click', function() {
    sessionStorage.setItem('usuario', JSON.stringify(usuarioObj));
    window.location.href = './focos_dispositivos.html';
    alert('Cargando Dispositivos');
});

const btnMenuDatos = document.getElementById('datos');
btnMenuDatos.addEventListener('click', function() {
    sessionStorage.setItem('usuario', JSON.stringify(usuarioObj));
    window.location.href = './focos_datos_consumo.html';
});
