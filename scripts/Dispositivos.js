import { Usuario } from './clases/Usuario.js';
import { Foco } from './clases/Foco.js';

document.addEventListener('DOMContentLoaded', async function() {
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON) {
        const usuarioObj = JSON.parse(usuarioJSON);
        const usuario = new Usuario(usuarioObj.idUsuario, usuarioObj.nombre, usuarioObj.correo, usuarioObj.contrasenia, usuarioObj.fecha_registro);
        console.log(usuario);
        
        try {
            const response = await fetch('http://localhost/haskutani/archivos_conexion/Foco/endpointRead.php');
            const focosData = await response.json();
            
            const focos = focosData.map(data => 
                new Foco(
                    data.idFoco,
                    data.direccionMac,
                    data.locacion,
                    data.wattsAcumulados,
                    data.estado,
                    data.humedad,
                    data.temperatura,
                    data.fecha_Inicio,
                    data.Usuario_idUsuario
                )
            );

            const focosUsuario = focos.filter(foco => foco.Usuario_idUsuario === usuario.idUsuario);
            const container = document.getElementById('focosContainer');
            container.innerHTML = '';

            focosUsuario.forEach(foco => {
                const focoElement = document.createElement('div');
                focoElement.className = 'col';

                focoElement.innerHTML = `
                    <a class="text-decoration-none">
                        <div class="card p-3">
                            <img src="images/casa-inteligente.png" class="position-absolute top-0 end-0" alt="Icono" style="width: 60px; height: 60px;">
                            <div class="Foco ${foco.locacion.toLowerCase()}">
                                <h5 class="card-title">${foco.locacion}</h5>
                                <p class="card-text" style="color: ${foco.estado === 1 ? 'orange' : 'red'};">${foco.estado === 1 ? 'Encendido' : 'Apagado'}</p>
                                <p class="card-text">Temperatura: ${foco.temperatura} °C</p>
                                <p class="card-text">Humedad: ${foco.humedad} %</p>
                                <p class="card-text">Consumo: ${foco.wattsAcumulados} Watts</p>
                                
                                <!-- Slider con valor -->
                                <input type="range" class="form-range mt-3" min="0" max="100" value="50" id="slider_${foco.idFoco}">
                                <span id="sliderValue_${foco.idFoco}">50</span>% <!-- Mostrar valor del slider -->

                                <!-- Botones -->
                                <div class="d-flex justify-content-around mt-3">
                                    <button class="btn btn-success" id="on_${foco.idFoco}">Encender</button>
                                    <button class="btn btn-danger" id="off_${foco.idFoco}">Apagar</button>
                                    <button class="btn btn-warning" id="dim_${foco.idFoco}">Atenuar</button>
                                </div>
                            </div>
                        </div>
                    </a>
                `;

                container.appendChild(focoElement);

                // Manejador para el botón de encender
                document.getElementById(`on_${foco.idFoco}`).addEventListener('click', function() {
                    sendMessage('on', null, foco.direccionMac);
                });

                // Manejador para el botón de apagar
                document.getElementById(`off_${foco.idFoco}`).addEventListener('click', function() {
                    sendMessage('off', null, foco.direccionMac);
                });

                // Manejador para el botón de atenuar
                document.getElementById(`dim_${foco.idFoco}`).addEventListener('click', function() {
                    const sliderValue = document.getElementById(`slider_${foco.idFoco}`).value;
                    sendMessage('dim', sliderValue, foco.direccionMac);
                });

                // Manejador para actualizar el valor del slider
                const slider = document.getElementById(`slider_${foco.idFoco}`);
                const sliderValueDisplay = document.getElementById(`sliderValue_${foco.idFoco}`);
                
                slider.addEventListener('input', function() {
                    sliderValueDisplay.textContent = slider.value; // Actualiza el valor mostrado
                });
            });

        } catch (error) {
            console.error('Error al obtener focos:', error);
            alert('Error al obtener los focos');
        }
    } else {
        alert('No hay información del usuario');
        window.location.href = './index.html';
    }
});

function sendMessage(action, percentage, macAddress) {
    let request = '';

    if (action === 'dim') {
        request = `dim,${percentage}-${macAddress}`;
    } else {
        request = `${action}-${macAddress}`;
    }

    fetch('https://sqtwylowut.api.ambe.mx/control/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "request": request }),
        mode: 'no-cors',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



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