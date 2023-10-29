//TODO HANDS ON  LAB: CLASS 02

function notNull(value, label) {
  if (value === null || value === undefined) {
    throw new Error(`El valor de ${label} es null o undefined`);
  }
  return value;
}

class Evento {
  // private #capacidad (visibilidad privada)
  #capacidad;
  #participantes;
  #precio;
  constructor({
    id,
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date(),
    // participantes = [],
  }) {
    this.id = notNull(id, 'id');
    this.nombre = notNull(nombre, 'nombre');
    this.lugar = notNull(lugar, 'lugar');
    this.precio = notNull(precio, 'precio');

    // if (capacidad <= 0) throw new Error("capacidad must be greater than 0");
    // private #capacidad (visibilidad privada)

    // .capacidad trabaja con el setter capacidad()
    this.capacidad = capacidad;
    this.fecha = fecha;
    // begin with empty array (1)
    this.#participantes = [];
  }

  get capacidad() {
    return this.#capacidad;
  }
  set capacidad(newCapacidad) {
    if (newCapacidad <= 0) throw new Error('newCmust be greater than 0');
    this.#capacidad = newCapacidad;
  }

  // it's read-only
  get participantes() {
    return [...this.#participantes];
  }
  // add new participant (2)
  agregarUsuario(idUsuario) {
    if (this.#capacidad <= this.#participantes.length) throw new Error('Evento completo');
    if (this.#participantes.includes(idUsuario))
      throw new Error(`El usuario ${idUsuario} ya existe`);
    this.#participantes.push(idUsuario);
  }

  get precio() {
    return this.#precio;
  }
  set precio(newPrecio) {
    if (newPrecio <= 0) throw new Error('newPrecio must be greater than 0');
    this.#precio = newPrecio;
  }

  // Copy securety: POJO = Plain Old Javascript Object
  asPOJO() {
    return {
      id: this.id,
      nombre: this.nombre,
      lugar: this.lugar,
      precio: this.precio,
      capacidad: this.capacidad,
      fecha: this.fecha, // .toLocaleDateString(),
      participantes: this.participantes,
    };
  }
}

//! counter id

let id = 0;
function generateId(params) {
  return ++id;
}

class ManagerEventos {
  #eventos;
  constructor() {
    this.#eventos = [];
  }
  agregarEvento(datosEvento) {
    datosEvento.id = generateId();
    const evento = new Evento(datosEvento);
    this.#eventos.push(evento);
    return evento.asPOJO();
  }

  ponerEventoEnGira({ idEvento, newLocation, newDate }) {
    const evento = this.#eventos.find((e) => e.id === idEvento);
    if (!evento) throw new Error(`Evento ${idEvento} no existe`);
    const newEvento = new Evento({
      ...evento.asPOJO(),
      id: generateId(),
      lugar: newLocation,
      fecha: newDate,
    });
    this.#eventos.push(newEvento);
    return newEvento.asPOJO();
  }

  agregarUsuario({ idEvento, idUsuario }) {
    const evento = this.#eventos.find((e) => e.id === idEvento);
    if (!evento) throw new Error(`Evento ${idEvento} no existe`);
    evento.agregarUsuario(idUsuario);
  }

  get eventos() {
    return this.#eventos.map((e) => e.asPOJO());
  }
}

// const datosEvento = {
//   id: 1, // autoincremental id
//   nombre: "my happybirthday",
//   lugar: "My home",
//   precio: 100_000,
//   capacidad: 10, // default 50
//   fecha: new Date().toLocaleDateString(), // today date by default
//   participantes: [],
// };

// const evento = new Evento(datosEvento);
// // no es el metodo #capacidad, el metodo set capcidad()
// // evento.capacidad = 110;
// // evento.setCapacidad(-10);
// console.log(evento.capacidad);
// console.log(evento.participantes);
// // evento.participantes = [1,2,3]; // error

// // con push modifica una copia del array original [...this.#participantes]
// evento.participantes.push(1, 2, 3);
// console.log(evento.participantes);

// test

const managerEventos = new ManagerEventos();

const datosEvento = {
  nombre: 'my happybirthday',
  lugar: 'My home',
  precio: 100_000,
};

// new event
managerEventos.agregarEvento(datosEvento);
console.log(managerEventos.eventos);

// // add participant
// managerEventos.agregarUsuario({ idEvento: 1, idUsuario: "Jackson" });
// console.log(managerEventos.eventos);

// //duplicate event
// managerEventos.ponerEventoEnGira({idEvento: 1, newLocation: "Buenos Aires", newDate: new Date('2023-11-06')});

// console.log(managerEventos.eventos);
