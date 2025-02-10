const express = require('express');
const router = express.Router();
const { obtenerTareas, guardarTareas } = require('../utils/fileUtils');

// este archivo define las rutas para gestionar tareas.
// utiliza funciones asíncronas para manejar las operaciones de lectura y escritura de tareas.

// ruta para obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await obtenerTareas();
    res.json(tareas);
  } catch (error) {
    res.status(500).send({ error: 'error al obtener las tareas.' });
  }
});

// ruta para crear una nueva tarea
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: Date.now(), title, description };
  try {
    const tareas = await obtenerTareas();
    tareas.push(newTask);
    await guardarTareas(tareas);
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send({ error: 'error al crear la tarea.' });
  }
});

// ruta para actualizar una tarea existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const tareas = await obtenerTareas();
    const taskIndex = tareas.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
      return res.status(404).send({ error: 'tarea no encontrada.' });
    }
    tareas[taskIndex] = { ...tareas[taskIndex], title, description };
    await guardarTareas(tareas);
    res.send(tareas[taskIndex]);
  } catch (error) {
    res.status(500).send({ error: 'error al actualizar la tarea.' });
  }
});

// ruta para eliminar una tarea
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tareas = await obtenerTareas();
    const newTareas = tareas.filter(task => task.id !== parseInt(id));
    await guardarTareas(newTareas);
    res.send({ message: 'tarea eliminada.' });
  } catch (error) {
    res.status(500).send({ error: 'error al eliminar la tarea.' });
  }
});

module.exports = router;
