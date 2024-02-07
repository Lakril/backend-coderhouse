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
    photoUrl: { type: String, default: '/static/images/default-profiel-img.webp' },
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
      agregarPublicacion: async function (idPublicacion) {
        if (!this.publicaciones.includes(idPublicacion)) {
          this.publicaciones.push(idPublicacion);
        }
        await this.save();
      },
    },
  }
);

export const manager = model('usuarios', usuarioSchema);