document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el objeto usuario de localStorage
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON) {
        // Parsear el JSON a un objeto plano
        const usuarioObj = JSON.parse(usuarioJSON);

        console.log(usuarioObj);

        // Actualizar la interfaz de usuario con los datos del usuario
        document.getElementById('userInfo').textContent = `¡Bienvenido ${usuarioObj.nombre} a Ambe Soluciones Inteligentes!`;
    } else {
        alert('No hay información del usuario');
        // Redirigir al usuario de vuelta a la página de inicio de sesión si no hay información del usuario
        window.location.href = './index.html';
    }
});


const btnMenuPerfil = document.getElementById('perfil');
btnMenuPerfil.addEventListener('click', function(){
    localStorage.setItem('usuario', JSON.stringify(usuario));
})


const btnMenuDispositivos = document.getElementById('dispositivos');
btnMenuDispositivos.addEventListener('click', function(){
    localStorage.setItem('usuario', JSON.stringify(usuario));
})

const btnMenuDatos = document.getElementById('datos');
btnMenuDatos.addEventListener('click', function(){
    localStorage.setItem('usuario', JSON.stringify(usuario));
})

