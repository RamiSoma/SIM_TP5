export class AvionNormal {
    constructor(id=0, est, hll, mll = -1, mlt = -1){
        this.id = id
        this.estado = est
        this.horaLlegada = hll
        this.muelle = mll
        this.maletero = mlt
    }
}