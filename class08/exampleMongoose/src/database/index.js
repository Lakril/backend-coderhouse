import mongoose from 'mongoose';
import { MONGODB_CNX_STR } from '../../config.js';

await mongoose.connect(MONGODB_CNX_STR, {
    serverSelectionTimeoutMS: 5000,
});
console.log(`Connected to ${MONGODB_CNX_STR}`);

export { manager as usuariosManager } from './Usuario.js';
export { manager as publicacionesManager } from './Publicacion.js';
