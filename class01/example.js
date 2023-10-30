// main()

// function main() {
//     saludar()
//     despedida()
// }

// function saludar() {
//     console.log('hola')
// }

// // const despedida = () => {
// //     console.log('adios')
// // }

// function despedida() {
//     console.log('adios')
// }

//  clase 2
// recorer un array
a = new Array(1, 2, 3, 4, 5, 6);
for (const n of a) {
  console.log(n);
}

// recorer un objeto
u = { us: 'marian', ps: '123' };
for (const nombreProp in u) {
  console.log(nombreProp);
}

for (const nombreProp in a) {
  console.log(a[nombreProp]);
}

for (const nombreProp in u) {
  console.log(u[nombreProp]);
}

for (const nombreProp of Object.values(u)) {
  console.log(nombreProp);
}

for (const entry of Object.entries(u)) {
  console.log(entry);
}

// uso de spread operator
