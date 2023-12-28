import { Router } from 'express';
import { publicacionesManager, usuariosManager } from '../database/index.js';
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

usuariosRouter.post('/:id/actualizaciones', extractFile('photo'), async (req, res) => {
  const camposActualizar = {};
  if (req.file) {
    camposActualizar.photoUrl = req.file.path;
  }
  if (req.body.alieas) {
    camposActualizar.alias = req.body.alias;
  }
  let actualizado;
  try {
    actualizado = await usuariosManager.findByIdAndUpdate(req.params.id, { $set: camposActualizar }, { new: true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!actualizado) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(actualizado.toObject());
});

usuariosRouter.delete('/:id', async (req, res) => {
  const deleted = await usuariosManager.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(deleted);
});

usuariosRouter.post('/:id/publicaciones', extractFile('photo'), async (req, res) => {
  if (req.file) {
    req.body.fotoUrl = req.file.path;
  }

  const usuario = await usuariosManager.findById(req.params.id);
  if (!usuario) {
    return res.status(404).json({ message: 'Not found' });
  }

  let publicacion;
  try {
    publicacion = await publicacionesManager.create(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  usuario.agregarPublicacion(publicacion._id);

  res.status(201).json(publicacion.toObject()); // POJO
});
