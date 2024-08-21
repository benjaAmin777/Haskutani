export class Lectura {
    constructor(idLectura, watts, gastoMonetario, fechaInicio, fechaCorte, usuarioIdUsuario) {
        this.idLectura = idLectura; // Entero
        this.watts = watts; // Doble
        this.gastoMonetario = gastoMonetario; // Doble
        this.fechaInicio = fechaInicio; // Fecha (Date)
        this.fechaCorte = fechaCorte; // Fecha (Date)
        this.usuarioIdUsuario = usuarioIdUsuario; // Entero (idUsuario de Usuario)
    }
}