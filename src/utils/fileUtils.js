const fs = require('fs').promises;
const path = require('path');

const tareasFilePath = path.join(__dirname, '../../tareas.json');

async function obtenerTareas() {
  const data = await fs.readFile(tareasFilePath, 'utf8');
  return JSON.parse(data);
}

async function guardarTareas(tareas) {
  await fs.writeFile(tareasFilePath, JSON.stringify(tareas));
}

module.exports = {
  obtenerTareas,
  guardarTareas
};
