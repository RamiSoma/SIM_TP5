export class Fila {
    constructor(nomEvento, reloj, llegAv, llegAm, finAt, llegMal, finDes, pista, colaPista1, colaPista2, muelles, colaMuelles, malet, colaMalet,cantAv, dinero, demoraAt, cantNorm, cantAme, avNorm, avAm){
        this.nomEvento = nomEvento
        this.reloj = reloj
        this.llegadaNormal = llegAv
        this.llegadaAmerican = llegAm
        this.finAterrizaje = finAt
        this.llegadaMaletero = llegMal
        this.finDescarga = finDes
        this.pista = pista
        this.colaPista1 = colaPista1
        this.colaPista2 = colaPista2
        this.muelles = muelles
        this.colaMuelles = colaMuelles
        this.maleteros = malet
        this.colaMaletero = colaMalet
        this.contAviones = cantAv
        this.acumDinero = dinero
        this.acumTiempoDemora = demoraAt
        this.contNormal = cantNorm
        this.contAmerican = cantAme
        this.avionesNormal = avNorm
        this.avionesAmerican = avAm
    }
}