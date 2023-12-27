import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';

// schema user created with mongoose
const usuarioSchema = new Schema(
  {
    _id: { type: String, default: randomUUID() },
    alias: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    amigos: { type: [String], default: [] },
    publicaciones: { type: [String], default: [] },
    photoUrl: { type: String, default: '/static/images/default-profiel-img.webp'},
  },
  {
    strict: 'throw',
    versionKey: false,
    // busqueda en base de datos
    // statics: {
    //     findAll: async function () {
    //         return await model('usuarios').find().lean(); // sin lean instancia de mongoose, con lean devuelve un objeto plano (pojo)
    //     },
    // },
    methods: {
      agregarAmigo: function (amigo) {
        if (!this.amigos.includes(amigo)) {
          this.amigos.push(amigo);
        } else {
          throw new Error('El amigo ya existe');
        }
      },
    },
  }
);

export const manager = model('usuarios', usuarioSchema);
