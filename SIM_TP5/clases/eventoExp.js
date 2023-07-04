export class EventoExp{
    constructor(rnd,tiempoExp=0,prox=0){
        this.id = 1
        this.rnd = rnd
        this.tiempoExp = tiempoExp
        this.prox = prox
    }

    calcularTiempoExp(media){
        let nro = ((-media) * Math.log10(1 - this.rnd))//.toFixed(4)
        this.tiempoExp = parseFloat(nro)
    }

    calcularProximo(reloj){
        let tiempo = reloj + this.tiempoExp
        this.prox = parseFloat(tiempo)
    }
}