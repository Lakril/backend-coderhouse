import { Router } from 'express';
import { publicacionesManager } from '../database/index.js';
import { extractFile } from '../middlewares/fields.js';

export const publicacionesRouter = Router();

publicacionesRouter.get('/', async (req, res) => {
  const publicaciones = await publicacionesManager.find().lean();
  res.json(publicaciones);
});

// http://localhost:8080/api/publicaciones/289d5163-a48c-441a-9181-3bc43d340da1
publicacionesRouter.get('/:id', async (req, res) => {
  const usuario = await publicacionesManager.findById(req.params.id).lean();
  res.json(usuario);
});



publicacionesRouter.post('/:id/actualizaciones', extractFile('photo'), async (req, res) => {
  const camposActualizar = {};
  if (req.file) {
    camposActualizar.photoUrl = req.file.path;
  }
  if (req.body.alieas) {
    camposActualizar.alias = req.body.alias;
  }
  let actualizado;
  try {
    actualizado = await publicacionesManager.findByIdAndUpdate(req.params.id, { $set: camposActualizar }, { new: true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!actualizado) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(actualizado.toObject());
});

publicacionesRouter.delete('/:id', async (req, res) => {
  const deleted = await publicacionesManager.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(deleted);
});
