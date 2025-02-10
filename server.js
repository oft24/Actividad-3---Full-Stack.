const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());

let taskList = [];

// middleware de registro de solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// endpoint para crear una nueva tarea
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    taskList.push(newTask);
    res.status(201).send(newTask);
});

app.use('/tareas', taskRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
});
