require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const path = require('path');
const mainRouter = require('./routes/main');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Middleware method override para soportar PUT y DELETE
app.use(methodOverride('_method'));

// Cookie parser para cookies
app.use(cookieParser());

// Configuración sesión con secret de .env
app.use(session({
  secret: process.env.SESSION_SECRET || 'clave_secreta',
  resave: false,
  saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(async (req, res, next) => {
  // Middleware para persistir usuario logueado via cookie
  if (!req.session.user && req.cookies.userId) {
    const user = await User.findByPk(req.cookies.userId); // Requiere importar modelo User
    if (user) req.session.user = user;
  }
  res.locals.user = req.session.user; // Para acceder en vistas EJS
  next();
});

app.use('/', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
