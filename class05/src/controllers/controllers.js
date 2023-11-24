//? controller 1
// const users = [];
// function controller(req, res) {
//   console.log('Add user');
//   // este ultimo middleware es el que se encarga de enviar la respuesta y no debe llevar next()
//   // cuando se llega al controlador, el objeto req ya tiene todas las propiedades que se le han ido añadiendo en los middleware anteriores
//   req.greeting();
//   console.log(req.user + ' is ' + req.older + ' years old');
//   res.send('I am the controller and arraived to the end of the pipeline');
// }

//? const 2
const users = [];
//? controller 2
export function getController(req, res) {
  console.log('serch user');
  res.json(users);
}
//? controller 2
export function postController(req, res) {
  console.log('Add user');
  const user = req.body;
  console.log(user);
  users.push(user);
  res.json(user);
}
