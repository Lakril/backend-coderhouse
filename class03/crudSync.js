import fs from 'fs';

function main() {
  try {
    console.log('start of the program');
    // create
    // fs.writeFileSync("class03/test.txt", "Hola mundo 1");

    // read
    const text = fs.readFileSync('class03/test.txt', 'utf-8');
    console.log(text);

    // update
    fs.writeFileSync('class03/test.txt', 'Hola mundo 2\n');

    // add to the end of the file, if the file doesn't exist, it creates it
    fs.appendFileSync('class03/test.txt', 'Hola mundo 3\n');
    fs.appendFileSync('class03/test.txt', `${new Date().toISOString()}: operacion exitosa\n`);

    // delete
    fs.unlinkSync('class03/test.txt');

    console.log('work with files finished');
  } catch (error) {
    if (error.code === 'ENOENT') {
      // ENOENT: Error NO EN Try
      console.error('File not found');
    } else {
      console.error(error);
    }
  }
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
