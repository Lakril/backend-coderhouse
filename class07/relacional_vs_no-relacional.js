// relacional:

// tabla personas

// id (numero) nombre (string) apellido (string) edad (numerico) direccion (numerico Fore key) // esquema de la tabla
// 1 marian          erwe        45
// 2 juan            marin       34
// 3 santi           perez       33
// 4 ana             rico        17
// 5 gabriela        muriel      24

// no relacional (mongodb especificamente)

// coleccion personas
// sin esquema

// tabla direcciones
// id calle zip
// 1 blabla asd234





const personas = [
  {
    "id": 1,
    "nombre": 'marian',
    "apellido": 'erwe',
    "edad": 45,
    "tarabajo": 'profe',
    "direccion": { "calle": 'blabla', "zip": 'asd234' },
  }, // documento JSON
  { "id": 2, "nombre": 'juan', "apellido": 'marin', "edad": 34, "direccion": { "calle": 'blabla', "zip": 'asd234' } }, // documento JSON
  { "id": 3, "nombre": 'santi', "apellido": 'perez', "edad": 33, "direccion": { "calle": 'blabla', "zip": 'asd234' } }, // documento JSON
  { "id": 4, "nombre": 'ana', "apellido": 'rico', "edad": 17, "direccion": { "calle": 'blabla', "zip": 'asd234' } }, // documento JSON
  { "id": 5, "nombre": 'gabriela', "apellido": 'muriel', "edad": 24, "direccion": { "calle": 'blabla', "zip": 'asd234' } }, // documento JSON
];


// oOLmQH92SqAxGgHR