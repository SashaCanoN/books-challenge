//registro
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

async function registerUser(req, res) {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, saltRounds);
  await User.create({ email, password: hashed, role: 'user' });
  res.redirect('/login');
}


//login
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.render('login', { error: 'Usuario no encontrado' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.render('login', { error: 'Contraseña incorrecta' });

  req.session.user = { id: user.id, email: user.email, role: user.role };
  res.cookie('userId', user.id, { maxAge: 86400000, httpOnly: true });
  res.redirect('/');
}

//longout
function logoutUser(req, res) {
  res.clearCookie('userId');
  req.session.destroy();
  res.redirect('/login');
}
