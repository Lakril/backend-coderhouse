// JS tiene la capicidad de realizar ciertas operaciones en segundo plano
// callbacks son funciones que se ejecutan despues de que otra funcion se ejecuta

function randInt(max) {
  return Math.random() * max;
}

function tareaQueNoSeCuantoTarda(tarea) {
  return new Promise((resolve, reject) => {
    //los setTimeout son funciones que se ejecutan en segundo plano, es decir asincronicas
    // console.log(`${tarea}`);
    setTimeout(
      () => {
        console.log(`${tarea}`);
        resolve(true);
      },
      randInt(5) * 1000
    );
  });
}

// la promesa agrega una nueva posibilidad

// function arrancarElDia() {
//   tareaQueNoSeCuantoTarda("Poner musica");
//   tareaQueNoSeCuantoTarda("trabajar");
//   tareaQueNoSeCuantoTarda("comer");
// }

// async function arrancarElDia(nombre) {
//   await tareaQueNoSeCuantoTarda(nombre + ": 1 despertarme");
//   await tareaQueNoSeCuantoTarda(nombre + ": 2 salir de la cama");
//   await tareaQueNoSeCuantoTarda(nombre + ": 3 vestirme");
//   await tareaQueNoSeCuantoTarda(nombre + ": 4 trabajar");
//   await tareaQueNoSeCuantoTarda(nombre + ": 5 trabajar");
//   await tareaQueNoSeCuantoTarda(nombre + ": 6 ir al gym");
//   await tareaQueNoSeCuantoTarda(nombre + ": 7 dormir");
// }
async function arrancarElDia(nombre) {
  await tareaQueNoSeCuantoTarda(nombre + ': 1 pedir nombre');
  await tareaQueNoSeCuantoTarda(nombre + ': 2 buscar enla bd al usario');
  await tareaQueNoSeCuantoTarda(nombre + ': 3 extraer su lista de amigos');
  await tareaQueNoSeCuantoTarda(nombre + ': 4 buscar en la bd a sus amigos');
  await tareaQueNoSeCuantoTarda(nombre + ': 5 extraer los gustos en comun de sus amigos');
  await tareaQueNoSeCuantoTarda(
    nombre + ': 6 generar una recomendacion para el usuario en base a los gustos de sus amigos'
  );
  await tareaQueNoSeCuantoTarda(nombre + ': 7 devolver resultado');

  await Promise.all([
    tareaQueNoSeCuantoTarda(nombre + ': mandar mail de confirmacion '),
    tareaQueNoSeCuantoTarda(nombre + ': loguear en un archivo de log'),
    tareaQueNoSeCuantoTarda(nombre + ': mandar mail al admin si corresponde, en casos especiales'),
  ]);
  await tareaQueNoSeCuantoTarda(nombre + ': termine');
}

arrancarElDia('marian');
// arrancarElDia("edgar");
// arrancarElDia("oriana");
// vivir();
