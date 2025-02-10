### Configuración en Postman

1. **Método HTTP**: POST
2. **URL**: `http://localhost:3000/api/auth/login`
3. **Headers**:
   - `Content-Type`: `application/json`
4. **Body**:
   ```json
   {
     "username": "nuevo_usuario",
     "password": "nueva_contraseña"
   }
   ```

### Configuración en Postman para el Registro

1. **Método HTTP**: POST
2. **URL**: `http://localhost:3000/api/auth/register`
3. **Headers**:
   - `Content-Type`: `application/json`
4. **Body**:
   ```json
   {
     "username": "nuevo_usuario",
     "password": "nueva_contraseña",
     "email": "nuevo_email@example.com"
   }
   ```

### Ejemplo de configuración en Postman
