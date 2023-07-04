export class Servidor{
    constructor(id = -1 , edo){
        this.id = id
        this.estado = edo
    }
}

/*
Los id representan a uno de los 3 servidores disponibles en el modelo:
1 -> Pista
2 -> Muelle
3 -> Maletero
*/