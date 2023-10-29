// Implementando archivos en nodejs: fs
// const fs = require('fs'); // este se utilizaba antes del 2015
import fs from 'fs/promises'; // este se utiliza desde el 2015
//operaciones crud (create, read, update, delete)

async function main() {
  //* create
  // si no existe el archivo lo crea
  await fs.writeFile('class03/test.txt', 'Hola mundo 1');

  //* read
  const text = await fs.readFile('class03/test.txt', 'utf-8');
  console.log(text);

  //* update
  // si lla existe el archivo lo sobreescribe
  await fs.writeFile('class03/test.txt', 'Hola mundo 2\n');

  // add to the end of the file, if the file doesn't exist, it creates it
  await fs.appendFile('class03/test.txt', 'Hola mundo 3\n');
  await fs.appendFile('class03/test.txt', `${new Date().toISOString()}: operacion exitosa\n`);

  //* delete
  await fs.unlink('class03/test.txt');
  console.log('work with files finished');
}

main();
console.log('end of the program');

//* even loop

//! Asynchronous
// end of the program
// Hola mundo 1
// work with files finished

//! Synchronous
// Promise { <pending> }
// work with files finished
// end of the program
