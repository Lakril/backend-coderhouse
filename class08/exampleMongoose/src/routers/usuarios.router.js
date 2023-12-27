import { Router } from 'express';
import { usuariosManager } from '../database/index.js';
import { extractFile } from '../middlewares/fields.js';

export const usuariosRouter = Router();

usuariosRouter.get('/', async (req, res) => {
  const usuarios = await usuariosManager.find().lean();
  res.json(usuarios);
});

// http://localhost:8080/api/usuarios/289d5163-a48c-441a-9181-3bc43d340da1
usuariosRouter.get('/:id', async (req, res) => {
  const usuario = await usuariosManager.findById(req.params.id).lean();
  res.json(usuario);
});

usuariosRouter.post('/', extractFile('photo'), async (req, res) => {
  try {
    if (req.file) {
      req.body.fotoUrl = req.file.path;
    }
    const usuario = await usuariosManager.create(req.body);
    res.status(201).json(usuario.toObject()); // POJO
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// usuariosRouter.put('/:id', extractFile('photo'), async (req, res) => {
//   try {
//     if (!req.file)
//     const usuario = await usuariosManager.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(usuario);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
