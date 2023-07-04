export class EventoMalet{
    constructor(rnd,tiempoExp=0,prox1=null,prox2=null,prox3=null){
        this.id = 3
        this.rnd = rnd
        this.tiempoExp = tiempoExp
        this.prox1 = prox1
        this.flag1 = false
        this.prox2 = prox2
        this.flag2 = false
        this.prox3 = prox3
        this.flag3 = false
    }

    calcularTiempoUnif(Desde, Hasta){
        let nro = Desde + this.rnd*(Hasta-Desde);
        this.tiempoExp = parseFloat(nro)
    }

    calcularProxMaletero(reloj, nroMaletero){
        let tiempo = reloj + this.tiempoExp
        if(nroMaletero == 1){
            this.prox1 = parseFloat(tiempo)
        }
        if(nroMaletero == 2){
            this.prox2 = parseFloat(tiempo)
        }
        if(nroMaletero == 3){
            this.prox3 = parseFloat(tiempo)
        }
    }

}