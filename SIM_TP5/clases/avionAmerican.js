export class AvionAmerican {
    constructor(id=0, edo, hll, mll = -1, mlt = -1) {
        this.id = id
        this.estado = edo
        this.horaLlegada = hll
        this.muelle = mll
        this.maletero = mlt
    }
}
