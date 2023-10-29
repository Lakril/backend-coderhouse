//! ----------------------------spread operator
const arr = [1, 2, 3, 4, 5, 6];
// ...[1, 2, 3, 4, 5, 6] -> 1, 2, 3, 4, 5, 6

function suma(param1, param2, param3, param4, param5, param6) {
  return param1 + param2 + param3 + param4 + param5 + param6;
}
suma(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
console.log(suma(...arr));
// console.log(suma(...[1, 2, 3, 4, 5, 6]));
// console.log(suma(1, 2, 3, 4, 5, 6));

//---------------------------------------------

const personas1 = { nombre: 'marian', apellido: 'gomez' };
// ...{nombre:'marian', apellido:'gomez', edad: 30} -> nombre:'marian', apellido:'gomez', edad: 30

// const np = {
//     nombre: nombre.nombre,
//     apellido: nombre.apellido,
//     edad: 30,
// }

const np = {
  ...personas1,
  edad: 30,
};

console.log(np);

const personas = [
  { dni: '1', nombre: 'marian', apellido: 'gomez', edad: 20, pais: 'Colombia' },
  { dni: '2', nombre: 'toto', apellido: 'gomez', edad: 20, pais: 'Colombia' },
  { dni: '3', nombre: 'elein', apellido: 'gomez', edad: 20, pais: 'Colombia' },
  { dni: '4', nombre: 'marta', apellido: 'gomez', edad: 20, pais: 'Colombia' },
];

function actualizar(dni, datos) {
  const index = personas.findIndex((p) => p.dni === dni);
  personas[index] = {
    // toma todos los datos del objeto personas + loque estas en datos (lo nuenov)
    ...personas[index],
    ...datos,
  };
}

console.log(personas);
actualizar('2', { nombre: 'pepe', apellido: 'perez', pais: 'Argentina' });
console.log(personas);

//! --------------------------rest operator (...x)
// toma cosas sueltas y las junta en un array

function mostrarCosas(...cosas) {
  for (const cosa of cosas) {
    console.log(cosa);
  }
}

// primero los parametros obligatorios (param1, param2) y al final el resto (...cosas)
function mostrarCosas(param1, param2, ...cosas) {
  console.log('param1: ' + param1);
  console.log('param2: ' + param2);

  console.log('el resto de las cosas: ');
  for (const cosa of cosas) {
    console.log(cosa);
  }
}

mostrarCosas(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);

//* -------------------------------JavaScript and ES10

//! -------------------------------trim
console.log('                abc               ');
console.log('                abc               '.trim());

a = '                abc               ';
console.log(a.length);
console.log(a.trim().length);
console.log(a.trimStart().length);
console.log(a.trimEnd().length);
console.log(a.trim());

//! ------------------------------array flat
//aplanar un array, aplanar una estructura de datos

const arr2 = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];

// devuelve los array que tiene adentro
console.log(arr2.flat()); // [ 1, 2, 3, 4, 5, 6, [ 7, 8, 9 ] ]
console.log(arr2.flat((depth = 2))); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// Matrix dimensionales y bidimensionales
const departamentos = [
  // torre 1
  [
    // piso 1
    [{ prop: 't1-p1-apt1' }, { prop: 't1-p1-apt2' }, { prop: 't1-p1-apt3' }],
    // piso 2
    [{ prop: 't1-p2-apt1' }, { prop: 't1-p2-apt2' }, { prop: 't1-p2-apt3' }],
  ],
  // torre 2
  [
    // piso 1
    [{ prop: 't2-p1-apt1' }, { prop: 't2-p1-apt2' }, { prop: 't2-p1-apt3' }],
    // piso 2
    [{ prop: 't2-p2-apt1' }, { prop: 't2-p2-apt2' }, { prop: 't2-p2-apt3' }],
  ],
  // torre 3
  [
    // piso 1
    [{ prop: 't3-p1-apt1' }, { prop: 't3-p1-apt2' }, { prop: 't3-p1-apt3' }],
  ],
];

console.log(departamentos[0][0]); // [ { prop: 'yo' }, { prop: 'vos' }, { prop: 'el' } ]
console.log(departamentos[1][0]); // [{ prop: 't2-p1-apt1' },{ prop: 't2-p1-apt2' },{ prop: 't2-p1-apt3' }]
console.log(departamentos[0][1][1]); // { prop: 't1-p2-apt2' }

// obtengo todos los departamentos
console.log(departamentos.flat(3));

//* -------------------------------JavaScript and ES11

// Operator nullsh coalescing (??)
// Es un operador que devuelve el operando de la derecha cuando el de la izquierda es null o undefined

let p = {
  nombre: 'marian',
  apellido: 'gomez',
  edad: 30,
  direccion: {
    calle: 'calle falsa 123',
    ciudad: 'Springfield',
    pais: 'EEUU',
  },
};

// const unNombre = p.name // undefined
const unNombre = p.name ?? 'sin nombre'; // sin nombre

console.log(unNombre);

console.log('left' || ''); // siempre devuelve el primer valor true
console.log('' || 'right'); // siempre devuelve el primer valor true
console.log('holaaa' && ''); // siempre devuelve el primer valor false
console.log('' ?? 'nullsh'); // El primero lo toma como falso y devuelve el segundo

//! -------------------------------Criterio cortocircuito:

// false OR cualquier cosa -> lo que esta a la derecha del OR
// true OR cualquier cosa -> lo que esta a la izquierda del OR

console.log(('' || undefined) ?? 'nullsh'); // El primero lo toma como falso y devuelve el segundo
