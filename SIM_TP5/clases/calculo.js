export function calcularExponencial(rnd, media){
    return -media * Math.log(1-rnd);
}

export function calcularUniforme(rnd,a,b){
    return a+rnd*(b-a);
}