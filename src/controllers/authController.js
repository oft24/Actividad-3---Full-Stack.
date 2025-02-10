const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

// función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const data = await fs.readFile('users.json', 'utf8');
    const users = JSON.parse(data);

    // Verificar si el usuario ya existe
    if (users.find(user => user.username === username)) {
      return res.status(400).send({ error: 'El usuario ya existe.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    // Crear el nuevo usuario
    const newUser = { id: Date.now(), username, password: hashedPassword, email };
    users.push(newUser);

    // Guardar el usuario en el archivo
    await fs.writeFile('users.json', JSON.stringify(users));

    res.status(201).send({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(500).send({ error: 'Error al registrar el usuario.' });
  }
};

// función para iniciar sesión
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await fs.readFile('users.json', 'utf8');
    const users = JSON.parse(data);

    // Buscar el usuario
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).send({ error: 'Usuario o contraseña incorrectos.' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Usuario o contraseña incorrectos.' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

    res.send({ message: 'Inicio de sesión exitoso.', token });
  } catch (error) {
    res.status(500).send({ error: 'Error al iniciar sesión.' });
  }
};

module.exports = { registerUser, loginUser };
