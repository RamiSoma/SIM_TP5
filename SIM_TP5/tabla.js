import { AvionAmerican } from "./clases/avionAmerican.js";
import { AvionNormal } from "./clases/avionNormal.js";
import { EventoExp } from "./clases/eventoExp.js";
import { EventoMalet } from "./clases/eventoMaletero.js";
import { EventoXLExp } from "./clases/eventoXLexp.js";
import { Servidor } from "./clases/servidor.js";

var gridContainer = document.getElementById("gridContainer");

export function completarTabla(vectorEstado, cantAviNorm, cantAviAmer){
    var filaMostrar = [];
    var desdeAviNorm = Math.max(0,cantAviNorm - 200);
    var desdeAviAmer = Math.max(0,cantAviAmer - 200);

    for (var key in vectorEstado){
        var value = vectorEstado[key];
        if (key  == "llegadaNormal"|| key == "llegadaAmerican" || key == "finAterrizaje") {
            filaMostrar.push(redondear(value.rnd));
            filaMostrar.push(redondear(value.tiempoExp));
            filaMostrar.push(redondear(value.prox));
        }else if (key == "llegadaMaletero") {
            filaMostrar.push(redondear(value.rnd));
            filaMostrar.push(redondear(value.tiempoExp));
            filaMostrar.push(redondear(value.prox1));
            filaMostrar.push(redondear(value.prox2));
            filaMostrar.push(redondear(value.prox3));
        }else if (key == "finDescarga") {
            filaMostrar.push(redondear(value.rnd));
            filaMostrar.push(redondear(value.tiempoExp));
            filaMostrar.push(redondear(value.prox1));
            filaMostrar.push(redondear(value.prox2));
            filaMostrar.push(redondear(value.prox3));
            filaMostrar.push(redondear(value.prox4));
            filaMostrar.push(redondear(value.prox5));
        }else if (key == "pista") {
                filaMostrar.push(value.estado.nombre);
        }else if (key == "muelles" || key == "maleteros") {
            for (let i = 0; i < value.length; i++) {
                filaMostrar.push(value[i].estado.nombre);
            }  
        }else if (key == "avionesNormal") {
            for (let i = desdeAviNorm; i < desdeAviNorm+200; i++) {
                if (value[i] != null && value[i].estado.nombre != '-'){
                    filaMostrar.push(value[i].estado.nombre);
                    filaMostrar.push(redondear(value[i].horaLlegada));
                }else{
                    filaMostrar.push('-','-')
                }
                
            }
        }else if ( key == "avionesAmerican"){
            for (let i = desdeAviAmer; i < desdeAviAmer+200; i++) {
                if (value[i] != null && value[i].estado.nombre != '-'){
                    filaMostrar.push(value[i].estado.nombre);
                    filaMostrar.push(redondear(value[i].horaLlegada));
                }else{
                    filaMostrar.push('-','-')
                }
            }
        }else{
            filaMostrar.push(redondear(value));
        }        
    }
    return filaMostrar;
} 

function redondear(nro){
    if (nro != null && typeof nro === 'number') {
        return nro.toFixed(4);
    }else{
        return nro
    }
}

function crearFila(vector){
    var row = document.createElement("tr");
    for (let i = 0; i < vector.length; i++) {
        
	    var cell = document.createElement("td");
	    cell.textContent = vector[i];
	    row.appendChild(cell);
    }
    return row
    
}

export function graficarTabla(vector,cantAviNorm, cantAviAmer){
    
    limpiarTabla();
    armarCabecera(cantAviNorm,cantAviAmer);
    for (var i = 0; i < vector.length; i++) {
        //console.log(vector[i])
		gridContainer.appendChild(crearFila(vector[i]));
	}    
}
function armarCabecera(cantAviNorm, cantAviAmer){
	var cabecera = ["Evento", "Reloj", "RND Llegada avion Normal", "Tiempo_Llegar avion Normal", "Prox llegada avion normal","RND avion American", "Tiempo llegar American", "Prox llegada American", "RND fin_aterrizaje","Tiempo Aterrizaje", "Fin aterrizaje", "RND llegada maletero", "Tiempo en llegar maletero", "Llegada maletero 1", "Llegada maletero 2", "Llegada Malatero 3", "RND fin descarga", "Tiempo Descarga", "Fin Descarga 1", "Fin Descarga 2", "Fin Descarga 3", "Fin Descarga 4", "Fin Descarga 5", "Estado Pista Aterrizaje", "Cola Pista Normales", "Cola Pista American", "Muelle Estado 1", "Muelle Estado 2", "Muelle Estado 3",  "Muelle Estado 4", "Muelle Estado 5", "Cola Muelles", "Maletero Estado 1", "Maletero Estado 2", "Maletero Estado 3", "Maletero Cola","Cantidad aviones atendidos", "AC dinero por cada aterrizado", "AC cantidad de tiempo de demora de aterrizaje", "AC cantidad aviones normales", "AC cantidad aviones american"]
    for (let index = 0; index <200; index++) {
        cabecera.push("Estado Normal", "HoraLLegada Normal")
    }
    for (let index = 0; index < 200; index++){
        cabecera.push("Estado American", "Hora LLegada American")
    }

    var row = document.createElement("tr");
    gridContainer.appendChild(row);
		for (var j = 0; j < (841); j++) {
			var cell = document.createElement("th");
			cell.textContent = cabecera[j];
			row.appendChild(cell);
		}
}


function limpiarTabla(){
    gridContainer.innerHTML=""
}