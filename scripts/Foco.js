document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el objeto usuario de localStorage
    const usuarioJSON = localStorage.getItem('usuario');
    if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        document.getElementById('userInfo').textContent = `Bienvenido, ${usuario.correo}`;
    } else {
        alert('No hay información del usuario');
        // Redirigir al usuario de vuelta a la página de inicio de sesión si no hay información del usuario
        window.location.href = './index.html';
    }
});