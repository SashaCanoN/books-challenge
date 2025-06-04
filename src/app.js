const express = require('express');
const path = require('path');
const session = require('express-session'); // Se requiere antes de usarlo
const mainRouter = require('./routes/main');

const app = express();

// Middleware para procesar datos y archivos estáticos
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Configuración de sesiones
app.use(session({
    secret: 'clave_secreta',
    resave: false,
    saveUninitialized: false
}));

// Configuración de vistas con EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // Se corrigió la ruta

// Rutas
app.use('/', mainRouter);

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3001');
});