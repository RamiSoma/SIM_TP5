export class EventoXLExp{
    constructor(rnd,tiempoExp=0,prox1=null,prox2=null,prox3=null,prox4=null,prox5=null){
        this.id = 4
        this.rnd = rnd
        this.tiempoExp = tiempoExp
        this.prox1 = prox1
        this.flag1 = false
        this.prox2 = prox2
        this.flag2 = false
        this.prox3 = prox3
        this.flag3 = false
        this.prox4 = prox4
        this.flag4 = false
        this.prox5 = prox5
        this.flag5 = false
    }

    calcularTiempoExp(media){
        let nro = ((-media) * Math.log10(1 - this.rnd))//.toFixed(4)
        this.tiempoExp = parseFloat(nro)
    }

    calcularProxMuelle(reloj, nroMuelle){
        let tiempo = reloj + this.tiempoExp
        if (nroMuelle == 1) {
            this.prox1 = parseFloat(tiempo)
        }
        if (nroMuelle == 2) {
            this.prox2 = parseFloat(tiempo)
        }
        if (nroMuelle == 3) {
            this.prox3 = parseFloat(tiempo)
        }
        if (nroMuelle == 4) {
            this.prox4 = parseFloat(tiempo)
        }
        if (nroMuelle == 5) {
            this.prox5 = parseFloat(tiempo)
        }
    }

}