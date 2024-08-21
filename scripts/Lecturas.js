import { Usuario } from './clases/Usuario.js';
import { Lectura } from './clases/Lectura.js';

const ctx = document.getElementById('consumoChart').getContext('2d');
const consumoChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // Etiquetas para los meses
        datasets: [{
            label: 'Watts',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }, {
            label: 'Gasto Monetario',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Mes'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Consumo'
                },
                beginAtZero: true
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', async function() {
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON) {
        const usuarioObj = JSON.parse(usuarioJSON);
        const usuario = new Usuario(usuarioObj.idUsuario, usuarioObj.nombre, usuarioObj.correo, usuarioObj.contrasenia, usuarioObj.fecha_registro);
        console.log(usuario);

        try {
            const respuesta = await fetch('http://localhost/haskutani/archivos_conexion/Lectura/endpointRead.php');
            const lecturasData = await respuesta.json();
            console.log(lecturasData); // Verifica el formato de los datos

            if (Array.isArray(lecturasData)) {
                // Asegúrate de convertir los datos a los tipos correctos
                const lecturas = lecturasData.map(data => 
                    new Lectura(
                        parseInt(data.idLectura),
                        parseFloat(data.watts),
                        parseFloat(data.gasto_Monetario),
                        data.fecha_Inicio,
                        data.fecha_Corte,
                        data.Usuario_idUsuario
                    )
                );

                // Filtra las lecturas para el usuario actual
                const lecturasUsuario = lecturas.filter(lectura => lectura.usuarioIdUsuario === usuario.idUsuario);

                console.log(lecturasUsuario);
                // Limpia el contenido del contenedor del formulario
                const formContainer = document.getElementById('formulariosContainer');
                formContainer.innerHTML = '';

                const mesMap = {}; // Mapa para almacenar los datos por mes

                lecturasUsuario.forEach(lectura => {
                    const fecha_Corte = new Date(lectura.fechaCorte);
                    const mesActual = fecha_Corte.toLocaleString('default', { month: 'short', year: 'numeric' });
                    
                    // Si el mes ya existe en el mapa, acumulamos los valoresa
                    mesMap[mesActual] = { watts: lectura.watts, gasto: lectura.gastoMonetario };

                    // Crear y añadir formulario para cada lectura
                    const formHTML = `
                        <div class="form-container mt-4" style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
                            <form>
                                        <div class="col-md-6 mb-3">
                                        <label class="form-label">Reporte: ${mesActual}</label>
                                    </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Watts:</label>
                                        <input type="number" class="form-control" value="${lectura.watts}" disabled>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Gasto Monetario:</label>
                                        <input type="number" class="form-control" value="${lectura.gastoMonetario}" disabled>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Fecha de Inicio:</label>
                                        <input type="date" class="form-control" value="${lectura.fechaInicio.slice(0, 10)}" disabled>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Fecha de Corte:</label>
                                        <input type="date" class="form-control" value="${lectura.fechaCorte.slice(0, 10)}" disabled>
                                    </div>
                                </div>
                            </form>
                        </div>
                    `;
                    formContainer.innerHTML += formHTML;
                });

                // Actualiza las etiquetas y los datos en la gráfica
                consumoChart.data.labels = Object.keys(mesMap);
                consumoChart.data.datasets[0].data = Object.values(mesMap).map(item => item.watts);
                consumoChart.data.datasets[1].data = Object.values(mesMap).map(item => item.gasto);
                consumoChart.update();
                Object.keys(mesMap).forEach(key => delete mesMap[key]);
            } else {
                console.error('Formato inesperado de los datos', lecturasData);
            }
        } catch (error) {
            console.error('Error al obtener las lecturas:', error);
        }
    } else {
        alert('No hay información del usuario');
        window.location.href = './index.html';
    }
});

const btnMenuPerfil = document.getElementById('perfil');
btnMenuPerfil.addEventListener('click', function(){
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = './perfil.html';
});

const btnMenuDispositivos = document.getElementById('dispositivos');
btnMenuDispositivos.addEventListener('click', function(){
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = './focos_dispositivos.html';
    alert('Cargando Dispositivos');
});

const btnMenuDatos = document.getElementById('datos');
btnMenuDatos.addEventListener('click', function(){
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = './focos_datos_consumo.html';
});
