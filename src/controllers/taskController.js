const fs = require('fs').promises;

// función para obtener todas las tareas
const fetchTasks = async (req, res) => {
  try {
    const data = await fs.readFile('tareas.json', 'utf8');
    const tasks = JSON.parse(data);
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: 'error al leer las tareas.' });
  }
};

// función para crear una nueva tarea
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = { id: Date.now(), title, description };
  try {
    const data = await fs.readFile('tareas.json', 'utf8');
    const tasks = JSON.parse(data);
    tasks.push(task);
    await fs.writeFile('tareas.json', JSON.stringify(tasks));
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ error: 'error al agregar la tarea.' });
  }
};

// función para actualizar una tarea existente
const modifyTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const data = await fs.readFile('tareas.json', 'utf8');
    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex === -1) {
      return res.status(404).send({ error: 'tarea no encontrada.' });
    }
    tasks[taskIndex] = { id, title, description };
    await fs.writeFile('tareas.json', JSON.stringify(tasks));
    res.send(tasks[taskIndex]);
  } catch (error) {
    res.status(500).send({ error: 'error al actualizar la tarea.' });
  }
};

// función para eliminar una tarea
const removeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile('tareas.json', 'utf8');
    const tasks = JSON.parse(data);
    const updatedTasks = tasks.filter(task => task.id != id);
    await fs.writeFile('tareas.json', JSON.stringify(updatedTasks));
    res.send({ message: 'tarea eliminada.' });
  } catch (error) {
    res.status(500).send({ error: 'error al eliminar la tarea.' });
  }
};

module.exports = { fetchTasks, createTask, modifyTask, removeTask };
