import { Usuario } from './clases/Usuario.js';


let usuarioObj
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el objeto usuario de localStorage
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON) {
        // Parsear el JSON a un objeto plano
        usuarioObj = JSON.parse(usuarioJSON);

        console.log(usuarioObj);

        document.getElementById('user_name').textContent = usuarioObj.nombre; // Cambia 'nombre' por la propiedad correcta de tu objeto
        document.getElementById('user_email').textContent = usuarioObj.correo; // Cambia 'correo' por la propiedad correcta de tu objeto

        const usuario = document.getElementById('user');
        usuario.textContent = usuario.textContent +' ' + usuarioObj.nombre;

        const correo =  document.getElementById('correo');
        correo.textContent = correo.textContent +' ' + usuarioObj.correo;

        const fecha = document.getElementById('fecha');
        fecha.textContent = fecha.textContent +' ' + usuarioObj.fecha_registro;

        
    } else {
        alert('No hay información del usuario');
        // Redirigir al usuario de vuelta a la página de inicio de sesión si no hay información del usuario
        window.location.href = './index.html';
    }
});


document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('editProfileName').value;
    const contrasenia = document.getElementById('editProfileContra').value;
    const confirm = document.getElementById('editConfirmContra').value;

    // No uses `textContent`, usa `value` para obtener los datos de los campos de entrada
    if(nombre === ''){
        nombre = usuarioObj.nombre;
    }
    if(contrasenia === '' && confirm === ''){
        contrasenia = usuarioObj.contrasenia;
        const usuario = new Usuario(usuarioObj.idUsuario, nombre, usuarioObj.correo, contrasenia, usuarioObj.fecha_registro);
        usuario.update();
    }else if(contrasenia === confirm){
        const usuario = new Usuario(usuarioObj.idUsuario, nombre, usuarioObj.correo, contrasenia, usuarioObj.fecha_registro);
        usuario.update();
    }
});



const btnMenuPerfil = document.getElementById('perfil');
btnMenuPerfil.addEventListener('click', function(){
    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = './perfil.html';
})


const btnMenuDispositivos = document.getElementById('dispositivos');
btnMenuDispositivos.addEventListener('click', function(){
    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = './focos_dispositivos.html';
    alert('Cargando Dispositivos');
})

const btnMenuDatos = document.getElementById('datos');
btnMenuDatos.addEventListener('click', function(){
    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = './focos_datos_consumo.html';
})

