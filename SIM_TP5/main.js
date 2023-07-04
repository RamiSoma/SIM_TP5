import { Fila } from "./clases/fila.js";
import { EventoExp } from "./clases/eventoExp.js";

import { Estado } from "./clases/estado.js"; 
import { EventoMalet } from "./clases/eventoMaletero.js";
import { Servidor } from "./clases/servidor.js";

import { AvionAmerican } from "./clases/avionAmerican.js";
import { AvionNormal } from "./clases/avionNormal.js";
import {  completarTabla,graficarTabla } from "./tabla.js";
import { EventoXLExp } from "./clases/eventoXLexp.js";

let precAterrizajeParam;
let tiempAterrizajeParam;
let n;
let llegadaAvionAmericanParam;
let llegadaAvionNormalParam;
let llegadaMaleteroDesdeParam;
let llegadaMaleteroHastaParam;
let tiempoDescargaParam;
let mostrarDesde;
let mostrarHasta;
//let evento = "Inicialización"; YO LO SACARIA  
let reloj = 0;
let vectorEstado =[];
let cantAvionesNormales = 0;
let cantAvionesAmerican = 0;
//variables random
let rndLlegadaAvNorm = Math.random();
let rndLlegadaAvAmer = Math.random();
let rndFinAte = Math.random();
let rndFinMaletero = Math.random();
let rndFinDescarga = Math.random();

//eventos
let llegadaAvionNorm;
let llegadaAvionAme;
let finAt;
let llegMal;
let finDes;
let colaPista1
let colaPista2
let colaMuelles
let colaMaleteros

//Estados
    //Estado Servidores
let estadoServidorLib = new Estado (1, "Libre")
let estadoServidorOcu = new Estado (2, "Ocupado")
        //Estado Cliente
        //Avion_Norm y Amer
let estadoAvionEA = new Estado (3, "Esperando Aterrizaje")
let estadoAvionA = new Estado (4, "Aterrizando")
let estadoAvionEM = new Estado (5, "Esperando Muelle")
let estadoAvionED = new Estado(6, "Esperando Descarga")
let estadoAvionD = new Estado (7, "Descargando")

//objetos
    //servidores
let pista = new Servidor(1, estadoServidorLib)
let Muelle1 = new Servidor(2, estadoServidorLib)
let Muelle2 = new Servidor(3, estadoServidorLib)
let Muelle3 = new Servidor(4, estadoServidorLib)
let Muelle4 = new Servidor(5, estadoServidorLib)
let Muelle5 = new Servidor(6, estadoServidorLib)
let Maletero1 = new Servidor(7, estadoServidorLib)
let Maletero2 = new Servidor(8, estadoServidorLib)
let Maletero3 = new Servidor(9, estadoServidorLib)

// vectores
let vecAvionNorm = []
let vecAvionAmer = []
var vectorGraficar = [];
    
let numMuelle;
// Capturamos el evento "ENVIAR" y empezamos a generar los experimentos
document.getElementById('formulario').addEventListener('submit', function(event) {
    try{
        // Tomar parámetros
        precAterrizajeParam = parseInt(document.getElementById("precioAte").value);
        tiempAterrizajeParam = parseInt(document.getElementById("tiempoAte").value);
        n = parseInt(document.getElementById("n").value);
        llegadaAvionAmericanParam = parseInt(document.getElementById("llegadaAmerican").value);
        llegadaAvionNormalParam = parseInt(document.getElementById("llegadaNormal").value);
        llegadaMaleteroDesdeParam = parseInt(document.getElementById("llegadaMaleDesde").value);
        llegadaMaleteroHastaParam = parseInt(document.getElementById("llegadaMaleHasta").value);
        tiempoDescargaParam = parseInt(document.getElementById("tiempoDescarga").value);
        mostrarDesde = parseInt(document.getElementById("desde").value);
        mostrarHasta = parseInt(document.getElementById("hasta").value);

        if ( mostrarDesde < mostrarHasta && precAterrizajeParam > 0 && tiempAterrizajeParam > 0 && n > 0 && llegadaAvionAmericanParam > 0 && llegadaAvionNormalParam > 0 && llegadaMaleteroDesdeParam > 0 && llegadaMaleteroHastaParam > llegadaMaleteroDesdeParam  && tiempoDescargaParam > 0){

            generarRandoms()
            simularCompleto()
        }else{
            alert("Datos mal ingresados")
        }
        
    } catch(error) {
        console.error('Se ha producido un error:', error);
        // Aquí puedes agregar el código para manejar el error
      } finally {
        event.preventDefault(); // Cancela el evento submit del formulario
      }
    }
)

// genera los rnd
function generarRandoms(){
    Math.seedrandom(rndLlegadaAvNorm);
    rndLlegadaAvNorm = Math.random();

    Math.seedrandom(rndLlegadaAvAmer);
    rndLlegadaAvAmer = Math.random();

    Math.seedrandom(rndFinAte);
    rndFinAte = Math.random();

    Math.seedrandom(rndFinMaletero);
    rndFinMaletero = Math.random();

    Math.seedrandom(rndFinDescarga);
    rndFinDescarga = Math.random();
}

// ver qué evento llega primero
function proximoEvento(eventos){
    let vecEventos = []
    let vecProximo = []
    //console.log(eventos)
    for (let i = 0; i < eventos.length; i++) {
        // EVENTO MALETERO
        if (eventos[i].id == 3 ) {        
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox1)
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox2)
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox3)
        }
        //EVENTO FIN DESCARGA 
        else if (eventos[i].id == 4) {
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox1)
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox2)
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox3)     
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox4)
            vecEventos.push(eventos[i])
            vecProximo.push(eventos[i].prox5)    
        }
       else{
        vecEventos.push(eventos[i])
        vecProximo.push(eventos[i].prox)
       }
    }


    let proxEvento 
    let indiceProx

    for (let x = 0; x < vecProximo.length; x++) {
        if (vecProximo[x] != null) {
            indiceProx = x;
            break;
        }
    }
    for (let i = 0; i < vecProximo.length; i++) {
        if (vecProximo[i] != null) {
            if (vecProximo[i] < vecProximo[indiceProx]) {
                indiceProx = i;
            }
        }
    }
    //console.log("el id de los eventoMaletero " + vecEventos[indiceProx].id)
    //ID=3 ES UN EVENTO MALETERO
    if (vecEventos[indiceProx].id == 3 ) { 
        let numprox = indiceProx - 2
        if (numprox == 1) {
            vecEventos[indiceProx].flag1 = true
        }
        if (numprox == 2) {
            vecEventos[indiceProx].flag2 = true
        }
        if (numprox == 3) {
            vecEventos[indiceProx].flag3 = true
        }
    }
    if (vecEventos[indiceProx].id == 4 ) { 
        let numprox = indiceProx - 5
        if (numprox == 1) {
            vecEventos[indiceProx].flag1 = true
        }
        if (numprox == 2) {
            
            vecEventos[indiceProx].flag2 = true
        }
        if (numprox == 3) {
            vecEventos[indiceProx].flag3 = true
        }
        if (numprox == 4) {
            vecEventos[indiceProx].flag4 = true
        }
        if (numprox == 5) {
            vecEventos[indiceProx].flag5 = true
        }
        if (numprox == 6) {
            vecEventos[indiceProx].flag6 = true
        }
    }
    proxEvento = vecEventos[indiceProx]

    //console.log(vecEventos)
    //console.log(vecProximo)

    return proxEvento;
 
}

function generarLlegadaAvionNormal(){
    let llegAvNorm= new EventoExp(rndLlegadaAvNorm);
    llegAvNorm.calcularTiempoExp(llegadaAvionNormalParam);
    llegAvNorm.calcularProximo(reloj);
    return llegAvNorm;
}

function generarLlegadaAvionAmerican(){
    let llegAvAme = new EventoExp(rndLlegadaAvAmer);
    llegAvAme.calcularTiempoExp(llegadaAvionAmericanParam);
    llegAvAme.calcularProximo(reloj);
    return llegAvAme;
}

function generarFinAterrizaje(flag = false){
    if (flag) {
            let fadea = new EventoExp(null,null,null)
            return fadea;
    }
    else{
        let fadea = new EventoExp(rndFinAte)
        fadea.calcularTiempoExp(tiempAterrizajeParam)
        fadea.calcularProximo(reloj)
        return fadea;
    }
}

function generarLlegadaMaletero(flag = false,n){
    if (flag) {
            let malet = new EventoMalet(null,null,null,null,null)
            return malet;
    }
    else{
        let malet = llegMal
        malet.rnd = rndFinMaletero
        malet.calcularTiempoUnif(llegadaMaleteroDesdeParam,llegadaMaleteroHastaParam)
        malet.calcularProxMaletero(reloj,n)
        return malet;
    }
}

function generarFinDescarga(flag = false, n){
    if (flag) {
            let FD = new EventoXLExp(null,null,null, null, null, null, null)
            return FD;
    }
    else{
        let FD = finDes
        FD.rnd = rndFinDescarga
        FD.calcularTiempoExp(tiempoDescargaParam)
        FD.calcularProxMuelle(reloj, n)
        return FD;
    }
}

function buscarAvion(vecNormales, vecAmerican, estado){
    let primerAvionNormal = null
    let primerAvionAmerican = null

    // buscar el primer avión normal que está esperando aterrizar
    for (let i = 0; i < vecNormales.length; i++) {
        if (vecNormales[i].estado == estado) {
            primerAvionNormal = vecNormales[i]
            break
        }
    }

    // buscar el primer avión american que está esperando aterrizar
    for (let i = 0; i < vecAmerican.length; i++) {
        if (vecAmerican[i].estado == estado) {
            primerAvionAmerican = vecAmerican[i]
            break
        }
    }

    if (primerAvionNormal != null && primerAvionAmerican != null ) {
        if (primerAvionNormal.horaLlegada < primerAvionAmerican.horaLlegada) {
            return primerAvionNormal
        }
        return primerAvionAmerican
    }
    if (primerAvionAmerican == null) {
        return primerAvionNormal
    }
    if (primerAvionNormal == null) {
        return primerAvionAmerican
    }
    
}

function buscarAvionSinMaletero(vecNormales, vecAmerican, estado) {
    let primerAvionNormal = null
    let primerAvionAmerican = null

    // buscar el primer avión normal que está esperando aterrizar
    for (let i = 0; i < vecNormales.length; i++) {
        if (vecNormales[i].estado == estado && vecNormales[i].maletero == -1) {
            primerAvionNormal = vecNormales[i]
            break
        }
    }

    // buscar el primer avión american que está esperando aterrizar
    for (let i = 0; i < vecAmerican.length; i++) {
        if (vecAmerican[i].estado == estado && vecAmerican[i].maletero == -1) {
            primerAvionAmerican = vecAmerican[i]
            break
        }
    }

    if (primerAvionNormal != null && primerAvionAmerican != null ) {
        if (primerAvionNormal.horaLlegada < primerAvionAmerican.horaLlegada) {
            return primerAvionNormal
        }
        return primerAvionAmerican
    }
    if (primerAvionAmerican == null) {
        return primerAvionNormal
    }
    if (primerAvionNormal == null) {
        return primerAvionAmerican
    }
}

function buscarYActualizarAvion(avion, vecNorm, vecAmer) {
    for (let i = 0; i < vecNorm.length; i++) {
        if (avion == vecNorm[i]) {
            avion.estado.nombre = "-"
            avion.horaLlegada = "-"
            avion.muelle = -1
            avion.maletero = -1
            break
        }
        
    }
    for (let i = 0; i < vecAmer.length; i++) {
        if (avion == vecAmer[i]) {
            avion.estado.nombre = "-"
            avion.horaLlegada = "-"
            avion.muelle = -1
            avion.maletero = -1
            break
        }
    }
}

function buscarServidorLibre(serv){
    for (let i = 0; i < serv.length; i++) {
        if (serv[i].estado == estadoServidorLib){
            return i
        }    
    }
    return null
}


function buscarSubEvento(vcevent){
    if (vcevent.flag1 == true){
        vcevent.flag1 = false
        return 1
    }
    if (vcevent.flag2 == true){
        vcevent.flag2 = false
        return 2
    }
    if (vcevent.flag3 == true){
        vcevent.flag3 = false
        return 3
    }
    if (vcevent.flag4 == true){
        vcevent.flag4 = false
        return 4
    }
    if (vcevent.flag5 == true){
        vcevent.flag5 = false
        return 5
    }
    return (-1)
}

function buscarAvionMaletero(van,vaam,n){
    for (let i = 0; i < van.length; i++) {
        if (van[i].maletero == n){
            return van[i]
        }
    }
    for (let i = 0; i < vaam.length; i++) {
        if (vaam[i].maletero == n){
            return vaam[i]
        }
    }
}

function buscarAvionMuelle(van,vaam, n){
    for (let i = 0; i < van.length; i++) {
        if (van[i].muelle == n){
            return van[i]
        }
    }
    for (let i = 0; i < vaam.length; i++) {
        if (vaam[i].muelle == n){
            return vaam[i]
        }
    }
}




function simularCompleto(){
    
    //Fila Inicial
        //Definir eventos
    llegadaAvionNorm = generarLlegadaAvionNormal();
    llegadaAvionAme = generarLlegadaAvionAmerican();
    finAt = generarFinAterrizaje(true);
    llegMal = generarLlegadaMaletero(true,0);
    finDes = generarFinDescarga(true);

    //Clientes
    
    //servidores
    let muelles = [Muelle1,Muelle2,Muelle3,Muelle4,Muelle5]
    let maleteros = [Maletero1,Maletero2,Maletero3]

    // hacer la fila inicio
    colaPista1 = 0
    colaPista2 = 0
    colaMuelles = 0
    colaMaleteros = 0
    let contadorAvionesAtendidos = 0
    let acumuladorDinero = 0
    let acumuladorTiempoDemoraAterrizaje = 0
    let contadorNormal = 0
    let contadorAmerican = 0
    let filaInicio = new Fila("Inicialización", reloj,llegadaAvionNorm,llegadaAvionAme,finAt,llegMal,finDes,pista,colaPista1,colaPista2,muelles,colaMuelles,maleteros,colaMaleteros,contadorAvionesAtendidos,acumuladorDinero,acumuladorTiempoDemoraAterrizaje, contadorNormal,contadorAmerican,vecAvionNorm,vecAvionAmer)
    vectorEstado.push(filaInicio);
    vectorEstado.push(filaInicio);
    vectorGraficar.push(completarTabla(filaInicio));

    // se busca el proximo evento segun tiempo
    // se ejecutan las N filas con un vector que solo almacena la penultima y ultima fila

    for (let i = 0; i < n; i++) {
        ////console.log(i)
        generarRandoms()
        var proxFila
        let proxEvento = proximoEvento([vectorEstado[1].llegadaNormal, vectorEstado[1].llegadaAmerican,vectorEstado[1].finAterrizaje,vectorEstado[1].llegadaMaletero,vectorEstado[1].finDescarga]);
        let nombre;
        reloj = proxEvento.prox
        let nprev 
        let numMuelle
        if (proxEvento == vectorEstado[1].llegadaMaletero) {
            nprev = buscarSubEvento(proxEvento)
            if (nprev == 1) {
                reloj = proxEvento.prox1
            }
            if (nprev == 2) {
                reloj = proxEvento.prox2
            }
            if (nprev == 3) {
                reloj = proxEvento.prox3
            }
        }

        if (proxEvento == vectorEstado[1].finDescarga) {
            numMuelle = buscarSubEvento(proxEvento)
            if (numMuelle == 1) {
                reloj = proxEvento.prox1
            }
            if (numMuelle == 2) {
                reloj = proxEvento.prox2
            }
            if (numMuelle == 3) {
                reloj = proxEvento.prox3
            }
            if (numMuelle == 4) {
                reloj = proxEvento.prox4
            }
            if (numMuelle == 5) {
                reloj = proxEvento.prox5
            }
        }

        // LLEGADA AVIÓN NORMAL
        if (proxEvento == vectorEstado[1].llegadaNormal) {

            //////console.log("Llega Avion Normal")
            /* volver a calcular una prox llegada
                Calculas finaterrizaje
            */
            nombre = "Llegada avión normal"
            //if (vectorEstado[1].avionesNormal.length < 200) {
                llegadaAvionNorm = generarLlegadaAvionNormal();
            //}
            let nuevoAvionNorm = new AvionNormal(1,null,reloj)
            if (pista.estado.id == 1 ) {
                finAt = generarFinAterrizaje()
                pista.estado = estadoServidorOcu
                nuevoAvionNorm.estado = estadoAvionA
            }
            else{
                nuevoAvionNorm.estado = estadoAvionEA
                colaPista1 += 1
            }

            vecAvionNorm.push(nuevoAvionNorm)
        }

        // LLEGADA AVIÓN AMERICAN
        if (proxEvento == vectorEstado[1].llegadaAmerican) {
            //////console.log("Llega Avion American")
            nombre = "Llegada avión american"
            /* volver a calcular una prox llegada
                Calculas finaterrizaje
            */
           //if (vectorEstado[1].avionesAmerican.length < 200){
            llegadaAvionAme = generarLlegadaAvionAmerican();
           //}
           let nuevoAvionAmerican = new AvionAmerican(1,null,reloj)
            if (pista.estado.id == 1 ) {
                finAt = generarFinAterrizaje()
                pista.estado = estadoServidorOcu
                nuevoAvionAmerican.estado = estadoAvionA
            }
            else{
                nuevoAvionAmerican.estado = estadoAvionEA
                colaPista2 += 1
            }

            vecAvionAmer.push(nuevoAvionAmerican)
        }

        // FIN ATERRIZAJE
        if (proxEvento == vectorEstado[1].finAterrizaje) {
            //////console.log("Llega Fin Aterrizaje")
            
            nombre = "Fin aterrizaje"
            let avionAterrizado = buscarAvion(vecAvionNorm, vecAvionAmer, estadoAvionA)
            ////console.log(avionAterrizado)
            let tiempoDemora = reloj - avionAterrizado.horaLlegada
            acumuladorTiempoDemoraAterrizaje += tiempoDemora

            let muelleLibre = null

            // Fijarse si hay muelles libres y cambiar el edo de libre a ocupado
            for (let i = 0; i < muelles.length; i++) {
                if (muelles[i].estado == estadoServidorLib) {
                    muelleLibre = muelles[i]
                    muelles[i].estado = estadoServidorOcu
                    break
                }
            }

            // Si no hay muelle libre
            if (muelleLibre == null) {
                // Si esperó 20 minutos o menos ACUMULA 3000 AL ACUMULADOR PORQUE LE HACE UN DESCUENTO DEL 50%
                if (tiempoDemora <= 20) {
                    acumuladorDinero += precAterrizajeParam/2
                }
                // Si esperó más de 20 minutos no suma nada PORQUE ES GRATIS
                // Va a la cola de muelles y cambia el estado a EM
                colaMuelles++
                avionAterrizado.estado = estadoAvionEM
            }
            // Si hay muelle
            else{
                // Si esperó 20 minutos o menos ACUMULA 6000 AL ACUMULADOR PORQUE PUEDE PASAR DIRECTO
                if (tiempoDemora <= 20) {
                    acumuladorDinero += precAterrizajeParam
                }
                // Si esperó más de 20 minutos no suma nada PORQUE ES GRATIS

                // Llevarlo al muelle libre
                ////console.log("muelle libre del avion: " + avionAterrizado + "id: " + muelleLibre.id)
                avionAterrizado.muelle = (muelleLibre.id)-1

                // Fijarse si hay maleteros
                let maleteroLibre = null
                for (let i = 0; i < maleteros.length; i++) {
                    if (maleteros[i].estado == estadoServidorLib) {
                        maleteroLibre = maleteros[i]
                        maleteros[i].estado = estadoServidorOcu
                        break
                    }
                }

                // No hay maleteros libre entonces se agrega a la cola de maleteros
                if (maleteroLibre == null) {
                    colaMaleteros++
                }

                // Hay maleteros entonces se le asigna al maletero libre y se hace una nueva llegada maletero
                else{
                    avionAterrizado.maletero = ((maleteroLibre.id)-6)
                    llegMal = generarLlegadaMaletero(false,(maleteroLibre.id-6))
                }
                // Asignarle el estado ED
                avionAterrizado.estado = estadoAvionED
            }

            // GENERAR NUEVO ATERRIZAJE: Fijarse si la cola de la pista es mayor a cero y generar otro fin aterrizaje
            // Darle prioridad al american
            if (colaPista2 > 0) {
                colaPista2--
                // buscar el avion que sigue para aterrizar y hacerle un fin aterrizaje Y FIJARSE SI LE COBRAMOS
                let avionAhoraAterriza = buscarAvion(vecAvionNorm, vecAvionAmer, estadoAvionEA)
                finAt = generarFinAterrizaje()
                // VERIFICAR RELOJ CON HLL DEL AVION y acumular el total de tiempo que tuvo que esperar para aterrizar
                avionAhoraAterriza.estado = estadoAvionA
            }
            else{
                if (colaPista1 > 0) {
                    colaPista1--
                    // buscar el avion que sigue para aterrizar y hacerle un fin aterrizaje Y FIJARSE SI LE COBRAMOS
                    let avionAhoraAterriza = buscarAvion(vecAvionNorm, vecAvionAmer, estadoAvionEA)
                    finAt = generarFinAterrizaje()
                    // VERIFICAR RELOJ CON HLL DEL AVION y acumular el total de tiempo que tuvo que esperar para aterrizar
                    avionAhoraAterriza.estado = estadoAvionA
                }
                else{
                    // "Reanudar" los fin aterrizaje porque ya no hay más aviones para aterrizar
                    pista.estado = estadoServidorLib
                    finAt = generarFinAterrizaje(true)
                }
            }
        }

        // LLEGADA MALETERO
        if (proxEvento == vectorEstado[1].llegadaMaletero) {
            //////console.log("Llega Maletero")
            //el avion al cual le llega el maletero
            nombre = "Llegada Maletero";
            //console.log(proxEvento)
            
            let avionConMaletero = null
            if(nprev == 1){
                proxEvento.prox1 = null
            }
            if(nprev == 2){
                proxEvento.prox2 = null
            }
            if(nprev == 3){
                proxEvento.prox3 = null
            }

            if(nprev >= 0) {
                //console.log(vecAvionNorm, vecAvionAmer, nprev)
                avionConMaletero = buscarAvionMaletero(vecAvionNorm, vecAvionAmer, nprev)
            }

            ////console.log(avionConMaletero);
            // llega maletero: 
            // cambia 1 de los servidores de: libre → ocupado
            //console.log("-----------------")
            //console.log(avionConMaletero)
            
            // if (avionConMaletero == null) {
            //     console.log("ACÁ EMPIEZA EL ERROR!!!!")
            // }

            //if (avionConMaletero != null) {
                let nMuelle = avionConMaletero.muelle
                finDes = generarFinDescarga(false, nMuelle)
                avionConMaletero.estado = estadoAvionD
            //}
            
            // generar evento: fin descarga - ANTES NO PORQUE NO HABIA UN MALETERO 

            // cambiar estado del avion que estaba en: ESPERANDO DESCARGA → DESCARGANDO

        }

        // FIN DESCARGA
        if (proxEvento == vectorEstado[1].finDescarga) {
            nombre = "Fin descarga"
            // se asigna el reloj
            if(numMuelle == 1){
                proxEvento.prox1 = null
            }
            if(numMuelle == 2){
                proxEvento.prox2 = null
            }
            if(numMuelle == 3){
                proxEvento.prox3 = null
            }
            if(numMuelle == 4){
                proxEvento.prox4 = null
            }
            if(numMuelle == 5){
                proxEvento.prox5 = null
            }

            let avionDescargando = null

            if (numMuelle > 0) {
                avionDescargando = buscarAvionMuelle(vecAvionNorm, vecAvionAmer, numMuelle)
            }

            // buscar avion que estaba descargando y eliminar de la simulacion 
            // eliminar del sistema el avion. (cambia los estado y hora por un "-")
            
            // ASIGNAR MALETERO AL AVIÓN QUE HAYA ESTADO ED PRIMERO
            let avionEsperandoDescarga = null
            let seAcabaDeAsignar = false
            avionEsperandoDescarga = buscarAvionSinMaletero(vecAvionNorm, vecAvionAmer, estadoAvionED)
            // existe avión que está ED
            if (avionEsperandoDescarga != null) {
                // NO TIENE TODAVÍA ASIGNADO UN MALETERO
                if (avionEsperandoDescarga.maletero == -1) {
                    avionEsperandoDescarga.maletero = avionDescargando.maletero
                    seAcabaDeAsignar = true
                    llegMal = generarLlegadaMaletero(false, avionDescargando.maletero)
                    if (colaMaleteros>0) {
                        colaMaleteros--
                    }
                }
                // else
                // NO HACES NADA PORQUE NO TE CORRESPONDE
            }
            // no existe avión que está ED
            else {
                maleteros[avionDescargando.maletero - 1].estado = estadoServidorLib
            }

            // HAY AVIONES EN LA COLA MUELLES
            if (colaMuelles > 0) {
                //HAY UN avion esperando muelle y asignar el muelle que se liberó
                //console.log(avionDescargando.maletero)
                let avionEsperandoMuelle = buscarAvion(vecAvionNorm, vecAvionAmer, estadoAvionEM)
                avionEsperandoMuelle.muelle = numMuelle
                colaMuelles--
                
                // VER SI HAY UN MALETERO LIBRE Y ASIGNARLO SINO PONERLO EN LA COLA DE LOS MALETEROS
                
                // Fijarse si hay maleteros
                let maleteroLibre = null
                for (let i = 0; i < maleteros.length; i++) {
                    if (maleteros[i].estado == estadoServidorLib) {
                        maleteroLibre = maleteros[i]
                        maleteros[i].estado = estadoServidorOcu
                        break
                    }
                }

                // No hay maleteros libre entonces se agrega a la cola de maleteros
                if (maleteroLibre == null) {
                    colaMaleteros++
                    avionEsperandoMuelle.estado = estadoAvionED
                }

                // Hay maleteros entonces se le asigna al maletero libre y se hace una nueva llegada maletero
                else{
                    avionEsperandoMuelle.maletero = ((maleteroLibre.id)-6)
                    avionEsperandoMuelle.estado = estadoAvionED
                    llegMal = generarLlegadaMaletero(false,(maleteroLibre.id-6))
                }
            }

            // NO HAY MÁS AVIONES EN LA COLA MUELLE
            else {
                // Se libera el muelle porque no hay más aviones esperando
                muelles[numMuelle-1].estado = estadoServidorLib
                // Si la bandera no está prendida LIBERAR EL MALETERO
                if (seAcabaDeAsignar == false) {
                    maleteros[avionDescargando.maletero - 1].estado = estadoServidorLib
                }
            }

            // Apagar la bandera para el próximo
            seAcabaDeAsignar = false

            // CUANDO NO HAY AVIONES EN LA COLA MUELLES Y NO HAY EN LA COLA DE LOS MALETEROS (aviones esperando descarga)
                // +1 en cantidad de aviones atendidos
            contadorAvionesAtendidos ++  
            
            // +1 en contador normales o contador american respectivamente
            if (avionDescargando instanceof AvionNormal) {
                contadorNormal ++
            } else {
                contadorAmerican ++
            }

            // hacer rayitas
            buscarYActualizarAvion(avionDescargando, vecAvionNorm, vecAvionAmer)

            //////console.log("Llega Fin Descarga")
        } 
        // GENERAR PRÓXIMA FILA
        proxFila = new Fila(nombre, reloj,llegadaAvionNorm,llegadaAvionAme,finAt,llegMal,finDes,pista,colaPista1,colaPista2,muelles,colaMuelles,maleteros,colaMaleteros,contadorAvionesAtendidos,acumuladorDinero,acumuladorTiempoDemoraAterrizaje, contadorNormal,contadorAmerican,vecAvionNorm,vecAvionAmer);
        
        // Cambiar el experimento anterior
        vectorEstado[0] = vectorEstado[1]

        // Insertar nuevo experimento
        vectorEstado[1] = proxFila
        
        //Condición para los vectores a mostrar
        if (i+1 >= mostrarDesde && i+1 <= mostrarHasta) {
            //console.log(proxFila.avionesNormal, proxFila.avionesAmerican);
            vectorGraficar.push(structuredClone(proxFila));
        }
    }

    //console.log(vectorGraficar[vectorGraficar.length - 1]);
    for (let i = 0; i < vectorGraficar[vectorGraficar.length - 1].avionesNormal.length; i++) {
        //if(vectorGraficar[vectorGraficar.length - 1].avionesNormal[i].estado.nombre != '-' ){
            cantAvionesNormales += 1;
        //}  
    }
    for (let i = 0; i < vectorGraficar[vectorGraficar.length - 1].avionesAmerican.length; i++ ) {
        //if(vectorGraficar[vectorGraficar.length - 1].avionesAmerican[i].estado.nombre != '-'){
            cantAvionesAmerican += 1;
        //}
        
    }
    console.log(cantAvionesNormales + ' - ' + cantAvionesAmerican)
    for (let i = 0; i < vectorGraficar.length; i++) {
        vectorGraficar[i] = completarTabla(vectorGraficar[i], cantAvionesNormales, cantAvionesAmerican)
        
    }
    graficarTabla(vectorGraficar,cantAvionesNormales, cantAvionesAmerican)
    crearMetricas()
    }

function crearMetricas(){
    let benefHoraTrabajo = document.getElementById("metricas");
    let b = (vectorEstado[1].acumDinero / vectorEstado[1].reloj).toFixed(3)
    let tiempoDemora = (vectorEstado[1].acumTiempoDemora / vectorEstado[1].contAviones).toFixed(3)
    let avAtend = (vectorEstado[1].contAviones / (vectorEstado[1].reloj/60)).toFixed(3)
    let porcNorm = (vectorEstado[1].contNormal * 100 / vectorEstado[1].contAviones).toFixed(0)
    let porcAmerican =( vectorEstado[1].contAmerican * 100 / vectorEstado[1].contAviones).toFixed(0)
    benefHoraTrabajo.innerHTML = `<h5>Métricas</h5>
                                  <ul>
                                    <li><span>Beneficio por cada hora de trabajo: </span><span>`+ (b) + `</span></li>
                                    <li><span>Promedio de demora para aterrizar: </span><span>`+ (tiempoDemora) + `</span></li>
                                    <li><span>Promedio de aviones atendidos por hora: </span><span>`+ (avAtend) + `</span></li>
                                    <li><span>Porcentaje de aviones normales atendidos:</span><span>`+ (porcNorm) + `%</span></li>
                                    <li><span>Porcentaje de aviones american atendidos:</span><span>`+ (porcAmerican) + `%</span></li>
                                  </ul>`;
}

