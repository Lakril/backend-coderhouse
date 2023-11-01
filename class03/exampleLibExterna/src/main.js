//* timestamp
const nacimiento = new Date('1981/11/6');
// console.log(nacimiento.toString());
// console.log(nacimiento.getTime());
// console.log(nacimiento.getFullYear());
// console.log(nacimiento.getDay());
// console.log(nacimiento.getMonth());
// console.log(nacimiento.getHours());

// // const day = Date.now() // new Date().getTime()
// const today = new Date()
// const time = today.getTime() - nacimiento.getTime()
// const millisecond = time / 1000
// const timeMin = millisecond / 60
// const timeHours = timeMin / 60
// const timeDays = timeHours / 24
// const tiempoYear = timeDays / 365
// const proximo = new Date(today.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())
// console.log(proximo);

//* moment
import moment from 'moment';

const today = moment();
const birthday = moment('1981/11/6', 'YYYY/MM/DD');

console.log(today);
console.log(birthday);

if (birthday.isValid()) {
  console.log(`From my birthday to today ${today.diff(birthday, 'years')} years`);
} else {
  console.log('Invalid date');
}

console.log(birthday.format('YYYY/MM/DD - HH:mm'));

//* luxon
import { DateTime } from 'luxon';
const dt = DateTime.now();
console.log(dt.year);
console.log(dt.month);
console.log(dt.day);
console.log(dt.zoneName);
