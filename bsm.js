let destino = ["San Andrés", "Pereira", "Manizales", "Cali", "Bogota"];
let opcion;
let pesoTotal = 0;
let pesoMaletasHombres = 0;
let cantidadMaletasHombres = 0;
let promedioMaletasHombres = 0;
let pesoMaletasMujeres = 0;
let cantidadMaletasMujeres = 0;
let promedioMaletasMujeres = 0;
let mayorPeso = 0;
let descuentoAplicado = 0;
let maletasConDescuento = 0;


console.info('\nBIENVENIDO a BMS');

do {
    
    console.log('\n1. Registrar maleta');
    console.log('2. Reportes');
    console.log('3. Salir');
    console.log('\nATENCION! Destino con promocion, 15% de descuento para vuelos con destino a Manizales ');

    opcion = parseInt(obtenerDatosInput('\nSeleccione una opcion: '));

    switch(opcion) {
        case 1:
            registrarMaleta();
            break;
        case 2:
            menuReportes();
            break;
        case 3:
            console.log("\nAdios!");
            break;
        default:
            console.error("\nseleccione bien!");
    }
}
while (opcion != 3);

function obtenerDatosInput(mensaje) {
    return prompt(mensaje);
}
    
function prompt(mensaje) {
    const readline = require('readline-sync');
    return readline.question(mensaje);
}

function registrarMaleta () { 
    
    let origen = obtenerDatosInput('Origen: ').toUpperCase();
    let numeroVuelo = obtenerDatosInput('Numero de vuelo: ');
    let destino = obtenerDatosInput('Destino: ').toUpperCase();
    let pesoMaleta = parseInt(obtenerDatosInput('Peso de la maleta: '));
    let genero = obtenerDatosInput('Genero (M/F): ').toUpperCase();

    let valorMaleta = calcularValorMaleta(pesoMaleta, destino);

    procesarMaleta(destino, pesoMaleta, genero);

    console.log('\nRESUMEN:');
    console.log(`Origen: ${origen}`);
    console.log(`Numero de Vuelo: ${numeroVuelo}`);
    console.log(`Destino: ${destino}`);
    console.log(`Genero: ${genero}`);
    console.log(`Peso Maleta: ${pesoMaleta}`);
    console.log(`Valor Maleta: ${valorMaleta}`);


    prompt('\n--Presione enter para continuar--\n');

}
  

   
function calcularValorMaleta(peso, destino) {
    
    let valorMaleta = 0;
    
    if (peso <= 23) {
        valorMaleta = 20000;
    }else {
        valorMaleta = 20000 + ((peso-23)*5000);
    }
  
    if (destino == `MANIZALES`){
      let descuento = valorMaleta * 0.15;
      descuentoAplicado += descuento;
      valorMaleta -= descuento;
      maletasConDescuento++;
    }
    return valorMaleta;
}

function procesarMaleta(destino, pesoMaleta, genero) {

    pesoTotal = pesoTotal + pesoMaleta;

    if (genero == `M`) {

        pesoMaletasHombres = pesoMaletasHombres + pesoMaleta;
        cantidadMaletasHombres++;
        promedioMaletasHombres = pesoMaletasHombres/cantidadMaletasHombres;

    } else if (genero == `F`) {

        pesoMaletasMujeres = pesoMaletasMujeres + pesoMaleta;
        cantidadMaletasMujeres++;
        promedioMaletasMujeres = pesoMaletasMujeres/cantidadMaletasMujeres;
    }

    if (pesoMaleta > mayorPeso) {
        mayorPeso = pesoMaleta
    }

}

function menuReportes() {
    
    console.log(`\n- El peso total de las maletas que van en el avion es: ${pesoTotal} Kg`);
    console.log(`- El promedio del peso de las maletas por genero:\n  Hombres ${promedioMaletasHombres} Kg \n  Mujeres ${promedioMaletasMujeres} Kg`);
    console.log(`- La maleta con mayor peso es de: ${mayorPeso} Kg`);
    
    if(descuentoAplicado > 0){
      console.log(`- Se aplicó un descuento del 15% a ${maletasConDescuento} maletas = ${descuentoAplicado} al valor de la maleta.`);
    }else{
      console.log(`- Ningun descuento por aplicar`);
    }
    

    prompt('\n\n--Presione enter para continuar--\n');
}