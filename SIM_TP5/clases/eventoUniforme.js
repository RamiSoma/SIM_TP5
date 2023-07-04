export class EventoUniforme{
    constructor(rnd, tiempUnif=0,prox1=0,prox2=0,prox3=0){
        this.rnd = rnd
        this.tiempoUnif = tiempUnif
        this.prox1 = prox1
        this.prox2 = prox2
        this.prox3 = prox3
    }

    calcularTiempoUnif(Desde, Hasta){
        let nro = Desde + this.rnd*(Hasta-Desde);
        this.tiempoUnif = parseFloat(nro)
    }

    calcularProximo(reloj){
        let tiempo = reloj + this.tiempoUnif
        this.prox = parseFloat(tiempo)
    }
}