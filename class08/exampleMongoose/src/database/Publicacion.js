import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';

// schema user created with mongoose
const publicacionSchema = new Schema(
  {
    _id: { type: String, default: randomUUID() },
    contenido: { type: String, required: true },
    fecha: { type: Date, default: () => new Date().toDateString() },
  },
  {
    strict: 'throw',
    versionKey: false,
  }
);

export const manager = model('publicaciones', publicacionSchema);
