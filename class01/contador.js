class Contador {
  static cuentaGlobal = 0;

  constructor(nombre) {
    this.contador = 0;
    this.nombre = nombre;
  }
  contar() {
    this.contador++;
    Contador.cuentaGlobal++;
  }
  verCuenta() {
    console.log(`${this.nombre} contó ${this.contador} personas`);
  }

  static verCuentaGlobal() {
    console.log(`En total contamos ${Contador.cuentaGlobal} personas`);
  }
}

const c1 = new Contador('Marina');
const c2 = new Contador('joaquin');

c1.contar();
c1.contar();
c1.contar();
c1.contar();

c2.contar();
c2.contar();
c2.contar();

c1.verCuenta();
c2.verCuenta();

Contador.verCuentaGlobal();
