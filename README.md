# Backend-jack

Deployed app: <https://backend-coderhouse-lakril-d3296664b086.herokuapp.com/>

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

Data was obtained from <https://fakestoreapi.com/products> and they were modified.

To format of code use Prettier from the terminal, you can use the following command:

```bash
bun prettier --write . #all files
bun prettier --write src # specific file or directory
bun prettier --write src/index.js # To format a single file, you can use:
```

Also, this command will use the Prettier configuration from your .prettierrc file if it exists. If you don't have a `.prettierrc` file, Prettier will use its default configuration.

e.g updated:

```json
{
    "title": "title test input",
    "description": "description test input",
    "code": "codtestsPut",
    "price": 88,
    "stock": 55,
    "status": true,
    "category": "category test input",
    "thumbnails": ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"]
}
```

## capas

Presentacion (vistas) -> ruteo (routers? controllers?) -> negocio (servicios) -> persistencia (daos)

+ Capa de ruteo:
    + routers:
    + middlewares
    + app
    + main
    + controllers
+ capa de negocios:
    + services:
+ capa de persistencia:
    + daos


GOF Gansg of four (book)
head first design patterns (book)

def. patrones de diseños: son soluciones conocidas a problemas recurrentes.

Patron de diseño factory: cuando tenga un problema, puedo elegir entre diferentes opciones.

principios de diseño:
+ solid: 
    + open/close

DTO: Data transfer Object
POJO: es un objeto simple (no tiene metodos), es un objeto literal. 
    ejem POJO: JSON.parse(JSON.stringify({a:1, f: function(){}}))
    sirve para mostra a un usuario final.
    En la capa de persistencia (dao) devolver un POJO.